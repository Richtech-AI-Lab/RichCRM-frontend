import React, { useState } from "react";
import { Formik, Field } from "formik";
import { SelectInput, TextInput, XButton } from "..";
import { IMAGES } from "../../constants/imagePath";
import states from "../../constants/states.json";
import { Label, Modal, Textarea } from "flowbite-react";
import { useDispatch } from "react-redux";
import NewCaseDropdown from "../newcasedropdown";
import { caseTypeOptions, contactTagOption } from "../../utils/formItem";
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

const NewOrganizationContactModalV1 = ({ onSubmit, onClose }) => {
    const dispatch = useDispatch();

    const handleNewContact = async (values) => {
        return true;
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
                            {/* <div className="block">
                                <Label htmlFor="caseType" value="Case Type" />
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="block">


                                    </div>
                                </div>
                            </div> */}
                            
                            <div className="block">
                                <div className="grid grid-cols-1">
                                    <TextInput
                                        name="organizationName"
                                        type="text"
                                        placeholder="Organization name*"
                                        value={values.organizationName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        field={{ name: "organizationName" }}
                                        form={{ errors, touched }}
                                    />

                                    <div className={`items-dropdown ${values.tag = ! "" ? "" : "default"}  single-select mt-3`}>
                                        <Field
                                            as={NewCaseDropdown}
                                            defaultLabel="Select Tag"
                                            name="tag"
                                            value={values.tag}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            options={contactTagOption}
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
