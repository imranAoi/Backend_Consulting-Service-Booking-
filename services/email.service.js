import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export async function sendConfirmationEmail({ name, email, agenda, meetLink, startTime }) {
  const when = new Date(startTime).toLocaleString();

  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: email,
    subject: "Your Consulting Session is Confirmed",
    html: `
      <h2>Booking Confirmed</h2>
      <p>Hi ${name},</p>
      <p>Your consulting session is booked.</p>
      <ul>
        <li><b>When:</b> ${when}</li>
        <li><b>Agenda:</b> ${agenda}</li>
        ${meetLink ? `<li><b>Meet Link:</b> <a href="${meetLink}">${meetLink}</a></li>` : ""}
      </ul>
      <p>See you there!</p>
    `,
  });
}