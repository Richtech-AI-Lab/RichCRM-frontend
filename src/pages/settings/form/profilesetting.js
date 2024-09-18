import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { TextInput, XButton } from '../../../components'
import { IMAGES } from '../../../constants/imagePath'

export const ProfileSetting = ({ title }) => {
    return (
        <>

            <div className="bg-white p-4 rounded-2xl mb-4 shadow-card">
                {title && <div className="flex justify-between items-center mb-6">
                    <span className="text-base text-secondary-800 font-medium">{title}</span>
                </div>}
                <div className="border-b border-badge-gray pb-3 mb-3">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-2 block">
                            <span className={`left-txt flex items-center`}>First Name</span>
                            <TextInput
                                name="clientfirstName"
                                type="text"
                            // placeholder="First Name"
                            // value={values.clientfirstName}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            // field={{ name: "clientfirstName" }}
                            // form={{ errors, touched }}
                            />
                        </div>
                        <div className="mb-2 block">
                            <span className={`left-txt flex items-center`}>Last Name</span>
                            <TextInput
                                name="clientLastName"
                                type="text"
                            // placeholder="Last Name"
                            // value={values.clientLastName}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            // field={{ name: "clientLastName" }}
                            // form={{ errors, touched }}
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <XButton
                            type="submit"
                            text="Save Changes"
                            // onClick={onSave}
                            className="bg-active-blue text-base text-active-blue-text py-[10px] px-6 rounded-[100px]"
                        />
                    </div>
                </div>
                <div>
                    <p className={`left-txt flex items-center mb-4 text-base text-secondary-800 font-medium`}>Profile Photo</p>
                    <div className="relative rounded-full inline-block overflow-hidden avatar-hover">
                        <img
                            src={IMAGES.avatarpic}
                            alt="Profile"
                            className="rounded-full"
                            style={{ height: '150px', width: '150px' }}
                        />
                        <div className="absolute bottom-0 edit-btn w-full">
                        <button className="bg-bg-gray-500 text-white py-2 w-full ">Edit</button>
                        <input className="w-full absolute bottom-0 left-0 opacity-0" id="file_input" type="file" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white p-4 rounded-2xl mb-4 shadow-card">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-base text-secondary-800 font-medium">Contact</span>
                </div>
                    <div className="border-b border-badge-gray pb-3 mb-3">
                        <span className={`left-txt flex items-center`}>Email Address</span>
                        <div className="flex items-center">
                            <div className="mb-2 flex-1 mr-4">
                                <TextInput
                                    name="Email"
                                    type="text"
                                // placeholder="First Name"
                                // value={values.clientfirstName}
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                                // field={{ name: "clientfirstName" }}
                                // form={{ errors, touched }}
                                />
                            </div>
                            <XButton
                                type="submit"
                                text="Update"
                                // onClick={onSave}
                                className="bg-active-blue text-base text-active-blue-text py-[10px] px-6 rounded-[100px]"
                            />
                        </div>
                    </div>
                    <div>
                        <span className={`left-txt flex items-center`}>Phone</span>
                        <div className="flex items-center">
                            <div className="mb-2 flex-1 mr-4">
                                <TextInput
                                    name="Phone"
                                    type="text"
                                // placeholder="First Name"
                                // value={values.clientfirstName}
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                                // field={{ name: "clientfirstName" }}
                                // form={{ errors, touched }}
                                />
                            </div>
                            <XButton
                                type="submit"
                                text="Update"
                                // onClick={onSave}
                                className="bg-active-blue text-base text-active-blue-text py-[10px] px-6 rounded-[100px]"
                            />
                        </div>
                    </div>
            </div >
        </>
    )
}
