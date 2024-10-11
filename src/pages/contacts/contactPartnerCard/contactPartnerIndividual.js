import { Spinner, Table, Textarea, TextInput } from "flowbite-react";
import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import dummyData from "../../../utils/dummyData.json";
import { ROUTES } from "../../../constants/api";
import { useLocation, useNavigate } from "react-router-dom";
import ContactsActionbar from "../../../components/actionbar/contactsActionBar";
import CardItem from "../../../components/carditem";
import FormButton from "../../../components/formButton";
import { contactItemFirst, contactItems, contactItemSecond, sellerItems } from "../../../utils/formItem";
import { CaseCardDetails, SelectInput } from "../../../components";
import { Field, Formik } from "formik";
import { IMAGES } from "../../../constants/imagePath";
import { CASETYPE } from "../../../constants/constants";
// import ContactEditForm from "../contactEdit";
import { createAddressRequest, fetchAddressByIdFailure, fetchAddressByIdRequest } from "../../../redux/actions/utilsActions";
import { useDispatch, useSelector } from "react-redux";
import { getCaseByContactRequest } from "../../../redux/actions/caseAction";
import ContactIndividualDetail from "../contactDetail/contactIndividualDetail";
import ContactIndividualEditForm from "../contactEdit/contactIndividualEditForm";

