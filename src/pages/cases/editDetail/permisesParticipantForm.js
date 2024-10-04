import React, { useEffect, useState } from "react";
import { CaseCardDetails, Label, SelectInput, XButton } from "../../../components";
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
import DateInput from "../../../components/datePicker";


const PremisesForm = ({ title, values, handleChange, handleBlur }) => {

  return (
    <>
      <div className="col-span-6">
        <div className="bg-white p-4 rounded-2xl mb-5">
          {title && <div className="flex justify-between items-center mb-5">
            <span className="text-base text-secondary-800 font-medium">{title}</span>
            <div className="flex items-center gap-2">
              <BsThreeDotsVertical className="text-lg opacity-40" />
            </div>
          </div>}
          <ul className="card-details">
            <li>
              <div className="flex justify-between items-center w-full">
                <span className="left-txt w-full">Premises Type</span>
                <div className="flex justify-end items-center w-full gap-7">
                  <div className="grid gap-3">
                    <Field
                      as={SelectInput}
                      defaultLabel={`Select Premises`}
                      inputClassName="bg-input-surface py-[6px] px-4 rounded-full border-0 text-sm leading-5 font-semibold text-label"
                      labelClassName="ext-label mr-3"
                      name="propertyType"
                      value={values.propertyType}
                      options={[
                        { id: 0, label: "House (Single-Family )" },
                        { id: 1, label: "House (Multi-Family)" },
                        { id: 2, label: "Condo" },
                        { id: 3, label: "Commercial" },
                        { id: 4, label: "Land" },
                        { id: 5, label: "Co-op" },
                        { id: 6, label: "Condo-op" },
                      ].map((option) => ({
                        value: option.id,
                        label: option.label,
                      }))}
                    />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="flex justify-between items-center w-full">
                <span className="left-txt w-full">Households Number</span>
                <div className="flex justify-end items-center w-full gap-7">
                  <div className="grid gap-3">
                    <Field
                      as={SelectInput}
                      defaultLabel={`Select house`}
                      inputClassName="bg-input-surface py-[6px] px-4 rounded-full border-0 text-sm leading-5 font-semibold text-label"
                      labelClassName="ext-label mr-3"
                      name="houseNumber"
                      value={values.houseNumber}
                      options={[
                        { id: 1, label: "1" },
                        { id: 2, label: "2" },
                      ].map((option) => ({
                        value: option.id,
                        label: option.label,
                      }))}
                    />
                  </div>
                </div>
              </div>
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
              />
            </li>
            <li>
              <span className={`left-txt flex items-center`}>Apt, suite, floor, or unit # (optional)</span>
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                name="addressLine2"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.addressLine2}
              />
            </li>
            <li>
              <span className={`left-txt flex items-center`}>City</span>
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                name="city"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
              />
            </li>
            <li>
              <div className="flex justify-between items-center w-full">
                <span className="left-txt w-full">State</span>
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
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                name="zipCode"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.zipCode}
              />
            </li>
            <li>
              <span className={`left-txt flex items-center`}>Block</span>
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                onChange={handleChange}
                onBlur={handleBlur}
                name="block"
                type="text"
                value={values.block}
              />
            </li>
            <li>
              <span className={`left-txt flex items-center`}>Lot</span>
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                name="lot"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lot}
              />
            </li>
            <li>
              <span className={`left-txt flex items-center`}>Section</span>
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                name="section"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.section}
              />
            </li>
            <li>
              <div className="flex justify-between items-center w-full">
                <span className="left-txt w-full">Type</span>
                <div className="flex justify-end items-center w-full gap-7">
                  <div className="grid gap-3">
                    <Field
                      as={SelectInput}
                      defaultLabel={`Select Premises`}
                      inputClassName="bg-input-surface py-[6px] px-4 rounded-full border-0 text-sm leading-5 font-semibold text-label"
                      labelClassName="ext-label mr-3"
                      name="propertyType"
                      value={values.propertyType}
                      options={[
                        { id: 0, label: "House (Single-Family )" },
                        { id: 1, label: "House (Multi-Family)" },
                        { id: 2, label: "Condo" },
                        { id: 3, label: "Commercial" },
                        { id: 4, label: "Land" },
                        { id: 5, label: "Co-op" },
                        { id: 6, label: "Condo-op" },
                      ].map((option) => ({
                        value: option.id,
                        label: option.label,
                      }))}
                    />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="flex justify-between items-center w-full">
                <span className="left-txt w-full">Vacant at closing</span>
                <div className="flex justify-end items-center w-full gap-7">
                  <div className="grid grid-cols-2 gap-x-12">
                    {[
                      { id: 1, value: 1, label: "Yes" },
                      { id: 0, value: 0, label: "No" },
                    ].map((option, index) => (
                      <div className="flex items-center gap-2 custom-radio" key={index}>
                        <Field
                          type="radio"
                          id={option.id}
                          name="vacantAtClosing"
                          value={option.value}
                          checked={values.vacantAtClosing == option.id}
                          className="mr-2"
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
            </li>
            <li>
              <div className="flex justify-between items-center w-full">
                <span className="left-txt w-full">Subject to Tenancy</span>
                <div className="flex justify-end items-center w-full gap-7">
                  <div className="grid grid-cols-2 gap-x-12">
                    {[
                      { id: 1, value: 1, label: "Yes" },
                      { id: 0, value: 0, label: "No" },
                    ].map((option, index) => (
                      <div className="flex items-center gap-2 custom-radio" key={index}>
                        <Field
                          type="radio"
                          id={option.id}
                          name="subjectToTenancy"
                          value={option.value}
                          checked={values.subjectToTenancy == option.id}
                          className="mr-2"
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
            </li>
            <li>
              <div className="flex justify-between items-center w-full">
                <span className="left-txt w-full">H.O.A</span>
                <div className="flex justify-end items-center w-full gap-7">
                  <div className="grid grid-cols-2 gap-x-12">
                    {[
                      { id: 1, value: 1, label: "Yes" },
                      { id: 0, value: 0, label: "No" },
                    ].map((option, index) => (
                      <div className="flex items-center gap-2 custom-radio" key={index}>
                        <Field
                          type="radio"
                          id={option.id}
                          name="hoa"
                          value={option.value}
                          checked={values.hoa == option.id}
                          className="mr-2"
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
            </li>
            <li>
              <div className="flex justify-between items-center w-full">
                <span className="left-txt w-full">Parking Space</span>
                <div className="flex justify-end items-center w-full gap-7">
                  <div className="grid gap-3">
                    <Field
                      as={SelectInput}
                      defaultLabel={`Select Parking space`}
                      inputClassName="bg-input-surface py-[6px] px-4 rounded-full border-0 text-sm leading-5 font-semibold text-label"
                      labelClassName="ext-label mr-3"
                      name="parkingSpaces"
                      value={values.parkingSpaces}
                      options={[
                        { id: 0, label: "0" },
                        { id: 1, label: "1" },
                        { id: 2, label: "2" },
                        { id: 3, label: "3" },
                        { id: 4, label: "4" },
                        { id: 5, label: "5" },
                        { id: 6, label: "6" },
                      ].map((option) => ({
                        value: option.id,
                        label: option.label,
                      }))}
                    />
                  </div>
                </div>
              </div>
            </li>
            {/* <li>
            <div className="flex justify-between items-center w-full">
              <span className="left-txt w-full">Maintenance Fee year</span>
              <div className="flex justify-end items-center w-full gap-7">
                <div className="grid gap-3">
                  <Field
                    as={SelectInput}
                    defaultLabel={`Select Maintenance fee`}
                    inputClassName="bg-input-surface py-[6px] px-4 rounded-full border-0 text-sm leading-5 font-semibold text-label"
                    labelClassName="ext-label mr-3"
                    name="maintenanceFeePer"
                    value={values.maintenanceFeePer}
                    options={[
                      { id: 1, label: "yearly" },
                      { id: 2, label: "monthly" },

                    ].map((option) => ({
                      value: option.id,
                      label: option.label,
                    }))}
                  />
                </div>
              </div>
            </div>
          </li> */}
            <li>
              <span className={`left-txt flex items-center`}>Maintenance fee</span>
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                name="maintenanceFee"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.maintenanceFee}
              /> <Field
                as={SelectInput}
                defaultLabel={`per`}
                inputClassName="bg-input-surface py-[6px] px-4 rounded-full border-0 text-sm leading-5 font-semibold text-label"
                labelClassName="ext-label mr-3"
                name="maintenanceFeePer"
                value={values.maintenanceFeePer}
                options={[
                  { id: 1, label: "yearly" },
                  { id: 2, label: "monthly" },

                ].map((option) => ({
                  value: option.id,
                  label: option.label,
                }))}
              /></li>
            <li>
              <span className={`left-txt flex items-center`}>Assessments</span>
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                name="assessments"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.assessments}
              /></li>
            <li>
              <span className={`left-txt flex items-center`}>Paid by</span>
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                name="assessmentsPaidById"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.assessmentsPaidById}
              /></li>
            <li>
              <span className={`left-txt flex items-center`}>Managing Company</span>
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                name="managingCompany"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.managingCompany}
              /></li>
          </ul>
        </div>

      </div>
      <div className="col-span-6">
        <div className="bg-white p-4 rounded-2xl mb-5">
          {<div className="flex justify-between items-center mb-5">
            <span className="text-base text-secondary-800 font-medium">Engineer Inspection</span>
            {/* <div className="flex items-center gap-2">
          <BsThreeDotsVertical className="text-lg opacity-40" />
        </div> */}
          </div>}

          <ul className="card-details">
            <li>
              <div className="flex justify-between items-center w-full">
                <span className="left-txt w-full">Need Inspection</span>
                <div className="flex justify-end items-center w-full gap-7">
                  <div className="grid grid-cols-2 gap-x-12">
                    {[
                      { id: 1, value: 1, label: "Yes" },
                      { id: 0, value: 0, label: "No" },
                    ].map((option, index) => (
                      <div className="flex items-center gap-2 custom-radio" key={index}>
                        <Field
                          type="radio"
                          id={option.id}
                          name="needinspection"
                          value={option.value}
                          checked={values.needinspection == option.id}
                          className="mr-2"
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
            </li>
            <li>
              <>
                <span className={` left-txt flex items-center`}>
                  Schedule Date
                </span>
                <DateInput
                  name="scheduleDate"
                  selected={values.scheduleDate}
                  // onChange={(date) => setFieldValue("scheduleDate", date)}
                  onBlur={handleBlur}
                />
              </>
            </li>
            <li>
              <span className="left-txt flex items-center">Received Date</span>
              <DateInput
                name="receivedDate"
                selected={values.receivedDate}
                // onChange={(date) => setFieldValue("receivedDate", date)}
                onBlur={handleBlur}
              />
            </li>


          </ul>
        </div>
        <div className="bg-white p-4 rounded-2xl mb-5">
          {<div className="flex justify-between items-center mb-5">
            <span className="text-base text-secondary-800 font-medium">Termites Inspection</span>
            {/* <div className="flex items-center gap-2">
          <BsThreeDotsVertical className="text-lg opacity-40" />
        </div> */}
          </div>}

          <ul className="card-details">
            <li>
              <div className="flex justify-between items-center w-full">
                <span className="left-txt w-full">Need Termites Inspection</span>
                <div className="flex justify-end items-center w-full gap-7">
                  <div className="grid grid-cols-2 gap-x-12">
                    {[
                      { id: 1, value: 1, label: "Yes" },
                      { id: 0, value: 0, label: "No" },
                    ].map((option, index) => (
                      <div className="flex items-center gap-2 custom-radio" key={index}>
                        <Field
                          type="radio"
                          id={option.id}
                          name="needinspection"
                          value={option.value}
                          checked={values.needinspection == option.id}
                          className="mr-2"
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
            </li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-2xl mb-5">
          {<div className="flex justify-between items-center mb-5">
            <span className="text-base text-secondary-800 font-medium">Tenant</span>
            {/* <div className="flex items-center gap-2">
          <BsThreeDotsVertical className="text-lg opacity-40" />
        </div> */}
          </div>}

          <ul className="card-details">

            <li>
              <span className="left-txt flex items-center" > Tenant Name</span>
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                name="name"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
              // value={values.}
              />
            </li>
            <li>
              <span className="left-txt flex items-center" > Rent</span>
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                name="rent"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
              // value={values.addressLine1}
              />
            </li>
            <li>
              <span className="left-txt flex items-center" > Sec.</span>
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                name="sec"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
              // value={values.addressLine1}
              />
            </li>

            <li>
              <span className="left-txt flex items-center" > Lease</span>
              <input
                className="text-right p-0 border-none focus:ring-transparent"
                name="lease"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
              // value={values.addressLine1}
              />
            </li>

          </ul>
        </div>
      </div>

    </>
  );
};

export default PremisesForm;

