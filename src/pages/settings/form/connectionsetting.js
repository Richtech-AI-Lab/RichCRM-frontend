import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import NewCaseDropdown from '../../../components/newcasedropdown'
import { TextInput, XButton } from '../../../components'
import { LangchainContext } from '../../dashboard/langchainContext';
import { DataStoreContext } from './dataStoreContext';
import { API_ENDPOINTS } from '../../../constants/api';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { postRequest } from '../../../axios/interceptor';
import { updateUserRequest } from '../../../redux/actions/authActions';
import { DefaultPathSetting } from '../../../components/defaultPathSetting';
import { GoogleSetting } from '../../../components/googleSetting';

export const ConnectionSetting = ({ title }) => {
    const dispatch = useDispatch();
    const { openaiAPIKey, setOpenaiAPIKey } = useContext(LangchainContext);
    const [openaiAPIKeyInput, setOpenaiAPIKeyInput] = useState(openaiAPIKey);

    const [uploadFolderUrlInput, setUploadFolderUrlInput] = useState(null);
    const [loader, setLoader] = useState(false);
    const { data } = useSelector((state) => state.auth.user);

    useEffect(()=>{
        setUploadFolderUrlInput(data[0]?.uploadFolderName)
    },[data])

    const onSave = () => {
        if (openaiAPIKeyInput && openaiAPIKeyInput.length > 0 && openaiAPIKeyInput.trim().length > 0) {
            setOpenaiAPIKey(openaiAPIKeyInput);
            // console.log('API Key set:', openaiAPIKeyInput);
        } else {
            console.error('API Key is empty');
        }
    }
    const onFolderSave = async () => {
        if (uploadFolderUrlInput && uploadFolderUrlInput.length > 0 && uploadFolderUrlInput.trim().length > 0) {
            const payload = {
                role: data[0]?.role,
                userName: data[0]?.userName,
                password: data[0]?.password,
                emailAddress: data[0]?.emailAddress,
                uploadFolderName: uploadFolderUrlInput
            };
            dispatch(updateUserRequest(payload))
            // console.log('Folder Key set:', uploadFolderUrlInput);
        } else {
            console.error('Folder Key is empty');
        }
    }
    
    return (
        <>
            <div className="bg-white p-4 rounded-2xl mb-5 shadow-card">
                {title && <div className="flex justify-between items-center mb-2">
                    <span className="text-base text-secondary-800 font-medium">ChatGPT Connection</span>
                </div>}
                <p className="mb-6">Mattis amet eu velit viverra aliquet porta at a. Auctor lectus tincidunt facilisis pellentesque maecenas enim sed dolor adipiscing.</p>
                <div>
                        <span className={`left-txt flex items-center`}>API Key</span>
                        <div className="flex items-center">
                            <div className="mb-2 flex-1 mr-4">
                                <TextInput
                                    name="API"
                                    type="text"
                                    placeholder="Enter API Key"
                                    value={openaiAPIKeyInput}
                                    onChange={(e) => {
                                        setOpenaiAPIKeyInput(e.target.value);
                                    }}
                                    
                                />
                            </div>
                            
                            <XButton
                                type="submit"
                                text="Link"
                                onClick={()=>{onSave()}}
                                className="bg-active-blue text-base text-active-blue-text py-[10px] px-6 rounded-[100px]"
                            />
                        </div>
                    </div>
            </div>
            <GoogleSetting />       
            <DefaultPathSetting />
        </>
    )
}
