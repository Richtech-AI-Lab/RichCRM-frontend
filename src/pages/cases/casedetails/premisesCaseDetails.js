import React, { useState } from "react";
import { CaseCardDetails, XButton } from "../../../components";
import { Formik } from "formik";
import { inspectionItems, lowerSectionItems, premisesComposition, termitesInspectionItems } from "../../../utils/formItem";
import FormButton from "../../../components/formButton";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import PremisesDetail from "../showdetail/premisesdetail";
import PremisesForm from "../editDetail/permisesParticipantForm";
import { createAddressRequest } from "../../../redux/actions/utilsActions";

const PremisesCaseDetails = ({ isEdit, setIsEdit }) => {
  const dispatch= useDispatch()
  const { data: addressData } = useSelector((state) => state?.utils?.address);
  const addressDetails = addressData?.length > 0 ? addressData : null;

  const { data: premisesData } = useSelector((state) => state.premises.premises);
  const premisesDetails = premisesData?.length > 0 ? premisesData : null;

  const values = {
    ...addressData[0],
    ...premisesDetails[0]
  }
  const toggleEdit = () => {
    setIsEdit(prevState => !prevState);
  };
  let handleSubmit = (values, { setSubmitting }) => {
    const addressPayload = {
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode
    };
    const premisesPayload = {
      // addressId: addressDetails[0]?.addressId,
      premisesId: premisesDetails[0]?.premisesId,
      propertyType: values.propertyType ,
      block: values?.block,
      lot: values?.lot,
      section: values?.section,
      vacantAtClosing: values?.vacantAtClosing,
      subjectToTenancy: values?.subjectToTenancy,
      hoa: values?.hoa,
      parkingSpaces: values?.parkingSpaces,
      maintenanceFee: values?.maintenanceFee,
      maintenanceFeePer: values?.maintenanceFeePer,
      assessments: values?.assessments,
      assessmentsPaidById: values?.assessmentsPaidById,
      managingCompany: values?.managingCompany,
      isTwoFamily: values?.isTwoFamily,
      needInspection	: values?.needInspection,
      inspectionDate: values?.inspectionDate,
      receivedDate: values?.receivedDate,
      needTermitesInspection: values?.needTermitesInspection,
    };
    let data = {
      util: addressPayload,
      premises: premisesPayload
    }
    dispatch(createAddressRequest(data))
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
  const initialPremisesValues = premisesDetails && premisesDetails.length > 0 ?
    {
      // premisesId: premisesDetails[0],
      // name: premisesDetails[0],
      // addressId:premisesDetails[0],
      propertyType: premisesDetails[0].propertyType || '',
      addressLine1: addressDetails[0]?.addressLine1 || '',
      addressLine2: addressDetails[0]?.addressLine2 || '',
      city: addressDetails[0]?.city || '',
      state: addressDetails[0]?.state || '',
      zipCode: addressDetails[0]?.zipCode || '',
      block: premisesDetails[0]?.block,
      lot: premisesDetails[0]?.lot,
      section: premisesDetails[0]?.section,
      vacantAtClosing: premisesDetails[0]?.vacantAtClosing,
      subjectToTenancy: premisesDetails[0]?.subjectToTenancy,
      hoa: premisesDetails[0]?.hoa,
      parkingSpaces: premisesDetails[0]?.parkingSpaces,
      maintenanceFee: premisesDetails[0]?.maintenanceFee,
      maintenanceFeePer: premisesDetails[0]?.maintenanceFeePer,
      assessments: premisesDetails[0]?.assessments,
      assessmentsPaidById: premisesDetails[0]?.assessmentsPaidById,
      managingCompany: premisesDetails[0]?.managingCompany,
      isTwoFamily: premisesDetails[0]?.isTwoFamily,
      needInspection	: premisesDetails[0]?.needInspection,
      inspectionDate : premisesDetails[0]?.inspectionDate,
      receivedDate: premisesDetails[0]?.receivedDate,
      needTermitesInspection: premisesDetails[0]?.needTermitesInspection,
    }
    :
    {
      propertyType: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      name: '',
      addressId: '',
      block: '',
      lot: '',
      section: '',
      vacantAtClosing: '',
      subjectToTenancy: '',
      hoa: '',
      parkingSpaces: '',
      maintenanceFee: '',
      maintenanceFeePer: '',
      assessments: '',
      assessmentsPaidById: '',
      managingCompany: '',
      isTwoFamily: '',
      needInspection	:'',
      inspectionDate : '',
      receivedDate: '',
      needTermitesInspection: '',
    }


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
    <>
      {isEdit ?
        (
          <Formik initialValues={initialPremisesValues} onSubmit={handleSubmit} >
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

                  
                    <PremisesForm title="Premises Info" handleChange={handleChange} setFieldValue={setFieldValue} values={values} form={{ errors, touched }} initialValues={initialPremisesValues} />

                  
                  {/* <div className="col-span-6">
                    <CaseCardDetails items={premisesComposition} title="Premises Composition" handle={handleChange} />
                    <CaseCardDetails items={inspectionItems} title="Engineer Inspection" handle={handleChange} />
                    <CaseCardDetails items={termitesInspectionItems} title="Termites Inspection" handle={handleChange} />
                  </div> */}
                </div >

                <FormButton onSave={handleSubmit} onCancel={toggleEdit}/>
              </form>
            )}
          </Formik>) :
        (<div className="grid grid-cols-12 gap-6">
         
            <PremisesDetail address={addressDetails} premises={premisesDetails} />
         </div>)}
    </>
  );
};

export default PremisesCaseDetails;

