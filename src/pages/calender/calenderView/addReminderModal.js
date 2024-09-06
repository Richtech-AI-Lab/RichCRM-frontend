import React, { useCallback, useEffect, useState } from "react";
import { Formik, ErrorMessage, Field } from "formik";
import { Label, Modal } from "flowbite-react";


import { debounce } from "lodash";



import TextInput from "../../../components/TextInput";
import { API_ENDPOINTS } from "../../../constants/api";
import { postRequest } from "../../../axios/interceptor";
import NewCaseDropdown from "../../../components/newcasedropdown";
import XButton from "../../../components/button/XButton";

const ReminderTypeOptions = [
  { value: 1, label: "Mortgage " },
  { value: 2, label: "Closing" },
];

const AddReminderModal = ({ onClose }) => {
  const [searchResults, setSearchResults] = useState([]);

  const debouncedFunction = useCallback(
    debounce(async (value) => {
      if (value != "" || value.length > 0) {
        const response = await postRequest(API_ENDPOINTS.FETCH_CLIENT_BY_QUERY, {
          keyword: value
        }
        )
        const filteredResults = response?.data?.data;
        setSearchResults(filteredResults);
      } else {
        setSearchResults([]);
      }
      // if (value != "" || value.length > 0) {
      //   const filteredResults = searchOption.filter(option =>
      //     option.firstName.toLowerCase().includes(value.toLowerCase())
      //   );
      //   setSearchResults(filteredResults);
      // } else {
      //   setSearchResults([]);
      // }
      // You can call any API or perform any other actions here
    }, 1000),
    []
  );
  const initialValues = {
    caseName: "",
    reminderType: "",
    dueDate: "",
    dueDateType: "",
    reminderTime: "",
    popupReminder: "",
    emailRemider: ""
  };
  const handleNewCaseInfo = async (values) => {
    console.log(values, "add modal")
    return true;
  };

  return (
    <>
      <Modal show={true} size="md" onClose={onClose} className="new-case-modal">
        <Modal.Header className="border-b-0">
          <div>
            <h2 className="mb-2 text-[28px] leading-9 font-medium text-secondary-800">
              Add a Reminder
            </h2>
            <p className="text-sm leading-5 text-secondary-700">
              Create a reminder by filling the basic information.
            </p>
          </div>
        </Modal.Header>
        <Modal.Body>
          {/* <AuthFormContainer title="New Case" subtitle="Create a new case by filling the basic information."> */}
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={handleNewCaseInfo}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (

              <form onSubmit={handleSubmit} className="">
                <div className="block">
                  <Label htmlFor="Case" value="Case" />
                  <div className="grid grid-cols-2 gap-x-3">
                    <div className="block">
                      <TextInput
                        name={`caseName`}
                        type="text"
                        placeholder="Enter Case Name"
                        value={values.caseName}
                        onChange={(e) => {
                          handleChange(e);
                          debouncedFunction(e.target.value);
                        }}
                        onBlur={handleBlur}
                        field={{
                          name: `caseName`,
                        }}
                        form={{ errors, touched }}
                      />

                      <ul className={'search-list-dropdown overflow-hidden rounded-2xl shadow-shadow-light-2'}>
                        {searchResults.map((item) => (
                          <li
                            className={'px-4 py-2 hover:bg-input-surface'}
                            // onClick={() => {
                            //   replace(index, {
                            //     isCard: true,
                            //     clientfirstName: item.firstName,
                            //     clientLastName: item.lastName,
                            //     clientcellNumber: item.cellNumber,
                            //     clientemail: item.email,
                            //   });
                            //   setSearchResults([]);
                            // }}
                            key={item.id} // Adding a key for each list item for better performance
                          >
                            <div className="flex items-center">
                              {/* <img src={avatar} className="w-8 mr-3" /> */}
                              <div>
                                <p className="text-base text-secondary-800">Case name</p>
                                <span className="text-text-gray-100 text-sm">707684</span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>


                      <ErrorMessage
                        name={`caseName`}
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="block">
                    <Label htmlFor="Reminder Type" value="Reminder Type" />
                      <div className="items-dropdown single-select mt-3">
                        <Field
                          as={NewCaseDropdown}
                          defaultLabel="Reminder Type"
                          name="reminderType"
                          value={values?.reminderType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          options={ReminderTypeOptions}
                          inputClassName="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                        />
                        {touched.reminderType && errors.reminderType ? (
                          <div className="text-red-500 text-sm">
                            {errors.reminderType}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                {/* <TextInput
                  name="address"
                  type="text"
                  placeholder="Address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  field={{ name: "address" }}
                  form={{ errors, touched }}
                />
                <TextInput
                  name="addressLine2"
                  type="text"
                  placeholder="Address Line 2 (Optional)"
                  value={values.addressLine2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  field={{ name: "addressLine2" }}
                  form={{ errors, touched }}
                /> */}

                <div className="text-end mt-8">
                  <XButton
                    text={"Cancel"}
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="bg-card-300 text-sm text-primary2 py-[10px] px-6 rounded-[100px]"
                  />
                  <XButton
                    type="submit"
                    text={"Create"}
                    disabled={isSubmitting}
                    className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px] ml-4"
                  />
                </div>
              </form>
            )}
          </Formik>
          {/* </AuthFormContainer> */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddReminderModal;
