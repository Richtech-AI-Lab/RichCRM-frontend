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
import { useSelector } from "react-redux";

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

const SignFileModal = ({ onClose, fileName = "", generalUpload, taskName = "", onUpload = () => { } }) => {
  // console.log(fileName, "+===", fileName.split('-').slice(0, 2).join('-'))
  const { instance, accounts, inProgress } = useMsal();
  const [account, setAccount] = useState(instance.getActiveAccount());
  const [loader, setLoader] = useState(false)
  const [path, setPath] = useState("/me/drive/root");
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { data } = useSelector((state) => state.auth.user)
  const initialValues = {};


  // function getWordAfterSlash(inputString) {
  //   let parts = inputString.split('/');
  //   if (parts.length > 1) {
  //     return parts[1]; // return the word after '/'
  //   }
  //   return inputString; // return an empty string if no '/' is found
  // }


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

  function getFileTypeFromMimeType(mimeType) {
    let parts = mimeType.split('/');
    return parts.length > 1 ? parts[1] : ''; // Return the file type after '/' or an empty string
  }
  const handleUploadFile = async (event) => {

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

  // console.log(uploadedFiles, "_____")
  return (
    <>
      <XSpinnerLoader loading={loader} size="lg" />
      <Modal show={true} onClose={onClose} className="new-case-modal">
        <Modal.Header className="border-b-0">
          <div>
            <h2 className="mb-2 text-[28px] leading-9 font-medium text-secondary-800">
            Upload the Document for Signature
            </h2>
          </div>
        </Modal.Header>
        <Modal.Body className="pt-2">
          <Formik
            initialValues={initialValues}
            // onSubmit={handleLoginAndUpload}
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
                        </div>
                      ))
                    ) : (
                      <p className="text-center mt-4 text-sm text-text-gray-100">
                        No files uploaded
                      </p>
                    )}
                  </div>
                  {/* <div className="text-end mt-8">
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
                  </div> */}
                </form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignFileModal;
