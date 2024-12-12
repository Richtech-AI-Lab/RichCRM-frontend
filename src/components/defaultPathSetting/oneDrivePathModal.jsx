import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { TextInput, XButton } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRequest } from "../../redux/actions/authActions";
import { Modal, Spinner, Table } from "flowbite-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useMsal } from "@azure/msal-react";
import { IMAGES } from "../../constants/imagePath";
import { format } from "date-fns";
import { IoMdLogIn } from "react-icons/io";
import { toast } from "react-toastify";

export const OneDrivePathModal = ({
  onClose,
  setUploadFolderUrlInput = () => {},
}) => {
  const { instance, accounts, inProgress } = useMsal();
  const [account, setAccount] = useState(instance.getActiveAccount());
  const [loader, setLoader] = useState(false);
  const [files, setFiles] = useState([]);
  const [path, setPath] = useState("/me/drive/root"); // Start at the root of OneDrive
  const [pathHistory, setPathHistory] = useState(["/me/drive/root"]); // Keep track of path history
  const width = ["40%", "15%", "10%", "25%", "5%"];

  const handleFolderClick = (folderId, folderName) => {
    // alert(folderId, folderName)
    const newPath = `/me/drive/items/${folderId}`;
    setPath(newPath);
    setPathHistory([...pathHistory, { name: folderName, path: newPath }]); // Update history with the new path
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
  const updateBreadcrumbPath = () => {
    if (pathHistory && pathHistory.length > 1 ) {
      const path = pathHistory
        .map((crumb) => crumb.name)
        .join("/")
        .replace(/^\/+/, ""); // Remove the first slash if it exists
      setUploadFolderUrlInput(path);
      onClose();
    }else{
        toast.error("Please select folder!")
    }

  };
  async function getToken() {
    if (!accounts || accounts.length === 0) {
      return null;
    }

    const request = {
      scopes: ["User.Read", "Files.ReadWrite"],
      account: account,
    };

    const authResult = await instance
      .acquireTokenSilent(request)
      .catch(() => instance.acquireTokenPopup(request));
    return authResult.accessToken;
  }

  async function fetchFiles(
    folderPath = "/me/drive/root",
    sortAttribute = "name",
    sortOrder = "asc"
  ) {
    setLoader(true);
    const authToken = await getToken();
    const response = await fetch(
      `https://graph.microsoft.com/v1.0${folderPath}/children?$orderby=${sortAttribute} ${sortOrder}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const data = await response.json();
    setFiles(data.value || []);
    setLoader(false);
  }
  const handleBackClick = () => {
    // Remove the last path from history
    const newHistory = [...pathHistory];
    newHistory.pop();

    const previousPath = newHistory[newHistory.length - 1] || "/me/drive/root";
    setPath(previousPath?.path ? previousPath?.path : previousPath); // Navigate back to the previous path
    setPathHistory(newHistory);
  };
  useEffect(() => {
    if (account) {
      fetchFiles(path); // Fetch files on path change
    }
  }, [account, path]);

  return (
    <>
      <Modal show={true} onClose={onClose} className="new-case-modal">
        <Modal.Header className="border-b-0">
          <div>
            <h2 className="mb-2 text-[28px] leading-9 font-medium text-secondary-800">
              Default Storage Path
            </h2>
            <p className="text-sm leading-5 text-secondary-700">
              By setting the default storage path for OneDrive, any new files
              you upload through the CRM platform will be automatically stored
              in the designated path.
            </p>
            <div className={"cursor-pointer mt-3"}>
              <span className="text-base font-medium text-secondary-800">
                OneDrive
              </span>
              {pathHistory.length > 1 && (
                <div
                  style={{
                    display: "flex",
                    flexShrink: "0",
                    opacity: 0.5,
                    marginRight: "10px",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={handleBackClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M14.25 9H3.75M3.75 9L9 14.25M3.75 9L9 3.75"
                        stroke="#1A1C1F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span style={{ color: "#1A1C1F", fontSize: "14px" }}>
                      Back
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="pt-0">
          {accounts.length > 0 ? (
            <>

            <div className="overflow-x-auto contacts-table h-[calc(100vh-400px)]">
              {!loader ? (
                <>
                  <Table>
                    {files?.length > 0 ? (
                      <Table.Body className="divide-y">
                        {files.map(
                          (file) =>
                            file.folder && (
                              <Table.Row
                                key={file.id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                              >
                                <Table.Cell
                                  onClick={() =>
                                    handleFolderClick(file.id, file.name)
                                  }
                                  width={width[0]}
                                  className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                                >
                                  <div className="flex items-center">
                                    <img
                                      src={IMAGES.folderIcon}
                                      alt="Folder"
                                      className="mr-3"
                                    />
                                    <span className="left-txt font-medium text-secondary-800">
                                      {file.name}
                                    </span>
                                  </div>
                                </Table.Cell>
                                <Table.Cell width={width[2]}>
                                  {file.folder.childCount} items
                                </Table.Cell>
                              </Table.Row>
                            )
                        )}
                      </Table.Body>
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
                      <div
                      className={
                        "bg-bg-gray-100 px-4 py-2 rounded-full cursor-pointer mt-2"
                      }
                    >
                      {pathHistory?.map((crumb, index) => (
                        <React.Fragment key={index}>
                          {index == 0 && <span>Path:</span>}
                          {index > 0 && <span>/</span>}
                          <span
                            className={`text-sm text-secondary-800 font-medium mr-1`}
                            key={index}
                          >
                            {crumb.name}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>
          
                    <div className="text-end mt-2">
                      <XButton
                        text={"Cancel"}
                        onClick={onClose}
                        className="bg-card-300 text-sm text-primary2 py-[10px] px-6 rounded-[100px]"
                      />
                      <XButton
                        text={"Select"}
                        onClick={() => updateBreadcrumbPath()}
                        className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px] ml-4"
                      />
                    </div>
                    </>
          ) : inProgress === "login" ? (
            <div className="bg-white p-4 rounded-2xl mb-5">
              <div className="flex flex-col items-center justify-center h-[calc(100vh-400px)] w-full">
                <p className="text-center text-gray-500">Please sign in!</p>
                <Spinner
                  size="xl"
                  animation="border"
                  role="status"
                  variant="primary"
                />
              </div>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-2xl mb-5">
              <div className="flex flex-col items-center justify-center h-[calc(100vh-400px)] w-full">
                <p className="text-center text-gray-500">No User Signed In!</p>
                <XButton
                  text="Login"
                  icon={<IoMdLogIn className="text-base mr-2 inline-block" />}
                  className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4"
                  onClick={login}
                />
              </div>
            </div>
          )}


        </Modal.Body>
      </Modal>
    </>
  );
};
