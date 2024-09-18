import React from 'react'
import NewCaseDropdown from '../../../components/newcasedropdown'
import language from "../../../constants/language.json";
import timezone from "../../../constants/timezone.json";

export const GeneralSetting = ({ title }) => {
  return (
    <>

      <div className="bg-white p-4 rounded-2xl mb-5 shadow-card">
        {title && <div className="flex justify-between items-center mb-2">
          <span className="text-base text-secondary-800 font-medium">Language & Region</span>
        </div>}
        <p className="mb-6">Mattis amet eu velit viverra aliquet porta at a. Auctor lectus tincidunt facilisis pellentesque maecenas enim sed dolor adipiscing.</p>

        <div className="flex justify-between items-center border-b border-badge-gray pb-3 mb-3">
          <span className={`left-txt flex items-center`}>Language</span>
          <div className={`items-dropdown single-select gray-btn`}  >
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
        <div className="flex justify-between items-center">
          <span className={`left-txt flex items-center`}>Time Zone</span>
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
      <div className="bg-white p-4 rounded-2xl mb-5 shadow-card">
        <div className="flex justify-between items-center mb-2">
          <span className="text-base text-secondary-800 font-medium">Display</span>
        </div>
        <p className="mb-6">Mattis amet eu velit viverra aliquet porta at a. Auctor lectus tincidunt facilisis pellentesque maecenas enim sed dolor adipiscing.</p>

            <div className="mb-2 flex justify-between items-center">
              <span className={`left-txt flex items-center`}>Display Mode</span>
              <div className={`items-dropdown single-select gray-btn`}  >
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
