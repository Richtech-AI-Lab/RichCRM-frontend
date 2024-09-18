import React from 'react'
import NewCaseDropdown from '../../../components/newcasedropdown'
import { TextInput, XButton } from '../../../components'
import language from "../../../constants/language.json";
import timezone from "../../../constants/timezone.json";

export const LinkSetting = ({title}) => {
  return (
    <>
        
    <div className="bg-white p-4 rounded-2xl mb-5">
        {title && <div className="flex justify-between items-center mb-5">
            <span className="text-base text-secondary-800 font-medium">{title}</span>
            </div>}
            <span className="">Mattis amet eu velit viverra aliquet porta at a. Auctor lectus tincidunt facilisis pellentesque maecenas enim sed dolor adipiscing.</span>
        
        <ul className="card-details">

            <li>
            <span className={`left-txt flex items-center`}>Connected Platform</span>
            <NewCaseDropdown
                        defaultLabel="Select Platform"
                        name="platform"
                        // value={values.state}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        options={timezone}
                        // field={{ name: "state" }}
                        // form={{ errors, touched }}
                      />
            </li>
            <li>                        
                        <div className="mb-2 block">
                        <span className={`left-txt flex items-center`}>API</span>
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
                            text="Link"
                            // onClick={onSave}
                            className="bg-primary2 text-base text-white py-[10px] px-6 rounded-[100px]"
                        />
            </li>

        </ul>
    </div>
    </>
  )
}
