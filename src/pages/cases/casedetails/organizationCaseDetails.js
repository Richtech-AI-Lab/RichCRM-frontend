import React, { useEffect, useRef, useState } from "react";
import { CaseCardDetails, XButton } from "../../../components";
import CaseAttorneyItems from "./caseAttorneyItems";
import { Formik } from "formik";
import { sellerItems, buyerItems, titleMortgageItems } from "../../../utils/formItem";
import FormButton from "../../../components/formButton";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createAddOrgAddressRequest, createAddressRequest } from "../../../redux/actions/utilsActions";
import ParticipantBothDetail from "../showdetail/participantbothdetail";
import PurchaserOrganizationForm from "../editDetail/purchaserOrganizationForm";
import AttorneyDetails from "../showdetail/attorneydetail";
import { updateCaseContactRequest } from "../../../redux/actions/caseAction";
import { updateAddOrganizationByIdRequest, updateOrganizationByIdRequest } from "../../../redux/actions/organizationActions";
import CaseBrokerItems from "./CaseBrokerItems";
import AdditionalOrganizationForm from "../editDetail/additionalOrganizationForm";


const OrganizationCaseDetails = ({ isEdit, setIsEdit, caseType, setDirtyFormnik }) => {
  const dispatch = useDispatch();
  const formikRef = useRef();
  const [addOrg, setAddOrg] = useState([])
  const { cases } = useSelector((state) => state.case.casesData);
  const caseObj = cases?.find(item => item.caseId === localStorage.getItem('c_id'));
  const { organization, additionalOrganization } = useSelector((state) => state.organization);
  const organizationDetails = organization?.data?.length > 0 ? organization?.data : null;
  const attorneyDetails = useSelector((state) => state.contact.attorney);
  const realtorDetails = useSelector((state) => state.contact.realtor);
  const brokerDetails = useSelector((state) => state.contact.broker);
  // const { data } = useSelector((state) => state?.utils?.address);
  // const addressDetails = data?.length > 0 ? data : null;

  const toggleEdit = () => {
    setDirtyFormnik(false)
    setIsEdit(prevState => !prevState);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const attorneyIds = attorneyDetails?.map(attorney => attorney.contactId) || [];
    const brokerIds = brokerDetails?.map(broker => broker.contactId) || [];
    // Create the payload for the first API call
    const mainOrgPayload = {
      organizationName: values.organizationName,
      website: values.website,
      email: values.email,
      cellNumber: values.cellNumber,
      organizationId: organizationDetails[0]?.organizationId
    };

    const mainAddressPayload = {
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
    }

    let mainData = {
      organization: mainOrgPayload,
      util: mainAddressPayload
    }

    if (values?.addressLine1) {
      dispatch(createAddressRequest(mainData))
    } else {
      dispatch(updateOrganizationByIdRequest(mainData));
    }
    if (values.additionalOrgData?.length > 0) {

      values.additionalOrgData.forEach(org => {
        const additionalOrgPayload = {
          organizationName: org.organizationName,
          website: org.website,
          email: org.email,
          cellNumber: org.cellNumber,
          organizationId: org?.organizationId
        };
    
        const additionalAddressPayload = {
          addressLine1: org.addressLine1,
          addressLine2: org.addressLine2,
          city: org.city,
          state: org.state,
          zipCode: org.zipCode,
        }
    
        let additionalData = {
          organization: additionalOrgPayload,
          util: additionalAddressPayload
        }
        
        if (org?.addressLine1) {
          dispatch(createAddOrgAddressRequest(additionalData))
        } else {
          dispatch(updateAddOrganizationByIdRequest(additionalData));
        }
      });
    }

    const casePayload = {
      ...caseObj,
      contacts: [...attorneyIds, ...brokerIds]
    }
   
    dispatch(updateCaseContactRequest(casePayload))
    toggleEdit()
    setDirtyFormnik(false)
  }


  const handleBrokersChange = (brokers, handleChange) => {
    handleChange({ target: { name: 'brokers', value: brokers } });
  };

  const handleAttorneysChange = (attorneys, handleChange) => {
    handleChange({ target: { name: 'attorneys', value: attorneys } });
  };
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
    additionalOrgData: addOrg || []
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

  const validationSchema = Yup.object({
    organizationName: Yup.string().required("Name is required"),
    email: Yup.string().email('Invalid email format').required("Email is required"),
    cellNumber: Yup.string().matches(/^[0-9]+$/, 'Cell number must be a number').required("Cell Phone is required"),
    website: Yup.string().matches(/.+\.com/, "Input must contain a value followed by '.com'"),
    // .required("Website is required"),
    // addressLine1: Yup.string().required("Address is required"),
    // // addressLine2: Yup.string('Address Line 2 is required'),
    // city: Yup.string().required("City is required"),
    // state: Yup.string().required("State is required"),
    // zipCode: Yup.string().required("Zip code is required"),
  });

  useEffect(() => {
    setAddOrg(additionalOrganization)
  }, [additionalOrganization])

  return (
    <>
      {isEdit ?
        (<Formik
          initialValues={initialOrganizationValues}
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
              <form onSubmit={handleSubmit} className="participant-form">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-6">
                    <PurchaserOrganizationForm title={caseType ? "Seller" : "Purchaser"} handleChange={handleChange} setFieldValue={setFieldValue} values={values} form={{ errors, touched }} initialValues={initialOrganizationValues} />

                    <AdditionalOrganizationForm title={caseType ? "Seller" : "Purchaser"} handleChange={handleChange} setFieldValue={setFieldValue} organization={values?.additionalOrgData} values={values} form={{ errors, touched }} initialValues={initialOrganizationValues} />


                  </div>
                  <div className="col-span-6">
                    <CaseAttorneyItems title="Attorneys" attorneys={values.attorneys} attorneyDetails={attorneyDetails} errors={errors.attorneys || []}
                      touched={touched.attorneys || []} setAttorneys={(attorneys) => handleAttorneysChange(attorneys, handleChange)} />
                    <CaseBrokerItems title="Brokers" brokers={values.brokers} brokerDetails={brokerDetails} errors={errors.brokers || []}
                      touched={touched.brokers || []} setBrokers={(brokers) => handleBrokersChange(brokers, handleChange)} />{/* <CaseAttorneyItems title="Attorneys" attorneys={values.attorneys} errors={errors.attorneys || []}
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
            <ParticipantBothDetail organization={organizationDetails[0]} title={caseType ? "Seller" : "Purchaser"} />
            {addOrg?.map(org =>
              <ParticipantBothDetail organization={org} title={caseType ? "Seller" : "Purchaser"} />
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

export default OrganizationCaseDetails;

