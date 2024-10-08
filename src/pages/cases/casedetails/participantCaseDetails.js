import React, { useEffect, useState } from "react";
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


const ParticipantCaseDetails = ({ isEdit, setIsEdit, caseType }) => {
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.client);
  const { cases } = useSelector((state) => state.case.casesData);
  const caseObj = cases?.find(item => item.caseId === localStorage.getItem('c_id'));
  const clientDetails = client?.data?.length > 0 ? client?.data : null;
  const attorneyDetails = useSelector((state) => state.contact.attorney);
  // const { data } = useSelector((state) => state?.utils?.address);
  // const addressDetails = data?.length > 0 ? data : null;

  const toggleEdit = () => {
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
    dispatch(createAddressRequest(data))
    dispatch(updateCaseContactRequest(casePayload))
    toggleEdit()
  }
  const handleAttorneysChange = (attorneys, handleChange) => {
    handleChange({ target: { name: 'attorneys', value: attorneys } });
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
    // sellerName: Yup.string().required("name is required"),
    // sellerSSN: Yup.string().required("ssn is required"),
    // sellerEmail: Yup.string().required("email is required"),
    // sellerCellPhone: Yup.string().required("cellphone is required"),
    // sellerWorkPhone: Yup.string()
    //     .nullable()
    //     .notRequired()
    //     .matches(/^[0-9]{10}$/, "Work phone must be a valid 10-digit number"),
    // sellerWeChat: Yup.string().required("wechat is required"),
    // sellerWhatsApp: Yup.string().required("whatsapp is required"),
    // sellerLine: Yup.string().required("line is required"),
    // sellerMailingAddress: Yup.string().required("mailing address is required"),
    // purchaserName: Yup.string().required("name is required"),
    // purchaserSSN: Yup.string().required("ssn is required"),
    // purchaserEmail: Yup.string().required("email is required"),
    // purchaserCellPhone: Yup.string().required("cellphone is required"),
    // purchaserWorkPhone: Yup.string().required("workphone is required"),
    // purchaserWeChat: Yup.string().required("wechat is required"),
    // purchaserWhatsApp: Yup.string().required("whatsapp is required"),
    // purchaserLine: Yup.string().required("line is required"),
    // purchaserMailingAddress: Yup.string().required("mailing is required"),
    // attorneys: Yup.array().of(
    //   Yup.object().shape({
    //     label: Yup.string().required("label label is required"),
    //     value: Yup.string().required("value value is required"),
    //   })
    // ).required("At least one attorney is required"),
    // titleCompany: Yup.string().required("title company is required"),
    // titleNumber: Yup.string().required("title number is required"),
    // titleMortgage: Yup.string().required("title mortage is required"),
  });
  return (
    <>
      {isEdit ?
        (<Formik
          initialValues={initialPurchaserValues}
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
                  <PurchaserParticipantForm title={ caseType  ? "Seller" : "Purchaser"} handleChange={handleChange} setFieldValue={setFieldValue} values={values} form={{ errors, touched }} initialValues={initialPurchaserValues} />
                </div>
                <div className="col-span-6">
                <CaseAttorneyItems title="Attorneys" attorneys={values.attorneys} attorneyDetails={attorneyDetails} errors={errors.attorneys || []}
                    touched={touched.attorneys || []} setAttorneys={(attorneys) => handleAttorneysChange(attorneys, handleChange)} />
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
          <div className="col-span-6"><ParticipantBothDetail client={clientDetails} attorneyDetails={attorneyDetails}  title={ caseType  ? "Seller" : "Purchaser"}  /></div>
         {attorneyDetails?.length > 0  && <div className="col-span-6"><AttorneyDetails  attorneyDetails={attorneyDetails}  title={"Attorney"}  /></div>}
         </div>)}
    </>
  );
};

export default ParticipantCaseDetails;

