import React, { useEffect, useRef, useState } from "react";
import { CaseCardDetails, XButton } from "../../../components";
import CaseAttorneyItems from "./caseAttorneyItems";
import { Formik } from "formik";
import { sellerItems, buyerItems, titleMortgageItems } from "../../../utils/formItem";
import FormButton from "../../../components/formButton";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import PurchaserParticipantForm from "../editDetail/purchaserParticipantForm";
import { updateClientByIdRequest } from "../../../redux/actions/clientActions";
import { createAddressRequest } from "../../../redux/actions/utilsActions";
import ParticipantBothDetail from "../showdetail/participantbothdetail";
import { createAttorneyRequest } from "../../../redux/actions/contactActions";
import AttorneyDetails from "../showdetail/attorneydetail";
import { updateCaseContactRequest } from "../../../redux/actions/caseAction";
import CaseRealtorItems from "./caseRealtorItems";


const ParticipantCaseDetails = ({ isEdit, setIsEdit, caseType, setDirtyFormnik }) => {
  const dispatch = useDispatch();
  const formikRef = useRef();
  const { client } = useSelector((state) => state.client);
  const { cases } = useSelector((state) => state.case.casesData);
  const caseObj = cases?.find(item => item.caseId === localStorage.getItem('c_id'));
  const clientDetails = client?.data?.length > 0 ? client?.data : null;
  const attorneyDetails = useSelector((state) => state.contact.attorney);
  const realtorDetails = useSelector((state) => state.contact.realtor);
  // const { data } = useSelector((state) => state?.utils?.address);
  // const addressDetails = data?.length > 0 ? data : null;

  const toggleEdit = () => {
    setDirtyFormnik(false)
    setIsEdit(prevState => !prevState);
  };
  // useEffect(() => {
  //   if (addressDetails) {
  //     let data = {
  //       addressId: clientDetails[0]?.addressId
  //     }
  //     dispatch(fetchPremisesRequest(data))
  //   }
  // }, [addressDetails])

  const handleSubmit = (values, { setSubmitting }) => {
    // Split the name into firstName and lastName
    const [firstName, lastName] = values?.name?.split(' ');
    const attorneyIds = attorneyDetails?.map(attorney => attorney.contactId);
    // Create the payload for the first API call
    const firstApiPayload = {
      firstName,
      lastName,
      ssn: values.ssn,
      email: values.email,
      cellNumber: values.cellNumber,
      workNumber: values.workNumber,
      wechatAccount: values.wechatAccount,
      // whatsApp: values.whatsApp,
      // line: values.line,
      clientId: clientDetails[0]?.clientId
    };

    const secondApiPayload = {
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
    }

    let data = {
      client: firstApiPayload,
      util: secondApiPayload
    }

    const casePayload = {
      ...caseObj,
      contacts: attorneyIds
    }
    if (values?.addressLine1) {
      dispatch(createAddressRequest(data))
    } else {
      dispatch(updateClientByIdRequest(data));
    }
    dispatch(updateCaseContactRequest(casePayload))
    toggleEdit()
    setDirtyFormnik(false)
  }
  const handleAttorneysChange = (attorneys, handleChange) => {
    handleChange({ target: { name: 'attorneys', value: attorneys } });
  };

  const handleRealtorsChange = (realtors, handleChange) => {
    handleChange({ target: { name: 'realtors', value: realtors } });
  };
  const initialPurchaserValues = clientDetails && clientDetails.length > 0 ? {
    name: `${clientDetails[0]?.firstName || ''} ${clientDetails[0]?.lastName || ''}`,
    ssn: clientDetails[0]?.ssn || '',
    email: clientDetails[0]?.email || '',
    cellNumber: clientDetails[0]?.cellNumber || '',
    workNumber: clientDetails[0]?.workNumber || '',
    wechatAccount: clientDetails[0]?.wechatAccount || '',
    whatsAppNumber: clientDetails[0]?.whatsAppNumber || '',
    lineNumber: clientDetails[0]?.lineNumber || '',
    addressLine1: clientDetails[0]?.addressLine1 || '',
    addressLine2: clientDetails[0]?.addressLine2 || '',
    city: clientDetails[0]?.city || '',
    state: clientDetails[0]?.state || '',
    zipCode: clientDetails[0]?.zipCode || '',
  } : {
    name: '',
    ssn: '',
    email: '',
    cellNumber: '',
    workNumber: '',
    wechatAccount: '',
    whatsAppNumber: '',
    lineNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email('Invalid email format'),
    cellNumber: Yup.string().matches(/^[0-9]+$/, 'Cell number must be a number'),
    // addressLine1: Yup.string().required("Address is required"),
    // addressLine2: Yup.string('Address Line 2 is required'),
    // city: Yup.string().required("City is required"),
    // state: Yup.string().required("State is required"),
    // zipCode: Yup.string().required("Zip code is required"),
  });

  return (
    <>
      {isEdit ?
        (<Formik
          initialValues={initialPurchaserValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          innerRef={formikRef}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            dirty
          }) => {
            setDirtyFormnik(dirty)
            return (
              <form
                onSubmit={handleSubmit}
                className="participant-form"
              >

                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-6">
                    <PurchaserParticipantForm title={caseType ? "Seller" : "Purchaser"} handleChange={handleChange} setFieldValue={setFieldValue} values={values} form={{ errors, touched }} initialValues={initialPurchaserValues} />
                  </div>
                  <div className="col-span-6">
                    <CaseAttorneyItems title="Attorneys" attorneys={values.attorneys} attorneyDetails={attorneyDetails} errors={errors.attorneys || []}
                      touched={touched.attorneys || []} setAttorneys={(attorneys) => handleAttorneysChange(attorneys, handleChange)} />
                    <CaseRealtorItems title="Realtors" realtors={values.realtors} realtorDetails={realtorDetails} errors={errors.realtors || []}
                      touched={touched.realtors || []} setRealtors={(realtors) => handleRealtorsChange(realtors, handleChange)} />
                    {/* <CaseAttorneyItems title="Attorneys" attorneys={values.attorneys} errors={errors.attorneys || []}
                    touched={touched.attorneys || []} setAttorneys={(attorneys) => handleAttorneysChange(attorneys, handleChange)} />
                  <CaseCardDetails items={titleMortgageItems} title="Title & Mortgage" handle={handleChange} /> */}
                  </div>
                </div >
                <FormButton onSave={handleSubmit} onCancel={toggleEdit} />
              </form>
            )
          }}
        </Formik>)
        :
        (<div className="grid grid-cols-12 gap-6">
          <div className="col-span-6">
            <ParticipantBothDetail client={clientDetails} attorneyDetails={attorneyDetails} title={caseType ? "Seller" : "Purchaser"} />
          </div>
          <div className="col-span-6">
            {attorneyDetails?.length > 0 && <AttorneyDetails attorneyDetails={attorneyDetails} title={"Attorney"} />}
            {realtorDetails?.length > 0 && <AttorneyDetails attorneyDetails={realtorDetails} title={"Realtor"} />}
          </div>
        </div>)}
    </>
  );
};

export default ParticipantCaseDetails;

