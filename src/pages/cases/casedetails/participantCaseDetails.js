import React, { useState } from "react";
import { CaseCardDetails, XButton } from "../../../components";
import CaseAttorneyItems from "./caseAttorneyItems";
import { Formik } from "formik";
import { IMAGES } from "../../../constants/imagePath";


const ParticipantCaseDetails = () => {
  const sellerItems = [
    { label: "Name", name: "sellerName", placeholder: "Enter seller name" },
    { label: "SSN", name: "sellerSSN", placeholder: "Enter a SSN" },
    { label: "Email", name: "sellerEmail", placeholder: "Enter a Email Address" },
    { label: "Cell Phone", name: "sellerCellPhone", placeholder: "Enter a Cell Phone" },
    {
      show: false, optional: true, buttonText: "add Work Phone", icon:IMAGES.removeIcon, name: "sellerWorkPhone", label: "Work Phone", placeholder: "Enter a work phone",
    },
    {
      show: false, optional: true, buttonText: "add We Chat", icon:IMAGES.removeIcon, name: "sellerWeChat", label: "We Chat", placeholder: "Enter a we chat",
    },
    {
      show: false, optional: true, buttonText: "add WhatsApp", icon:IMAGES.removeIcon, name: "sellerWhatsApp", label: "WhatsApp", placeholder: "Enter a whatsApp",
    },
    {
      show: false, optional: true, buttonText: "add Line", icon:IMAGES.removeIcon, name: "sellerLine", label: "Line", placeholder: "Enter a Line",
    },
    {
      label: "Mailing Address", name: "sellerMailingAddress", placeholder: "Enter Address",
    },
  ];
  const buyerItems = [
    { label: "Name", name: "purchaserName", placeholder: "Enter purchaser name" },
    { label: "SSN", name: "purchaserSSN", placeholder: "Enter a SSN" },
    { label: "Email", name: "purchaserEmail", placeholder: "Enter a Email Address" },
    { label: "Cell Phone", name: "purchaserCellPhone", placeholder: "Enter a Cell Phone" },
    {
      show: false, optional: true, buttonText: "add Work Phone", icon:IMAGES.removeIcon, name: "purchaserWorkPhone", label: "Work Phone", placeholder: "Enter a work phone",
    },
    {
      show: false, optional: true, buttonText: "add We Chat", icon:IMAGES.removeIcon, name: "purchaserWeChat", label: "We Chat", placeholder: "Enter a we chat",
    },
    {
      show: false, optional: true, buttonText: "add WhatsApp", icon:IMAGES.removeIcon, name: "purchaserWhatsApp", label: "WhatsApp", placeholder: "Enter a whatsApp",
    },
    {
      show: false, optional: true, buttonText: "add Line", icon:IMAGES.removeIcon, name: "purchaserLine", label: "Line", placeholder: "Enter a Line",
    },
    {
      label: "Mailing Address", name: "purchaserMailingAddress", placeholder: "Enter Address",
    },
  ];
  const TitleMortgageItems = [
    { label: "Title Company", name: "titleCompany", placeholder: "Enter an title company" },
    { label: "Title Number", name: "titleNumber", placeholder: "Enter an title number" },
    { label: "Mortage", name: "titleMortgage", placeholder: "Enter an mortage" },
  ];
  let handleSubmit = (x) => {
    console.log(x)
  }
  const initialValues = {
    sellerName: "",
    sellerSSN: "",
    sellerEmail: "",
    sellerCellPhone: "",
    sellerWorkPhone: "",
    sellerWeChat: "",
    sellerWhatsApp: "",
    sellerLine: "",
    sellerMailingAddress: "",
    purchaserName: "",
    purchaserSSN: "",
    purchaserEmail: "",
    purchaserCellPhone: "",
    purchaserWorkPhone: "",
    purchaserWeChat: "",
    purchaserWhatsApp: "",
    purchaserLine: "",
    purchaserMailingAddress: "",
    attorneys: [],
    titleCompany:"",
    titleNumber:"",
    titleMortgage:"",
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleSubmit,
        isSubmitting,
        values
      }) => (
        <form onSubmit={handleSubmit} className="login-form">
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6">
              <CaseCardDetails items={sellerItems} title="Seller" handle={handleChange} />
              <CaseCardDetails items={buyerItems} title="Puchaser" handle={handleChange} />
            </div>
            <div className="col-span-6">
              <CaseAttorneyItems
                title="Attorneys"
                attorneys={values.attorneys}
                setAttorneys={(attorneys) => {
                  values.attorneys = attorneys;
                  handleChange({ target: { name: 'attorneys', value: attorneys } });
                }} />
              <CaseCardDetails items={TitleMortgageItems} title="Title & Mortgage" handle={handleChange} />
              {/* <CaseCardDetails items={attorneyItems} /> */}
            </div>
          </div >
          <div className="flex justify-end mt-6">
        <XButton
          text="Cancel"
          className="bg-badge-gray font-medium text-base text-primary py-[10px] px-6 rounded-[100px] shadow-shadow-light"
        />
        <XButton
          type="submit"
          text="Save Changes"
          className="bg-primary text-base text-white py-[10px] px-6 rounded-[100px] ml-4"
        />
      </div>
        </form>
      )}
    </Formik>
  );
};

export default ParticipantCaseDetails;

