import React, { useEffect, useState } from "react";
import { SelectInput } from "../../../components";
import { Field } from "formik";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IMAGES } from "../../../constants/imagePath";
import states from "../../../constants/states.json"


const AdditionalClientForm = ({ title, client, form, setFieldValue, handleChange, handleBlur }) => {
  const [optionalFields, setOptionalFields] = useState({
    workNumber: false,
    wechatAccount: false,
    whatsAppNumber: false,
    lineNumber: false,
  });

  useEffect(() => {
    // Initialize optional fields for each client when the client data is available
    const initialFields = client?.reduce((acc, item, index) => {
      acc[index] = {
        workNumber: !!item.workNumber,
        wechatAccount: !!item.wechatAccount,
        whatsAppNumber: !!item.whatsAppNumber,
        lineNumber: !!item.lineNumber,
      };
      return acc;
    }, {});
    setOptionalFields(initialFields);
  }, [client]);

  const handleAddField = (field, index) => {
    setOptionalFields(prevState => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        [field]: true,
      },
    }));
  };

  const handleRemoveField = (field, index, setFieldValue) => {
    setOptionalFields(prevState => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        [field]: false,
      },
    }));
    setFieldValue(`additionalClientData[${index}].${field}`, '');  // Clear the value when removing
  };


  return (
    <>
      {client?.map((item, index) =>
        <div className="bg-white p-4 rounded-2xl mb-5">
          {title && <div className="flex justify-between items-center mb-5">
            <span className="text-base text-secondary-800 font-bold">{title}(client)</span>
            <div className="flex items-center gap-2">
              <BsThreeDotsVertical className="text-lg opacity-40" />
            </div>
          </div>}
          <ul className="card-details">
            <li>
              <span className={`left-txt flex items-center`}>Name</span>
              {form?.errors["name"] && form?.touched["name"] && (
                <span className="text-sm text-red-500">{form.errors["name"]}</span>
              )}
              <input
                className="p-0 border-none focus:ring-transparent"
                // name="name"
                name={`additionalClientData[${index}].name`}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={item.name}
              /></li>
            <li>
              <span className={`left-txt flex items-center`}>SSN</span>
              <input
                className="p-0 border-none focus:ring-transparent"
                onChange={handleChange}
                onBlur={handleBlur}
                name={`additionalClientData[${index}].ssn`}
                type="text"
                value={item.ssn}
              /></li>
            <li>
              <span className={`left-txt flex items-center`}>Email</span>
              {form?.errors["email"] && form?.touched["email"] && (
                <span className="text-sm text-red-500">{form.errors["email"]}</span>
              )}
              <input
                className="p-0 border-none focus:ring-transparent"
                name={`additionalClientData[${index}].email`}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={item.email}
              /></li>
            <li>
              <span className={`left-txt flex items-center`}>Cell Phone</span>
              {form?.errors["cellNumber"] && form?.touched["cellNumber"] && (
                <span className="text-sm text-red-500">{form.errors["cellNumber"]}</span>
              )}
              <input
                className="p-0 border-none focus:ring-transparent"
                name={`additionalClientData[${index}].cellNumber`}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={item.cellNumber}
              /></li>

            <li>
              {optionalFields[index]?.workNumber && (
                <>
                  <span className={"cursor-pointer left-txt flex items-center"} onClick={() => handleRemoveField('workNumber', index, setFieldValue)} >
                    <span className="icon mr-2"> <img src={IMAGES.removeIcon} alt="icon" /> </span>
                    Work Phone
                  </span>
                  <input
                    className="p-0 border-none focus:ring-transparent"
                    name={`additionalClientData[${index}].workNumber`}
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={item?.workNumber}
                  />
                </>
              )}
              {!optionalFields[index]?.workNumber && (<span className="left-txt flex items-center" onClick={() => handleAddField('workNumber', index)} >
                <span className="icon mr-2 cursor-pointer">
                  <img
                    src={IMAGES.addIcon}
                    alt="icon"
                  />
                </span>
                Add Work Phone
              </span>)}
            </li>

            <li>
              {optionalFields[index]?.wechatAccount && (

                <>
                  <span className={"cursor-pointer left-txt flex items-center"} onClick={() => handleRemoveField('wechatAccount', index, setFieldValue)} >
                    <span className="icon mr-2"> <img src={IMAGES.removeIcon} alt="icon" /> </span>
                    WeChat
                  </span>
                  <input
                    className="p-0 border-none focus:ring-transparent"
                    name={`additionalClientData[${index}].wechatAccount`}
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={item?.wechatAccount}
                  />
                </>
              )}
              {!optionalFields[index]?.wechatAccount && (<span className="left-txt flex items-center" onClick={() => handleAddField('wechatAccount', index)} >
                <span className="icon mr-2 cursor-pointer">
                  <img
                    src={IMAGES.addIcon}
                    alt="icon"
                  />
                </span>
                Add WeChat
              </span>)}
            </li>


            <li>
              {optionalFields[index]?.whatsAppNumber && (

                <>
                  <span className={"cursor-pointer left-txt flex items-center"} onClick={() => handleRemoveField('whatsAppNumber', index, setFieldValue)} >
                    <span className="icon mr-2"> <img src={IMAGES.removeIcon} alt="icon" /> </span>
                    WhatsApp
                  </span>
                  <input
                    className="p-0 border-none focus:ring-transparent"
                    name={`additionalClientData[${index}].whatsAppNumber`}
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={item?.whatsAppNumber}
                  />
                </>
              )}
              {!optionalFields[index]?.whatsAppNumber && (<span className="left-txt flex items-center" onClick={() => handleAddField('whatsAppNumber', index)} >
                <span className="icon mr-2 cursor-pointer">
                  <img
                    src={IMAGES.addIcon}
                    alt="icon"
                  />
                </span>
                Add WhatsApp
              </span>)}
            </li>



            <li>
              {optionalFields[index]?.lineNumber && (

                <>
                  <span className={"cursor-pointer left-txt flex items-center"} onClick={() => handleRemoveField('lineNumber', index, setFieldValue)}> 
                    <span className="icon mr-2"> <img src={IMAGES.removeIcon} alt="icon" /> </span>
                    Line
                  </span>
                  <input
                    className=" p-0 border-none focus:ring-transparent"
                    name={`additionalClientData[${index}].lineNumber`}
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={item?.lineNumber}
                  />
                </>
              )}
              {!optionalFields[index]?.lineNumber && (<span className="left-txt flex items-center"  onClick={() => handleAddField('lineNumber', index)} >
                <span className="icon mr-2 cursor-pointer">
                  <img
                    src={IMAGES.addIcon}
                    alt="icon"
                  />
                </span>
                Add Line
              </span>)}
            </li>
            <li>
              <span className={`left-txt flex items-center`}>Street Name</span>
              {form?.errors["addressLine1"] && form?.touched["addressLine1"] && (
                <span className="text-sm text-red-500">{form.errors["addressLine1"]}</span>
              )}
              <input
                className=" p-0 border-none focus:ring-transparent"
                name={`additionalClientData[${index}].addressLine1`}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={item.addressLine1}
              /></li>
            <li>
              <span className={`left-txt flex items-center`}>Apt, suite, floor, or unit # (optional)</span>
              <input
                className=" p-0 border-none focus:ring-transparent"
                name={`additionalClientData[${index}].addressLine2`}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={item.addressLine2}
              /></li>
            <li>
              <span className={`left-txt flex items-center`}>City</span>
              {form?.errors["city"] && form?.touched["city"] && (
                <span className="text-sm text-red-500">{form.errors["city"]}</span>
              )}
              <input
                className=" p-0 border-none focus:ring-transparent"
                name={`additionalClientData[${index}].city`}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={item.city}
              /></li>
            <li>
              <div className="flex justify-between items-center w-full">
                <span className="left-txt w-full">State</span>
                {form?.errors["state"] && form?.touched["state"] && (
                  <span className="text-sm text-red-500 w-full">{form.errors["state"]}</span>
                )}
                <div className="flex justify-end items-center w-full gap-7">
                  <div className="grid gap-3">
                    <Field
                      as={SelectInput}
                      defaultLabel={`Select State`}
                      inputClassName="bg-input-surface py-[6px] px-4 rounded-full border-0 text-sm leading-5 font-semibold text-label"
                      labelClassName="ext-label mr-3"
                      name={`additionalClientData[${index}].state`}
                      value={item.state}
                      options={states.map((option) => ({
                        value: option.id,
                        label: option.label,
                      }))}
                    />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <span className={`left-txt flex items-center`}>Zip Code</span>
              {form?.errors["zipCode"] && form?.touched["zipCode"] && (
                <span className="text-sm text-red-500">{form.errors["zipCode"]}</span>
              )}
              <input
                className=" p-0 border-none focus:ring-transparent"
                name={`additionalClientData[${index}].zipCode`}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={item.zipCode}
              /></li>


          </ul>
        </div>

      )}
    </>
  );
};

export default AdditionalClientForm;

