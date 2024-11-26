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
import { createAddClientAddressRequest, createAddressRequest } from "../../../redux/actions/utilsActions";
import ParticipantBothDetail from "../showdetail/participantbothdetail";
import AttorneyDetails from "../showdetail/attorneydetail";
import { updateCaseContactRequest } from "../../../redux/actions/caseAction";
import CaseBrokerItems from "./CaseBrokerItems";
import AdditionalClientForm from "../editDetail/additionalClientForm";


const ParticipantCaseDetails = ({ isEdit, setIsEdit, caseType, setDirtyFormnik }) => {
  const dispatch = useDispatch();
  const formikRef = useRef();
  const [addClient, setAddClient] = useState([])
  const { client, additionalClient } = useSelector((state) => state.client);
  const { cases } = useSelector((state) => state.case.casesData);
  const caseObj = cases?.find(item => item.caseId === localStorage.getItem('c_id'));
  const clientDetails = client?.data?.length > 0 ? client?.data : null;
  const attorneyDetails = useSelector((state) => state.contact.attorney);
  const realtorDetails = useSelector((state) => state.contact.realtor);
  const brokerDetails = useSelector((state) => state.contact.broker);
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
    console.log(values, "values.additionalClientData");
  
    // Extract main client details
    const [firstName, lastName] = values?.name?.split(' ') || ["", ""];
    const attorneyIds = attorneyDetails?.map(attorney => attorney.contactId) || [];
    const brokerIds = brokerDetails?.map(broker => broker.contactId) || [];
  
    // Payload for the main client
    const mainClientPayload = {
      firstName,
      lastName,
      ssn: values.ssn,
      email: values.email,
      cellNumber: values.cellNumber,
      workNumber: values.workNumber,
      wechatAccount: values.wechatAccount,
      clientId: clientDetails[0]?.clientId
    };
  
    const mainAddressPayload = {
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
    };
  
    // Prepare data for dispatch
    const mainData = {
      client: mainClientPayload,
      util: mainAddressPayload
    };
  
    // Dispatch based on presence of address
    if (values?.addressLine1) {
      dispatch(createAddressRequest(mainData));
    } else {
      dispatch(updateClientByIdRequest(mainData));
    }
  
    // Handle additional clients
    if (values.additionalClientData?.length > 0) {
      values.additionalClientData.forEach(client => {
        const [firstName, lastName] = client?.name?.split(' ') || ["", ""];
  
        const additionalClientPayload = {
          firstName,
          lastName,
          ssn: client?.ssn,
          email: client?.email,
          cellNumber: client?.cellNumber,
          workNumber: client?.workNumber,
          wechatAccount: client?.wechatAccount,
          clientId: client?.clientId
        };
  
        const additionalAddressPayload = {
          addressLine1: client?.addressLine1,
          addressLine2: client?.addressLine2,
          city: client?.city,
          state: client?.state,
          zipCode: client?.zipCode,
        };
  
        const additionalData = {
          client: additionalClientPayload,
          util: additionalAddressPayload
        };
  
        if (client?.addressLine1) {
          dispatch(createAddClientAddressRequest(additionalData));
        } else {
          dispatch(updateClientByIdRequest(additionalData));
        }
      });
    }
  
    // Case contact update payload
    const casePayload = {
      ...caseObj,
      contacts: [...attorneyIds, ...brokerIds]
    };
  
    // Dispatch case contact update
    dispatch(updateCaseContactRequest(casePayload));
  
    // Final cleanup
    toggleEdit();
    setDirtyFormnik(false);
    setSubmitting(false);
  };
  
  const handleAttorneysChange = (attorneys, handleChange) => {
    handleChange({ target: { name: 'attorneys', value: attorneys } });
  };

  const handleBrokersChange = (brokers, handleChange) => {
    handleChange({ target: { name: 'brokers', value: brokers } });
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
    additionalClientData: addClient || []
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
  useEffect(() => {
    setAddClient(additionalClient)
    // setAddClient(additionalClient?.map((client) => [client]))
  }, [additionalClient])
  // let transform = additionalClient?.map((client) => [client])
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
                    {/* <PurchaserParticipantForm title={caseType ? "Seller" : "Purchaser"} handleChange={handleChange} setFieldValue={setFieldValue} values={values} form={{ errors, touched }} initialValues={initialPurchaserValues} /> */}

                    <AdditionalClientForm title={caseType ? "Seller" : "Purchaser"} client={values?.additionalClientData} handleChange={handleChange} setFieldValue={setFieldValue} form={{ errors, touched }} initialValues={initialPurchaserValues} />
                  
                  </div>
                  <div className="col-span-6">
                    <CaseAttorneyItems title="Attorneys" attorneys={values.attorneys} attorneyDetails={attorneyDetails} errors={errors.attorneys || []}
                      touched={touched.attorneys || []} setAttorneys={(attorneys) => handleAttorneysChange(attorneys, handleChange)} />
                    <CaseBrokerItems title="Brokers" brokers={values.brokers} brokerDetails={brokerDetails} errors={errors.brokers || []}
                      touched={touched.brokers || []} setBrokers={(brokers) => handleBrokersChange(brokers, handleChange)} />
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
            <ParticipantBothDetail client={clientDetails[0]} attorneyDetails={attorneyDetails} title={caseType ? "Seller" : "Purchaser"} />
            {addClient?.map(client =>
              <ParticipantBothDetail client={client} title={caseType ? "Seller" : "Purchaser"} />
            )}
          </div>
          <div className="col-span-6">
            {attorneyDetails?.length > 0 && <AttorneyDetails attorneyDetails={attorneyDetails} title={"Attorney"} />}
            {realtorDetails?.length > 0 && <AttorneyDetails attorneyDetails={realtorDetails} title={"Realtor"} />}
            {brokerDetails?.length > 0 && <AttorneyDetails attorneyDetails={brokerDetails} title={"Broker"} />}
          </div>
        </div>)}
    </>
  );
};

export default ParticipantCaseDetails;

