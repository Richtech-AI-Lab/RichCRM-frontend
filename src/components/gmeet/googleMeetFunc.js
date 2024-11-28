import { gapi } from "gapi-script";

// Replace with your credentials
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
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

