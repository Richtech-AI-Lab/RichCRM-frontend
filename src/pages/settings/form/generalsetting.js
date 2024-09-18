import React from 'react'
import NewCaseDropdown from '../../../components/newcasedropdown'
import language from "../../../constants/language.json";
import timezone from "../../../constants/timezone.json";

export const GeneralSetting = ({title}) => {
  return (
    <>
        
    <div className="bg-white p-4 rounded-2xl mb-5">
        {title && <div className="flex justify-between items-center mb-5">
            <span className="text-base text-secondary-800 font-medium">{title}</span>
            </div>}
            <span className="">Mattis amet eu velit viverra aliquet porta at a. Auctor lectus tincidunt facilisis pellentesque maecenas enim sed dolor adipiscing.</span>
        
        <ul className="card-details">

            <li>
                    <div className="mb-2 block">
                        <span className={`left-txt flex items-center`}>Language</span>
                        <div className={`items-dropdown single-select mt-3`}  >                      
                        <NewCaseDropdown
                        defaultLabel="Select State"
                        name="state"
                        // value={values.state}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        options={language}
                        // field={{ name: "state" }}
                        // form={{ errors, touched }}
                      />
                      </div>
                    </div>
            </li>
            <li>
                <div className="mb-2 block">
                        <span className={`left-txt flex items-center`}>Time Zone</span>
                        <div className={`items-dropdown single-select mt-3`}  >                      
                        <NewCaseDropdown
                        defaultLabel="Select State"
                        name="timezone"
                        // value={values.state}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        options={timezone}
                        // field={{ name: "state" }}
                        // form={{ errors, touched }}
                      />
                      </div>
                    </div>
            </li>

        </ul>
    </div>
    <div className="bg-white p-4 rounded-2xl mb-5">
       <div className="flex justify-between items-center mb-5">
            <span className="text-base text-secondary-800 font-medium">Display</span>
            </div>
            <span className="">Mattis amet eu velit viverra aliquet porta at a. Auctor lectus tincidunt facilisis pellentesque maecenas enim sed dolor adipiscing.</span>

        
        <ul className="card-details">

            <li>
                    <div className="mb-2 block">
                        <span className={`left-txt flex items-center`}>Display Mode</span>
                        <div className={`items-dropdown single-select mt-3`}  >                      
                        <NewCaseDropdown
                        defaultLabel="Select State"
                        name="state"
                        // value={values.state}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        options={language}
                        // field={{ name: "state" }}
                        // form={{ errors, touched }}
                      />
                      </div>
                    </div>
            </li>
        </ul>
    </div>
    </>
  )
}
