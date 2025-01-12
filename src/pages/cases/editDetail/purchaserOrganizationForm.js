import React, { useEffect, useState } from "react";
import { CaseCardDetails, SelectInput, XButton } from "../../../components";
// import CaseAttorneyItems from "./caseAttorneyItems";
import { Field, Formik } from "formik";
import { sellerItems, buyerItems, titleMortgageItems } from "../../../utils/formItem";
import FormButton from "../../../components/formButton";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddressByIdRequest } from "../../../redux/actions/utilsActions";
import { fetchPremisesRequest } from "../../../redux/actions/premisesActions";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IMAGES } from "../../../constants/imagePath";
import states from "../../../constants/states.json"


const PurchaserOrganizationForm = ({ title, values, handleChange, handleBlur, form }) => {

  return (
    <>
      <div className="bg-white p-4 rounded-2xl mb-5 shadow-shadow-light">
        {title && <div className="flex justify-between items-center mb-5">
          <span className="text-base text-secondary-800 font-medium">{title}</span>
          <div className="flex items-center gap-2">
            <BsThreeDotsVertical className="text-lg opacity-40" />
          </div>
        </div>}
        <ul className="card-details">
          <li>
            <span className={`left-txt flex items-center`}>Organization Name</span>
            {form?.errors["organizationName"] && form?.touched["organizationName"] && (
              <span className="text-sm text-red-500">{form.errors["organizationName"]}</span>
            )}
            <input
              className="text-right p-0 border-none focus:ring-transparent"
              name="organizationName"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.organizationName}
            /></li>
          <li>
            <span className={`left-txt flex items-center`}>Email</span>
            {form?.errors["email"] && form?.touched["email"] && (
              <span className="text-sm text-red-500">{form.errors["email"]}</span>
            )}
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
            {form?.errors["cellNumber"] && form?.touched["cellNumber"] && (
              <span className="text-sm text-red-500">{form.errors["cellNumber"]}</span>
            )}
            <input
              className="text-right p-0 border-none focus:ring-transparent"
              name="cellNumber"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.cellNumber}
            /></li>
          <li>
            <span className={`left-txt flex items-center`}>Website</span>
            {form?.errors["website"] && form?.touched["website"] && (
              <span className="text-sm text-red-500">{form.errors["website"]}</span>
            )}
            <input
              className="text-right p-0 border-none focus:ring-transparent"
              name="website"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.website}
            /></li>
          <li>
            <span className={`left-txt flex items-center`}>Street Name</span>
            {form?.errors["addressLine1"] && form?.touched["addressLine1"] && (
              <span className="text-sm text-red-500">{form.errors["addressLine1"]}</span>
            )}
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
            {form?.errors["city"] && form?.touched["city"] && (
              <span className="text-sm text-red-500">{form.errors["city"]}</span>
            )}
            <input
              className="text-right p-0 border-none focus:ring-transparent"
              name="city"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.city}
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
                    name="state"
                    value={values.state}
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

export default PurchaserOrganizationForm;

