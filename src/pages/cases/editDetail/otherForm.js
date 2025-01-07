import React, { useEffect, useState } from "react";
import { CaseCardDetails, Label, SelectInput, XButton } from "../../../components";
// import CaseAttorneyItems from "./caseAttorneyItems";
import { Field, Formik } from "formik";
import { sellerItems, buyerItems, titleMortgageItems, caseTypeOptions } from "../../../utils/formItem";
import FormButton from "../../../components/formButton";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddressByIdRequest } from "../../../redux/actions/utilsActions";
import { fetchPremisesRequest } from "../../../redux/actions/premisesActions";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IMAGES } from "../../../constants/imagePath";
import states from "../../../constants/states.json"
import DateInput from "../../../components/datePicker";


const OtherForm = ({ title, values, handleChange, initialValues, handleBlur, setFieldValue, form }) => {
  const [optionalFields, setOptionalFields] = useState({
    referral: false,
    bank: false,
    personalNotes: false,
    excludedNotes: false,
  });

  useEffect(() => {
    // console.log(initialValues,"____")
    if (initialValues?.referral) setOptionalFields(prev => ({ ...prev, referral: true }));
    if (initialValues?.bank) setOptionalFields(prev => ({ ...prev, bank: true }));
    if (initialValues?.personalNotes) setOptionalFields(prev => ({ ...prev, personalNotes: true }));
    if (initialValues?.excludedNotes) setOptionalFields(prev => ({ ...prev, excludedNotes: true }));
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

  const formatCurrency = (value) => {
    if (!value) return ''; // No dollar sign if the input is empty
    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Handle input changes to strip formatting for internal storage
  const handleCurrencyChange = (event, fieldName) => {
    const inputVal = event.target.value.replace(/[^0-9.]+/g, ''); // Remove non-numeric except '.'
    setFieldValue(fieldName, inputVal); // Save as plain number in form state
  };

  return (
    <>
      <div className="col-span-6">
        {/* <div className="bg-white p-4 rounded-2xl mb-5">
          {title && <div className="flex justify-between items-center mb-5">
            <span className="text-base text-2Fary-800 font-medium">{title}</span>
            <div className="flex items-center gap-2">
             
            </div>
          </div>}
          <ul className="card-details">
            <li>
              <div className="flex justify-between items-center w-full">
                <span className="left-txt w-full">Case Type</span>
                <div className="flex justify-end items-center w-full gap-7">
                  <div className="grid gap-3">
                    <Field
                      as={SelectInput}
                      disabled={true}
                      defaultLabel={`Select house`}
                      inputClassName="bg-input-surface py-[6px] px-4 rounded-full border-0 text-sm leading-5 font-semibold text-label"
                      labelClassName="ext-label mr-3"
                      name="caseType"
                      value={values.caseType}
                      options={caseTypeOptions}
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div> */}
        <div className="bg-white p-4 rounded-2xl mb-5">
          {<div className="flex justify-between items-center mb-5">
            <span className="text-base text-secondary-800 font-bold">Prices</span>
            {/* <div className="flex items-center gap-2">
                      <BsThreeDotsVertical className="text-lg opacity-40" />
                    </div> */}
          </div>}
          <ul className="card-details">
            {/* <li>
              <span className="left-txt flex items-center" >Purchaser Price</span>
              {form?.errors['purchasePrice'] && form?.touched['purchasePrice'] && (
                <span className="text-sm text-red-500">{form.errors['purchasePrice']}</span>
              )}
              <input
                className=" p-0 border-none focus:ring-transparent"
                name="purchasePrice"
                value={values.purchasePrice}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </li> */}
            <li>
              <span className="left-txt flex items-center" >Purchaser Price</span>
              {form?.errors['purchaserPrice'] && form?.touched['purchaserPrice'] && (
                <span className="text-sm text-red-500">{form.errors['purchaserPrice']}</span>
              )}
              <input
                className=" p-0 border-none focus:ring-transparent"
                name="purchaserPrice"
                value={formatCurrency(values.purchaserPrice)}
                type="text"
                onChange={(e) => handleCurrencyChange(e, 'purchaserPrice')}
                onBlur={handleBlur}
              />
            </li>

            <li>
              <span className="left-txt flex items-center" >Down Payment</span>
              <input
                className=" p-0 border-none focus:ring-transparent"
                name="downPayment"
                value={formatCurrency(values.downPayment)}
                type="text"
                onChange={(e) => handleCurrencyChange(e, 'downPayment')}
                onBlur={handleBlur}
              // value={values.}
              />
            </li>
            <li>
              <span className="left-txt flex items-center" >Mortgage Amount</span>
              <input
                className=" p-0 border-none focus:ring-transparent"
                name="mortgageAmount"
                value={formatCurrency(values.mortgageAmount)}
                type="text"
                onChange={(e) => handleCurrencyChange(e, 'mortgageAmount')}
                onBlur={handleBlur}
              // value={values.}
              />
            </li>
            {/* <li>
              <span className="left-txt flex items-center" >Annual Property Tax</span>
              <input
                className=" p-0 border-none focus:ring-transparent"
                name="annualPropertyTax"
                value={formatCurrency(values.annualPropertyTax)}
                type="text"
                onChange={(e) => handleCurrencyChange(e, 'annualPropertyTax')}
                onBlur={handleBlur}
              // value={values.}
              />
            </li> */}
            <li>
              <span className="left-txt flex items-center" >Seller's Concession</span>
              <input
                className=" p-0 border-none focus:ring-transparent"
                name="sellersConcession"
                value={formatCurrency(values.sellersConcession)}
                type="text"
                onChange={(e) => handleCurrencyChange(e, 'sellersConcession')}
                onBlur={handleBlur}
              // value={values.}
              />
            </li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-2xl mb-5">
        {<div className="flex justify-between items-center mb-5">
            <span className="text-base text-secondary-800 font-bold">Mortgage</span>
            {/* <div className="flex items-center gap-2">
                      <BsThreeDotsVertical className="text-lg opacity-40" />
                    </div> */}
          </div>}

          <ul className="card-details">
            <li>
              <>
                <span className={` left-txt flex items-center`}>
                  Mortgage Due Date
                </span>
                <DateInput
                  name="mortgageContingencyDate"
                  value={values.mortgageContingencyDate}
                  onSelectedDateChanged={(date) => setFieldValue("mortgageContingencyDate", date)}
                />
              </>
            </li>
          </ul>
        </div>
        {/* <div className="bg-white p-4 rounded-2xl mb-5">
          {title && <div className="flex justify-between items-center mb-5">
            <span className="text-base text-2Fary-800 font-medium">{"Realtors"}</span>
            <div className="flex items-center gap-2">
            </div>
          </div>}
          <ul className="card-details">
            <li>
              <span className="left-txt flex items-center" >Realtors Sale</span>
              <input
                className=" p-0 border-none focus:ring-transparent"
                name="realtorSale"
                value={values.realtorSale}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </li>
            <li>
              <span className="left-txt flex items-center" >Realtors Listing</span>
              <input
                className=" p-0 border-none focus:ring-transparent"
                name="realtorListing"
                value={values.realtorListing}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
              // value={values.}
              />
            </li>
          </ul>
        </div> */}
      </div>
      <div className="col-span-6">
        <div className="bg-white p-4 rounded-2xl mb-5">
        {<div className="flex justify-between items-center mb-5">
            <span className="text-base text-secondary-800 font-bold">Closing</span>
            {/* <div className="flex items-center gap-2">
                      <BsThreeDotsVertical className="text-lg opacity-40" />
                    </div> */}
          </div>}

          <ul className="card-details">
            <li>
              <>
                <span className={` left-txt flex items-center`}>
                  Schedule Date
                </span>
                <DateInput
                  name="closingDate"
                  value={values.closingDate}
                  onSelectedDateChanged={(date) => setFieldValue("closingDate", date)}

                />
              </>
            </li>
            <li>
              <span className="left-txt flex items-center">Received Date</span>
              <DateInput
                name="closeAt"
                value={values.closeAt}
                onSelectedDateChanged={(date) => setFieldValue("closeAt", date)}

              />
            </li>


          </ul>
        </div>
        <div className="bg-white p-4 rounded-2xl mb-5">
        {<div className="flex justify-between items-center mb-5">
            <span className="text-base text-secondary-800 font-bold">Others</span>
            {/* <div className="flex items-center gap-2">
                      <BsThreeDotsVertical className="text-lg opacity-40" />
                    </div> */}
          </div>}

          <ul className="card-details">
            <li>
              {optionalFields.referral && (

                <>
                  <span className={"cursor-pointer left-txt flex items-center"} onClick={() => handleRemoveField('referral', setFieldValue)} >
                    <span className="icon mr-2"> <img src={IMAGES.removeIcon} alt="icon" /> </span>
                    Referral
                  </span>
                  <input
                    className=" p-0 border-none focus:ring-transparent"
                    name="referral"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.referral}
                  />
                </>
              )}
              {!optionalFields.referral && (<span className="left-txt flex items-center" onClick={() => handleAddField('referral')} >
                <span className="icon mr-2 cursor-pointer">
                  <img
                    src={IMAGES.addIcon}
                    alt="icon"
                  />
                </span>
                Add A Referral
              </span>)}
            </li>

            <li>
              {optionalFields.bank && (

                <>
                  <span className={"cursor-pointer left-txt flex items-center"} onClick={() => handleRemoveField('bank', setFieldValue)} >
                    <span className="icon mr-2"> <img src={IMAGES.removeIcon} alt="icon" /> </span>
                    Bank
                  </span>
                  <input
                    className=" p-0 border-none focus:ring-transparent"
                    name="bank"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bank}
                  />
                </>
              )}
              {!optionalFields.bank && (<span className="left-txt flex items-center" onClick={() => handleAddField('bank')} >
                <span className="icon mr-2 cursor-pointer">
                  <img
                    src={IMAGES.addIcon}
                    alt="icon"
                  />
                </span>
                Add A Bank (L/O)
              </span>)}
            </li>


            <li>
              {optionalFields.personalNotes && (

                <>
                  <span className={"cursor-pointer left-txt flex items-center"} onClick={() => handleRemoveField('personalNotes', setFieldValue)} >
                    <span className="icon mr-2"> <img src={IMAGES.removeIcon} alt="icon" /> </span>
                    Personal Note
                  </span>
                  <input
                    className=" p-0 border-none focus:ring-transparent"
                    name="personalNotes"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.personalNotes}
                  />
                </>
              )}
              {!optionalFields.personalNotes && (<span className="left-txt flex items-center" onClick={() => handleAddField('personalNotes')} >
                <span className="icon mr-2 cursor-pointer">
                  <img
                    src={IMAGES.addIcon}
                    alt="icon"
                  />
                </span>
                Add Notes as Personal Property
              </span>)}
            </li>



            <li>
              {optionalFields.excludedNotes && (
                <>
                  <span className={"cursor-pointer left-txt flex items-center"} onClick={() => handleRemoveField('excludedNotes', setFieldValue)} >
                    <span className="icon mr-2"> <img src={IMAGES.removeIcon} alt="icon" /> </span>
                    Excluded Note
                  </span>
                  <input
                    className=" p-0 border-none focus:ring-transparent"
                    name="excludedNotes"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.excludedNotes}
                  />
                </>
              )}
              {!optionalFields.excludedNotes && (<span className="left-txt flex items-center" onClick={() => handleAddField('excludedNotes')} >
                <span className="icon mr-2 cursor-pointer">
                  <img
                    src={IMAGES.addIcon}
                    alt="icon"
                  />
                </span>
                Add Notes as Excluded Property
              </span>)}
            </li>
          </ul>
        </div>
      </div>

    </>
  );
};

export default OtherForm;

