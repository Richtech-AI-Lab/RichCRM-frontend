import React, { useState } from "react";
import { CaseCardDetails, XButton } from "../../../components";
import { FaCircleMinus } from "react-icons/fa6";
import { Formik } from "formik";
import { IMAGES } from "../../../constants/imagePath";
import { brokersItems, closingDateItems, financialItems, otherItems } from "../../../utils/formItem";
import FormButton from "../../../components/formButton";
import OtherForm from "../editDetail/otherForm";
import OtherDetail from "../showdetail/otherdetails";


const OthersCaseDetails = ({ isEdit, setIsEdit }) => {
  const [dummy, setDummy] = useState({})
  const toggleEdit = () => {
    setIsEdit(prevState => !prevState);
  };
  let handleSubmit = (x) => {
    setDummy(x)
    console.log(x)
    toggleEdit()
  }
  const initialOtherValues = {
    caseType: dummy?.caseType,
    purchasePrice: dummy?.purchasePrice,
    downPayment: dummy?.downPayment,
    mortgageAmount: dummy?.mortgageAmount,
    annualPropertyTax: dummy?.annualPropertyTax,
    sellerConcession: dummy?.sellerConcession,
    brokerSale: dummy?.brokerSale,
    brokerListing: dummy?.brokerListing,
    scheduleDate: dummy?.scheduleDate,
    closingDate: dummy?.closingDate,
    referred: dummy?.referred,
    bank: dummy?.bank,
    personalNotes: dummy?.personalNotes,
    excludedNotes: dummy?.excludedNotes,
  };
  return (
    <>
      {isEdit ?
        (
          <Formik initialValues={initialOtherValues} 
          // validationSchema={validationSchema} 
          onSubmit={handleSubmit} >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue
            }) => (
              <form onSubmit={handleSubmit} className="premises-form">
                <div className="grid grid-cols-12 gap-6">
                    <OtherForm title="Case" handleChange={handleChange} setFieldValue={setFieldValue} values={values} form={{ errors, touched }} initialValues={initialOtherValues} />
                </div >
                <FormButton onSave={handleSubmit} onCancel={toggleEdit}/>
              </form>
            )}
          </Formik>) :
        (<div className="grid grid-cols-12 gap-6">
         
            <OtherDetail dummy={dummy} />
         </div>)}
    </>
  );
};

export default OthersCaseDetails;

