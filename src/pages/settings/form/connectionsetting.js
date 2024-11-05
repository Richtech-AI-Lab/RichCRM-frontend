import React from 'react'
import NewCaseDropdown from '../../../components/newcasedropdown'
import { TextInput, XButton } from '../../../components'
import language from "../../../constants/language.json";
import timezone from "../../../constants/timezone.json";

export const ConnectionSetting = ({ title }) => {
    return (
        <>
            <div className="bg-white p-4 rounded-2xl mb-5 shadow-card">
                {title && <div className="flex justify-between items-center mb-2">
                    <span className="text-base text-secondary-800 font-medium">ChatGPT Connection</span>
                </div>}
                <p className="mb-6">Mattis amet eu velit viverra aliquet porta at a. Auctor lectus tincidunt facilisis pellentesque maecenas enim sed dolor adipiscing.</p>
                <div>
                        <span className={`left-txt flex items-center`}>API</span>
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
                                text="Link"
                                // onClick={onSave}
                                className="bg-active-blue text-base text-active-blue-text py-[10px] px-6 rounded-[100px]"
                            />
                        </div>
                    </div>
            </div>
        </>
    )
}
