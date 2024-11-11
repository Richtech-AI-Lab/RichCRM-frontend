import React, { useContext } from 'react'
import { useState } from 'react';
import NewCaseDropdown from '../../../components/newcasedropdown'
import { TextInput, XButton } from '../../../components'
import { LangchainContext } from '../../dashboard/langchainContext';
import { DataStoreContext } from './dataStoreContext';

export const ConnectionSetting = ({ title }) => {
    const { openaiAPIKey, setOpenaiAPIKey } = useContext(LangchainContext);
    const [openaiAPIKeyInput, setOpenaiAPIKeyInput] = useState(openaiAPIKey);
    
    const { uploadFolderUrlKey, setUploadFolderUrlKey } = useContext(DataStoreContext);
    const [uploadFolderUrlInput, setUploadFolderUrlInput] = useState(uploadFolderUrlKey);

    const onSave = () => {
        if (openaiAPIKeyInput && openaiAPIKeyInput.length > 0 && openaiAPIKeyInput.trim().length > 0) {
            setOpenaiAPIKey(openaiAPIKeyInput);
            console.log('API Key set:', openaiAPIKeyInput);
        } else {
            console.error('API Key is empty');
        }
    }

    const onFolderSave = () => {
        if (uploadFolderUrlInput && uploadFolderUrlInput.length > 0 && uploadFolderUrlInput.trim().length > 0) {
            setUploadFolderUrlKey(uploadFolderUrlInput);
            console.log('Folder Key set:', uploadFolderUrlInput);
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

            <div className="bg-white p-4 rounded-2xl mb-5 shadow-card">
                {title && <div className="flex justify-between items-center mb-2">
                    <span className="text-base text-secondary-800 font-medium">Upload Folder URL</span>
                </div>}
                <p className="mb-6">Please specify the folder name in which you want to save your data.</p>
                
                <div>
                        <span className={`left-txt flex items-center`}>Default Path</span>
                        <div className="flex items-center">
                            <div className="mb-2 flex-1 mr-4">
                                <TextInput
                                  disabled
                                    type="text"
                                    value={"https://graph.microsoft.com/v1.0/drive/root/"}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className={`left-txt flex items-center`}>Folder Name</span>
                        <div className="flex items-center">
                            <div className="mb-2 flex-1 mr-4">
                                <TextInput
                                    name="Path"
                                    type="text"
                                    placeholder="Enter Name"
                                    value={uploadFolderUrlInput}
                                    onChange={(e) => {
                                        setUploadFolderUrlInput(e.target.value);
                                    }}
                                    
                                />
                            </div>
                            
                            <XButton
                                type="submit"
                                text="Set"
                                onClick={()=>{onFolderSave()}}
                                className="bg-active-blue text-base text-active-blue-text py-[10px] px-6 rounded-[100px]"
                            />
                        </div>
                    </div>
            </div>
        </>
    )
}
