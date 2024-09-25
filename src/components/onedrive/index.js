import React, {useEffect, useState} from "react";
import { useMsal, useAccount } from "@azure/msal-react";

const OneDrive = (props) => {
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [apiData, setApiData] = useState(null);
    const baseUrl = "https://onedrive.live.com/picker";
    

    const params = {
        sdk: "8.0",
        entry: {
            oneDrive: {}
        },
        authentication: {},
        messaging: {
            origin: "http://localhost:3000",
            channelId: "27"
        },
        typesAndSources: {
            mode: "multiple",
            pivots: {
                oneDrive: true,
                recent: true,
            },
        },
    };

    useEffect(() => {

        if (accounts.length > 0) {
            console.log("User is signed in!");
        } else {
            console.log("User is not signed in!");
        }
    }, [accounts]);
    
    async function getToken() {
        if (!accounts && accounts.length === 0) {
            return null;
        }
        const request = {
            scopes: ["User.Read", "Files.ReadWrite"],
            account: accounts[0]
        };
    
        const authResult = await instance.acquireTokenSilent(request);

        return authResult.accessToken
    }

    let win = null;
    let port = null;

    async function launchPicker(e) {
        e.preventDefault();

        win = window.open("", "Picker", "width=800,height=600");

        const authToken = await getToken();

        const queryString = new URLSearchParams({
            filePicker: JSON.stringify(params),
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
            // console.log(event.data);

            if (event.source && event.source === win) {
                const message = event.data;

                if (message.type === "initialize" && message.channelId === params.messaging.channelId) {
                    port = event.ports[0];

                    port.addEventListener("message", messageListener);

                    port.start();

                    port.postMessage({
                        type: "activate",
                    });
                }
            }
        });
    }

    async function messageListener(message) {
        
        switch (message.data.type) {
            case "notification":
                console.log(message.data);
                // console.log(`notification: ${message.data}`);
                break;
            case "command":
                port.postMessage({
                    type: "acknowledge",
                    id: message.data.id,
                });

                const command = message.data.data;

                switch (command.command) {
                    case "authenticate":
                        // Get token!
                        const token = await getToken();

                        if (typeof token !== "undefined" && token !== null) {
                            port.postMessage({
                                type: "result",
                                id: message.data.id,
                                data: {
                                    result: token,
                                    token,
                                },
                            });
                        } else {
                            console.error(`Could not get auth token for command: ${JSON.stringify(command)}`);
                        }

                        break;

                    case "close":
                        win.close();
                        break;
                    
                    case "pick":
                        console.log(`Picking file: ${command.data}`);

                        port.postMessage({
                            type: "result",
                            id: message.data.id,
                            data: {
                                result: "success",
                            },
                        });

                        win.close();
                        break;

                    default:
                        console.warn(`Unsupported command: ${JSON.stringify(command)}`, 2);

                        port.postMessage({
                            type: "error",
                            error: {
                                code: "unsupportedCommand",
                                message: command.command,
                            },
                            isExpected: true,
                        });
                        break;
                }

                break;
        }
    }

    if (accounts.length > 0) {
        return (
            <div>
                <p>There are currently {accounts.length} users signed in!</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={launchPicker}>Open File Picker</button>
            </div>
        );
        
    } else if (inProgress === "login") {
        return <p>Login is currently in progress!</p>
    } else {
        return (
            <>
                <p>There are currently no users signed in!</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => instance.loginPopup()}>Login</button>
            </>
        );
    }
};

export default OneDrive;