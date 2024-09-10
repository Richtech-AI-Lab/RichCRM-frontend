import React, { useState } from "react";
import { Formik, Field } from "formik";
import { SelectInput, XButton } from "../../components";
import { IMAGES } from "../../constants/imagePath";
import states from "../../constants/states.json";
import { Label, Modal, Textarea } from "flowbite-react";
import { useDispatch } from "react-redux";
import NewCaseDropdown from "../newcasedropdown";
import { caseTypeOptions } from "../../utils/formItem";
import { createAddressContactRequest, createAddressRequest } from "../../redux/actions/utilsActions";

// Initial form values for new contact
const initialValues = {
    position: '',
    company: '',
    email: '',
    cellNumber: '',
    workNumber: '',
    wechatAccount: '',
    whatsAppNumber: '',
    lineNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    note: ''
};

const NewContactModal = ({ onSubmit, onClose }) => {
    const dispatch = useDispatch();
    const [optionalFields, setOptionalFields] = useState({
        workNumber: false,
        wechatAccount: false,
        whatsAppNumber: false,
        lineNumber: false,
    });

    const handleAddField = (field) => {
        setOptionalFields((prevState) => ({
            ...prevState,
            [field]: true,
        }));
    };

    const handleRemoveField = (field, setFieldValue) => {
        setOptionalFields((prevState) => ({
            ...prevState,
            [field]: false,
        }));
        setFieldValue(field, '');
    };
    const handleNewContact = async (values) => {
        
        try {
            const combinePayload = {
                contact: {
                    contactType: 2,
                    firstName: values?.firstName,
                    lastName: values?.lastName,
                    company: values?.company,
                    position: values?.position,
                    cellNumber: values?.cellNumber,
                    email: values?.email,
                    workNumber: values?.workNumber,
                    wechatAccount: values?.wechatAccount,
                    whatsAppNumber: values?.whatsAppNumber,
                    lineNumber: values?.lineNumber,
                    note: values?.note
                },
                util: {
                    addressLine1: values?.addressLine1,
                    addressLine2: values?.addressLine2,
                    city: values?.city,
                    state: values?.state,
                    zipCode: values?.zipCode,
                }

            }
            
            dispatch(createAddressContactRequest(combinePayload))
            
            onClose();
        } catch (error) {
            console.error("Error while handling new contact information", error);
            // toast.error("An error occurred while creating the case.");
        }
    };


    return (
        <Modal show={true} size="md" onClose={onClose} className="new-case-modal">
            <Modal.Header className="border-b-0">
                <div>
                    <h2 className="mb-2 text-[28px] leading-9 font-medium text-secondary-800">
                        Create a New Contact
                    </h2>
                    <p className="text-sm leading-5 text-secondary-700">
                        Create a new contact by filling the basic information.
                    </p>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={handleNewContact}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue
                    }) => (

                        <form onSubmit={handleSubmit} className="">
                            {/* <div className="block">
                                <Label htmlFor="caseType" value="Case Type" />
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="block">


                                    </div>
                                </div>
                            </div> */}

                            <ul className="card-details">
                                <li>
                                    <span className={`left-txt flex items-center`}>First Name</span>
                                    <input
                                        className="text-right p-0 border-none focus:ring-transparent"
                                        name="firstName"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values?.firstName}
                                    />
                                </li>

                                <li>
                                    <span className={`left-txt flex items-center`}>Last Name</span>
                                    <input
                                        className="text-right p-0 border-none focus:ring-transparent"
                                        name="lastName"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values?.lastName}
                                    />
                                </li>

                                <li>
                                    <span className={`left-txt flex items-center`}>Position</span>
                                    <input
                                        className="text-right p-0 border-none focus:ring-transparent"
                                        name="position"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values?.position}
                                    />
                                </li>
                                <li>
                                    <span className={`left-txt flex items-center`}>Company</span>
                                    <input
                                        className="text-right p-0 border-none focus:ring-transparent"
                                        name="company"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values?.company}
                                    />
                                </li>
                                <li>
                                    <span className={`left-txt flex items-center`}>Email</span>
                                    <input
                                        className="text-right p-0 border-none focus:ring-transparent"
                                        name="email"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values?.email}
                                    />
                                </li>

                                <li>
                                    <span className={`left-txt flex items-center`}>Cell Phone</span>
                                    <input
                                        className="text-right p-0 border-none focus:ring-transparent"
                                        name="cellNumber"
                                        type="text"
                                        placeholder=""
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values?.cellNumber}
                                    />
                                </li>

                                <li>
                                    {optionalFields.workNumber && (

                                        <>
                                            <span className={"cursor-pointer left-txt flex items-center"} onClick={() => handleRemoveField('workNumber', setFieldValue)} >
                                                <span className="icon mr-2"> <img src={IMAGES.removeIcon} alt="icon" /> </span>
                                                Work Phone
                                            </span>
                                            <input
                                                className="text-right p-0 border-none focus:ring-transparent"
                                                name="workNumber"
                                                type="text"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values?.workNumber}
                                            />
                                        </>
                                    )}
                                    {!optionalFields.workNumber && (<span className="left-txt flex items-center" onClick={() => handleAddField('workNumber')} >
                                        <span className="icon mr-2 cursor-pointer">
                                            <img
                                                src={IMAGES.addIcon}
                                                alt="icon"
                                            />
                                        </span>
                                        Add Work Phone
                                    </span>)}
                                </li>

                                <li>
                                    {optionalFields.wechatAccount && (

                                        <>
                                            <span className={"cursor-pointer left-txt flex items-center"} onClick={() => handleRemoveField('wechatAccount', setFieldValue)} >
                                                <span className="icon mr-2"> <img src={IMAGES.removeIcon} alt="icon" /> </span>
                                                WeChat
                                            </span>
                                            <input
                                                className="text-right p-0 border-none focus:ring-transparent"
                                                name="wechatAccount"
                                                type="text"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values?.wechatAccount}
                                            />
                                        </>
                                    )}
                                    {!optionalFields.wechatAccount && (<span className="left-txt flex items-center" onClick={() => handleAddField('wechatAccount')} >
                                        <span className="icon mr-2 cursor-pointer">
                                            <img
                                                src={IMAGES.addIcon}
                                                alt="icon"
                                            />
                                        </span>
                                        Add WeChat
                                    </span>)}
                                </li>


                                <li>
                                    {optionalFields.whatsAppNumber && (

                                        <>
                                            <span className={"cursor-pointer left-txt flex items-center"} onClick={() => handleRemoveField('whatsAppNumber', setFieldValue)} >
                                                <span className="icon mr-2"> <img src={IMAGES.removeIcon} alt="icon" /> </span>
                                                WhatsApp
                                            </span>
                                            <input
                                                className="text-right p-0 border-none focus:ring-transparent"
                                                name="whatsAppNumber"
                                                type="text"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values?.whatsAppNumber}
                                            />
                                        </>
                                    )}
                                    {!optionalFields.whatsAppNumber && (<span className="left-txt flex items-center" onClick={() => handleAddField('whatsAppNumber')} >
                                        <span className="icon mr-2 cursor-pointer">
                                            <img
                                                src={IMAGES.addIcon}
                                                alt="icon"
                                            />
                                        </span>
                                        Add WhatsApp
                                    </span>)}
                                </li>



                                <li>
                                    {optionalFields.lineNumber && (

                                        <>
                                            <span className={"cursor-pointer left-txt flex items-center"} onClick={() => handleRemoveField('lineNumber', setFieldValue)} >
                                                <span className="icon mr-2"> <img src={IMAGES.removeIcon} alt="icon" /> </span>
                                                Line
                                            </span>
                                            <input
                                                className="text-right p-0 border-none focus:ring-transparent"
                                                name="lineNumber"
                                                type="text"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values?.lineNumber}
                                            />
                                        </>
                                    )}
                                    {!optionalFields.lineNumber && (<span className="left-txt flex items-center" onClick={() => handleAddField('lineNumber')} >
                                        <span className="icon mr-2 cursor-pointer">
                                            <img
                                                src={IMAGES.addIcon}
                                                alt="icon"
                                            />
                                        </span>
                                        Add Line
                                    </span>)}
                                </li>
                                <li>
                                    <span className={`left-txt flex items-center`}>Street Name</span>
                                    <input
                                        className="text-right p-0 border-none focus:ring-transparent"
                                        name="addressLine1"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values?.addressLine1}
                                    /></li>
                                <li>
                                    <span className={`left-txt flex items-center`}>Apt, suite, floor, or unit # (optional)</span>
                                    <input
                                        className="text-right p-0 border-none focus:ring-transparent"
                                        name="addressLine2"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values?.addressLine2}
                                    /></li>
                                <li>
                                    <span className={`left-txt flex items-center`}>City</span>
                                    <input
                                        className="text-right p-0 border-none focus:ring-transparent"
                                        name="city"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values?.city}
                                    /></li>
                                <li>
                                    <div className="flex justify-between items-center w-full">
                                        <span className="left-txt w-full">State</span>
                                        <div className="flex justify-end items-center w-full gap-7">
                                            <div className="grid gap-3">
                                                <Field
                                                    as={SelectInput}
                                                    defaultLabel={`Select State`}
                                                    inputClassName="bg-input-surface py-[6px] px-4 rounded-full border-0 text-sm leading-5 font-semibold text-label"
                                                    labelClassName="ext-label mr-3"
                                                    name="state"
                                                    value={values?.state}
                                                    options={states.map((option) => ({
                                                        value: option.id,
                                                        label: option.label,
                                                    }))}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <span className={`left-txt flex items-center`}>Zip Code</span>
                                    <input
                                        className="text-right p-0 border-none focus:ring-transparent"
                                        name="zipCode"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values?.zipCode}
                                    /></li>

                                <li>
                                    <span className={`left-txt flex items-center`}>Note</span>
                                    <Textarea
                                        name="note"
                                        type="text"
                                        placeholder="Add a note for"
                                        className="text-right p-0 border-none focus:ring-transparent"
                                        value={values?.note}
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                    />
                                </li>

                            </ul>

                            <div className="text-end mt-8">
                                <XButton
                                    text={"Cancel"}
                                    onClick={onClose}
                                    disabled={isSubmitting}
                                    className="bg-card-300 text-sm text-primary2 py-[10px] px-6 rounded-[100px]"
                                />
                                <XButton
                                    type="submit"
                                    text={"Create"}
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

export default NewContactModal;
