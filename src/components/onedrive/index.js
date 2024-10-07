import React, {useEffect, useState} from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import { v4 as uuid } from "uuid";

const OneDrive = (props) => {
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const baseUrl = "https://onedrive.live.com/picker";
    

    // const options = {
    //     sdk: "8.0",
    //     entry: {
    //         oneDrive: {}
    //     },
    //     authentication: {},
    //     messaging: {
    //         origin: "http://localhost:3000",
    //         channelId: "27"
    //     },
    //     typesAndSources: {
    //         mode: "multiple",
    //         pivots: {
    //             oneDrive: true,
    //             recent: true,
    //         },
    //     },
    // };

    const channelId = uuid(); // Always use a unique id for the channel when hosting the picker.

    const options = {
        sdk: "8.0",
        entry: {
            oneDrive: {}
        },
        // Applications must pass this empty `authentication` option in order to obtain details item data
        // from the picker, or when embedding the picker in an iframe.
        authentication: {},
        messaging: {
            origin: "http://localhost:3000",
            channelId: channelId
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
        console.log(accounts)
        if (!accounts && accounts.length === 0) {
            return null;
        }
        const request = {
            scopes: ["User.Read", "Files.ReadWrite"],
            account: accounts[0]
        };
        
        const _ = await instance.loginPopup(request);
        const authResult = await instance.acquireTokenSilent(request);

        return authResult.accessToken
    }

    let win = null;
    let port = null;

    async function launchPicker(e) {
        e.preventDefault();

        
        const authToken = await getToken();
        console.log(authToken)
        const queryString = new URLSearchParams({
            filePicker: JSON.stringify(options),
        });
        
        const win = window.open("", "Picker", "width=1080,height=680");
        const url = baseUrl + `/_layouts/15/FilePicker.aspx?${queryString}`;
        const form = win.document.createElement("form");

        form.setAttribute("action", url);
        form.setAttribute("method", "POST");
        const tokenInput = win.document.createElement("input");
        tokenInput.setAttribute("type", "hidden");
        tokenInput.setAttribute("name", "access_token");
        tokenInput.setAttribute("value", authToken);
        form.appendChild(tokenInput);

        win.document.body.append(form);
        form.submit();


        window.addEventListener("message", (event) => {
            // console.log(event.data);

            if (event.source && event.source === win) {
                const message = event.data;

                if (message.type === "initialize" && message.channelId === options.messaging.channelId) {
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
        const payload = message.data;
        
        switch (payload.type) {
            case "notification":
                const notification = payload.data;
                if (notification.notification === "page-loaded") {
                    // here we know that the picker page is loaded and ready for user interaction
                }
    
                console.log(message.data);
                break;
            case "command":
                port.postMessage({
                    type: "acknowledge",
                    id: message.data.id,
                });

                const command = payload.data;

                switch (command.command) {
                    case "authenticate":
                        // Get token!
                        try {
                            const token = await getToken();
                            if (!token) {
                                throw new Error("Unable to obtain a token.");
                            }
                            port.postMessage({
                                type: "result",
                                id: message.data.id,
                                data: {
                                    result: "token",
                                    token: token,
                                }
                            });
                        } catch (error) {
                            port.postMessage({
                                type: "result",
                                id: message.data.id,
                                data: {
                                    result: "error",
                                    error: {
                                        code: "unableToObtainToken",
                                        message: error.message
                                    }
                                }
                            });
                        }
        
                        break;

                    case "close":
                        win.close();
                        break;
                    
                    case "pick":
                        console.log(`Picking file: ${command.data}`);

                        try {
                            // await pick(command);
                            port.postMessage({
                                type: "result",
                                id: message.data.id,
                                data: {
                                    result: "success"
                                }
                            });
                        } catch (error) {
                            port.postMessage({
                                type: "result",
                                id: message.data.id,
                                data: {
                                    result: "error",
                                    error: {
                                        code: "unusableItem",
                                        message: error.message
                                    }
                                }
                            });
                        }
                        break;

                    default:
                        console.warn(`Unsupported command: ${JSON.stringify(command)}`, 2);

                        port.postMessage({
                            type: "result",
                            id: message.data.id,
                            data: {
                                result: "error",
                                error: {
                                    code: "unsupportedCommand",
                                    message: command.command
                                }
                            }
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