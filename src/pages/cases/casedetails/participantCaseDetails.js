import React, { useEffect, useState } from "react";
import { CaseCardDetails, XButton } from "../../../components";
import CaseAttorneyItems from "./caseAttorneyItems";
import { Formik } from "formik";
import { sellerItems, buyerItems, titleMortgageItems } from "../../../utils/formItem";
import FormButton from "../../../components/formButton";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import ShowDetail from "../showdetail/participantdetail";
import { fetchAddressByIdRequest } from "../../../redux/actions/utilsActions";
import { fetchPremisesRequest } from "../../../redux/actions/premisesActions";
import ParticipantDetail from "../showdetail/participantdetail";
import PurchaserParticipantForm from "../editDetail/purchaserParticipantForm";
import { updateClientByIdRequest } from "../../../redux/actions/clientActions";


const ParticipantCaseDetails = ({ isEdit, setIsEdit }) => {
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.client);
  const { cases } = useSelector((state) => state.case.casesData);
  const clientDetails = client?.data?.length > 0 ? client?.data : null;
  const { data } = useSelector((state) => state?.utils?.address);
  const addressDetails = data?.length > 0 ? data : null;

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
      clientId:clientDetails[0]?.clientId
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
    console.log(data,"______")
    dispatch(updateClientByIdRequest(data))
    toggleEdit()
  }
  const handleAttorneysChange = (attorneys, handleChange) => {
    handleChange({ target: { name: 'attorneys', value: attorneys } });
  };
  const initialPurchaserValues = {
    firstName: '',
    lastName: '',
    ssn: '',
    email: '',
    cellphone: '',
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
            <form onSubmit={handleSubmit} className="purchaser-form">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-6">
                  {false ? ""
                    // <SellerParticipantForm items={sellerItems} title="Seller" value={clientDetails[0]} handle={handleChange} form={{ errors, touched }} />
                    :
                    <PurchaserParticipantForm title="Purchaser" handleChange={handleChange} setFieldValue={setFieldValue} values={values} form={{ errors, touched }} />
                  }

                </div>
                <div className="col-span-6">
                  {/* <CaseAttorneyItems title="Attorneys" attorneys={values.attorneys} errors={errors.attorneys || []}
                    touched={touched.attorneys || []} setAttorneys={(attorneys) => handleAttorneysChange(attorneys, handleChange)} />
                  <CaseCardDetails items={titleMortgageItems} title="Title & Mortgage" handle={handleChange} /> */}
                </div>
              </div >
              <FormButton onSave={handleSubmit} />
            </form>
          )}
        </Formik>)
        :
        (<div className="grid grid-cols-12 gap-6">
                <div className="col-span-6"><ParticipantDetail client={clientDetails} caseType={false} address={addressDetails} /></div></div>)}
    </>
  );
};

export default ParticipantCaseDetails;

