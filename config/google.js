
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

function getPrivateKey() {
  let key = process.env.GOOGLE_PRIVATE_KEY || "";
  
  key = key.trim().replace(/^["']|["']$/g, "");
  
  key = key.replace(/\\n/g, "\n");
  return key;
}

const auth = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  getPrivateKey(),
  ["https://www.googleapis.com/auth/calendar"]
);

export const calendar = google.calendar({ version: "v3", auth });