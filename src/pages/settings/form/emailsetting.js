import React, { useState } from 'react'
import NewCaseDropdown from '../../../components/newcasedropdown'
import { TextInput, XButton, XSpinnerLoader } from '../../../components'
import language from "../../../constants/language.json";
import timezone from "../../../constants/timezone.json";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { API_ENDPOINTS } from '../../../constants/api';
import { toast } from 'react-toastify';
import { postRequest } from '../../../axios/interceptor';
import { useSelector } from 'react-redux';
import { Spinner, ToggleSwitch } from 'flowbite-react';
import { FiUpload } from 'react-icons/fi';
import { IMAGES } from '../../../constants/imagePath';

export const EmailSetting = ({ title }) => {
    const [isAutoFill, setIsAutoFill] = useState(false);
    const [isBrandingImage, setIsBrandingImage] = useState(false);
    return (
        <>

            <div className="bg-white p-4 rounded-2xl mb-5 shadow-card">
                {title && <div className="flex justify-between items-center mb-2">
                    <span className="text-base text-secondary-800 font-medium">Email Signature</span>
                </div>}
                {/* <p className="mb-6">Mattis amet eu velit viverra aliquet porta at a. Auctor lectus tincidunt facilisis pellentesque maecenas enim sed dolor adipiscing.</p> */}
                <div className='grid gap-5 mt-5'>
                    <div className="flex justify-between items-center border-b border-badge-gray pb-3 mb-3">
                        <span className={`left-txt flex items-center`}>Auto-fill from Profile</span>
                        <ToggleSwitch checked={isAutoFill} onChange={setIsAutoFill} />
                    </div>
                    {!isAutoFill ? <>

                        <div className="border-b border-badge-gray">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-2 block">
                                    <span className={`left-txt flex items-center`}>First Name</span>
                                    <TextInput
                                        name="clientfirstName"
                                        type="text"
                                    // placeholder="First Name"
                                    // value={values.clientfirstName}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    // field={{ name: "clientfirstName" }}
                                    // form={{ errors, touched }}
                                    />
                                </div>
                                <div className="mb-2 block">
                                    <span className={`left-txt flex items-center`}>Last Name</span>
                                    <TextInput
                                        name="clientLastName"
                                        type="text"
                                    // placeholder="Last Name"
                                    // value={values.clientLastName}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    // field={{ name: "clientLastName" }}
                                    // form={{ errors, touched }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="border-b border-badge-gray">
                            <span className={`left-txt flex items-center`}>Title</span>
                            <div className="flex items-center">
                                <div className="mb-2 flex-1 mr-4">
                                    <TextInput
                                        name="Email"
                                        type="text"
                                    // placeholder="First Name"
                                    // value={values.clientfirstName}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    // field={{ name: "clientfirstName" }}
                                    // form={{ errors, touched }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="border-b border-badge-gray">
                            <span className={`left-txt flex items-center`}>Company</span>
                            <div className="flex items-center">
                                <div className="mb-2 flex-1 mr-4">
                                    <TextInput
                                        name="Email"
                                        type="text"
                                    // placeholder="First Name"
                                    // value={values.clientfirstName}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    // field={{ name: "clientfirstName" }}
                                    // form={{ errors, touched }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="border-b border-badge-gray">
                            <span className={`left-txt flex items-center`}>Email Address</span>
                            <div className="flex items-center">
                                <div className="mb-2 flex-1 mr-4">
                                    <TextInput
                                        name="Email"
                                        type="text"
                                    // placeholder="First Name"
                                    // value={values.clientfirstName}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    // field={{ name: "clientfirstName" }}
                                    // form={{ errors, touched }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-badge-gray">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-2 block">
                                    <span className={`left-txt flex items-center`}>Cell Phone</span>
                                    <TextInput
                                        name="clientfirstName"
                                        type="text"
                                    // placeholder="First Name"
                                    // value={values.clientfirstName}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    // field={{ name: "clientfirstName" }}
                                    // form={{ errors, touched }}
                                    />
                                </div>
                                <div className="mb-2 block">
                                    <span className={`left-txt flex items-center`}>Work Phone</span>
                                    <TextInput
                                        name="clientLastName"
                                        type="text"
                                    // placeholder="Last Name"
                                    // value={values.clientLastName}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    // field={{ name: "clientLastName" }}
                                    // form={{ errors, touched }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="border-b border-badge-gray">
                            <span className={`left-txt flex items-center`}>Website</span>
                            <div className="flex items-center">
                                <div className="mb-2 flex-1 mr-4">
                                    <TextInput
                                        name="Email"
                                        type="text"
                                    // placeholder="First Name"
                                    // value={values.clientfirstName}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    // field={{ name: "clientfirstName" }}
                                    // form={{ errors, touched }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="border-b border-badge-gray">
                            <span className={`left-txt flex items-center`}>Mailing Address</span>
                            <div className="flex items-center">
                                <div className="mb-2 flex-1 mr-4">
                                    <TextInput
                                        name="Email"
                                        type="text"
                                    // placeholder="First Name"
                                    // value={values.clientfirstName}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    // field={{ name: "clientfirstName" }}
                                    // form={{ errors, touched }}
                                    />
                                </div>
                            </div>
                        </div></> : ""}


                    <div className="border-b border-badge-gray pb-3 mb-3">
                        <div className="flex justify-between items-center">
                            <span className={`left-txt flex items-center`}>Branding Image</span>
                            <ToggleSwitch checked={isBrandingImage} onChange={setIsBrandingImage} />
                        </div>


                        {isBrandingImage ?
                            <>
                                <div>
                                    <div className="text-center mt-4 border-dashed border-2 border-border-line-100 p-6 rounded-md"
                                    // onDragOver={(e) => handleDragOver(e)}
                                    // onDrop={(e) => handleFileDrop(e)}
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
                                            // onClick={handleBrowseFiles}
                                            className="bg-active-blue text-sm text-active-blue-text py-[10px] px-6 rounded-[100px]"
                                        />
                                        <input
                                            id="fileUploadControl"
                                            type="file"
                                            // ref={fileInputRef}
                                            multiple
                                            style={{ display: "none" }}
                                        // onChange={handleFileChange}
                                        />
                                    </div>
                                </div></> : ""}
                    </div>

                    <div className="flex justify-between items-center mb-3">
                        <span className={`left-txt flex items-center`}>Template</span>
                        <div className={`items-dropdown single-select gray-btn`}  >
                            <NewCaseDropdown
                                defaultLabel="Select Template"
                                name="state"
                                // value={values.state}
                                onChange={() => { }}
                                // onBlur={handleBlur}
                                options={[{ "id": "1", "value": "1", "label": "Minimalistic" }]}
                            // field={{ name: "state" }}
                            // form={{ errors, touched }}
                            />
                        </div>
                    </div>

                    <div className="grid gap-5 bg-gray chat-box rounded p-4">
                        <span className={`left-txt flex items-center`}><img src={IMAGES.richAiLogo} width={'50px'} height={'50px'}></img></span>
                        <p >
                            Rich CRM
                        </p>
                        <p >
                            Jessica Lee
                        </p>
                        <p >
                            MANAGER
                        </p>
                        <div>Phone:
                            929-988-3993
                            Mobile:
                            929-988-3993


                        </div>
                        <div>
                        Email:
                            jessicalee@gmail.com
                            Website:
                            jlee.com
                        </div>
                        <div>
                        Address:
                            1234 Main St, Flushing, NY 11354
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}
