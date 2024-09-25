/* global OneDrive */
import React, { useRef, useState } from "react";
import { Field, Formik } from "formik";
import { Modal } from "flowbite-react";
import XButton from "../button/XButton";
import { FiUpload } from "react-icons/fi";
import NewCaseDropdown from "../newcasedropdown";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

const fileTypeOptions = [
  { value: "Inspection report", label: "Inspection report" },
  // Add more options as needed
];

const UploadFileModal = ({ onClose }) => {
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const initialValues = {};

  const handleUploadFile = async (values) => {
    if (!window.FileReader) {
      alert("Your browser does not support file uploads. Please update your browser.");
      return;
    }
    // try {
      // for (const fileItem of uploadedFiles) {
        const file = uploadedFiles[0].file;
        const odOptions = {
          clientId: process.env.REACT_APP_ONEDRIVE_CLIENT_ID,
          action: "save",
          sourceInputElementId: "fileUploadControl",
          openInNewWindow: true,
          advanced: {
            redirectUri: "http://localhost:3000",
          },
          success: (files) => {
            onClose()
            toast.success("File Uploaded!")
            console.log('File uploaded successfully:', files);
          },
          progress: (percent) => {
            console.log(`Upload progress for ${file.name}: ${percent}%`);
          },
          cancel: () => {
            console.log(`Upload canceled for ${file.name}`);
          },
          error: (error) => {
            console.error(`Error during upload of ${file.name}:`, error);
          },
        };

        // Invoke OneDrive save
        await OneDrive.save(odOptions);
      // }
    // } catch (error) {
    //   console.error('Error during file upload process:', error);
    // }
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

  return (
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
          onSubmit={handleUploadFile}
        >
          {({
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="">
              <div>
                <div className="text-center mt-4 border-dashed border-2 border-border-line-100 p-6 rounded-md">
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
                    multiple // Allow multiple files
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
                {uploadedFiles.length > 0 ? (
                  uploadedFiles.map((fileItem, index) => (
                    <div key={index} className="mt-4 p-4 border border-badge-gray rounded-md">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-base font-medium text-secondary-800">
                            {fileItem.file.name}
                          </p>
                          <p className="text-sm text-text-gray-100">
                            {(fileItem.file.size / (1024 * 1024)).toFixed(2)} MB
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
                            name={`fileType-${index}`} // Give unique name for each file
                            options={fileTypeOptions}
                            inputClassName="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                            onChange={(e) =>
                              handleDropdownChange(index, e.target.value)
                            }
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
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UploadFileModal;
