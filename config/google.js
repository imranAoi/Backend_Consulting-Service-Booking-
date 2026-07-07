import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const auth = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  ["https://www.googleapis.com/auth/calendar"]
);

export const calendar = google.calendar({ version: "v3", auth });