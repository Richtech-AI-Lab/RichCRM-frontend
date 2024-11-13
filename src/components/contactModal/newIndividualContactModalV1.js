import React, { useState } from "react";
import { Formik, Field } from "formik";
import { SelectInput, TextInput, XButton } from "..";
import { IMAGES } from "../../constants/imagePath";
import states from "../../constants/states.json";
import { Label, Modal, Textarea } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import NewCaseDropdown from "../newcasedropdown";
import Select, {components} from 'react-select';
import { contactTagIndividualOption } from "../../utils/formItem";
import { createAddressContactRequest, createAddressRequest } from "../../redux/actions/utilsActions";
import { createContactRequest } from "../../redux/actions/contactActions";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// Initial form values for new contact
const initialValues = {
    firstName: '',
    lastName: '',
    tags: '',
    position: '',
    company: '',
    email: '',
    cellNumber: '',
    workNumber: '',
};

const NewIndividualContactModalV1 = ({ onSubmit, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tagDetails = useSelector((state) => state.tag.tag);
    const validationSchema = Yup.object({
        // tags: Yup.array().min(1, 'At least one tag is required'),
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
                tags: values?.tags,
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

    const formattedOptions = tagDetails.map(option => ({
        ...option,
        value: option.label, // Convert label to a suitable value format
    }));
    const customStyles = {
        multiValue: (styles) => ({
            ...styles,
            backgroundColor: "#e0e7ff", // Light blue background
            borderRadius: "12px",
            padding: "3px 8px",
            margin: "2px",
            color: "#1e3a8a", // Dark blue text
        }),
        multiValueLabel: (styles) => ({
            ...styles,
            color: "#1e3a8a", // Adjust color to your liking
        }),
        multiValueRemove: (styles) => ({
            ...styles,
            color: "#1e3a8a",
            cursor: "pointer",
            ":hover": {
                color: "#1e40af", // Darker blue on hover
            },
        }),
    };
    const CustomMultiValue = (props) => {
        const { data } = props;
        return (
            <components.MultiValue {...props}>
                <span
                    className="text-sm font-semibold py-1 px-3 rounded-full inline-block"
                    style={{
                        backgroundColor: data.color1, // Background color from tag data
                        color: data.color2, // Text color from tag data
                    }}
                >
                    {data.label}
                </span>
            </components.MultiValue>
        );
    };
    const CustomOption = (props) => {
        const { data, innerRef, innerProps } = props;
        return (
            <div ref={innerRef} {...innerProps} className="m-3">
                <span
                    className="text-sm font-semibold py-1 px-3 rounded-full inline-block cursor-pointer"
                    style={{
                        backgroundColor: data.color1, // Background color for each option
                        color: data.color2, // Text color for each option
                        display: 'inline-block',
                    
                    }}
                >
                    {data.label}
                </span>
            </div>
        );
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
                                        {/* <div className={`items-dropdown single-select mt-3 mb-3`}>
                                            <Field
                                                as={NewCaseDropdown}
                                                defaultLabel="Select Tag"
                                                name="tags"
                                                // value={values.tags[0]}
                                                value={contactTagIndividualOption.filter(option =>
                                                    values.tags.includes(option.label)
                                                )}
                                                // onChange={(selectedOptions) =>
                                                //     setFieldValue(
                                                //         "tags",
                                                //         selectedOptions ? selectedOptions.map(option => option.value) : []
                                                //     )
                                                // }
                                                onChange={ (selectedOptions) =>
                                                    setFieldValue(
                                                                "tags",
                                                                [selectedOptions]
                                                            )
                                                }
                                                onBlur={handleBlur}
                                                options={contactTagIndividualOption.map(opt=>opt.label)}
                                                contactBadge="individual"

                                            />

                                            {touched.tags && errors.tags ? (
                                                <div className="text-red-500 text-sm">
                                                    {errors.caseType}
                                                </div>
                                            ) : null}
                                        </div> */}
                                        <div className={`form-input w-full mt-3 mb-3 bg-input-surface rounded-[40px] border-0 py-1 px-1 text-base leading-6`}>
                                            <Field
                                                as={Select}
                                                isMulti
                                                name="tags"
                                                // styles={customStyles}
                                                components={{
                                                    Option: CustomOption,  
                                                    MultiValue: CustomMultiValue, // Use the custom badge component
                                                }}
                                                options={formattedOptions}
                                                value={formattedOptions.filter(option =>
                                                    values.tags.includes(option.value)
                                                )}
                                                onChange={(selectedOptions) =>
                                                    setFieldValue(
                                                        "tags",
                                                        selectedOptions ? selectedOptions.map(option => option.value) : []
                                                    )
                                                }
                                            />

                                            {touched.tags && errors.tags ? (
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
