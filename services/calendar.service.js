import { calendar } from "../config/google.js";

export async function createCalendarEvent({ name, email, agenda, startTime }) {
  const start = new Date(startTime);
  const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 min

  const event = {
    summary: `Consulting Session - ${name}`,
    description: `Agenda: ${agenda}\nClient: ${name} (${email})`,
    start: { dateTime: start.toISOString(), timeZone: "UTC" },
    end: { dateTime: end.toISOString(), timeZone: "UTC" },
    attendees: [{ email }],
    conferenceData: {
      createRequest: {
        requestId: `${Date.now()}`,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };

  const res = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    resource: event,
    conferenceDataVersion: 1,
    sendUpdates: "all",
  });

  return res.data;
}