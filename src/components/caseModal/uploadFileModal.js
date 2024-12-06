/* global OneDrive */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Field, Formik } from "formik";
import { Modal } from "flowbite-react";
import XButton from "../button/XButton";
import { FiUpload } from "react-icons/fi";
import NewCaseDropdown from "../newcasedropdown";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import { useMsal } from "@azure/msal-react";
import XSpinnerLoader from "../spinnerLoader/XSpinnerLoader";
import { DataStoreContext } from "../../pages/settings/form/dataStoreContext";
import { useSelector } from "react-redux";

const ROOT_FOLDER_PATH = "https://graph.microsoft.com/v1.0/drive/root";
const fileTypeOptions = [
  { value: "Engineer Inspection", label: "Engineer Inspection" },
  { value: "Termites Inspection", label: "Termites Inspection" },
  { value: "Initial contract", label: "Initial Contract" },
  { value: "Initial signed contract", label: "Initial Signed Contract" },
  { value: "Deposit", label: "Deposit" },
  { value: "Fully signed contract", label: "Fully Signed Contract" },
  { value: "Commitment letter", label: "Commitment Letter" },
  { value: "Bank CTC", label: "Bank CTC" },
  { value: "Title report", label: "Title Report" },
  { value: "All cleared title", label: "All Cleared Title" },
  { value: "All closing files", label: "All closing files" },
  { value: "Closing File 1", label: "Closing File 1" },
  { value: "Closing File 2", label: "Closing File 2" },
  { value: "Closing File 3", label: "Closing File 3" }
];

const UploadFileModal = ({ onClose, fileName = "", generalUpload, taskName = "", onUpload = () => { } }) => {
  // console.log(fileName, "+===", fileName.split('-').slice(0, 2).join('-'))
  const { instance, accounts, inProgress } = useMsal();
  const [account, setAccount] = useState(instance.getActiveAccount());
  const [loader, setLoader] = useState(false)
  const [path, setPath] = useState("/me/drive/root");
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { data } = useSelector((state) => state.auth.user)
  const initialValues = {};


  useEffect(() => {
    if (accounts.length > 0) {
      console.log("User is signed in!");
    } else {
      console.log("User is not signed in!");
    }
  }, [accounts]);

  async function login(e) {
    // e.preventDefault();
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

  // function getWordAfterSlash(inputString) {
  //   let parts = inputString.split('/');
  //   if (parts.length > 1) {
  //     return parts[1]; // return the word after '/'
  //   }
  //   return inputString; // return an empty string if no '/' is found
  // }
  const checkAndUploadFileToRoot = async (folderName, file, customFileName) => {
    // console.log("==>>folder",folderName)
    // console.log("==>>file",file)
    // console.log("==>>custom",customFileName)
    if (!file || !folderName || !customFileName) return false;

    const token = await getToken();
    const encodedFolderPath = encodeURIComponent(folderName);
    const encodedFilePath = encodeURIComponent(customFileName);
    let folderUrl;
    let uploadUrl;
    if (data[0]?.uploadFolderName) {
      folderUrl = `${ROOT_FOLDER_PATH}:/${data[0]?.uploadFolderName}/${encodedFolderPath}:`;
      uploadUrl = `${ROOT_FOLDER_PATH}:/${data[0]?.uploadFolderName}/${encodedFolderPath}/${encodedFilePath}:/content?@microsoft.graph.conflictBehavior=rename`;
    } else {
      folderUrl = `${ROOT_FOLDER_PATH}:/${encodedFolderPath}:`;
      uploadUrl = `${ROOT_FOLDER_PATH}:/${encodedFolderPath}/${encodedFilePath}:/content?@microsoft.graph.conflictBehavior=rename`;
    }

    // console.log("==>>furl",folderUrl)
    // console.log("==>>Uurl",uploadUrl)

    // console.log(token)

    try {
      // Check if the folder exists
      const folderResponse = await fetch(folderUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("folderResponse",folderResponse)
      // If folder doesn't exist, create the folder
      if (!folderResponse.ok) {
        let createFolderUrl;
        if (data[0]?.uploadFolderName) {
          createFolderUrl = `${ROOT_FOLDER_PATH}:/${data[0]?.uploadFolderName}:/children`;
        } else {
          createFolderUrl = `${ROOT_FOLDER_PATH}/children`;
        }
        const createResponse = await fetch(createFolderUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: folderName,
            folder: {},
            "@microsoft.graph.conflictBehavior": "fail",
          }),
        });

        if (!createResponse.ok) {
          const errorData = await createResponse.json();
          toast.error(`Error creating folder: ${errorData.error.message}`);
          return false;
        }
      }

      // Upload the file, with conflictBehavior set to "rename" to avoid overwriting
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": file.type,
        },
        body: file,
      });

      if (uploadResponse.ok) {
        toast.success("File uploaded successfully!");
        return true;
      } else {
        const errorData = await uploadResponse.json();
        toast.error(`Error uploading file: ${errorData.error.message}`);
        return false;
      }

    } catch (error) {
      console.error("Error in folder check or file upload:", error);
      toast.error(`Failed to upload file: ${error.message}`);
      return false;
    }
  };

  const handleDragOver = (event) => {
    // console.log("Dragging over...");
    event.preventDefault(); // Allow the drop
    event.dataTransfer.dropEffect = "copy"; // Show a copy cursor
  };
  
  // const handleFileDrop = (event) => {
  //   console.log("File dropped");
  //   event.preventDefault();
  
  //   const dataTransfer = event.dataTransfer;
  
  //   if (dataTransfer.files && dataTransfer.files.length > 0) {
  //     const droppedFiles = Array.from(dataTransfer.files).map((file) => ({
  //       file,
  //       fileType: "",
  //     }));
  //     setUploadedFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  //     console.log("Dropped files:", droppedFiles);
  //   } else {
  //     const link = dataTransfer.getData("text/uri-list") || dataTransfer.getData("text/plain");
  //     if (link) {
  //       console.log("Dropped link:", link);
  //       toast.info("Link uploads are not supported. Please drop files only.");
  //     }
  //   }
  // };
