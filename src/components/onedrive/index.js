import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { Spinner } from "flowbite-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ContactTabs from "../actionbar/contactTabs";
// import { FiPlus } from "react-icons/fi";
import { IoArrowBackCircle } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import XButton from "../button/XButton";
import { addFromContactV1Tab } from "../../constants/constants";
import { SlArrowRight } from "react-icons/sl";
import { IoCloudDownload } from "react-icons/io5";

const OneDriveManager = () => {
    const { instance, accounts, inProgress } = useMsal();
    const [account, setAccount] = useState(instance.getActiveAccount());
    const [files, setFiles] = useState([]);
    const [path, setPath] = useState("/me/drive/root"); // Start at the root of OneDrive
    const [pathHistory, setPathHistory] = useState(["/me/drive/root"]); // Keep track of path history
    const [loader, setLoader] = useState(false); // Keep track of path history

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
        setLoader(true)
        const authToken = await getToken();
        const response = await fetch(`https://graph.microsoft.com/v1.0${folderPath}/children`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        const data = await response.json();
        setFiles(data.value || []);
        setLoader(false)
    }

    useEffect(() => {
        if (account) {
            fetchFiles(path); // Fetch files on path change
        }
    }, [account, path]);

    const handleFolderClick = (folderId, folderName) => {
        const newPath = `/me/drive/items/${folderId}`;
        setPath(newPath);
        setPathHistory([...pathHistory, { name: folderName, path: newPath }]); // Update history with the new path
    };

    const handleBackClick = () => {
        // Remove the last path from history
        const newHistory = [...pathHistory];
        newHistory.pop();

        const previousPath = newHistory[newHistory.length - 1] || "/me/drive/root";
        setPath(previousPath); // Navigate back to the previous path
        setPathHistory(newHistory);
    };

    const tabs = [
        { id: addFromContactV1Tab.individuals, label: "OneDrive" },
        // { id: addFromContactV1Tab.organizations, label: "Organizations" },
    ];
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
                <div className="bg-white p-4 rounded-2xl mb-2 min-h-[calc(100vh-180px)]">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex justify-between items-center">

                            {<div className="flex justify-between items-center">
                                {pathHistory.length > 1 && (
                                    <XButton
                                        // text="Back"
                                        icon={<IoArrowBackCircle style={{ height: '40px', width: '40px' }} className="text-base inline-block" />}
                                        className="bg-bg-gray-100 hover:bg-gray-700 text-secondary shadow-shadow-light  rounded-full cursor-pointer"
                                        onClick={handleBackClick}
                                    // onClick={toggleModal}
                                    />
                                )}
                                {/* <span className="text-base text-secondary-800 font-medium">{"Onedrive"}</span>
                        <div className="flex items-center gap-2">
                            <BsThreeDotsVertical className="text-lg opacity-40" />
                        </div> */}
                            </div>}
                            <div className={"bg-bg-gray-100 px-4 py-2 rounded-full cursor-pointer"}>
                                <span className="text-base font-medium text-secondary-800">
                                    OneDrive
                                </span>
                            </div>
                            {pathHistory?.map((crumb, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && <span><SlArrowRight className="inline mr-2" /></span>}
                                    <span className={`text-xl text-secondary-800 font-medium mr-5`} key={index} onClick={() => handleBackClick(index)} style={{ cursor: "pointer" }}>
                                        {crumb.name}
                                    </span>
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="flex justify-between items-center">
                            <XButton
                                text="Logout"
                                icon={<IoMdLogOut className="text-base mr-2 inline-block" />}
                                className="bg-red-500 hover:bg-red-700 shadow-shadow-light text-sm text-white py-[10px] px-6 rounded-[100px] font-medium ml-4"
                                onClick={logout}
                            // onClick={toggleModal}
                            />
                        </div>
                    </div>


                    {!loader ? <>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            {files.map((file) => (
                            <div
                            className="m-5 flex flex-col justify-between h-full hover:bg-badge-gray cursor-pointer min-h-[calc(10vh)]"
                            key={file.id}
                          >
                            {file.folder ? (
                              // Folder Icon and Clickable
                              <div
                                onClick={() => handleFolderClick(file.id, file.name)}
                                style={{ cursor: "pointer" }}
                                className="flex flex-col items-center"
                              >
                                <img
                                  src="https://img.icons8.com/color/96/000000/folder-invoices.png"
                                  alt="folder"
                                  style={{ width: "64px", height: "64px" }}
                                />
                                <p className="mt-2 text-center">{file.name}</p>
                              </div>
                            ) : (
                              <>
                                <div className="w-full h-full relative flex flex-col items-center justify-center">
                                  <img
                                    src={file.thumbnail ? file.thumbnail : "https://img.icons8.com/color/96/000000/file.png"}
                                    alt="file"
                                    style={{ width: "64px", height: "64px" }}
                                  />
                                  <p className="mt-2 text-center">{file.name}</p>
                                  <IoCloudDownload
                                    onClick={() => handleDownloadClick(file.id)}
                                    className="absolute top-0 right-0 m-2"
                                    style={{ color: "green", fontSize: "24px" }} // Color and size adjustments
                                  />
                                </div>
                              </>
                            )}
                          </div>
                          
                            ))}
                        </div>
                        {
                            files?.length == 0 ?
                                <>
                                    <div className="bg-white p-4 rounded-2xl mb-5">
                                        <div className="flex flex-col items-center justify-center h-[60vh] w-full">
                                            <p className="text-center text-gray-500">
                                                No files exist!
                                            </p>
                                        </div>
                                    </div>
                                </>
                                : ""
                        }
                    </> :
                        <div className="flex justify-center items-center">
                            <Spinner
                                size="xl"
                                animation="border"
                                role="status"
                                variant="primary"
                                className={`spinner-5`}
                            />
                        </div>}
                </div>
            </div>
        );
    } else if (inProgress === "login") {
        return (
            <>
                <div className="bg-white p-4 rounded-2xl mb-5">
                    <div className="flex flex-col items-center justify-center h-[60vh] w-full">
                        <p className="text-center text-gray-500">
                            Please sign in !
                        </p>

                        <Spinner
                            size="xl"
                            animation="border"
                            role="status"
                            variant="primary"
                        // className={`spinner-5`}
                        />
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="bg-white p-4 rounded-2xl mb-5">
                    <div className="flex flex-col items-center justify-center h-[60vh] w-full">
                        <p className="text-center text-gray-500">
                            No User Signed In !
                        </p>
                        <XButton
                            text="Login"
                            icon={<IoMdLogIn className="text-base mr-2 inline-block" />}
                            className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4"
                            onClick={login}
                        />


                    </div>
                </div>
            </>
        );
    }
};

export default OneDriveManager;
