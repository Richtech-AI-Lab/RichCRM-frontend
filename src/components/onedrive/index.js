import React, {useEffect, useState} from "react";
import { PublicClientApplication } from "@azure/msal-browser";

const OneDrive = (props) => {
     const [app, setApp] = useState(null);
    const baseUrl = "https://onedrive.live.com/picker";
    const authority = "https://login.microsoftonline.com/consumers";
    const redirectUri = process.env.ONEDRIVE_REDIRECT_URL; // your web url
    const clientId = process.env.ONEDRIVE_CLIENT_ID; // your client id
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://alcdn.msauth.net/browser/2.19.0/js/msal-browser.min.js";
        script.async = true;
        script.onload = apiLoaded;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

     const apiLoaded = async () => {
        let pca = new PublicClientApplication({
            auth: {
                clientId,
                authority,
                redirectUri
            }
        });
        await pca.initialize();
        setApp(pca);
    };

    const params = {
        sdk: "8.0",
        entry: {
            oneDrive: {
                files: {}
            }
        },
        authentication: {},
        messaging: {
            origin: "localhost:3000",
            channelId: "27"
        },
        typesAndSources: {
            mode: "files",
            pivots: {
                oneDrive: true,
                recent: true
            }
        }
    };

    let win = null;
    let port = null;

    function combine(...paths) {
        return paths
            .map(path => path.replace(/^[\\|/]/, "").replace(/[\\|/]$/, ""))
            .join("/")
            .replace(/\\/g, "/");
    }

    async function launchPicker(e) {
        e.preventDefault();

        win = window.open("", "Picker", "height=600,width=1200");

        const authToken = await getToken();

        const queryString = new URLSearchParams({
            filePicker: JSON.stringify(params)
        });

        const url = `${baseUrl}?${queryString}`;     

        const form = win.document.createElement("form");
        form.setAttribute("action", url);
        form.setAttribute("method", "POST");
        win.document.body.append(form);

        const input = win.document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", "access_token");
        input.setAttribute("value", authToken);
        form.appendChild(input);

        form.submit();

        window.addEventListener("message", (event) => {

            if (event.source && event.source === win) {

                const message = event.data;

                if (message.type === "initialize" && message.channelId === params.messaging.channelId) {

                    port = event.ports[0];

                    port.addEventListener("message", messageListener);

                    port.start();

                    port.postMessage({
                        type: "activate"
                    });
                }
            }
        });
    }

    async function messageListener(message) {
        switch (message.data.type) {
            case "notification":
                console.log(`Notification: ${message.data.message}`);
                break;

            case "command":
                port.postMessage({
                    type: "acknowledge",
                    id: message.data.id
                });

                const command = message.data.data;

                switch (command.command) {
                    case "authentication":
                        console.log(`Authentication: ${command.data}`);
                        const token = await getToken();

                        if (typeof token !== "undefined" && token !== null) {
                            port.postMessage({
                                type: "result",
                                id: message.data.id,
                                data: {
                                    result: "token",
                                    token
                                }
                            });
                        } else {
                            console.error(`Could not get auth token for command: ${JSON.stringify(command)}`);
                        }
                        
                        break;

                    case "close":
                        win.close();
                        break;

                    case "pick":
                        uploadFiles(command);

                        port.postMessage({
                            type: "result",
                            id: message.data.id,
                            data: {
                                result: "success"
                            }
                        });

                        win.close();
                        break;
                    
                    default:
                        console.warn(`Unknown command: ${command.command}`);

                        port.postMessage({
                            type: "error",
                            error: {
                                code: "unsupportedCommand",
                                message: command.command
                            },
                            isExpected: true
                        });
                        break;
                }

                break;
        }
    }

    async function getToken() {
        let accessToken = "";

        let authParams = { scopes: ["OneDrive.ReadWrite"] };
    
        try {
    
            // see if we have already the idtoken saved
            const resp = await app.acquireTokenSilent(authParams);
            accessToken = resp.accessToken;
    
        } catch (e) {
    
            // per examples we fall back to popup
            const resp = await app.loginPopup(authParams);
            app.setActiveAccount(resp.account);
    
            if (resp.idToken) {
    
                const resp2 = await app.acquireTokenSilent(authParams);
                accessToken = resp2.accessToken;
    
            }
        }
    
        return accessToken;
    }
    
    const uploadFiles = (commandData) => {
        let data = commandData.items[0];
        let tokenObj = getToken();

        let url = `${data["@sharePoint.endpoint"]}drives/${data.parentReference.driveId}/items/${data.id}`;

        tokenObj.then(token => {
            const headers = {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "image/jpeg"
            };
            fetch(url, {
                method: "GET",
                headers
            }).then(response => {
                const reader = response.body.getReader();
                const decoder = new TextDecoder("utf-8");
                let chunk = "";
                return reader.read().then(function processResult(result) {
                    if (result.done) {
                        return JSON.parse(chunk);
                    }
                    chunk += decoder.decode(result.value, {stream: true});
                    return reader.read().then(processResult);
                });
            }).then(data => {
                processSelectedFile(data);
            }).catch(err => {
                console.log(" some error occured ",err);
            });
        });
    }

    const processSelectedFile = (fileObj) => {
        let link = fileObj["@content.downloadUrl"];
    }


    return (
        <span id="original-tab-id">
           
            <button onClick={(e) => {
                launchPicker(e); 
            }}>One drive</button>
        </span>
    ); 
};

export default OneDrive;