export const msalParams = {
    auth: {
        // authority: `https://login.microsoftonline.com/${process.env.ONEDRIVE_TENANT_ID}`,
        authority: "https://login.microsoftonline.com/verkho404gmail.onmicrosoft.com",
        clientId: process.env.REACT_APP_ONEDRIVE_CLIENT_ID,
        redirectUri: process.env.REACT_APP_ONEDRIVE_REDIRECT_URL,
    },
}



// const app = await msal.PublicClientApplication.createPublicClientApplication(msalParams);

