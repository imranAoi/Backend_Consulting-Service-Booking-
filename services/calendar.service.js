// services/calendar.service.js
import { calendar } from "../config/google.js";

export async function createCalendarEvent({ name, email, agenda, startTime }) {
  const start = new Date(startTime);
  const end = new Date(start.getTime() + 30 * 60 * 1000);

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
    calendarId: "primary",           // you're authenticating as yourself now
    resource: event,
    conferenceDataVersion: 1,        // enables the Meet link
    sendUpdates: "all",
  });

  return res.data;
}