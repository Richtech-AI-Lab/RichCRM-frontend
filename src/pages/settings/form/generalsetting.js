import React from 'react'
import NewCaseDropdown from '../../../components/newcasedropdown'
import language from "../../../constants/language.json";
import timezone from "../../../constants/timezone.json";

export const GeneralSetting = ({ title }) => {
  return (
    <>

      <div className="bg-white rounded-2xl mb-5 shadow-card">
        {title && <div className="flex flex-col p-4 justify-center items-start gap-2 self-stretch">
          <span className="text-base font-bold">Language & Region</span>
          <p className="text-sm font-normal">Mattis amet eu velit viverra aliquet porta at a. Auctor lectus tincidunt facilisis pellentesque maecenas enim sed dolor adipiscing.</p>
        </div>}

        <div className="flex justify-between items-center border-b border-badge-gray px-4 py-3">
          <span className={`left-txt flex items-center text-base font-medium`}>Language</span>
          <div className={`items-dropdown single-select gray-btn `}  >
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
        <div className="flex justify-between items-center px-4 py-3">
          <span className={`left-txt flex items-center text-base font-medium`}>Time Zone</span>
          <div className={`items-dropdown single-select gray-btn`}  >
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
      </div>

      <div className="bg-white rounded-2xl mb-5 shadow-card">
        {title && <div className="flex flex-col p-4 justify-center items-start gap-2 self-stretch">
          <span className="text-base font-bold">Display</span>
          <p className="text-sm font-normal">Mattis amet eu velit viverra aliquet porta at a. Auctor lectus tincidunt facilisis pellentesque maecenas enim sed dolor adipiscing.</p>
        </div>}

        <div className="flex justify-between items-center border-b border-badge-gray px-4 py-3">
          <span className={`left-txt flex items-center text-base font-medium`}>Display Mode</span>
          <div className={`items-dropdown single-select gray-btn `}  >
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
      </div>
    </>
  )
}