const handleFileDrop = async (event) => {
  // console.log("File dropped");
  event.preventDefault();

  const dataTransfer = event.dataTransfer;

  if (dataTransfer.files && dataTransfer.files.length > 0) {
    // Handle dropped files
    const droppedFiles = Array.from(dataTransfer.files).map((file) => ({
      file,
      fileType: "",
    }));
    setUploadedFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    // console.log("Dropped files:", droppedFiles);
  } else {
    // Handle dropped links (resource URL)
    const link = dataTransfer.getData("text/uri-list") || dataTransfer.getData("text/plain");
    if (link) {
      // console.log("Dropped link:", link);
      // handleLinkFetch(link);
      window.open(link, "_blank");

      try {
        // Fetch the file from the link
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to fetch the file. Status: ${response.status}`);
        }

        const blob = await response.blob();
        const fileType = getFileTypeFromMimeType(blob.type); // Extract file type from MIME type
        const fileName = link.split("/").pop() || "downloaded_file";

        // Create a File object
        const downloadedFile = new File([blob], fileName, {
          type: blob.type,
        });

        // Add the downloaded file to the uploaded files list
        setUploadedFiles((prevFiles) => [
          ...prevFiles,
          { file: downloadedFile, fileType },
        ]);
        // console.log("Downloaded and added file:", downloadedFile);

        // Call your upload file functionality here
        // console.log(downloadedFile, "-----");

        // Optionally, you can trigger any upload function here
        // For example: handleUploadFile(downloadedFile);

      } catch (error) {
        // console.error("Error downloading the file:", error);
        toast.error("Failed to download the file from the link.");
      }
    } else {
      toast.info("Link uploads are not supported. Please drop files only.");
    }
  }
};

  const handleLinkFetch = (link) => {
    const a = document.createElement("a");
    a.href = link;
    a.download = link.split("/").pop(); // Set the filename from the URL
    a.click();
    // console.log("Downloading file:", link);
  };
  function getFileTypeFromMimeType(mimeType) {
    let parts = mimeType.split('/');
    return parts.length > 1 ? parts[1] : ''; // Return the file type after '/' or an empty string
  }
  const handleUploadFile = async (event) => {
    setLoader(true)
    const file = uploadedFiles[0].file;
    const folderName = `${fileName.split('-').slice(0, 2).join('-')}-${localStorage.getItem("c_id").split('-')[0]}`;
    const filetype = getFileTypeFromMimeType(file?.type);
    const originalFileName = file?.name?.split('.')[0];
    let finalFileName;
    if (generalUpload) {
      finalFileName = `${fileName}-${uploadedFiles[0].fileType}`;
    } else {
      finalFileName = fileName;
    }
    const customFileName = `${finalFileName}.${filetype}`;
    const uploadStatus = await checkAndUploadFileToRoot(folderName, file, customFileName);
    if (uploadStatus) {
      onClose()
      onUpload(2)
    }
    setLoader(false)
  };

  const handleLoginAndUpload = async (event) => {
    if (!account) {
      await login();
      setAccount(instance.getActiveAccount());
    }
    if (instance.getActiveAccount()) {
      handleUploadFile(event);
    } else {
      toast.info("Please login and then try to upload.");
    }
  };
  const handleBrowseFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files) {
      const filesWithDropdownValues = files.map((file) => ({
        file,
        fileType: "",
      }));
      setUploadedFiles((prevFiles) => [
        ...prevFiles,
        ...filesWithDropdownValues,
      ]);
    }
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((_, fileIndex) => fileIndex !== index)
    );
  };

  const handleDropdownChange = (index, selectedFileType) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.map((fileItem, fileIndex) =>
        fileIndex === index
          ? { ...fileItem, fileType: selectedFileType }
          : fileItem
      )
    );
  };

  // console.log(uploadedFiles, "_____")
  return (
    <>
      <XSpinnerLoader loading={loader} size="lg" />
      <Modal show={true} onClose={onClose} className="new-case-modal">
        <Modal.Header className="border-b-0">
          <div>
            <h2 className="mb-2 text-[28px] leading-9 font-medium text-secondary-800">
              Upload
            </h2>
          </div>
        </Modal.Header>
        <Modal.Body className="pt-2">
          <Formik
            initialValues={initialValues}
            onSubmit={handleLoginAndUpload}
          >
            {({
              handleSubmit,
              isSubmitting,
            }) => (
              <>
                {/* {console.log("isSubmitting:", isSubmitting)} */}
                <form onSubmit={handleSubmit} className="">
                  <div>
                    <div className="text-center mt-4 border-dashed border-2 border-border-line-100 p-6 rounded-md"
                    onDragOver={(e)=>handleDragOver(e)}
                      onDrop={(e)=>handleFileDrop(e)}
                    >
                      
                      <FiUpload className="text-base mr-2 inline-block" />
                      <div className="text-primary text-6xl">
                        <i className="fas fa-cloud-upload-alt"></i>
                      </div>
                      <p className="mt-3 text-base text-secondary-800">
                        Drag your file to upload
                      </p>
                      <p className="my-3 text-sm text-text-gray-100">OR</p>
                      <XButton
                        type="button"
                        text={"Browse Files"}
                        onClick={handleBrowseFiles}
                        className="bg-active-blue text-sm text-active-blue-text py-[10px] px-6 rounded-[100px]"
                      />
                      <input
                        id="fileUploadControl"
                        type="file"
                        ref={fileInputRef}
                        multiple
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </div>
                    {uploadedFiles?.length > 0 ? (
                      uploadedFiles?.map((fileItem, index) => (
                        <div key={index} className="mt-4 p-4 border border-badge-gray rounded-md">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-base font-medium text-secondary-800">
                                {fileItem.file.name}
                              </p>
                              <p className="text-sm text-text-gray-100">
                                {/* {(fileItem.file.size / (1024 * 1024)).toFixed(2)} MB */}
                              </p>
                            </div>
                            <IoIosCloseCircleOutline
                              className="text-xl text-text-gray-100 cursor-pointer"
                              onClick={() => handleRemoveFile(index)}
                            />
                          </div>
                          <div className="block">
                            <div className="items-dropdown single-select mt-3">
                              <Field
                                as={NewCaseDropdown}
                                defaultLabel="Select File Type"
                                name={`fileType-${index}`}
                                options={fileTypeOptions}
                                value={taskName || uploadedFiles[index]?.fileType}  // Ensure the value is set properly from Formik's state
                                inputClassName="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                                onChange={(e) => {
                                  // formik.setFieldValue(`fileType-${index}`, e.target.value);  // Update the selected value in Formik's state
                                  handleDropdownChange(index, e.target.value);  // Call your custom change handler
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center mt-4 text-sm text-text-gray-100">
                        No files uploaded
                      </p>
                    )}
                  </div>
                  <div className="text-end mt-8">
                    <XButton
                      text={"Cancel"}
                      onClick={onClose}
                      disabled={isSubmitting}
                      className="bg-card-300 text-sm text-primary2 py-[10px] px-6 rounded-[100px]"
                    />
                    <XButton
                      type="submit"
                      text={"Upload"}
                      disabled={isSubmitting}
                      className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px] ml-4"
                    />
                  </div>
                </form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UploadFileModal;
