import React, { useState } from "react";
import { Formik, Field } from "formik";
import { SelectInput, TextInput, XButton } from "..";
import { IMAGES } from "../../constants/imagePath";
import states from "../../constants/states.json";
import { Label, Modal, Textarea } from "flowbite-react";
import { useDispatch } from "react-redux";
import NewCaseDropdown from "../newcasedropdown";
import {  contactTagIndividualOption } from "../../utils/formItem";
import { createAddressContactRequest, createAddressRequest } from "../../redux/actions/utilsActions";
import { createContactRequest } from "../../redux/actions/contactActions";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// Initial form values for new contact
const initialValues = {
    firstName: '',
    lastName: '',
    contactType: '',
    position: '',
    company: '',
    email: '',
    cellNumber: '',
    workNumber: '',
};

const NewIndividualContactModalV1 = ({ onSubmit, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        contactType: Yup.string().required('Contact Tag is required'),
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().email('Invalid email format'),
        cellNumber: Yup.string().matches(/^[0-9]+$/, 'Cell number must be a number'),
    });
    const handleNewContact = async (values) => {

        try {
            const payload = {
                firstName: values?.firstName,
                lastName: values?.lastName,
                contactType: values?.contactType,
                position: values?.position,
                company: values?.company,
                cellNumber: values?.cellNumber,
                workNumber: values?.workNumber,
                ...(values?.email && values?.email?.trim() !== "" && { email: values.email }), // Add email only if it's not empty
            };

            dispatch(createContactRequest(payload, navigate))

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
                        Create a New Individual Contact
                    </h2>
                    <p className="text-sm leading-5 text-secondary-700">
                        Create a new contact by filling the basic information.
                    </p>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
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
                            <div className="block">
                                <div className="grid grid-cols-2 gap-4">
                                    <TextInput
                                        name="firstName"
                                        type="text"
                                        placeholder="First name*"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        field={{ name: "firstName" }}
                                        form={{ errors, touched }}
                                    />
                                    <TextInput
                                        name="lastName"
                                        type="text"
                                        placeholder="Last name*"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        field={{ name: "lastName" }}
                                        form={{ errors, touched }}
                                    />

                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="block">
                                        <div className={`items-dropdown ${values.contactType == null || values.contactType == undefined || values.contactType == "" ? "default" :""} single-select mt-3 mb-3`}>
                                            <Field
                                                as={NewCaseDropdown}
                                                defaultLabel="Select Tag"
                                                name="contactType"
                                                value={values.contactType}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                options={contactTagIndividualOption}
                                                contactBadge="individual"

                                            />

                                            {touched.contactType && errors.contactType ? (
                                                <div className="text-red-500 text-sm">
                                                    {errors.caseType}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>

                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <TextInput
                                        name="position"
                                        type="text"
                                        placeholder="Position"
                                        value={values.position}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        field={{ name: "position" }}
                                        form={{ errors, touched }}
                                    />
                                    <TextInput
                                        name="company"
                                        type="text"
                                        placeholder="Company"
                                        value={values.company}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        field={{ name: "company" }}
                                        form={{ errors, touched }}
                                    />

                                </div>

                                <div className="grid grid-cols-1 gap-4 mt-3">
                                    <TextInput
                                        name="email"
                                        type="text"
                                        placeholder="Email*"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        field={{ name: "email" }}
                                        form={{ errors, touched }}
                                    />
                                    <TextInput
                                        name="cellNumber"
                                        type="text"
                                        placeholder="Cell Phone*"
                                        value={values.cellNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        field={{ name: "cellNumber" }}
                                        form={{ errors, touched }}
                                    />
                                    <TextInput
                                        name="workphone"
                                        type="text"
                                        placeholder="Work Phone"
                                        value={values.workphone}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        field={{ name: "workphone" }}
                                        form={{ errors, touched }}
                                    />
                                </div>

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

export default NewIndividualContactModalV1;
