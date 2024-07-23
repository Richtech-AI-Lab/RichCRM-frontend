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
        console.log("exe")
        if (values) {
            navigate("/rich-crm/newcaseinfo");
        }
    }

    return (
        <Modal show={true} size="md" onClose={onClose} popup>
            <Modal.Header />
            <Modal.Body>
                <AuthFormContainer title="New Case" subtitle="Create a new case by filling the basic information.">
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
                            <form onSubmit={handleSubmit} className="login-form">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
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
                                                inputClassName="border-none rounded-lg py-[6px] px-[16px] bg-select text-select-text leading-5 font-semibold shadow-full"
                                            />
                                            {touched.caseType && errors.caseType ? (
                                                <div className="text-red-500 text-sm">{errors.caseType}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="clientFirstName" value="Client Information" />
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
                                <div className="text-center mb-8 mt-6">
                                    <XButton
                                        text={"Cancel"}
                                        disabled={isSubmitting}
                                        className="bg-primary text-sm text-white py-[10px] px-6 w-[145px] rounded-[100px]"
                                    />
                                    <XButton
                                        type="submit"
                                        text={"Next"}
                                        disabled={isSubmitting}
                                        className="bg-primary text-sm text-white py-[10px] px-6 w-[145px] rounded-[100px]"
                                    />
                                </div>
                            </form>
                        )}
                    </Formik>
                </AuthFormContainer>

            </Modal.Body>
        </Modal >
    );
};

export default NewCaseModal;
