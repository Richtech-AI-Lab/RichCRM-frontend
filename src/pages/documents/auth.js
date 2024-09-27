// src/services/auth.js
import { PublicClientApplication } from '@azure/msal-browser';

const msalConfig = {
  auth: {
    authority: "https://login.microsoftonline.com/verkho404gmail.onmicrosoft.com",
    clientId: process.env.REACT_APP_ONEDRIVE_CLIENT_ID,
    redirectUri: process.env.REACT_APP_ONEDRIVE_REDIRECT_URL
  },
};

const msalInstance = new PublicClientApplication(msalConfig);


// Sign in method
export const login = async () => {
  await msalInstance.initialize();
  const loginRequest = {
    scopes: ['Files.ReadWrite'],
  };
  
  try {
    const response = await msalInstance.loginPopup(loginRequest);
    console.log(response);
    return response; // You can return the response for further use
  } catch (error) {
    console.error(error);
    throw error; // Re-throw for handling in the calling component
  }
};

export default msalInstance; // Export the instance if needed in other parts
