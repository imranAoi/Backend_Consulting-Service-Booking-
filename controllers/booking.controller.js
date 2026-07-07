import { stripe } from "../config/stripe.js";
import { createCheckoutSession } from "../services/payment.service.js";
import { createCalendarEvent } from "../services/calendar.service.js";
import { sendConfirmationEmail } from "../services/email.service.js";

// 1. Create booking + checkout session
export async function createBooking(req, res) {
  try {
    const { name, email, phone, agenda, startTime } = req.body;

    if (!name || !email || !phone || !agenda || !startTime) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const session = await createCheckoutSession({ name, email, phone, agenda, startTime });
    res.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create booking" });
  }
}

// 2. Stripe webhook — fires after successful payment
export async function handleWebhook(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, // raw body
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object;
    const { name, email, phone, agenda, startTime } = s.metadata;

    try {
      const calEvent = await createCalendarEvent({ name, email, agenda, startTime });
      const meetLink = calEvent.hangoutLink;

      await sendConfirmationEmail({ name, email, agenda, meetLink, startTime });
    } catch (err) {
      console.error("Post-payment processing failed:", err);
    }
  }

  res.json({ received: true });
}