import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { TextInput, XButton } from '../../../components'
import { IMAGES } from '../../../constants/imagePath'

export const ProfileSetting = ({ title }) => {
    return (
        <>
        
        <div className="bg-white p-4 rounded-2xl mb-5">
            {title && <div className="flex justify-between items-center mb-5">
                <span className="text-base text-secondary-800 font-medium">{title}</span>
            </div>}
            <ul className="card-details">

                <li>
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
                        <XButton
                            type="submit"
                            text="Save Changes"
                            // onClick={onSave}
                            className="bg-primary2 text-base text-white py-[10px] px-6 rounded-[100px]"
                        />
                    </div>
                </li>
                <li>
                    <span className={`left-txt flex items-center`}>Profile Photo</span>
                    <img
                          src={IMAGES.avatarpic}
                          alt="Profile"
                          className="rounded-full"
                          style={{ height: '150px', width: '150px' }}
                        />
                </li>
               

            </ul>
        </div>
        <div className="bg-white p-4 rounded-2xl mb-5">
         <div className="flex justify-between items-center mb-5">
                <span className="text-base text-secondary-800 font-medium">Contact</span>
            </div>
            <ul className='card-details'>
            <li>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="mb-2 block">
                            <span className={`left-txt flex items-center`}>Email Address</span>
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
                        <div className="mb-2 block">
                            <span className={`left-txt flex items-center`}>Phone</span>
                            <TextInput
                                name="Phone"
                                type="text"
                            // placeholder="Last Name"
                            // value={values.clientLastName}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            // field={{ name: "clientLastName" }}
                            // form={{ errors, touched }}
                            />
                        </div>
                        <XButton
                            type="submit"
                            text="Save Changes"
                            // onClick={onSave}
                            className="bg-primary2 text-base text-white py-[10px] px-6 rounded-[100px]"
                        />
                    </div>
                </li>

            </ul>
        </div>
        </>
    )
}
