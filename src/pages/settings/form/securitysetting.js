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
import { Spinner } from 'flowbite-react';

export const SecuritySetting = ({ title }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const { data } = useSelector((state) => state.auth.user);
    const initialValues = {};
    const validationSchema = Yup.object({
        currentPassword: Yup.string().required('Current password is required'),
        newPassword: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('New password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Password must match')
            .required('Confirm password is required')
    });
    const handleSubmit = async (values, { setSubmitting }) => {
        setLoader(true)
        const payload = {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
            emailAddress: data[0]?.emailAddress,
        };

        try {
            const response = await postRequest(API_ENDPOINTS.CHANGE_PASSWORD, payload);
            if (response.status === 200) {
                toast.success("Password Changed!");
                setIsOpen(false); // Close form on success
            }
        } catch (error) {
            toast.error("Failed to update password. Please try again.");
            console.error("Error updating password:", error);
        } finally {
            setSubmitting(false);
        }
        setLoader(false)
    };
    return (
        <>
            <XSpinnerLoader loading={loader} size="lg" />
            {!isOpen && <div className="bg-white rounded-2xl mb-5 shadow-card">
                {true && (
                    <div className="flex flex-col p-4 justify-center items-start gap-2 self-stretch">
                        <span className="text-base font-bold">Password</span>
                        <p className="text-sm font-normal">Change the password whenever you log in</p>
                    </div>
                )}
                {/* <p className="mb-6">Change the password whenever you log in</p> */}

                <div className='flex items-center px-4 py-3 self-stretch'>
                    <XButton
                        type="submit"
                        text="Change Password"
                        onClick={() => { setIsOpen(true) }}
                        className="bg-active-blue text-base text-active-blue-text py-[10px] px-6 rounded-[100px]"
                    />
                </div>
            </div>}

            {isOpen && (
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    // innerRef={formikRef}
                    onSubmit={handleSubmit}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        dirty,
                        setFieldValue,
                    }) => {
                        // setDirtyFormnik(dirty);
                        return (
                            <form onSubmit={handleSubmit} className="premises-form bg-white rounded-2xl mb-5 shadow-card">
                                {true && (
                                    <div className="flex flex-col p-4 justify-center items-start gap-2 self-stretch">
                                        <span className="text-base font-bold">Password</span>
                                        <p className="text-sm font-normal">Create a new password that is at least 8 characters long.</p>
                                    </div>
                                )}
                                <div className='flex flex-col px-4 py-3 justify-center items-start gap-10 self-stretch'>
                                    <div className='flex flex-col items-start gap-4 self-stretch'>


                                        <div className="flex flex-col">
                                            <span className="left-txt flex items-center text-base font-medium">Type your current password*</span>
                                            <div className="flex items-center">
                                                <div className="mb-2 flex-1 mr-4">
                                                    <TextInput
                                                        name="currentPassword"
                                                        type="password"
                                                        placeholder="Current password"
                                                        value={values.currentPassword}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        field={{ name: "currentPassword" }}
                                                        form={{ errors, touched }}
                                                    />

                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="left-txt flex items-center text-base font-medium">Type your new password*</span>
                                            <div className="flex items-center">
                                                <div className="mb-2 flex-1 mr-4">
                                                    <TextInput
                                                        name="newPassword"
                                                        type="password"
                                                        placeholder="New password"
                                                        value={values.newPassword}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        field={{ name: "newPassword" }}
                                                        form={{ errors, touched }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="left-txt flex items-center text-base font-medium">Retype your new password*</span>
                                            <div className="flex items-center">
                                                <div className="mb-2 flex-1 mr-4">
                                                    <TextInput
                                                        name="confirmPassword"
                                                        type="password"
                                                        placeholder="Confirm password"
                                                        value={values.confirmPassword}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        field={{ name: "confirmPassword" }}
                                                        form={{ errors, touched }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div>
                                        <XButton
                                            type="submit"
                                            text="Update Password"
                                            className="bg-active-blue text-base text-active-blue-text py-[10px] px-6 rounded-[100px]"
                                        />
                                    </div>
                                </div>
                            </form>
                        );
                    }}
                </Formik>
            )}

        </>
    )
}
