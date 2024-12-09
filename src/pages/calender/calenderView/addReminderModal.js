import React, { useCallback, useEffect, useState } from "react";
import { Formik, ErrorMessage, Field } from "formik";
import { Checkbox, Datepicker, Label, Modal, Radio } from "flowbite-react";
import { debounce } from "lodash";
import * as Yup from "yup";
import TextInput from "../../../components/TextInput";
import { API_ENDPOINTS } from "../../../constants/api";
import { postRequest } from "../../../axios/interceptor";
import NewCaseDropdown from "../../../components/newcasedropdown";
import XButton from "../../../components/button/XButton";
import { getDateAfterDays, isValidDate, makeDate } from "../../../utils";
import { useDispatch } from "react-redux";
import { updateCaseDateRequest } from "../../../redux/actions/caseAction";
import { dayOption, monthOption, yearOption } from "../../../constants/constants";
import { toast } from "react-toastify";

const ReminderTypeOptions = [
  { value: 0, label: "Mortgage " },
  { value: 1, label: "Closing" },
];

const ReminderMortgageDueDaysOptions = [
  { value: 30, label: "30 Days From Today" },
  { value: 45, label: "45 Days From Today" },
];

const ReminderClosingDueDaysOptions = [
  { value: 60, label: "60 Days From Today" },
  { value: 90, label: "90 Days From Today" },
];
const ReminderTimeOptions = [
  { value: 7, label: "7 Days Before" },
  { value: 14, label: "14 Days Before" },
  { value: 30, label: "30 Days Before" },
];



const AddReminderModal = ({ onClose, reminderData }) => {
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

  const initialEditValues = {
    caseId: reminderData?.caseId,
    caseName: `${reminderData?.clientName}-${reminderData?.premisesName}`,
    reminderType: reminderData?.title == "Mortgage Due" ? 0 : 1,
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
    // console.log(values)
    let mainDate;
    let duedatetype = parseInt(values.dueDateType);

    // get date based on type
    if (duedatetype) {
      if (isValidDate(values.day, values.month, values.year)) {
        mainDate = makeDate(values.day, values.month, values.year);
      } else {
        toast.error("Please Enter Valid Date!")
        return true
      }
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
  const validationSchema = Yup.object({
    caseId: Yup.string().required('Case is required'),
    reminderType: Yup.string().required('Reminder Type is required'),
    dueDateType: Yup.string().required('Due Date Type is required'),
    dueDate: Yup.mixed().when('dueDateType', {
      is: (value) => value == 0,
      then: () => Yup.mixed().required('Due Date is required'),
      otherwise: () => Yup.mixed().notRequired(),
    }),
    year: Yup.mixed().when('dueDateType', {
      is: (value) => value == 1,
      then: () => Yup.mixed().required('Year is required'),
      otherwise: () => Yup.mixed().notRequired(),
    }),
    day: Yup.mixed().when('dueDateType', {
      is: (value) => value == 1,
      then: () => Yup.mixed().required('Day is required'),
      otherwise: () => Yup.mixed().notRequired(),
    }),
    month: Yup.mixed().when('dueDateType', {
      is: (value) => value == 1,
      then: () => Yup.mixed().required('Month is required'),
      otherwise: () => Yup.mixed().notRequired(),
    }),
  });

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
            initialValues={reminderData === null ? initialValues : initialEditValues}
            validationSchema={validationSchema}
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
                 {/* {console.log(errors)} */}
                <div className="block">
                  <Label htmlFor="Case" value="Case" />
                  <div className="grid grid-col">
                    <div className="block">
                      <TextInput
                        name={`caseName`}
                        type="text"
                        placeholder="Enter Case Name"
                        value={values.caseName}
                        autoComplete="off"
                        onChange={(e) => {
                          handleChange(e);
                          debouncedFunction(e.target.value);
                        }}
                        onBlur={handleBlur}
                        field={{
                          name: `caseId`,
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
                          onChange={handleChange}
                        />
                      </div>


                      <ul className={'search-list-dropdown overflow-hidden rounded-2xl shadow-shadow-light-2'}>
                        {searchResults.map((item, index) => (
                          <li
                            key={index} // Adding a key for each list item for better performance
                            className={'px-4 py-2 hover:bg-input-surface'}
                            onClick={() => {
                              setFieldValue('caseName', `${item.clientName}-${item.premisesName}`);
                              setFieldValue('caseId', item.caseId);
                              setSearchResults([]);
                            }}
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
                            {/* {touched.dueDateType && errors.dueDateType ? (
                              <div className="text-red-500 text-sm">
                                {errors.dueDateType}
                              </div>
                            ) : null} */}
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
                            options={values?.reminderType == 0 ? ReminderMortgageDueDaysOptions : ReminderClosingDueDaysOptions}
                            inputClassName="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                          />
                           {touched.dueDate && errors.dueDate ? (
                              <div className="text-red-500 text-sm">
                                {errors.dueDate}
                              </div>
                            ) : null}
                        </div>
                      ) : (
                        // Manual Filling
                        <div className="grid grid-cols-3 gap-4 mt-3">
                          <div className="items-dropdown single-select mt-3">
                            <Field
                              as={NewCaseDropdown}
                              defaultLabel="Select date"
                              name="day"
                              value={values?.day}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              options={dayOption}
                              inputClassName="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                            />
                            {touched.day && errors.day ? (
                              <div className="text-red-500 text-sm">
                                {errors.day}
                              </div>
                            ) : null}
                          </div>
                          <div className="items-dropdown single-select mt-3">
                            <Field
                              as={NewCaseDropdown}
                              defaultLabel="Select month"
                              name="month"
                              value={values?.month}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              options={monthOption}
                              inputClassName="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                            />
                            {touched.month && errors.month ? (
                              <div className="text-red-500 text-sm">
                                {errors.month}
                              </div>
                            ) : null}
                          </div>
                          <div className="items-dropdown single-select mt-3">
                            <Field
                              as={NewCaseDropdown}
                              defaultLabel="Select year"
                              name="year"
                              value={values?.year}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              options={yearOption}
                              inputClassName="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                            />
                            {touched.year && errors.year ? (
                              <div className="text-red-500 text-sm">
                                {errors.year}
                              </div>
                            ) : null}
                          </div>
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
                        {touched.reminderTime && errors.reminderTime ? (
                          <div className="text-red-500 text-sm">
                            {errors.reminderTime}
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
