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


const ParticipantCaseDetails = ({isEdit,setIsEdit}) => {
  const dispatch = useDispatch();
  const {client}= useSelector((state) => state.client);
  const {cases}= useSelector((state) => state.case.casesData);
  const clientDetails = client?.data?.length > 0 ? client?.data : null;
  const {data}= useSelector((state) => state?.utils?.address);
  const addressDetails = data?.length > 0 ? data : null;

  const toggleEdit = () => {
    setIsEdit(prevState => !prevState);
  };
  useEffect(()=>{
    if(addressDetails){
      let data={
        addressId:clientDetails[0]?.addressId
      }
      dispatch(fetchPremisesRequest(data))
    }
  },[addressDetails])

  const handleSubmit = (x) => {
    toggleEdit()
  }
  const handleAttorneysChange = (attorneys, handleChange) => {
    handleChange({ target: { name: 'attorneys', value: attorneys } });
  };
  const initialValues = {
    sellerName: "",
    sellerSSN: "",
    sellerEmail: "",
    sellerCellPhone: "",
    sellerWorkPhone: "",
    sellerWeChat: "",
    sellerWhatsApp: "",
    sellerLine: "",
    sellerMailingAddress: "",
    purchaserName: "",
    purchaserSSN: "",
    purchaserEmail: "",
    purchaserCellPhone: "",
    purchaserWorkPhone: "",
    purchaserWeChat: "",
    purchaserWhatsApp: "",
    purchaserLine: "",
    purchaserMailingAddress: "",
    attorneys: [],
    titleCompany: "",
    titleNumber: "",
    titleMortgage: "",
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
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      // validationSchema={validationSchema}
    >
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched
      }) => (
        <form onSubmit={handleSubmit} className="login-form">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6">
              {
                isEdit ? cases[0]?.caseType ?
                  <CaseCardDetails items={sellerItems} title="Seller"  handle={handleChange} form={{ errors, touched }} />
                  :<CaseCardDetails items={buyerItems} title="Purchaser" handle={handleChange} form={{ errors, touched }} />
                    
                  :
                  <ParticipantDetail client={clientDetails} caseType={cases[0]?.caseType} address={addressDetails}/>

              }
            
            </div>
            <div className="col-span-6">
              <CaseAttorneyItems title="Attorneys" attorneys={values.attorneys}  errors={errors.attorneys || []} 
                touched={touched.attorneys || []} setAttorneys={(attorneys) => handleAttorneysChange(attorneys, handleChange)} />
              <CaseCardDetails items={titleMortgageItems} title="Title & Mortgage" handle={handleChange} />
            </div>
          </div >
         { isEdit && <FormButton onSave={handleSubmit} />}
        </form>
      )}
    </Formik>
  );
};

export default ParticipantCaseDetails;

