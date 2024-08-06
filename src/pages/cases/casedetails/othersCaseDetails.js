import React, { useState } from "react";
import { CaseCardDetails, XButton } from "../../../components";
import { FaCircleMinus } from "react-icons/fa6";
import { Formik } from "formik";
import { IMAGES } from "../../../constants/imagePath";


const OthersCaseDetails = () => {
  const financialItems = [
    { label: "Purchase Price", placeholder: "Enter an Amount" },
    { label: "Down Payment", placeholder: "Enter an Amount" },
    { label: "Mortgage Amount", placeholder: "Enter an Amount" },
    { label: "Annual Property Tax", placeholder: "Enter an Amount" },
    { label: "Seller’s Concession", placeholder: "Enter an Amount" },
  ];
  const brokersItems = [
    { label: "Brokers Sale", placeholder: "Enter an Amount" },
    { label: "Brokers Listing", placeholder: "Enter an Amount" },
    // { label: "Referred by", placeholder: "Add a referral" },
    // { label: "Bank (L/O)", placeholder: "Add content" },
    // { label: "Personal Property", placeholder: "Add content" },
    // { label: "Excluded Property", placeholder: "Add content" },
  ];
  const closingDateItems = [
    {
      label: "Schedule",
      type:"dropdown",
      dropDownOptions: [
        { id: "accept1", defaultChecked: true, label: "on/about" },
        { id: "accept2", defaultChecked: true, label: "Before" },
        { id: "accept3", defaultChecked: true, label: "T.O.E." },
        { id: "accept4", defaultChecked: true, label: "June 05,2024" },
      ],
    },
    { type:"datepicker", label: "Closing date", placeholder: "Month Day, Year" },
  ];

  const otherItems=[
    {
      show: false, optional: true, icon: IMAGES.removeIcon, buttonText: "Add A Referred", label: "Referred",  placeholder: "Enter a referred",
    },
    {
      show: false, optional: true, icon: IMAGES.removeIcon, buttonText: "Add A Bank (L/O)", label: "Bank",  placeholder: "Enter a bank",
    },
    {
      show: false, optional: true, icon: IMAGES.removeIcon, buttonText: "Add Notes as Personal Property", label: "Personal Property Notes",  placeholder: "Enter notes",
    },
    {
      show: false, optional: true, icon: IMAGES.removeIcon, buttonText: "Add Notes as Excluded Property", label: "Excluded Property Notes",  placeholder: "Enter notes",
    }
  ]
  let handleSubmit = (x) => {
    console.log(x)
  }
  const initialValues = {
    
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
        <CaseCardDetails items={financialItems}  title="Prices"  />
        <CaseCardDetails items={brokersItems}  title="Brokers" />

      </div>
      <div className="col-span-6">
        <CaseCardDetails items={closingDateItems}  title="Closing"/>
        <CaseCardDetails items={otherItems}  title="Others"/>
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

export default OthersCaseDetails;