const ContactPartnerIndividual = ({ isEdit, toggleEdit }) => {
  const dispatch = useDispatch();
  const { cases, loading } = useSelector((state) => state.case.casesData);

  // console.log(cases[0], "-")
  // const location = useLocation();
  // const contactdetails = location?.state?.contact ;
  const contactdetails = useSelector((state) => state?.contact?.selectedItem);

  const addressData = useSelector((state) => state?.utils?.address);
  const addressDetails = addressData?.data?.length > 0 ? addressData?.data[0] : null;



  useEffect(() => {
    if (contactdetails?.mailingAddress) {
      let data = {
        addressId: contactdetails?.mailingAddress
      }
      dispatch(fetchAddressByIdRequest(data))
    }else{
      dispatch(fetchAddressByIdFailure())
    }
  }, [])

  useEffect(() => {
    if (contactdetails?.contactId) {
      let data = {
        contactId: contactdetails?.contactId
      }
      dispatch(getCaseByContactRequest(data))
    }
  }, [])


  const handleSubmit = useCallback((values) => {

    const firstApiPayload = {
      contactId: contactdetails?.contactId,
      firstName: values?.firstName,
      lastName: values?.lastName,
      contactType: contactdetails?.contactType,
      position: values?.position,
      company: values?.company,
      ...(values?.email && values?.email.trim() !== "" && { email: values.email }),
      cellNumber: values?.cellNumber,
      workNumber: values.workNumber,
      wechatAccount: values.wechatAccount,
      // whatsApp: values.whatsApp,
      // line: values.line,
      note: values?.note,
      mailingAddress: values?.mailingAddress,
      ssn: values?.ssn,
      driverLicense: values?.driverLicense,
    };

    const secondApiPayload = {
      addressLine1: values?.addressLine1,
      addressLine2: values?.addressLine2,
      city: values?.city,
      state: values?.state,
      zipCode: values?.zipCode,
    }

    let data = {
      contact: firstApiPayload,
      util: secondApiPayload
    }

    dispatch(createAddressRequest(data))
    toggleEdit()
  }, []);

  const caseTypeOptions = [
    { value: CASETYPE.PURCHASING, label: "Purchaser" },
    { value: CASETYPE.SELLING, label: "Broker" },
  ];
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format'),
    cellNumber: Yup.string().matches(/^[0-9]+$/, 'Cell number must be a number').required('Cell number is required'),
    addressLine1: Yup.string().required("Address is required"),
    // addressLine2: Yup.string('Address Line 2 is required'),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string().required("Zip code is required"),
  });
  const initialValues = {
    contactId: contactdetails?.contactId || '',
    contactType: contactdetails?.contactType || '',
    firstName: contactdetails?.firstName || '',
    lastName: contactdetails?.lastName || '',
    company: contactdetails?.company || '',
    position: contactdetails?.position || '',
    cellNumber: contactdetails?.cellNumber || '',
    email: contactdetails?.email || '',
    mailingAddress: contactdetails?.mailingAddress || '',
    wechatAccount: contactdetails?.wechatAccount || '',
    note: contactdetails?.note || '',
    addressLine1: addressDetails?.addressLine1 || '',
    addressLine2: addressDetails?.addressLine2 || '',
    city: addressDetails?.city || '',
    state: addressDetails?.state || '',
    zipCode: addressDetails?.zipCode || '',
    ssn: contactdetails?.ssn || '',
    driverLicense: contactdetails?.driverLicense || '',

  };

  const closedCases = [
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" }
  ];
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {isEdit ?
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              setFieldValue,
              handleSubmit,
              values,
              errors,
              touched
            }) => (
              <>
                <div className="col-span-6">
                  <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-2xl mb-5 p-4">
                      <div className="flex">
                        <img
                          src={IMAGES.avatarpic}
                          alt="Profile"
                          className="rounded-full"
                          style={{ height: '150px', width: '150px' }}
                        // className="mt-2"
                        />
                        <div className="ml-6">
                          <div className="mb-16">
                            <p className="text-[22px] font-medium text-secondary-800">{initialValues?.firstName} {initialValues?.lastName}</p>
                            {/* <p className="font-medium text-secondary-800 text-sm mb-10">Brokers</p> */}
                            <Field
                              as={SelectInput}
                              defaultLabel={`Brokers`}
                              inputClassName="bg-input-surface py-[6px] px-4 rounded-full border-0 text-sm leading-5 font-semibold text-label"
                              labelClassName="ext-label mr-3"
                              name="type"
                              options={caseTypeOptions?.map((option) => ({
                                value: option.id,
                                label: option.label,
                              }))}
                            />
                          </div>
                          <p className="text-secondary-300 text-sm">ID xxxx</p>
                        </div>
                      </div>
                    </div>

                    <ContactIndividualEditForm handleChange={handleChange} setFieldValue={setFieldValue} values={values} form={{ errors, touched }} initialValues={initialValues} />
                    <FormButton onSave={handleSubmit} onCancel={toggleEdit} />
                  </form>
                </div>
                <div className="col-span-3">
                  <div className="card bg-card-300 px-2 py-3">
                    <h1 className="px-5">Involved Open Cases</h1>
                    <div className="grid">
                      {cases[0][1]?.map((item, index) => (

                        <CardItem
                          key={index}
                          caseDetails={item?.premisesName}
                          caseTitle={item?.clientName}
                          caseCount={item.caseCount}
                          caseType={item?.caseType}
                          caseStatus={item?.caseStatus}
                          innerCardClass="m-2"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="card bg-card-300 px-2 py-3">
                    <h1 className="px-5">Involved Closed Cases</h1>
                    <div className="grid">
                      {cases[0][0]?.map((item, index) => (
                        <CardItem
                          key={index}
                          caseDetails={item?.premisesName}
                          caseTitle={item?.clientName}
                          caseCount={item.caseCount}
                          caseType={item?.caseType}
                          caseStatus={item?.caseStatus}
                          innerCardClass="m-2"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </Formik>
          :
          <>
            <div className="col-span-6 pp">
              <ContactIndividualDetail address={addressDetails} contact={contactdetails} />
            </div>
            <div className="col-span-3">
              <div className="card bg-card-300 px-2 py-3">
                <h1 className="px-5">Involved Open Cases</h1>
                {loading ?
                <div className="flex justify-center items-center">
                  <Spinner
                  size="xl"
                  animation="border"
                  role="status"
                  variant="primary"
                // className={`spinner-${size}`}
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner></div>:
                <div className="grid">
                  {cases[0][1]?.map((item, index) => (
                    <CardItem
                      key={index}
                      caseDetails={item?.premisesName}
                      caseTitle={item?.clientName}
                      caseCount={item.caseCount}
                      caseType={item?.caseType}
                      caseStatus={item?.caseStatus}
                      innerCardClass="m-2"
                    />
                  ))}
                </div>}
              </div>
            </div>
            <div className="col-span-3">
              <div className="card bg-card-300 px-2 py-3">
                <h1 className="px-5">Involved Closed Cases</h1>
                <div className="grid">
                {loading ?
                <div className="flex justify-center items-center">
                  <Spinner
                  size="xl"
                  animation="border"
                  role="status"
                  variant="primary"
                // className={`spinner-${size}`}
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner></div>:
                  cases[0][0]?.map((item, index) => (
                    <CardItem
                      // onClick={()=>{handleCaseCardClick(item)}}
                      // key={index}
                      // badgeColor={item.badgeColor}
                      // badgeText={item.badgeText}
                      // caseDetails={item?.premisesName}
                      // caseTitle={item?.clientName}
                      // caseCount={item.caseCount}
                      // caseType={item?.caseType}
                      // caseStatus={item?.caseStatus}
                      // innerCardClass={includeClasses ? "bg-input-surface" : "bg-white shadow-shadow-light"}
                      key={index}
                      caseDetails={item?.premisesName}
                      caseTitle={item?.clientName}
                      caseCount={item.caseCount}
                      caseType={item?.caseType}
                      caseStatus={item?.caseStatus}
                      // closedCases={closedCases}
                      innerCardClass="m-2"
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        }

      </div>

    </>
  );
};

export default ContactPartnerIndividual;
