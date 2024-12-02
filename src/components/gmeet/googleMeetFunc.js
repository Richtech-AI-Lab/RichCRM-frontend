import { gapi } from "gapi-script";

// Replace with your credentials
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CALENDAR_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

// Initialize the Google API client
export const initializeGapiClient = () => {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    });
  });
};

// Sign in to Google
export const signInToGoogle = async () => {
  const authInstance = gapi.auth2.getAuthInstance();
  await authInstance.signIn();
};

// Sign out of Google
export const signOutFromGoogle = () => {
  const authInstance = gapi.auth2.getAuthInstance();
  authInstance.signOut();
};

// Fetch upcoming events
export const fetchUpcomingEvents = async () => {
  try {
    const response = await gapi?.client?.calendar?.events?.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      // maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    // console.log(response,"responseresponse")
    return response?.result?.items;
  } catch (error) {
    console.error("Error fetching events: ", error);
    throw error;
  }
};

// Create a new calendar event
export const createCalendarEvent = async (event) => {
    try {
      const response = await gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
        conferenceDataVersion: 1, // Enable conference data creation
      });
      return response.result;
    } catch (error) {
      console.error("Error creating event: ", error);
      throw error;
    }
  };
