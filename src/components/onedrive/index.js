import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { Button, Modal, Spinner, Table } from "flowbite-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ContactTabs from "../actionbar/contactTabs";
// import { FiPlus } from "react-icons/fi";
import { IoArrowBackCircle } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import XButton from "../button/XButton";
import { addFromContactV1Tab, formatFileSize } from "../../constants/constants";
import { SlArrowRight } from "react-icons/sl";
import { IoCloudDownload } from "react-icons/io5";
import { toast } from "react-toastify";
import TextInput from "../TextInput";
import MenuPopup from "../menupopup";
import DeleteModal from "../deleteModal";
import { IMAGES } from "../../constants/imagePath";
import { format } from "date-fns";
import { FiPlus } from "react-icons/fi";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import OneDriveSearch from "./search";

const OneDriveManager = () => {
    const { instance, accounts, inProgress } = useMsal();
    const [account, setAccount] = useState(instance.getActiveAccount());
    const [files, setFiles] = useState([]);
    const [path, setPath] = useState("/me/drive/root"); // Start at the root of OneDrive
    const [pathHistory, setPathHistory] = useState(["/me/drive/root"]); // Keep track of path history
    const [loader, setLoader] = useState(false); // Keep track of path history
    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [currentField, setCurrentFileId] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const [sortAttribute, setSortAttribute] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const menuOption = [
        { id: 0, label: "Download" },
        { id: 1, label: "Delete" },
    ];

    const handleCloseCreateModal = () => {
        setShowCreateFolderModal(false);
        setNewFolderName("");
    };

    const handleDelete = async (fileId) => {
        if (fileId) {
            await handleDeleteClick(fileId);
            setShowDeletePopup(false);
        }
    };

    const handleSortChange = (attribute, order) => {
        setSortAttribute(attribute);
        setSortOrder(order);
        fetchFiles(path, attribute, order);
    };
    const handleOptionSubmit = (fileId, label, item) => {
        if (label == 0) {
            handleDownloadClick(fileId);
        } else if (label == 1) {
            // just set id and open modal
            setCurrentFileId(fileId);
            setShowDeletePopup(true)
        } else {

        }
    };

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

    async function fetchFiles(folderPath = "/me/drive/root", sortAttribute = "name", sortOrder = "asc") {
        setLoader(true)
        const authToken = await getToken();
        const response = await fetch(`https://graph.microsoft.com/v1.0${folderPath}/children?$orderby=${sortAttribute} ${sortOrder}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        const data = await response.json();
        setFiles(data.value || []);
        setLoader(false)
    }

    const handleDeleteClick = async (itemId) => {
        const authToken = await getToken();
        await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${itemId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        // Refresh the list after deletion
        fetchFiles(path);
    };

    useEffect(() => {
        if (account) {
            fetchFiles(path, sortAttribute, sortOrder); // Fetch files on path change
        }
    }, [account, path, sortAttribute, sortOrder]);

    const handleFolderClick = (folderId, folderName) => {
        // alert(folderId, folderName)
        const newPath = `/me/drive/items/${folderId}`;
        setPath(newPath);
        setPathHistory([...pathHistory, { name: folderName, path: newPath }]); // Update history with the new path
    };

    const handleBackClick = () => {
        // Remove the last path from history
        const newHistory = [...pathHistory];
        newHistory.pop();

        const previousPath = newHistory[newHistory.length - 1] || "/me/drive/root";
        setPath(previousPath?.path ? previousPath?.path : previousPath); // Navigate back to the previous path
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

    const handleCreateFolder = async () => {
        if (!newFolderName) return;

        const token = await getToken();

        try {
            const createFolderUrl = `https://graph.microsoft.com/v1.0${path}/children`;

            const response = await fetch(createFolderUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: newFolderName,
                    folder: {},
                    "@microsoft.graph.conflictBehavior": "fail" // Set conflict behavior to 'fail' to catch conflict errors
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 409) {
                    // Show error if the folder name conflicts
                    toast.error("A folder with the same name already exists!");
                    // alert("A folder with the same name already exists!");
                } else {
                    toast.error(`Error creating folder: ${errorData.error.message}`)
                    // alert(`Error creating folder: ${errorData.error.message}`);
                }
                return;
            }

            handleCloseCreateModal()
            fetchFiles(path); // Refresh the file list
        } catch (error) {
            alert(`Failed to create folder: ${error.message}`);
        }
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
    const openFilePreview = async (fileId) => {
        const authToken = await getToken();
        try {
            const response = await fetch(
                `https://graph.microsoft.com/v1.0/me/drive/items/${fileId}/preview`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                const previewUrl = data.getUrl; // The URL to preview the file

                if (previewUrl) {
                    window.open(previewUrl, "_blank"); // Open the preview URL in a new tab
                } else {
                    alert("Unable to retrieve file preview URL.");
                }
            } else {
                console.error("Error fetching preview URL:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }

    };

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
    const header = ["Name", "Last Modified", "Size", "Kind", ""];
    const width = ["40%", "15%", "10%", "25%", "5%"];

    if (accounts.length > 0) {
        return (
            <div>
                <div className="flex items-center mb-2">
                {pathHistory.length > 1 && (
                            <div
                                style={{
                                    display: "flex",
                                    flexShrink: "0",
                                    opacity: 0.5,
                                    marginRight: '10px'
                                }}

                            >
                                <span style={{ display: "flex", gap: "8px", alignItems: "center", cursor: "pointer" }} onClick={handleBackClick}>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path
                                            d="M14.25 9H3.75M3.75 9L9 14.25M3.75 9L9 3.75"
                                            stroke="#1A1C1F"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span style={{ color: "#1A1C1F", fontSize: "14px" }}>Back</span>
                                </span>
                            </div>
                        )}
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


                <div className="flex justify-between items-center mb-2">
                    <div className="flex justify-between items-center">

                        {<div className="flex justify-between items-center">
                        </div>}
                        <div className="flex items-center">
                            <div className="relative mb-2">
                                <input
                                    className="text-base text-secondary-700 font-normal leading-6 bg-bg-gray-100 py-2 px-6 rounded-[28px] w-[360px]"
                                    placeholder="Search case, contact or address"
                                // value={searchValue}
                                // onChange={handleInputChange}
                                />
                                <img
                                    src={IMAGES.searchIcon}
                                    alt="icon"
                                    className="absolute right-5 top-[10px]"
                                />
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-between items-center">
                        <XButton
                            text="New Folder"
                            icon={<FiPlus className="text-base mr-2 inline-block" />}
                            className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4"
                            onClick={() => setShowCreateFolderModal(true)}
                        />
                        <XButton
                            text="Logout"
                            icon={<IoMdLogOut className="text-base mr-2 inline-block" />}
                            className="bg-red-500 hover:bg-red-700 shadow-shadow-light text-sm text-white py-[10px] px-6 rounded-[100px] font-medium ml-4"
                            onClick={logout}
                        // onClick={toggleModal}
                        />
                    </div>
                </div>
                {/* <OneDriveSearch getToken={() => getToken()} /> */}

                <div className={`mb-2 contacts-table`}>
                    <Table>
                        <Table.Head>
                            {header.map((key, index) => (
                                <Table.HeadCell width={width[index]} key={index}>
                                    <div className="flex items-center justify-start">
                                        <span>{key}</span>
                                        {index === 0 && !loader && (
                                            <div className="cursor-pointer ml-2" onClick={() => handleSortChange("name", sortOrder === "desc" ? "asc" : "desc")}>
                                                {sortOrder === "desc" ? <FaArrowDown /> : <FaArrowUp />}
                                            </div>
                                        )}
                                    </div>
                                </Table.HeadCell>
                            ))}
                        </Table.Head>
                    </Table>
                </div>
                <div className='overflow-x-auto contacts-table h-[calc(100vh-280px)]'>
                    {!loader ? (
                        <>
                            <Table>
                                {console.log(files, "files")}
                                {files?.length > 0 ? (
                                    <>
                                        <Table.Body className="divide-y">
                                            {files?.map((file) => (
                                                file.folder ?
                                                    <Table.Row key={file.id} className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                                                    >
                                                        <Table.Cell
                                                            onClick={() => handleFolderClick(file.id, file.name)}
                                                            width={width[0]}
                                                            className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                            <div className="flex items-center">
                                                                <img src={IMAGES.folderIcon} alt="Profile" className="mr-3 " />
                                                                <span className="left-txt font-medium text-secondary-800">
                                                                    {/* {user.firstName} {user.lastName} */}{file.name}
                                                                </span>
                                                            </div>
                                                        </Table.Cell>
                                                        <Table.Cell width={width[1]}>{format(file?.createdDateTime, 'MMM dd, yyyy hh:mm')}</Table.Cell>
                                                        <Table.Cell width={width[2]}>{file?.folder?.childCount} items</Table.Cell>
                                                        <Table.Cell width={width[3]}>Folder</Table.Cell>
                                                        <Table.Cell width={width[4]}>
                                                            <div className="ml-auto">
                                                                <MenuPopup
                                                                    handleOptionSubmit={(label) => handleOptionSubmit(file.id, label)}
                                                                    dropdownItems={menuOption.map((option) => option.label)}
                                                                    icon={<BsThreeDotsVertical className="text-secondary-800 opacity-40" />}
                                                                />
                                                            </div></Table.Cell>
                                                    </Table.Row>
                                                    :
                                                    <Table.Row key={file.id} className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                                                    >
                                                        {console.log(file, "fffff")}
                                                        <Table.Cell
                                                            onClick={() => openFilePreview(file.id)}
                                                            width={width[0]}
                                                            className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                            <div className="flex items-center">
                                                                <img src={IMAGES.fileIcon} alt="Profile" className="mr-3" />
                                                                <span className="left-txt font-medium text-secondary-800">
                                                                    {/* {user.firstName} {user.lastName} */}{file.name}
                                                                </span>
                                                            </div>
                                                        </Table.Cell>
                                                        <Table.Cell
                                                            width={width[1]}
                                                        >{format(file?.createdDateTime, 'MMM dd, yyyy hh:mm')}</Table.Cell>
                                                        <Table.Cell width={width[2]}>{formatFileSize(file?.size)}</Table.Cell>
                                                        <Table.Cell width={width[3]}>File</Table.Cell>
                                                        <Table.Cell width={width[4]}>                                                <div className="ml-auto">
                                                            <MenuPopup
                                                                handleOptionSubmit={(label) => handleOptionSubmit(file.id, label)}
                                                                dropdownItems={menuOption?.map((option) => option.label)}
                                                                icon={<BsThreeDotsVertical className="text-secondary-800 opacity-40" />}
                                                            />
                                                        </div></Table.Cell>
                                                    </Table.Row>

                                            ))}
                                        </Table.Body>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-[60vh] w-full">
                                        <p className="text-center text-gray-500">
                                            No files exist!
                                        </p>
                                    </div>
                                )}
                            </Table>
                        </>
                    ) : (
                        <div className="flex justify-center items-center">
                            <Spinner
                                size="xl"
                                animation="border"
                                role="status"
                                variant="primary"
                                className="spinner-5"
                            />
                        </div>
                    )}
                </div>


                <Modal show={showCreateFolderModal} onClose={() => handleCloseCreateModal()} className="new-case-modal">
                    <Modal.Header className="border-b-0">
                        <div>
                            <h2 className="mb-2 text-[28px] leading-9 font-medium text-secondary-800">
                                Create Folder
                            </h2>
                            {/* <p className="text-sm leading-5 text-secondary-700">
                                    Enter folder name
                                </p> */}
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="block">
                            <div className="grid grid-col">
                                <div className="block">
                                    <TextInput
                                        name="folderName"
                                        type="text"
                                        placeholder="Enter folder name"
                                        value={newFolderName}
                                        onChange={(e) => setNewFolderName(e.target.value)}
                                    />
                                    {/* <ErrorMessage
                                            name={`caseName`}
                                            component="div"
                                            className="text-red-500 text-sm"
                                        /> */}
                                </div>
                            </div>
                            <div className="text-end mt-8">
                                <XButton
                                    text={"Cancel"}
                                    onClick={() => handleCloseCreateModal()}
                                    className="bg-card-300 text-sm text-primary2 py-[10px] px-6 rounded-[100px]"
                                />
                                <XButton
                                    text={"Create"}
                                    onClick={() => handleCreateFolder()}
                                    className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px] ml-4"
                                />
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <DeleteModal
                    isOpen={showDeletePopup}
                    onConfirm={() => handleDelete(currentField)}
                    onCancel={() => setShowDeletePopup(false)}
                    title="Confirm Deletion"
                    message="Are you sure you want to delete this item? This action cannot be undone."
                    confirmText="Delete"
                    cancelText="Cancel"
                />
                {/* </div> */}
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
