import React, { useState } from "react";
import { CaseCardDetails, XButton } from "../../../components";
import { Formik } from "formik";
import { inspectionItems, lowerSectionItems, premisesComposition, termitesInspectionItems } from "../../../utils/formItem";
import FormButton from "../../../components/formButton";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import PremisesDetail from "../showdetail/premisesdetail";

const PremisesCaseDetails = ({isEdit,setIsEdit}) => {
  const { data: addressData } = useSelector((state) => state?.utils?.address);
  const addressDetails = addressData?.length > 0 ? addressData : null;

  const { data: premisesData } = useSelector((state) => state.premises.premises);
  const premisesDetails = premisesData?.length > 0 ? premisesData : null;

  const values={
    ...addressData[0],
    ...premisesDetails[0]
  }
  const toggleEdit = () => {
    setIsEdit(prevState => !prevState);
  };
  let handleSubmit = (x) => {
    console.log(x)
    toggleEdit()
  }
  const initialValues = {
    scheduleDate: "",
    receivedDate: "",
    premisesType: "",
    premisesAddress: "",
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
    premisesMaintenace: {
      amount: '',
      period: '',
    },
    premisesAssessment: "",
    premisesPaidby: "",
    premisesManaging: "",
    premisesComposition: "",
    premisesonetenant: "",
    premisesonerent: "",
    premisesonesec: "",
    premisesonelease: "",
    premisestwotenant: "",
    premisestworent: "",
    premisestwosec: "",
    premisestwolease: "",
    premisesinspection: "",
    premisesScheduleDate: "",
    premisesRecievedDate: "",
    premisesTermites: "",
  };

  // const validationSchema = Yup.object().shape({
  //   scheduleDate: Yup.date().required('Schedule date is required'),
  //   receivedDate: Yup.date().required('Received date is required'),
  //   premisesType: Yup.string().required('Premises type is required'),
  //   premisesAddress: Yup.string().required('Premises address is required'),
  //   premisesAddress2: Yup.string(),
  //   premisesCity: Yup.string().required('Premises city is required'),
  //   premisesState: Yup.string().required('Premises state is required'),
  //   premisesZipcode: Yup.string().required('Premises zipcode is required'),
  //   premisesBlock: Yup.string().required('Premises block is required'),
  //   premisesLot: Yup.string().required('Premises lot is required'),
  //   premisesSection: Yup.string().required('Premises section is required'),
  //   premisesType2: Yup.string().required('Premises type2 is required'),
  //   premisesVacant: Yup.boolean().required('Premises vacant status is required'),
  //   premisesSubject: Yup.boolean().required('Premises subject status is required'),
  //   premisesHOA: Yup.boolean().required('Premises HOA status is required'),
  //   premisesParking: Yup.number().required('Premises parking space is required').integer().min(1, 'Must be at least 1'),
  //   // premisesMaintenace: Yup.object({
  //   //   amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
  //   //   period: Yup.string().required('Currency is required'),
  //   // }),
  //   premisesAssessment: Yup.number().required('Premises assessment is required').min(0, 'Must be a positive number'),
  //   premisesPaidby: Yup.string().required('Premises paid by is required'),
  //   premisesManaging: Yup.string().required('Premises managing company is required'),
  //   premisesComposition: Yup.string().required('Premises composition type is required'),
  //   premisesonetenant: Yup.string().required('1F Tenant name is required'),
  //   premisesonerent: Yup.number().required('1F Rent is required').min(0, 'Must be a positive number'),
  //   premisesonesec: Yup.number().required('1F Sec. is required').min(0, 'Must be a positive number'),
  //   premisesonelease: Yup.boolean().required('1F Lease status is required'),
  //   premisestwotenant: Yup.string().required('2F Tenant name is required'),
  //   premisestworent: Yup.number().required('2F Rent is required').min(0, 'Must be a positive number'),
  //   premisestwosec: Yup.number().required('2F Sec. is required').min(0, 'Must be a positive number'),
  //   premisestwolease: Yup.boolean().required('2F Lease status is required'),
  //   premisesinspection: Yup.boolean().required('Engineer inspection status is required'),
  //   premisesScheduleDate: Yup.date().required('Premises schedule date is required'),
  //   premisesRecievedDate: Yup.date().required('Premises received date is required'),
  //   premisesTermites: Yup.boolean().required('Termites inspection status is required'),
  // });

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} >
      {({
        handleChange,
        handleSubmit
      }) => (
        <form onSubmit={handleSubmit} className="pemises-form">
          <div className="grid grid-cols-12 gap-6">
            { isEdit ?<> 
              <div className="col-span-6">
               <CaseCardDetails items={lowerSectionItems} value={values} title="Premises Info" handle={handleChange} />
                
            </div>
            <div className="col-span-6">
              <CaseCardDetails items={premisesComposition} title="Premises Composition" handle={handleChange} />
              <CaseCardDetails items={inspectionItems} title="Engineer Inspection" handle={handleChange} />
              <CaseCardDetails items={termitesInspectionItems} title="Termites Inspection" handle={handleChange} />
            </div>
            </>
            :
            <>
            <div className="col-span-6">
              <PremisesDetail address={addressDetails} premises={premisesDetails} />
            </div>
            <div className="col-span-6">
              {/* <CaseCardDetails items={premisesComposition} title="Premises Composition" handle={handleChange} />
              <CaseCardDetails items={inspectionItems} title="Engineer Inspection" handle={handleChange} />
              <CaseCardDetails items={termitesInspectionItems} title="Termites Inspection" handle={handleChange} /> */}
            </div>
            </>}
          </div >

          <FormButton onSave={handleSubmit} />
        </form>
      )}
    </Formik>
  );
};

export default PremisesCaseDetails;

