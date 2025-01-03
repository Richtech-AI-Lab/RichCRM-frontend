import { gapi } from "gapi-script";

// Replace with your credentials
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CALENDAR_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";


export const initializeGapiClient = () => {
  return new Promise((resolve, reject) => {
    gapi.load("client:auth2", async () => {
      try {
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        });

        const authInstance = gapi.auth2.getAuthInstance();
        const isSignedIn = authInstance.isSignedIn.get();
        resolve(isSignedIn);
      } catch (error) {
        console.error("Error initializing GAPI client: ", error);
        reject(error);
      }
    });
  });
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


// Update a event
export const updateCalendarEvent = async (eventId, updatedEvent) => {
  try {
    const response = await gapi.client.calendar.events.update({
      calendarId: "primary", // The calendar ID (e.g., 'primary' for the main calendar)
      eventId: eventId,      // The ID of the event to update
      resource: updatedEvent // The updated event object
    });
    return response.result;
  } catch (error) {
    console.error("Error updating event: ", error);
    throw error;
  }
};


// Get the current authentication instance
// export const getAuthInstance = () => gapi.auth2.getAuthInstance();

// Sign in to Google
export const signInToGoogle = async () => {
  try {
    const authInstance = gapi?.auth2?.getAuthInstance();
    await authInstance?.signIn({
      prompt: "select_account", // Forces the account selection dialog
    });
    localStorage.setItem("googleAuth", "true"); // Save login state
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
};

// Sign out of Google
export const signOutFromGoogle = () => {
  const authInstance = gapi.auth2.getAuthInstance();
  authInstance.signOut();
  localStorage.removeItem("googleAuth"); // Clear login state
};

export const checkGoogleSignInStatus = async () => {
  try {
    await initializeGapiClient()
    const authInstance = await gapi?.auth2?.getAuthInstance();
    return authInstance?.isSignedIn?.get(); // Returns true if user is signed in
  } catch (error) {
    console.error("Error checking sign-in status:", error);
    return false; // Default to not signed in on error
  }
};

export const getCurrentUserProfile = () => {
  try {
    const authInstance = gapi?.auth2?.getAuthInstance();
    const user = authInstance?.currentUser?.get();

    if (user) {
      const profile = user.getBasicProfile();
      const userProfile = {
        name: profile.getName(),          // User's full name
        email: profile.getEmail(),        // User's email
        profilePic: profile.getImageUrl() // Profile picture URL
      };
      return userProfile;
    } else {
      console.warn("No user is currently signed in.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile: ", error);
    return null;
  }
};