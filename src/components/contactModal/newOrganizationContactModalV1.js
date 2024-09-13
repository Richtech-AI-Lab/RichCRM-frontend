import React, { useState } from "react";
import { Formik, Field } from "formik";
import { SelectInput, TextInput, XButton } from "..";
import { IMAGES } from "../../constants/imagePath";
import states from "../../constants/states.json";
import { Label, Modal, Textarea } from "flowbite-react";
import { useDispatch } from "react-redux";
import NewCaseDropdown from "../newcasedropdown";
import { createAddressContactRequest, createAddressRequest } from "../../redux/actions/utilsActions";
import { contactTagOrganizationOption } from "../../utils/formItem";
import { createContactRequest } from "../../redux/actions/contactActions";
import { useNavigate } from "react-router-dom";

// Initial form values for new contact
const initialValues = {
    company:'',
    contactType:'',
    note: ''
};

const NewOrganizationContactModalV1 = ({ onSubmit, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNewContact = async (values) => {
        try {
            const payload = {
                contactType: values.contactType,
                firstName: values?.company,
                lastName:"",
                company: values?.company,
                note: values?.note
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
                        Create a New Organization
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
                            
                            <div className="block">
                                <div className="grid grid-cols-1">
                                    <TextInput
                                        name="company"
                                        type="text"
                                        placeholder="Organization name*"
                                        value={values.company}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        field={{ name: "company" }}
                                        form={{ errors, touched }}
                                    />

                                    <div className={`items-dropdown  ${values.contactType == null || values.contactType == undefined || values.contactType == "" ? "default" :""} single-select mt-3`}>
                                        <Field
                                            as={NewCaseDropdown}
                                            defaultLabel="Select Tag"
                                            name="contactType"
                                            value={values.contactType}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            options={contactTagOrganizationOption}
                                        />
                                    </div>
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

export default NewOrganizationContactModalV1;
