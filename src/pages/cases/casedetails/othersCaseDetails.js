import React, { useState } from "react";
import { CaseCardDetails, XButton } from "../../../components";
import { FaCircleMinus } from "react-icons/fa6";
import { Formik } from "formik";
import { IMAGES } from "../../../constants/imagePath";
import { brokersItems, closingDateItems, financialItems, otherItems } from "../../../utils/formItem";
import FormButton from "../../../components/formButton";


const OthersCaseDetails = () => {
  let handleSubmit = (x) => {
    console.log(x)
  }
  const initialValues = {
    purchasePrice: "",
    downPayment: "",
    mortgageAmount: "",
    annualPropertyTax: "",
    sellerConcession: "",
    brokerSale: "",
    brokerListing: "",
    schedule: "",
    closingDate: "",
    referred: "",
    bank: "",
    personalNotes: "",
    excludedNotes: "",

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
              <CaseCardDetails items={financialItems} title="Prices" handle={handleChange} />
              <CaseCardDetails items={brokersItems} title="Brokers" handle={handleChange} />

            </div>
            <div className="col-span-6">
              <CaseCardDetails items={closingDateItems} title="Closing" handle={handleChange} />
              <CaseCardDetails items={otherItems} title="Others" handle={handleChange} />
            </div>
          </div >
          <FormButton onSave={handleSubmit} />
        </form>
      )}
    </Formik>
  );
};

export default OthersCaseDetails;

