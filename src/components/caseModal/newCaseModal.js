import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Label, Modal } from "flowbite-react";
import AuthFormContainer from "../authContainer";
import TextInput from "../TextInput";
import XButton from "../button/XButton";
import SelectInput from "../selectinput";
import { useNavigate } from "react-router-dom";

const NewCaseModal = ({ onClose }) => {
    const navigate = useNavigate()
    const initialValues = {
        caseType: "",
        clientfirstName: "",
        clientLastName: "",
        address: "",
        addressLine2: "",
        city: "",
        state: ""
    };
    const validationSchema = Yup.object({
        caseType: Yup.string().required('Case Type is required'),
        clientfirstName: Yup.string().required('Client First Name is required'),
        clientLastName: Yup.string().required('Client Last Name is required'),
        address: Yup.string().required('Address is required'),
        addressLine2: Yup.string().required('Address Line 2 is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
    });
    const handleNewCaseInfo = (values) => {
        if (values) {
            navigate("/rich-crm/newcaseinfo");
        }
    }

    return (
        <Modal show={true} size="md" onClose={onClose} className="new-case-modal">
            <Modal.Header className="border-b-0">
                <div>
                <h2 className="mb-2 text-[28px] leading-9 font-medium text-secondary-800">New Case</h2>
                <p className="text-sm leading-5 text-secondary-700">Create a new case by filling the basic information.</p>
                </div>
            </Modal.Header>
            <Modal.Body>
                {/* <AuthFormContainer title="New Case" subtitle="Create a new case by filling the basic information."> */}
                    <Formik
                        initialValues={initialValues}
                        // validationSchema={validationSchema}
                        onSubmit={handleNewCaseInfo}
                        >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form onSubmit={handleSubmit} className="">
                                <div>
                                    <div className="mb-8">
                                        <div className="mb-2 block">
                                            <Label htmlFor="caseType" value="Case Type" />
                                            <SelectInput
                                                name="caseType"
                                                value={values.caseType}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                options={[
                                                    { value: "PremiseSelling", label: "Premise Selling" },
                                                    { value: "Selling", label: "Selling" },
                                                ]}
                                                inputClassName="bg-input-surface rounded-[40px] border-0 py-2 px-4 text-sm leading-6 mt-3"
                                            />
                                            {touched.caseType && errors.caseType ? (
                                                <div className="text-red-500 text-sm">{errors.caseType}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="mb-8">
                                    <Label htmlFor="clientFirstName" value="Client Information" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="mb-2 block">
                                            
                                            <TextInput
                                                name="clientfirstName"
                                                type="text"
                                                placeholder="Client First Name"
                                                value={values.clientfirstName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                field={{ name: "clientfirstName" }}
                                                form={{ errors, touched }}
                                            />
                                        </div>
                                        <div className="mb-2 block">
                                            
                                            <TextInput
                                                name="clientLastName"
                                                type="text"
                                                placeholder="Client Last Name"
                                                value={values.clientLastName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                field={{ name: "clientLastName" }}
                                                form={{ errors, touched }}
                                            />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="premiseInfo" value="Premise Information" />
                                        
                                        <TextInput
                                            name="address"
                                            type="text"
                                            placeholder="Address"
                                            value={values.address}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            field={{ name: "address" }}
                                            form={{ errors, touched }}
                                        />
                                        <TextInput
                                            name="addressLine2"
                                            type="text"
                                            placeholder="Address Line 2"
                                            value={values.addressLine2}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            field={{ name: "address" }}
                                            form={{ errors, touched }}
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                        <TextInput
                                            name="city"
                                            type="text"
                                            placeholder="City"
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            field={{ name: "city" }}
                                            form={{ errors, touched }}
                                        />
                                        <TextInput
                                            name="state"
                                            type="text"
                                            placeholder="State"
                                            value={values.state}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            field={{ name: "state" }}
                                            form={{ errors, touched }}
                                        />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-end mt-8">
                                    <XButton
                                        text={"Cancel"}
                                        disabled={isSubmitting}
                                        className="bg-card-300 text-sm text-secondary-800 py-[10px] px-6 rounded-[100px]"
                                    />
                                    <XButton
                                        type="submit"
                                        text={"Next"}
                                        disabled={isSubmitting}
                                        className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px] ml-4"
                                    />
                                </div>
                            </form>
                        )}
                    </Formik>
                {/* </AuthFormContainer> */}

            </Modal.Body>
        </Modal >
    );
};

export default NewCaseModal;
