import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";

const OneDriveManager = () => {
    const { instance, accounts, inProgress } = useMsal();
    const [account, setAccount] = useState(instance.getActiveAccount());
    const [files, setFiles] = useState([]);
    const [path, setPath] = useState("/me/drive/root"); // Start at the root of OneDrive

    useEffect(() => {
        if (accounts.length > 0) {
            console.log("User is signed in!");
        } else {
            console.log("User is not signed in!");
        }
    }, [accounts]);

    async function getToken() {
        if (!accounts || accounts.length === 0) {
            return null;
        }

        const request = {
            scopes: ["User.Read", "Files.ReadWrite"],
            account: account,
        };

        const authResult = await instance.acquireTokenSilent(request).catch(() => instance.acquireTokenPopup(request));
        return authResult.accessToken;
    }

    async function fetchFiles(folderPath = "/me/drive/root") {
        const authToken = await getToken();
        const response = await fetch(`https://graph.microsoft.com/v1.0${folderPath}/children`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        const data = await response.json();
        setFiles(data.value || []);
    }

    useEffect(() => {
        if (account) {
            fetchFiles(path); // Fetch files on path change
        }
    }, [account, path]);

    const handleFolderClick = (folderId) => {
        setPath(`/me/drive/items/${folderId}`); // Set the new path to the folder
    };

    const handleBackClick = () => {
        const parentPath = path.substring(0, path.lastIndexOf('/')); // Navigate to the parent folder
        setPath(parentPath || "/me/drive/root");
    };

    const handleDownloadClick = async (fileId) => {
        const authToken = await getToken();
        const response = await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${fileId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        const data = await response.json();
        const downloadUrl = data["@microsoft.graph.downloadUrl"];
        window.open(downloadUrl, "_blank"); // Open the file in a new tab
    };

    async function login(e) {
        e.preventDefault();
        const loginRequest = {
            scopes: ["User.ReadWrite"],
        };

        instance
            .loginPopup(loginRequest)
            .then((loginResponse) => {
                instance.setActiveAccount(loginResponse.account);
                setAccount(loginResponse.account);
                console.log("User signed in!");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function logout(e) {
        e.preventDefault();
        instance
            .logoutPopup()
            .then(() => {
                setAccount(null);
                console.log("User signed out!");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    if (accounts.length > 0) {
        return (
            <div>
                <p>Current user: {account.username}</p>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={logout}
                >
                    Logout
                </button>
                
                <h3>OneDrive File Manager</h3>
                
                {/* Back Button */}
                {path !== "/me/drive/root" && (
                    <button
                        onClick={handleBackClick}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Back to Parent Folder
                    </button>
                )}

                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {files.map((file) => (
                        <div
                            key={file.id}
                            style={{
                                width: "150px",
                                padding: "10px",
                                margin: "10px",
                                border: "1px solid #ccc",
                                textAlign: "center",
                                cursor: "pointer",
                            }}
                        >
                            {file.folder ? (
                                // Folder Icon and Clickable
                                <div onClick={() => handleFolderClick(file.id)}>
                                    <img
                                        src="https://img.icons8.com/color/96/000000/folder-invoices.png"
                                        alt="folder"
                                        style={{ width: "64px", height: "64px" }}
                                    />
                                    <p>{file.name}</p>
                                </div>
                            ) : (
                                // File Icon and Download
                                <div>
                                    <img
                                        src={file.thumbnail ? file.thumbnail : "https://img.icons8.com/color/96/000000/file.png"}
                                        alt="file"
                                        style={{ width: "64px", height: "64px" }}
                                    />
                                    <p>{file.name}</p>
                                    <button
                                        onClick={() => handleDownloadClick(file.id)}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                                    >
                                        Download
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    } else if (inProgress === "login") {
        return <p>Login is currently in progress!</p>;
    } else {
        return (
            <>
                <p>No users signed in!</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={login}>
                    Login
                </button>
            </>
        );
    }
};

export default OneDriveManager;
