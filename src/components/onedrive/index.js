// import React, {useEffect, useState} from "react";
// import { useMsal, useAccount } from "@azure/msal-react";

// const OneDrive = (props) => {
//     const { instance, accounts, inProgress } = useMsal();
//     const account = useAccount(accounts[0] || {});
//     const [apiData, setApiData] = useState(null);
//     const baseUrl = "https://onedrive.live.com/picker";
    

//     const params = {
//         sdk: "8.0",
//         entry: {
//             oneDrive: {}
//         },
//         authentication: {},
//         messaging: {
//             origin: "http://localhost:3000",
//             channelId: "27"
//         },
//         typesAndSources: {
//             mode: "multiple",
//             pivots: {
//                 oneDrive: true,
//                 recent: true,
//             },
//         },
//     };

//     useEffect(() => {

//         if (accounts.length > 0) {
//             console.log("User is signed in!");
//         } else {
//             console.log("User is not signed in!");
//         }
//     }, [accounts]);
    
//     async function getToken() {
//         if (!accounts && accounts.length === 0) {
//             return null;
//         }
//         const request = {
//             scopes: ["User.Read", "Files.ReadWrite"],
//             account: accounts[0]
//         };
    
//         const authResult = await instance.acquireTokenSilent(request);

//         return authResult.accessToken
//     }

//     let win = null;
//     let port = null;

//     async function launchPicker(e) {
//         e.preventDefault();

        
//         const authToken = await getToken();
//         console.log(authToken)
//         const queryString = new URLSearchParams({
//             filePicker: JSON.stringify(params),
//         });
        
//         const url = `${baseUrl}?${queryString}`;
//         win = window.open(`${baseUrl}?${queryString}`, "Picker", "width=800,height=600");
        
//         // const form = win.document.createElement("form");
//         // form.setAttribute("action", url);
//         // form.setAttribute("method", "POST");
//         // win.document.body.append(form);

//         // const input = win.document.createElement("input");
//         // input.setAttribute("type", "hidden");
//         // input.setAttribute("name", "access_token");
//         // input.setAttribute("value", authToken);
//         // form.appendChild(input);

//         // form.submit();

//         window.addEventListener("message", (event) => {
//             // console.log(event.data);

//             if (event.source && event.source === win) {
//                 const message = event.data;

//                 if (message.type === "initialize" && message.channelId === params.messaging.channelId) {
//                     port = event.ports[0];

//                     port.addEventListener("message", messageListener);

//                     port.start();

//                     port.postMessage({
//                         type: "activate",
//                     });
//                 }
//             }
//         });
//     }

//     async function messageListener(message) {
        
//         switch (message.data.type) {
//             case "notification":
//                 console.log(message.data);
//                 // console.log(`notification: ${message.data}`);
//                 break;
//             case "command":
//                 port.postMessage({
//                     type: "acknowledge",
//                     id: message.data.id,
//                 });

//                 const command = message.data.data;

//                 switch (command.command) {
//                     case "authenticate":
//                         // Get token!
//                         const token = await getToken();

//                         if (typeof token !== "undefined" && token !== null) {
//                             port.postMessage({
//                                 type: "result",
//                                 id: message.data.id,
//                                 data: {
//                                     result: token,
//                                     token,
//                                 },
//                             });
//                         } else {
//                             console.error(`Could not get auth token for command: ${JSON.stringify(command)}`);
//                         }

//                         break;

//                     case "close":
//                         win.close();
//                         break;
                    
//                     case "pick":
//                         console.log(`Picking file: ${command.data}`);

//                         port.postMessage({
//                             type: "result",
//                             id: message.data.id,
//                             data: {
//                                 result: "success",
//                             },
//                         });

//                         win.close();
//                         break;

//                     default:
//                         console.warn(`Unsupported command: ${JSON.stringify(command)}`, 2);

//                         port.postMessage({
//                             type: "error",
//                             error: {
//                                 code: "unsupportedCommand",
//                                 message: command.command,
//                             },
//                             isExpected: true,
//                         });
//                         break;
//                 }

//                 break;
//         }
//     }

//     if (accounts.length > 0) {
//         return (
//             <div>
//                 <p>There are currently {accounts.length} users signed in!</p>
//                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={launchPicker}>Open File Picker</button>
//             </div>
//         );
        
//     } else if (inProgress === "login") {
//         return <p>Login is currently in progress!</p>
//     } else {
//         return (
//             <>
//                 <p>There are currently no users signed in!</p>
//                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => instance.loginPopup()}>Login</button>
//             </>
//         );
//     }
// };

// export default OneDrive;
import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react'; // Get MSAL instance in this component too

const OneDrivePicker = ({ onClose }) => {
  const { instance } = useMsal(); // Use MSAL instance
  const [files, setFiles] = useState([]);

  const getToken = async () => {
    const activeAccount = instance.getActiveAccount();

    if (!activeAccount) {
      console.error("No active account! Please log in.");
      return null;
    }

    const request = {
      scopes: ['User.Read', 'Files.ReadWrite'],
      account: activeAccount, // Use the active account
    };

    try {
      const authResult = await instance.acquireTokenSilent(request);
      return authResult.accessToken;
    } catch (error) {
      if (error.errorCode === 'interaction_required') {
        const authResult = await instance.acquireTokenPopup(request);
        return authResult.accessToken;
      }
      throw error;
    }
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = await getToken(); // Get the access token
        if (!token) return;

        const response = await fetch('https://graph.microsoft.com/v1.0/me/drive/root/children', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setFiles(data.value); // Assuming data.value contains the list of files
      } catch (error) {
        console.error('Error fetching OneDrive files:', error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="overlay">
      <div className="modal">
        <button onClick={onClose}>Close</button>
        <div style={{ width: '100%', height: '500px', overflow: 'auto' }}>
          {files.length > 0 ? (
            <ul>
              {files.map((file) => (
                <li key={file.id}>
                  {file.name} ({file.size} bytes)
                </li>
              ))}
            </ul>
          ) : (
            <p>No files found or loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneDrivePicker;
