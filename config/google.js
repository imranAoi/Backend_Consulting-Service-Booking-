// config/google.js
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const raw = process.env.GOOGLE_CREDENTIALS_B64;
console.log("1. B64 exists:", !!raw);
console.log("2. B64 length:", raw?.length);

const credentials = JSON.parse(
  Buffer.from(raw, "base64").toString("utf8")
);

console.log("3. client_email:", credentials.client_email);
console.log("4. private_key starts:", credentials.private_key?.slice(0, 27));
console.log("5. private_key ends:", credentials.private_key?.slice(-25));
console.log("6. has real newlines:", credentials.private_key?.includes("\n"));

const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ["https://www.googleapis.com/auth/calendar"]
);

export const calendar = google.calendar({ version: "v3", auth });