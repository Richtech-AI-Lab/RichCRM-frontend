import React, { useState } from "react";
import { CaseCardDetails, XButton } from "../../../components";
import { Formik } from "formik";


const PremisesCaseDetails = () => {
  const lowerSectionItems = [
    {
      label: "Premises Type",
      type: "dropdown",
      name: "premisesType", 
      dropDownOptions: [
        { id: "soldYes", label: "Selling", defaultChecked: true },
        { id: "boughtYes", label: "Purchasing", defaultChecked: true },
      ],
    },
    {
      name: "premisesAddress", 
      label: "Address",
      placeholder: "Enter address",
    },
    {
      name: "premisesAddress2", 
      label: "Address Line 2",
      placeholder: "Enter address",
    },
    {
      name: "premisesCity", 
      label: "City",
      placeholder: "Enter city",
    },
    {
      name: "premisesState", 
      label: "State",
      type: "dropdown",
      dropDownOptions: [
        { id: "Newyork", label: "New York", defaultChecked: true },
        { id: "India", label: "India", defaultChecked: true },
      ],
    },
    { label: "Zip Code", name: "premisesZipcode",  placeholder: "Enter a zip code" },
    { label: "Block",  name: "premisesBlock",  placeholder: "Enter a block" },
    { label: "Lot", name: "premisesLot",  placeholder: "Enter a lot" },
    { label: "Section", name: "premisesSection",  placeholder: "Enter a section" },
    {
      label: "Type",
      type: "dropdown",
      name: "premisesType2", 
      dropDownOptions: [
        { id: "coop", label: "Co-op", defaultChecked: true },
        { id: "townhouse", label: "Townhouse", defaultChecked: true },
        { id: "condo", label: "Condo", defaultChecked: true },
        { id: "vacantLand", label: "Vacant Land", defaultChecked: true },
      ],
    },
    {
      label: "Vacant at closing",
      type: "checkboxes",
      name: "premisesVacant", 
      checkboxOptions: [
        { id: "vacantYes", label: "Yes", defaultChecked: true },
        { id: "vacantNo", label: "No", defaultChecked: true },
      ],
    },
    {
      label: "Subject to Tenancy",
      type: "checkboxes",
      name: "premisesSubject", 
      checkboxOptions: [
        { id: "tenancyYes", label: "Yes", defaultChecked: true },
        { id: "tenancyNo", label: "No", defaultChecked: true },
      ],
    },
    {
      label: "H.O.A",
      type: "checkboxes",
      name: "premisesHOA", 
      checkboxOptions: [
        { id: "hoaYes", label: "Yes", defaultChecked: true },
        { id: "hoaNo", label: "No", defaultChecked: true },
      ],
    },
    {
      label: "Parking Space",
      type: "dropdown",
      name: "premisesParking", 
      dropDownOptions: [
        { id: "1", label: "1", defaultChecked: true },
        { id: "2", label: "2", defaultChecked: true },
      ],
    },
    // { label: "Parking Space Number", placeholder:"Enter parking space no" },
    {
      label: "Maintenance fee", name: "premisesMaintenace",  type: "inputdropdown", placeholder: "Enter an Amount", dropDownOptions: [
        { id: "1", label: "yearly", defaultChecked: true },
        { id: "2", label: "monthly", defaultChecked: true },
      ],
    },

    { label: "Assessments", name: "premisesAssessment", placeholder: "Enter an Amount" },
    { label: "Paid by", name: "premisesPaidby", placeholder: "Enter an Amount" },
    { label: "Managing Company", name: "premisesManaging", placeholder: "Enter an Amount" },

  ];
  const premisesComposition = [
    {
      label: "Type",
      type: "dropdown",
      dropDownOptions: [
        { id: "newConstruction", label: "New Const.", defaultChecked: true },
        { id: "oneFamily", label: "1 Family", defaultChecked: true },
        { id: "twoFamily", label: "2 Family", defaultChecked: true },
      ],
    },
    { label: "1F Tenant", placeholder: "Enter name" },
    { label: "1F Rent", placeholder: "Enter rent" },
    { label: "1F Sec.", placeholder: "Enter sec" },
    {
      label: "1F Lease",
      type: "checkboxes",
      checkboxOptions: [
        { id: "leaseYes1", label: "Yes", defaultChecked: true },
        { id: "leaseNo2", label: "No", defaultChecked: true },
      ],
    },
    { label: "2F Tenant", placeholder: "Enter name" },
    { label: "2F Rent", placeholder: "Enter rent" },
    { label: "2F Sec.", placeholder: "Enter sec" },
    {
      label: "2F Lease",
      type: "checkboxes",
      checkboxOptions: [
        { id: "leaseYes3", label: "Yes", defaultChecked: true },
        { id: "leaseNo4", label: "No", defaultChecked: true },
      ],
    },

  ];
  const inspectionItems = [
    {
      label: "Engineer Inspection",
      type: "checkboxes",
      checkboxOptions: [
        { id: "accept4", defaultChecked: true, label: "Yes" },
        { id: "accept5", defaultChecked: true, label: "No" },
      ],
    },
    { type: "datepicker", label: "Scheduled Date", placeholder: "Month Day, Year" },
    { type: "datepicker", label: "Received Date", placeholder: "Month Day, Year" },
  ];
  const termitesInspectionItems = [
    {
      label: "Termites Inspection",
      type: "checkboxes",
      checkboxOptions: [
        { id: "accept6", defaultChecked: true, label: "Yes" },
        { id: "accept7", defaultChecked: true, label: "No" },
      ],
    },
  ];
  let handleSubmit = (x) => {
    console.log(x)
  }
    const initialValues = {
    premisesType: "",
    premisesAddress:"",
    premisesAddress2: "",
    premisesCity: "",
    premisesState: "",
    premisesZipcode: "",
    premisesBlock: "",
    premisesLot: "",
    premisesSection: "",
    premisesType2: "",
    premisesVacant: "",
    premisesSubject: "",
    premisesHOA: "",
    premisesParking: "",
    premisesMaintenace: "",
    premisesAssessment: "",
    premisesPaidby: "",
    premisesManaging: "",
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
        <form onSubmit={handleSubmit} className="pemises-form">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6">
              <CaseCardDetails items={lowerSectionItems} title="Premises Info" handle={handleChange} />
            </div>
            <div className="col-span-6">
              <CaseCardDetails items={premisesComposition} title="Premises Composition" />
              <CaseCardDetails items={inspectionItems} title="Engineer Inspection" />
              <CaseCardDetails items={termitesInspectionItems} title="Termites Inspection" />
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

export default PremisesCaseDetails;

