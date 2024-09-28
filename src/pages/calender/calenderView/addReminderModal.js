import React, { useCallback, useEffect, useState } from "react";
import { Formik, ErrorMessage, Field } from "formik";
import { Checkbox, Datepicker, Label, Modal, Radio } from "flowbite-react";


import { debounce } from "lodash";



import TextInput from "../../../components/TextInput";
import { API_ENDPOINTS } from "../../../constants/api";
import { postRequest } from "../../../axios/interceptor";
import NewCaseDropdown from "../../../components/newcasedropdown";
import XButton from "../../../components/button/XButton";
import { getDateAfterDays } from "../../../utils";
import { useDispatch } from "react-redux";
import { updateCaseDateRequest } from "../../../redux/actions/caseAction";

const ReminderTypeOptions = [
  { value: 0, label: "Mortgage " },
  { value: 1, label: "Closing" },
];

const ReminderDueDaysOptions = [
  { value: 30, label: "30 Days From Today" },
  { value: 45, label: "45 Days From Today" },
];

const ReminderTimeOptions = [
  { value: 7, label: "7 Days Before" },
  { value: 14, label: "14 Days Before" },
  { value: 30, label: "30 Days Before" },
];



const AddReminderModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);

  const debouncedFunction = useCallback(
    debounce(async (value) => {
      if (value != "" || value.length > 0) {
        const response = await postRequest(API_ENDPOINTS.GET_CASES_BY_KEYWORD, {
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
    caseId: "",
    caseName: "",
    reminderType: "",
    dueDate: "",
    day: null,
    month: null,
    year: null,
    dueDateType: 0,
    reminderTime: "",
    // popupReminder: false,
    // emailReminder: false
  };
  const handleNewCaseInfo = async (values) => {
    let mainDate;
    let duedatetype = parseInt(values.dueDateType);

    // get date based on type
    if (duedatetype) {
      mainDate = getDateAfterDays(values.dueDate);
    } else {
      mainDate = getDateAfterDays(values.dueDate);
    }

    // get reminder type key name based on type
    let data;
    if (values.reminderType) {
      data = {
        closingDate: mainDate,
      }
    } else {
      data = {
        mortgageContingencyDate: mainDate,
      }
    }

    const payload = {
      caseId: values.caseId,
      ...data
    }
    dispatch(updateCaseDateRequest(payload))
    onClose()
  };

  return (
    <>
      <Modal show={true} size="md" onClose={onClose} className="new-case-modal">
        <Modal.Header className="border-b-0 pb-0">
          <div>
            <h2 className="mb-2 text-[28px] leading-9 font-medium text-secondary-800">
              Add a Reminder
            </h2>
            <p className="text-sm leading-5 text-secondary-700">
              Create a reminder by filling the basic information.
            </p>
          </div>
        </Modal.Header>
        <Modal.Body >
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
              setFieldValue
            }) => (

              <form onSubmit={handleSubmit} className="">
                <div className="block">
                  <Label htmlFor="Case" value="Case" />
                  <div className="grid grid-col">
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
                      <div className="hidden">

                        <TextInput
                          name={`caseId`}
                          type="text"
                          placeholder="Enter Case Name"
                          value={values.caseId}
                          field={{
                            name: `caseId`,
                          }}
                        />
                      </div>


                      <ul className={'search-list-dropdown overflow-hidden rounded-2xl shadow-shadow-light-2'}>
                        {searchResults.map((item) => (
                          <li
                            className={'px-4 py-2 hover:bg-input-surface'}
                            onClick={() => {
                              setFieldValue('caseName', `${item.clientName}-${item.premisesName}`);
                              setFieldValue('caseId', item.caseId);
                              setSearchResults([]);
                            }}
                            key={item.id} // Adding a key for each list item for better performance
                          >
                            <div className="flex items-center">
                              {/* <img src={avatar} className="w-8 mr-3" /> */}
                              {/* {console.log(item)} */}
                              <div>
                                <p className="text-base text-secondary-800">{item.clientName}</p>
                                <span className="text-text-gray-100 text-sm">{item.premisesName}</span>
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

                  <div className="grid grid-col mt-4">
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

                  <div className="grid grid-col gap-4 mt-4">
                    <div className="block">
                      <Label htmlFor="Due Day" value="Due Day" />
                      <div className="flex justify-between items-center w-full p-2">
                        <div className="flex justify-start items-center w-full gap-7">
                          <div className="grid grid-cols-2 gap-x-12">
                            {[
                              { id: 0, value: 0, label: "Auto Filling" },
                              { id: 1, value: 1, label: "Manual Filling" },
                            ].map((option) => (
                              <div className="flex items-center gap-2 custom-radio" key={option.id}>
                                <Radio
                                  id={option.id}
                                  name="dueDateType"
                                  value={option.value}
                                  checked={values.dueDateType == option.value}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="form-radio"
                                />
                                <Label
                                  htmlFor={option.id}
                                  className="flex items-center text-base text-label font-normal"
                                >
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Conditionally render date inputs or dropdown */}
                      {values.dueDateType == 0 ? (
                        // Auto Filling
                        <div className="items-dropdown single-select mt-3">
                          <Field
                            as={NewCaseDropdown}
                            defaultLabel="Due Day"
                            name="dueDate"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            options={ReminderDueDaysOptions}
                            inputClassName="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                          />
                          <ErrorMessage
                            name="dueDate"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      ) : (
                        // Manual Filling
                        <div className="grid grid-cols-3 gap-4 mt-3">
                          <TextInput
                            name="day"
                            type="number"
                            placeholder="Day"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.day}
                          />
                          <TextInput
                            name="month"
                            type="number"
                            placeholder="Month"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.month}
                          />
                          <TextInput
                            name="year"
                            type="number"
                            placeholder="Year"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.year}
                          />
                        </div>
                      )}

                    </div>
                  </div>

                  <div className="grid grid-col gap-4 mt-4">
                    <div className="block">
                      <Label htmlFor="Reminder Time" value="Reminder Time" />
                      <div className="items-dropdown single-select mt-3">
                        <Field
                          as={NewCaseDropdown}
                          defaultLabel="Select Reminder Time"
                          name="reminderTime"
                          // value={values?.duedate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          options={ReminderTimeOptions}
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

                  {/* <div className="flex flex-col gap-4 p-5">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="popupReminder"
                        name="popupReminder"
                        checked={values.popupReminder}
                        onChange={(e) => {
                          handleChange(e);

                          handleChange({
                            target: {
                              name: e.target.name,
                              value: e.target.checked
                            }
                          });
                        }}
                        onBlur={handleBlur} // Update Formik state when the checkbox is checked/unchecked
                        className="form-checkbox" // Optional: Apply custom Tailwind styling
                      />
                      <Label className="text-secondary-800">
                        Popup Window Reminder
                      </Label>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="emailReminder"
                        name="emailReminder"
                        checked={values.emailReminder}
                        onChange={(e) => {
                          handleChange(e);

                          handleChange({
                            target: {
                              name: e.target.name,
                              value: e.target.checked
                            }
                          });
                        }}
                        onBlur={handleBlur}
                        className="form-checkbox"
                      />
                      <Label className="text-secondary-800">
                        Email Reminder
                      </Label>
                    </div>
                  </div> */}
                </div>

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
