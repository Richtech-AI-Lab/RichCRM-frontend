import React, { useState, useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { TextInput, XButton } from '../../../components'
import { IMAGES } from '../../../constants/imagePath'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthUserRequest, updateUserRequest } from '../../../redux/actions/authActions'

export const ProfileSetting = ({ title }) => {
    const profileData = useSelector((state) => state.profileData);
    const dispatch = useDispatch()
    const currentUserInfo = useSelector((state) => state.auth.user);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        title: '',
        company: '',
        email: '',
        cellPhone: '',
        workPhone: '',
        website: '',
        mailingAddress: '',
    });

    useEffect(() => {
        if (profileData) {
            setFormData({
                firstName: profileData.firstName || '',
                lastName: profileData.lastName || '',
                title: profileData.title || '',
                company: profileData.company || '',
                email: profileData.email || '',
                cellPhone: profileData.cellPhone || '',
                workPhone: profileData.workPhone || '',
                lastName: profileData.lastName || '',
                website: profileData.website || '',
                mailingAddress: profileData.mailingAddress || '',
            });
        }
        dispatch(getAuthUserRequest());
    },[dispatch, profileData]);

    console.log("this is current user Info", currentUserInfo);

    const onSave = () => {
        dispatch(updateUserRequest(formData)) 
        console.log("Saving profile data:", formData)
    }

    return (
        <>
        { /* Profile Section */ }
            <div className="bg-white p-4 rounded-2xl mb-4 shadow-card">
                { title && <div className="flex flex-col justify-center items-start gap-2 self-stretch mb-6">
                    <span className="text-base font-bold">{title}</span>
                </div> }
                <div className="border-b border-badge-gray pb-3 mb-3">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-2 block">
                            <span className={`left-txt flex items-center`}>First Name</span>
                            <TextInput name="clientfirstName" 
                                       //type="text"
                                       value={formData.firstName}
                                       onChange={(e) => setFormData({...formData, firstName: e.target.value})}
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
                            <TextInput name="clientLastName" 
                                       //type="text"
                                       value={formData.lastName}
                                       onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            // placeholder="Last Name"
                            // value={values.clientLastName}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            // field={{ name: "clientLastName" }}
                            // form={{ errors, touched }}
                            />
                        </div>
                    </div>
                </div>
                <div className="border-b border-badge-gray pb-3 mb-3">
                    <span className={`left-txt flex items-center`}>Title</span>
                    <div className="flex items-center">
                    <div className="mb-2 flex-1 mr-4">
                        <TextInput name="Title"
                                    //type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                    </div>
                    </div>
                </div>
                <div>
                    <span className={`left-txt flex items-center`}>Company</span>
                    <div className="flex items-center">
                    <div className="mb-2 flex-1 mr-4">
                        <TextInput name="Company" 
                                    //type="text"
                                    value={formData.company}
                                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                        />
                    </div>
                    </div>
                </div>
                <div className="mt-4">
                    <XButton
                        type="submit"
                        text="Save All Changes"
                        onClick={onSave}
                        className="shadow-shadow-light bg-active-blue text-base text-active-blue-text py-[10px] px-6 rounded-[100px]"
                    />
                </div>
                
                {/* <div>
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
                </div> */}
            </div>
            { /* Contacts Section */ }
            <div className="bg-white p-4 rounded-2xl mb-4 shadow-card">
                <div className="flex flex-col justify-center items-start gap-2 self-stretch mb-6">
                    <span className="text-base font-bold">Contacts</span>
                </div>
                    <div className="border-b border-badge-gray pb-3 mb-3">
                        <span className={`left-txt flex items-center`}>Email Address</span>
                        <div className="flex items-center">
                            <div className="mb-2 flex-1 mr-4">
                                <TextInput
                                    name="Email"
                                    //type="text"
                                    defaultValue={currentUserInfo?.data[0].emailAddress}
                                    //value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                // placeholder="First Name"
                                // value={values.clientfirstName}
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                                // field={{ name: "clientfirstName" }}
                                // form={{ errors, touched }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-badge-gray pb-3 mb-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-2 block">
                                <span className={`left-txt flex items-center`}>Cell Phone</span>
                                <TextInput name="cellPhone" 
                                        //type="text"
                                        value={formData.cellPhone}
                                        onChange={(e) => setFormData({...formData, cellPhone: e.target.value})}
                                />
                            </div>
                            <div className="mb-2 block">
                                <span className={`left-txt flex items-center`}>Work Phone</span>
                                <TextInput name="workPhone" 
                                        //type="text"
                                        value={formData.workPhone}
                                        onChange={(e) => setFormData({...formData, workPhone: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-badge-gray pb-3 mb-3">
                        <span className={`left-txt flex items-center`}>Website</span>
                        <div className="flex items-center">
                            <div className="mb-2 flex-1 mr-4">
                                <TextInput name="Webiste" 
                                           //type="text"
                                           value={formData.website}
                                           onChange={(e) => setFormData({...formData, website: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className={`left-txt flex items-center`}>Mailing Address</span>
                        <div className="flex items-center">
                            <div className="mb-2 flex-1 mr-4">
                                <TextInput name="mailingAddress" 
                                           //type="text"
                                           value={formData.mailingAddress}
                                           onChange={(e) => setFormData({...formData, mailingAddress: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <XButton
                            type="submit"
                            text="Save All Changes"
                            onClick={onSave}
                            className="shadow-shadow-light bg-active-blue text-base text-active-blue-text py-[10px] px-6 rounded-[100px]"
                        />
                    </div>
            </div >
        </>
    )
}
