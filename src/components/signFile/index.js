/* global OneDrive */
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Field, Formik } from "formik";
import { Modal } from "flowbite-react";
import XButton from "../button/XButton";
import { FiUpload } from "react-icons/fi";
import NewCaseDropdown from "../newcasedropdown";
import { IoIosClose, IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import { useMsal } from "@azure/msal-react";
import XSpinnerLoader from "../spinnerLoader/XSpinnerLoader";
import { useSelector } from "react-redux";
import ParticipantListEmail from "../composeEmail/participantListEmail";
import SearchListEmail from "../composeEmail/searchListEmail";
import { IMAGES } from "../../constants/imagePath";
import { debounce } from "lodash";
import { postRequest } from "../../axios/interceptor";
import { API_ENDPOINTS } from "../../constants/api";
import avatar from '../../assets/images/contact_avtar.png';
import { ReqSignParticipantCss, ReqSignSeacrhCss } from "../../constants/constants";

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
    const [loader, setLoader] = useState(false)
    const [account, setAccount] = useState(instance.getActiveAccount());
    const [path, setPath] = useState("/me/drive/root");
    const { data } = useSelector((state) => state.auth.user)
    const fileInputRef = useRef(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [toEmail, setToEmail] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [showParticipant, setShowParticipant] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const initialValues = {};

    const closePreviewModal = () => {
        setShowPreviewModal(false);
    };

    const debouncedFunction = useCallback(
        debounce(async (value, index) => {
            if (value != "" || value.length > 0) {
                const contactResponse = await postRequest(
                    API_ENDPOINTS.GET_CONTACT_BY_KEYWORD,
                    {
                        keyword: value,
                    }
                );
                const contactResults = contactResponse?.data?.data;
                // Combine orgabiRe and contactResults
                // const combinedContacts = [...contactResults, ...orgabiRe];

                // remove already selected toEmail in input box 
                console.log(toEmail, "toEmail")
                const filteredResults = contactResults.filter(
                    (item) => !toEmail.some((email) => email === item.email)
                );

                setSearchResults(filteredResults);
                // console.log(contactResults);
            } else {
                setSearchResults([]);
            }
        }, 100),
        []
    );

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (e.target.value != "") {
            debouncedFunction(e.target.value);
        } else {
            setSearchResults([]);
        }
    };
    const handleInputBlur = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(inputValue)) {
            setToEmail((prevEmails) => [...prevEmails, inputValue]);
            setInputValue('');
        }
    };
    const removeToEmail = (index) => {
        const updatedEmails = toEmail.filter((_, i) => i !== index);
        setToEmail(updatedEmails);
    }
    const handleDragOver = (event) => {
        event.preventDefault(); // Allow the drop
        event.dataTransfer.dropEffect = "copy"; // Show a copy cursor
    };

    const handleFileDrop = async (event) => {
        event.preventDefault();
        const dataTransfer = event.dataTransfer;
        if (dataTransfer.files && dataTransfer.files.length > 0) {
            // Handle dropped files
            const droppedFiles = Array.from(dataTransfer.files).map((file) => ({
                file,
                fileType: "",
            }));
            setUploadedFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
        } else {
            const link = dataTransfer.getData("text/uri-list") || dataTransfer.getData("text/plain");
            if (link) {
                window.open(link, "_blank");
                try {
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
    const handleLoginAndUpload = async (event) => {
        setShowPreviewModal(true)
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
                                            onDragOver={(e) => handleDragOver(e)}
                                            onDrop={(e) => handleFileDrop(e)}
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
                                    <div className="text-end mt-8">
                                        <XButton
                                            text={"Cancel"}
                                            onClick={onClose}
                                            disabled={isSubmitting}
                                            className="bg-card-300 text-sm text-primary2 py-[10px] px-6 rounded-[100px]"
                                        />
                                        <XButton
                                            type="button"
                                            text={"Upload"}
                                            disable={uploadedFiles?.length == 0}
                                            className={`text-sm py-[10px] px-6 rounded-[100px] ml-4 ${
                                                uploadedFiles?.length == 0
                                                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                                    : "bg-primary text-white"
                                            }`}
                                        />
                                    </div>
                                </form>
                            </>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
            {showPreviewModal && (
                <Modal show={true} onClose={closePreviewModal} className="new-case-modal">
                    <Modal.Header className="border-b-0">
                        <div>
                            <h2 className="mb-2 text-[28px] leading-9 font-medium text-secondary-800">
                                Request for Signature
                            </h2>
                            <p className="text-sm font-normal leading-[1.42857] tracking-[0.25px]">Confirm the participants for signing, who will be synced to DocuSign for further setup.</p>
                        </div>
                    </Modal.Header>
                    <Modal.Body className="p-3 px-4">

                        <div className="flex items-center self-stretch">
                            <div className="flex flex-col items-start gap-4 self-stretch">
                                <label className="text-base font-medium leading-6 tracking-wide">Participants</label>
                                <div className="flex items-start justify-between gap-4 self-stretch bg-bg-gray-200 rounded  px-1 py-1">
                                    <ul className="flex flex-col justify-between gap-2">
                                        {toEmail?.map((item, index) =>
                                            <li className="flex items-start justify-between p-2 bg-white rounded-full ">
                                                <div className='flex items-center'>
                                                    <img src={avatar} alt="" className="mr-2" />
                                                    <span className='overflow-hidden'>{item}</span>
                                                </div>
                                                <IoIosClose size={28} className="text-text-gray-100 cursor-pointer"
                                                    onClick={() => removeToEmail(index)}
                                                />
                                            </li>
                                        )}

                                    </ul>
                                    <input
                                        type="text"
                                        className="inline border-0 focus:ring-transparent bg-bg-gray-200 w-100"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onBlur={handleInputBlur} // or use onKeyDown to detect 'Enter' key
                                        placeholder="Enter email"
                                    />
                                    {!showParticipant ?
                                        <span className="flex w-10 h-10 flex-col justify-center items-center gap-2.5 cursor-pointer" onClick={() => setShowParticipant(true)}>
                                            <img src={IMAGES.addIcon} alt="icon" />
                                        </span> :
                                        <span className="flex w-10 h-10 flex-col justify-center items-center gap-2.5 cursor-pointer" onClick={() => setShowParticipant(false)}>
                                            <img src={IMAGES.removeIcon} alt="icon" />
                                        </span>}
                                </div>

                                {showParticipant && <ParticipantListEmail placeCss={ReqSignParticipantCss} meetModal={true} setToEmail={setToEmail} toEmail={toEmail} onClose={() => setShowParticipant(prevState => !prevState)} />}
                                {searchResults?.length > 0 && <SearchListEmail placeCss={ReqSignSeacrhCss} setInputValue={setInputValue} searchResults={searchResults} setSearchResults={setSearchResults} setToEmail={setToEmail} onClose={() => setShowParticipant(prevState => !prevState)} />}

                            </div>
                        </div>
                        <XButton
                            type="button"
                            text={"Close"}
                            onClick={closePreviewModal}
                            className="bg-primary text-white text-sm py-[10px] px-6 rounded-[100px] mt-4"
                        />
                    </Modal.Body>

                </Modal>
            )}
        </>
    );
};

export default SignFileModal;
