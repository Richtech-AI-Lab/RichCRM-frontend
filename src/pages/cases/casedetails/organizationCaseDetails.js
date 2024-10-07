import React, { useEffect, useState } from "react";
import { CaseCardDetails, XButton } from "../../../components";
import CaseAttorneyItems from "./caseAttorneyItems";
import { Formik } from "formik";
import { sellerItems, buyerItems, titleMortgageItems } from "../../../utils/formItem";
import FormButton from "../../../components/formButton";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createAddressRequest } from "../../../redux/actions/utilsActions";
import ParticipantBothDetail from "../showdetail/participantbothdetail";
import PurchaserOrganizationForm from "../editDetail/purchaserOrganizationForm";


const OrganizationCaseDetails = ({ isEdit, setIsEdit , caseType}) => {
  const dispatch = useDispatch();
  const { cases } = useSelector((state) => state.case.casesData);
  const { organization } = useSelector((state) => state.organization);
  const organizationDetails = organization?.data?.length > 0 ? organization?.data : null;
  // const { data } = useSelector((state) => state?.utils?.address);
  // const addressDetails = data?.length > 0 ? data : null;

  const toggleEdit = () => {
    setIsEdit(prevState => !prevState);
  };

  const handleSubmit = (values, { setSubmitting }) => {

    // Create the payload for the first API call
    const firstApiPayload = {
      organizationName: values.organizationName,
      website: values.website,
      email: values.email,
      cellNumber: values.cellNumber,
      organizationId: organizationDetails[0]?.organizationId
    };

    const secondApiPayload = {
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
    }

    let data = {
      organization: firstApiPayload,
      util: secondApiPayload
    }
    dispatch(createAddressRequest(data))
    toggleEdit()
  }
  // const handleAttorneysChange = (attorneys, handleChange) => {
  //   handleChange({ target: { name: 'attorneys', value: attorneys } });
  // };
  const initialOrganizationValues = organizationDetails && organizationDetails.length > 0 ? {
    organizationName: organizationDetails[0]?.organizationName || '',
    website: organizationDetails[0]?.website || '',
    email: organizationDetails[0]?.email || '',
    cellNumber: organizationDetails[0]?.cellNumber || '',
    addressLine1: organizationDetails[0]?.addressLine1 || '',
    addressLine2: organizationDetails[0]?.addressLine2 || '',
    city: organizationDetails[0]?.city || '',
    state: organizationDetails[0]?.state || '',
    zipCode: organizationDetails[0]?.zipCode || '',
  } : {
    organizationName: '',
    website: '',
    email: '',
    cellNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
  };

  // const validationSchema = Yup.object({
  
  // });
  return (
    <>
      {isEdit ?
        (<Formik
          initialValues={initialOrganizationValues}
          onSubmit={handleSubmit}
        // validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue
          }) => (
            <form onSubmit={handleSubmit} className="participant-form">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-6">
                  <PurchaserOrganizationForm title={ caseType ? "Seller" : "Purchaser"} handleChange={handleChange} setFieldValue={setFieldValue} values={values} form={{ errors, touched }} initialValues={initialOrganizationValues} />
                </div>
                <div className="col-span-6">
                  {/* <CaseAttorneyItems title="Attorneys" attorneys={values.attorneys} errors={errors.attorneys || []}
                    touched={touched.attorneys || []} setAttorneys={(attorneys) => handleAttorneysChange(attorneys, handleChange)} />
                  <CaseCardDetails items={titleMortgageItems} title="Title & Mortgage" handle={handleChange} /> */}
                </div>
              </div >
              <FormButton onSave={handleSubmit} onCancel={toggleEdit} />
            </form>
          )}
        </Formik>)
        :
        (<div className="grid grid-cols-12 gap-6">
          <div className="col-span-6"><ParticipantBothDetail organization={organizationDetails}  title={ caseType  ? "Seller" : "Purchaser"} /></div></div>)}
    </>
  );
};

export default OrganizationCaseDetails;

