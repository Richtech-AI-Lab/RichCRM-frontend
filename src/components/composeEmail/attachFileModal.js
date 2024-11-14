/* global OneDrive */
import React, { useEffect, useRef, useState } from "react";
import { Field, Formik } from "formik";
import { Modal } from "flowbite-react";
import XButton from "../button/XButton";
import { FiUpload } from "react-icons/fi";
import NewCaseDropdown from "../newcasedropdown";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import { useMsal } from "@azure/msal-react";
import XSpinnerLoader from "../spinnerLoader/XSpinnerLoader";

const MAX_FILE_SIZE_MB = 40; // 40 MB
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const AttachFileModal = ({ onClose, uploadedFiles, setUploadedFiles}) => {
  const [loader, setLoader] = useState(false)
//   const [uploadedFiles, setUploadedFiles] = useState([]);
  const initialValues = {};
  const fileInputRef = useRef(null);

  const handleBrowseFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        toast.error(`File "${file.name}" exceeds 40 MB limit and was not added.`);
        return false;
      }
      return true;
    });
    if (files) {
      const filesWithDropdownValues = validFiles.map((file) => ({
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

  
  const handleSubmit = () => {

  };
  // console.log(uploadedFiles, "_____")
  return (
    <>
      <XSpinnerLoader loading={loader} size="lg" />
      <Modal show={true} onClose={onClose} className="new-case-modal" style={{ zIndex: '9998' }}>
        <Modal.Header className="border-b-0">
          <div>
            <h2 className="mb-2 text-[28px] leading-9 font-medium text-secondary-800">
              Attachments
            </h2>
          </div>
        </Modal.Header>
        <Modal.Body className="pt-2">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({
              handleSubmit,
              isSubmitting,
            }) => (
              <>
                {/* {console.log("isSubmitting:", isSubmitting)} */}
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
                              {(fileItem.file.size / (1024 * 1024)).toFixed(2)} MB
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
                  <div className="text-end mt-8">
                    <XButton
                      text={"Upload"}
                      onClick={onClose}
                      disabled={isSubmitting}
                      className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px] ml-4"
                      // className="bg-card-300 text-sm text-primary2 py-[10px] px-6 rounded-[100px]"
                    />
                    {/* <XButton
                      type="submit"
                      text={"Upload"}
                      disabled={isSubmitting}
                      className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px] ml-4"
                    /> */}
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

export default AttachFileModal;
