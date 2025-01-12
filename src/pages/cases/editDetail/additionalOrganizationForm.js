import React, { useEffect, useState } from "react";
import { SelectInput } from "../../../components";
import { Field } from "formik";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IMAGES } from "../../../constants/imagePath";
import states from "../../../constants/states.json"


const AdditionalOrganizationForm = ({ title, organization, handleChange, handleBlur, form }) => {

  return (
    <>
      {organization?.map((item, index) =>
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
                name={`additionalOrgData[${index}].organizationName`}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={item?.organizationName}
              /></li>
            <li>
              <span className={`left-txt flex items-center`}>Email</span>
              {form?.errors["email"] && form?.touched["email"] && (
                <span className="text-sm text-red-500">{form.errors["email"]}</span>
              )}
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                name={`additionalOrgData[${index}].email`}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={item?.email}
              /></li>
            <li>
              <span className={`left-txt flex items-center`}>Cell Phone</span>
              {form?.errors["cellNumber"] && form?.touched["cellNumber"] && (
                <span className="text-sm text-red-500">{form.errors["cellNumber"]}</span>
              )}
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                name={`additionalOrgData[${index}].cellNumber`}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={item?.cellNumber}
              /></li>
            <li>
              <span className={`left-txt flex items-center`}>Website</span>
              {form?.errors["website"] && form?.touched["website"] && (
                <span className="text-sm text-red-500">{form.errors["website"]}</span>
              )}
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                name={`additionalOrgData[${index}].website`}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={item?.website}
              /></li>
            <li>
              <span className={`left-txt flex items-center`}>Street Name</span>
              {form?.errors["addressLine1"] && form?.touched["addressLine1"] && (
                <span className="text-sm text-red-500">{form.errors["addressLine1"]}</span>
              )}
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                name={`additionalOrgData[${index}].addressLine1`}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={item?.addressLine1}
              /></li>
            <li>
              <span className={`left-txt flex items-center`}>Apt, suite, floor, or unit # (optional)</span>
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                name={`additionalOrgData[${index}].addressLine2`}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={item?.addressLine2}
              /></li>
            <li>
              <span className={`left-txt flex items-center`}>City</span>
              {form?.errors["city"] && form?.touched["city"] && (
                <span className="text-sm text-red-500">{form.errors["city"]}</span>
              )}
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                name={`additionalOrgData[${index}].city`}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={item?.city}
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
                      name={`additionalOrgData[${index}].state`}
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
                className="text-right p-0 border-none focus:ring-transparent"
                name={`additionalOrgData[${index}].zipCode`}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={item?.zipCode}
              /></li>


          </ul>
        </div>
      )}
    </>
  );
};

export default AdditionalOrganizationForm;

