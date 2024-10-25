import React, { useState, useRef} from "react";
import { CaseCardDetails, XButton } from "../../../components";
import { FaCircleMinus } from "react-icons/fa6";
import { Formik } from "formik";
import { IMAGES } from "../../../constants/imagePath";
import { brokersItems, closingDateItems, financialItems, otherItems } from "../../../utils/formItem";
import FormButton from "../../../components/formButton";
import OtherForm from "../editDetail/otherForm";
import OtherDetail from "../showdetail/otherdetails";
import { useDispatch, useSelector } from "react-redux";
import { updateCaseDateRequest } from "../../../redux/actions/caseAction";


const OthersCaseDetails = ({ isEdit, setIsEdit, setDirtyFormnik }) => {
  const dispatch = useDispatch();
  const formikRef = useRef();
  const [dummy, setDummy] = useState({})
  const { cases } = useSelector((state) => state?.case?.casesData);
  const caseObj = cases?.find(item => item?.caseId == localStorage?.getItem('c_id'));
  const toggleEdit = () => {
    setDirtyFormnik(false)
    setIsEdit(prevState => !prevState);
  };
  let handleSubmit = (value) => {
      const payload = {
        caseId: localStorage.getItem('c_id'),
        // caseType: parseInt(value?.caseType),
        purchaserPrice: value?.purchaserPrice,
        downPayment: value?.downPayment,
        mortgageAmount: value?.mortgageAmount,
        annualPropertyTax: value?.annualPropertyTax,
        sellersConcession: value?.sellersConcession,
        // realtorSale: value?.realtorSale,
        // realtorListing: value?.realtorListing,
        closingDate: value?.closingDate,
        closeAt: value?.closeAt,
        referral: value?.referral,
        bank: value?.bank,
        personalNotes: value?.personalNotes,
        excludedNotes: value?.excludedNotes,
      };
      dispatch(updateCaseDateRequest(payload))
      setDummy(value)
      toggleEdit()
      setDirtyFormnik(false)
  }
  const initialOtherValues = {
    // caseType: caseObj?.caseType ? caseObj?.caseType : dummy?.caseType,
    purchaserPrice: caseObj?.purchaserPrice ? caseObj?.purchaserPrice : dummy?.purchaserPrice,
    downPayment: caseObj?.downPayment ? caseObj?.downPayment : dummy?.downPayment,
    mortgageAmount: caseObj?.mortgageAmount ? caseObj?.mortgageAmount : dummy?.mortgageAmount,
    annualPropertyTax: caseObj?.annualPropertyTax ? caseObj?.annualPropertyTax : dummy?.annualPropertyTax,
    sellersConcession: caseObj?.sellersConcession ? caseObj?.sellersConcession : dummy?.sellersConcession,
    // realtorSale: caseObj?.realtorSale ? caseObj?.realtorSale : dummy?.realtorSale,
    // realtorListing: caseObj?.realtorListing ? caseObj?.realtorListing : dummy?.realtorListing,
    closingDate: caseObj?.closingDate ? caseObj?.closingDate : dummy?.closingDate,
    closeAt: caseObj?.closeAt ? caseObj?.closeAt : dummy?.closeAt,
    referral: caseObj?.referral ? caseObj?.referral : dummy?.referral,
    bank: caseObj?.bank ? caseObj?.bank : dummy?.bank,
    personalNotes: caseObj?.personalNotes ? caseObj?.personalNotes : dummy?.personalNotes,
    excludedNotes: caseObj?.excludedNotes ? caseObj?.excludedNotes : dummy?.excludedNotes,
  };
  
  return (
    <>
      {isEdit ?
        (
          <Formik initialValues={initialOtherValues} 
          // validationSchema={validationSchema} 
          innerRef={formikRef}
          onSubmit={handleSubmit} >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
              dirty
            }) =>  {
              setDirtyFormnik(dirty)
              return(
              <form onSubmit={handleSubmit} className="premises-form">
                <div className="grid grid-cols-12 gap-6">
                    <OtherForm title="Case" handleChange={handleChange} setFieldValue={setFieldValue} values={values} form={{ errors, touched }} initialValues={initialOtherValues} />
                </div >
                <FormButton onSave={handleSubmit} onCancel={toggleEdit}/>
              </form>
            )}}
          </Formik>) :
        (<div className="grid grid-cols-12 gap-6">
         
            <OtherDetail dummy={dummy} caseObj={caseObj} />
         </div>)}
    </>
  );
};

export default OthersCaseDetails;

