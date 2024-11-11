import React, { useState } from 'react'
import NewCaseDropdown from '../../../components/newcasedropdown'
import { TextInput, XButton } from '../../../components'
import language from "../../../constants/language.json";
import timezone from "../../../constants/timezone.json";

export const SecuritySetting = ({ title }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
           {  !isOpen && <div className="bg-white p-4 rounded-2xl mb-5 shadow-card">
                {title && <div className="flex justify-between items-center mb-2">
                    <span className="text-base text-secondary-800 font-medium">Password</span>
                </div>}
                <p className="mb-6">Change the password whenever you log in</p>

                <div>
                    <XButton
                        type="submit"
                        text="Change Password"
                        onClick={()=>{setIsOpen(true)}}
                        className="bg-active-blue text-base text-active-blue-text py-[10px] px-6 rounded-[100px]"
                    />
                </div>
            </div>}

           { isOpen && <div className="bg-white p-4 rounded-2xl mb-5 shadow-card">
                {title && <div className="flex justify-between items-center mb-2">
                    <span className="text-base text-secondary-800 font-medium">Password</span>
                </div>}
                <p className="mb-6">Create a new password that is atleast 8 characters long.</p>

                <div className='mb-5'>
                    <span className={`left-txt flex items-center`}>Type your current password*</span>
                    <div className="flex items-center">
                        <div className="mb-2 flex-1 mr-4">
                            <TextInput
                                name="Phone"
                                type="text"
                                placeholder="Current password"
                            // value={values.clientfirstName}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            // field={{ name: "clientfirstName" }}
                            // form={{ errors, touched }}
                            />
                        </div>
                    </div>
                </div>
                <div className='mb-5'>
                    <span className={`left-txt flex items-center`}>Type your new password*</span>
                    <div className="flex items-center">
                        <div className="mb-2 flex-1 mr-4">
                            <TextInput
                                name="Phone"
                                type="text"
                                placeholder="New password"
                            // value={values.clientfirstName}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            // field={{ name: "clientfirstName" }}
                            // form={{ errors, touched }}
                            />
                        </div>
                    </div>
                </div>
                <div className='mb-5'>
                    <span className={`left-txt flex items-center`}>Retype your new password*</span>
                    <div className="flex items-center">
                        <div className="mb-2 flex-1 mr-4">
                            <TextInput
                                name="Phone"
                                type="text"
                                placeholder="Confirm password"
                            // value={values.clientfirstName}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            // field={{ name: "clientfirstName" }}
                            // form={{ errors, touched }}
                            />
                        </div>
                    </div>
                </div>
                <div>

                    <XButton
                        type="submit"
                        text="Update Password"
                        onClick={()=>{setIsOpen(false)}}
                        className="bg-active-blue text-base text-active-blue-text py-[10px] px-6 rounded-[100px]"
                    />
                </div>
            </div>}
        </>
    )
}
