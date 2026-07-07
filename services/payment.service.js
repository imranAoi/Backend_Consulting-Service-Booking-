import { stripe } from "../config/stripe.js";

export async function createCheckoutSession(booking) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: booking.email,
    line_items: [
      {
        price_data: {
          currency: process.env.CONSULT_CURRENCY,
          product_data: { name: "Consulting Session" },
          unit_amount: Number(process.env.CONSULT_PRICE),
        },
        quantity: 1,
      },
    ],
    metadata: {
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      agenda: booking.agenda,
      startTime: booking.startTime,
    },
    success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });

  return session;
}