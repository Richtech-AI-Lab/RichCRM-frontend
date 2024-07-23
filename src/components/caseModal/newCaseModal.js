// import React from 'react'
// import { useState } from 'react';
// import { Formik } from "formik";
// import AuthFormContainer from '../authContainer';
// import SelectInput from '../selectinput';
// import TextInput from '../TextInput';
// import XButton from '../button/XButton';
// import XSpinnerLoader from '../spinnerLoader/XSpinnerLoader';

// export const NewCaseModal = () => {


//     return (
//         <div>
//             <AuthFormContainer title={'New Case'} subtitle={'Create a new case by filling the basic information.'}>
//             </AuthFormContainer>
//         </div>
//     )
// }

// export default NewCaseModal

// "use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import AuthFormContainer from "../authContainer";
import XButton from "../button/XButton";
import XSpinnerLoader from "../spinnerLoader/XSpinnerLoader";
import SelectInput from "../selectinput";

const NewCaseModal = ({ onClose }) => {

    const initialValues = {
        caseType: "",
        clientFirstName: "",
        clientLastName: "",
        address: "",
        addressLine2: "",
        city: "",
        state: ""
    };
    const validationSchema = Yup.object({
        caseType: Yup.string().required('Case Type is required'),
        clientFirstName: Yup.string().required('Client First Name is required'),
        clientLastName: Yup.string().required('Client Last Name is required'),
        address: Yup.string().required('Address is required'),
        addressLine2: Yup.string(),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
    });

    return (
        <Modal show={true} size="md" onClose={onClose} popup>
            <Modal.Header />
            <Modal.Body>
                <AuthFormContainer title="New Case" subtitle="Create a new case by filling the basic information.">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}>
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
                                                name=""
                                                value=""
                                                onChange={(e) => console.log(e.target.value)}
                                                options={[
                                                    { value: "PremiseSelling", label: "Premise Selling" },
                                                    { value: "Selling", label: "Selling" },
                                                ]}
                                                inputClassName="border-none rounded-lg py-[6px] px-[16px] bg-select text-select-text leading-5 font-semibold shadow-full"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="ClientInfo" value="Client Information" />
                                            <TextInput
                                                name="fName"
                                                type="text"
                                                placeholder="Client Fist name"
                                                value={values.clientFirstName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                field={{ name: "fName" }}
                                                form={{ errors, touched }}
                                            />
                                            <TextInput
                                                name="lName"
                                                type="text"
                                                placeholder="Client Last Name"
                                                value={values.clientLastName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                field={{ name: "lName" }}
                                                form={{ errors, touched }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="ClientInfo" value="Premise Information" />
                                        <TextInput
                                            name="address"
                                            type="text"
                                            placeholder="Address"
                                            value={values.address}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            field={{ name: "Address" }}
                                            form={{ errors, touched }}
                                        />
                                        <TextInput
                                            name="addressLine2"
                                            type="text"
                                            placeholder="Address Line 2"
                                            value={values.addressLine2}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            field={{ name: "Address Line 2" }}
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
                                        type="submit"
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

                                    {/* <XButton
                    onClick={handleRegisterClick}
                    text="Sign Up"
                    className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px]"
                  /> */}
                                </div>
                                {/* <p className="text-center text-sm font-medium text-secondary-700">Already have an account? <a className="ml-6 text-primary2" onClick={handleBackIcon}>Log in here</a></p> */}
                            </form>
                        )}
                    </Formik>
                </AuthFormContainer>

            </Modal.Body>
        </Modal >
    );
};

export default NewCaseModal;
