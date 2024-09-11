import React, { useEffect, useState } from "react";
import { CaseCardDetails, SelectInput, XButton } from "../../../components";
import { Field, Formik } from "formik";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IMAGES } from "../../../constants/imagePath";
import states from "../../../constants/states.json"
import { Textarea } from "flowbite-react";


const ContactEditForm = ({ initialValues, onSubmit, values, form, setFieldValue, handleChange, handleBlur }) => {
    const [optionalFields, setOptionalFields] = useState({
        workNumber: false,
        wechatAccount: false,
        whatsAppNumber: false,
        lineNumber: false,
        ssn: false,
        driverlicense: false,
    });

    useEffect(() => {
        if (initialValues?.workNumber) setOptionalFields(prev => ({ ...prev, workNumber: true }));
        if (initialValues?.wechatAccount) setOptionalFields(prev => ({ ...prev, wechatAccount: true }));
        if (initialValues?.whatsAppNumber) setOptionalFields(prev => ({ ...prev, whatsAppNumber: true }));
        if (initialValues?.lineNumber) setOptionalFields(prev => ({ ...prev, lineNumber: true }));
        if (initialValues?.ssn) setOptionalFields(prev => ({ ...prev, ssn: true }));
        if (initialValues?.driverlicense) setOptionalFields(prev => ({ ...prev, driverlicense: true }));
    }, [initialValues]);

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

    return (
        <>

            <div className="bg-white p-4 rounded-2xl mb-5">

                <ul className="card-details">

                    <li>
                        <span className={`left-txt flex items-center`}>Position</span>
                        <input
                            className="text-right p-0 border-none focus:ring-transparent"
                            name="position"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values?.position}
                        /></li>
                    <li>
                        <span className={`left-txt flex items-center`}>Company</span>
                        <input
                            className="text-right p-0 border-none focus:ring-transparent"
                            name="company"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values?.company}
                        /></li>

                </ul>
            </div>
            <div className="bg-white p-4 rounded-2xl mb-5">

                <ul className="card-details">
                    <li>
                        <span className={`left-txt flex items-center`}>Email</span>
                        <input
                            className="text-right p-0 border-none focus:ring-transparent"
                            name="email"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values?.email}
                        /></li>
                    {form?.errors["email"] && form?.touched["email"] && (
                        <span className="text-sm text-red-500">{form.errors["email"]}</span>
                    )}
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
                        /></li>
                    {form?.errors["cellNumber"] && form?.touched["cellNumber"] && (
                        <span className="text-sm text-red-500">{form.errors["cellNumber"]}</span>
                    )}

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


                </ul>
            </div>
            <div className="bg-white p-4 rounded-2xl mb-5">

                <ul className="card-details">

                    <li>
                        {optionalFields.ssn && (

                            <>
                                <span className={"cursor-pointer left-txt flex items-center"} onClick={() => handleRemoveField('ssn', setFieldValue)} >
                                    <span className="icon mr-2"> <img src={IMAGES.removeIcon} alt="icon" /> </span>
                                    SSN
                                </span>
                                <input
                                    className="text-right p-0 border-none focus:ring-transparent"
                                    name="ssn"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.ssn}
                                />
                            </>
                        )}
                        {!optionalFields.ssn && (<span className="left-txt flex items-center" onClick={() => handleAddField('ssn')} >
                            <span className="icon mr-2 cursor-pointer">
                                <img
                                    src={IMAGES.addIcon}
                                    alt="icon"
                                />
                            </span>
                            Add SSN
                        </span>)}
                    </li>
                    <li>
                        {optionalFields.driverlicense && (

                            <>
                                <span className={"cursor-pointer left-txt flex items-center"} onClick={() => handleRemoveField('driverlicense', setFieldValue)} >
                                    <span className="icon mr-2"> <img src={IMAGES.removeIcon} alt="icon" /> </span>
                                    Driving License
                                </span>
                                <input
                                    className="text-right p-0 border-none focus:ring-transparent"
                                    name="driverlicense"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.driverlicense}
                                />
                            </>
                        )}
                        {!optionalFields.driverlicense && (<span className="left-txt flex items-center" onClick={() => handleAddField('driverlicense')} >
                            <span className="icon mr-2 cursor-pointer">
                                <img
                                    src={IMAGES.addIcon}
                                    alt="icon"
                                />
                            </span>
                            Add Driving License
                        </span>)}
                    </li>

                </ul>
            </div>

            <div className="bg-white rounded-2xl mb-5">
                <Textarea
                    name="note"
                    type="text"
                    placeholder="Add a note for "
                    className="bg-white resize-none border-none h-60 py-3 px-4"
                    value={values?.note}
                    onChange={handleChange}
                    onBlur={handleBlur}

                />
            </div>


        </>
    );
};

export default ContactEditForm;

