import React, { useEffect, useState } from "react";
import { CaseCardDetails, XButton } from "../../../components";
// import CaseAttorneyItems from "./caseAttorneyItems";
import { Formik } from "formik";
import { sellerItems, buyerItems, titleMortgageItems } from "../../../utils/formItem";
import FormButton from "../../../components/formButton";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import ShowDetail from "../showdetail/participantdetail";
import { fetchAddressByIdRequest } from "../../../redux/actions/utilsActions";
import { fetchPremisesRequest } from "../../../redux/actions/premisesActions";
import ParticipantDetail from "../showdetail/participantdetail";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IMAGES } from "../../../constants/imagePath";


const PurchaserParticipantForm = ({ title, initialValues, onSubmit, values, formerror, setFieldValue,  handleChange, handleBlur }) => {
  const [optionalFields, setOptionalFields] = useState({
    workNumber: false,
    wechatAccount: false,
    whatsAppNumber: false,
    lineNumber: false,
  });

  useEffect(() => {
    // Set the optional fields based on initial values (for edit scenario)
    if (initialValues?.workNumber) setOptionalFields(prev => ({ ...prev, workNumber: true }));
    if (initialValues?.wechatAccount) setOptionalFields(prev => ({ ...prev, wechatAccount: true }));
    if (initialValues?.whatsAppNumber) setOptionalFields(prev => ({ ...prev, whatsAppNumber: true }));
    if (initialValues?.lineNumber) setOptionalFields(prev => ({ ...prev, lineNumber: true }));
  }, [initialValues]);

  const handleAddField = (field) => {
    setOptionalFields((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const handleRemoveField = (field, setFieldValue) => {
    setOptionalFields((prevState) => ({
      ...prevState,
      [field]: false,
    }));
    setFieldValue(field, ''); 
  };

  return (
    <>
      <div className="bg-white p-4 rounded-2xl mb-5">
        {title && <div className="flex justify-between items-center mb-5">
          <span className="text-base text-secondary-800 font-medium">{title}</span>
          <div className="flex items-center gap-2">
            <BsThreeDotsVertical className="text-lg opacity-40" />
          </div>
        </div>}
        <ul className="card-details">
          <li>
            <span className={`left-txt flex items-center`}>Name</span>
            <input
              className="text-right p-0 border-none focus:ring-transparent"
              name="name"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            /></li>
          <li>
            <span className={`left-txt flex items-center`}>SSN</span>
            <input
              className="text-right p-0 border-none focus:ring-transparent"
              onChange={handleChange}
              onBlur={handleBlur}
              name="ssn"
              type="text"
              value={values.ssn}
            /></li>
          <li>
            <span className={`left-txt flex items-center`}>Email</span>
            <input
              className="text-right p-0 border-none focus:ring-transparent"
              name="email"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            /></li>
          <li>
            <span className={`left-txt flex items-center`}>Cell Phone</span>
            <input
              className="text-right p-0 border-none focus:ring-transparent"
              name="cellphone"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.cellphone}
            /></li>

          <li>
            {optionalFields.workNumber && (

              <>
                <span className={"cursor-pointer left-txt flex items-center"} onClick={() => handleRemoveField('workNumber', setFieldValue)} >
                  <span className="icon mr-2"> <img src={IMAGES.removeIcon} alt="icon" /> </span>
                  Work Phone
                </span>
                <input
                  className="text-right p-0 border-none focus:ring-transparent"
                  name="workNumber"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.workNumber}
                />
              </>
            )}
            {!optionalFields.workNumber && (<span className="left-txt flex items-center" onClick={() => handleAddField('workNumber')} >
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
            {optionalFields.wechatAccount && (

              <>
                <span className={"cursor-pointer left-txt flex items-center"} onClick={() => handleRemoveField('wechatAccount',setFieldValue)} >
                  <span className="icon mr-2"> <img src={IMAGES.removeIcon} alt="icon" /> </span>
                  WeChat
                </span>
                <input
                  className="text-right p-0 border-none focus:ring-transparent"
                  name="wechatAccount"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.wechatAccount}
                />
              </>
            )}
            {!optionalFields.wechatAccount && (<span className="left-txt flex items-center" onClick={() => handleAddField('wechatAccount')} >
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
            {optionalFields.whatsAppNumber && (

              <>
                <span className={"cursor-pointer left-txt flex items-center"} onClick={() => handleRemoveField('whatsAppNumber',setFieldValue)} >
                  <span className="icon mr-2"> <img src={IMAGES.removeIcon} alt="icon" /> </span>
                  WhatsApp
                </span>
                <input
                  className="text-right p-0 border-none focus:ring-transparent"
                  name="whatsAppNumber"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.whatsAppNumber}
                />
              </>
            )}
            {!optionalFields.whatsAppNumber && (<span className="left-txt flex items-center" onClick={() => handleAddField('whatsAppNumber')} >
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
            {optionalFields.lineNumber && (

              <>
                <span className={"cursor-pointer left-txt flex items-center"} onClick={() => handleRemoveField('lineNumber',setFieldValue)} >
                  <span className="icon mr-2"> <img src={IMAGES.removeIcon} alt="icon" /> </span>
                  Line
                </span>
                <input
                  className="text-right p-0 border-none focus:ring-transparent"
                  name="lineNumber"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lineNumber}
                />
              </>
            )}
            {!optionalFields.lineNumber && (<span className="left-txt flex items-center" onClick={() => handleAddField('lineNumber')} >
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
            <input
              className="text-right p-0 border-none focus:ring-transparent"
              name="addressLine1"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.addressLine1}
            /></li>
          <li>
            <span className={`left-txt flex items-center`}>Apt, suite, floor, or unit # (optional)</span>
            <input
              className="text-right p-0 border-none focus:ring-transparent"
              name="addressLine2"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.addressLine2}
            /></li>
          <li>
            <span className={`left-txt flex items-center`}>City</span>
            <input
              className="text-right p-0 border-none focus:ring-transparent"
              name="city"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.city}
            /></li>
          <li>
            <span className={`left-txt flex items-center`}>State</span>
            <input
              className="text-right p-0 border-none focus:ring-transparent"
              name="state"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.state}
            /></li>
          <li>
            <span className={`left-txt flex items-center`}>Zip Code</span>
            <input
              className="text-right p-0 border-none focus:ring-transparent"
              name="zipCode"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.zipCode}
            /></li>


        </ul>
      </div>


    </>
  );
};

export default PurchaserParticipantForm;

