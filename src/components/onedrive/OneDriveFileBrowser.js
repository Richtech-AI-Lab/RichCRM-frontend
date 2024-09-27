import React, { useEffect, useRef, useState } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { combine } from '@pnp/core';

const msalConfig = {
    auth: {
        authority: "https://login.microsoftonline.com/verkho404gmail.onmicrosoft.com",
        clientId: process.env.REACT_APP_ONEDRIVE_CLIENT_ID,
        redirectUri: process.env.REACT_APP_ONEDRIVE_REDIRECT_URL,
    },
};

const app = new PublicClientApplication(msalConfig);

const OneDriveFileBrowser = () => {
    const iframeRef = useRef(null);
    const [port, setPort] = useState(null);

    const getToken = async (command) => {
        let accessToken = '';
        const authParams = { scopes: [`${combine(command.resource, '.default')}`] };

        try {
            const resp = await app.acquireTokenSilent(authParams);
            accessToken = resp.accessToken;
        } catch (e) {
            const resp = await app.loginPopup(authParams);
            app.setActiveAccount(resp.account);
            if (resp.idToken) {
                const resp2 = await app.acquireTokenSilent(authParams);
                accessToken = resp2.accessToken;
            } else {
                throw e;
            }
        }

        return accessToken;
    };

    const initFileBrowser = async () => {
        const baseUrl = 'https://verkho404gmail-my.sharepoint.com/';
        const options = {
            sdk: '8.0',
            entry: { oneDrive: { files: {} } },
            authentication: {},
            messaging: { origin: 'http://localhost:3000', channelId: '27' },
        };

        const authToken = await getToken({ resource: baseUrl, command: 'authenticate', type: 'SharePoint' });
        const queryString = new URLSearchParams({ fileBrowser: JSON.stringify(options) });
        const url = `${baseUrl}/_layouts/15/FileBrowser.aspx?${queryString}`;

        const form = iframeRef.current.contentWindow.document.createElement('form');
        form.setAttribute('action', url);
        form.setAttribute('method', 'POST');

        const input = iframeRef.current.contentWindow.document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', 'access_token');
        input.setAttribute('value', authToken);
        form.appendChild(input);

        iframeRef.current.contentWindow.document.body.appendChild(form);
        form.submit();
    };

    useEffect(() => {
        const handleMessages = (event) => {
            if (event.source && event.source === iframeRef.current.contentWindow) {
                const message = event.data;
                if (message.type === 'initialize' && message.channelId === '27') {
                    const newPort = event.ports[0];
                    setPort(newPort);
                    newPort.start();
                    newPort.postMessage({ type: 'activate' });
                }
            }
        };

        window.addEventListener('message', handleMessages);
        return () => {
            window.removeEventListener('message', handleMessages);
        };
    }, []);

    // useEffect(() => {
    //     initFileBrowser();
    // }, []);

    useEffect(() => {
        // Initialize the MSAL application and then call the initFileBrowser function
        const initializeApp = async () => {
            try {
                // Call the initialize method before using other APIs
                await app.initialize();
                initFileBrowser();
            } catch (error) {
                console.error("MSAL Initialization Error: ", error);
            }
        };

        initializeApp();
    }, []);

    return (
        <iframe
            ref={iframeRef}
            style={{ width: '100%', height: '600px', border: 'none' }}
            title="OneDrive File Browser"
        />
    );
};

export default OneDriveFileBrowser;
