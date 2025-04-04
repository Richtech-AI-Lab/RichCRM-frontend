import { Spinner, Table, Textarea, TextInput } from "flowbite-react";
import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import Select, { components } from 'react-select';
import dummyData from "../../../utils/dummyData.json";
import { ROUTES } from "../../../constants/api";
import { useLocation, useNavigate } from "react-router-dom";
import ContactsActionbar from "../../../components/actionbar/contactsActionBar";
import CardItem from "../../../components/carditem";
import FormButton from "../../../components/formButton";
import { contactItemFirst, contactItems, contactItemSecond, sellerItems } from "../../../utils/formItem";
import { CaseCardDetails, SelectInput, XButton } from "../../../components";
import { Field, Formik } from "formik";
import { IMAGES } from "../../../constants/imagePath";
import { CASETYPE } from "../../../constants/constants";
// import ContactEditForm from "../contactEdit";
import { createAddressRequest, fetchAddressByIdFailure, fetchAddressByIdRequest } from "../../../redux/actions/utilsActions";
import { useDispatch, useSelector } from "react-redux";
import ContactIndividualDetail from "../contactDetail/contactIndividualDetail";
import ContactIndividualEditForm from "../contactEdit/contactIndividualEditForm";
import { getCaseByContactRequest, updateContactRequest } from "../../../redux/actions/contactActions";
import TagModal from "../../../components/tagModal/tagModal";

const ContactPartnerIndividual = ({ isEdit, toggleEdit }) => {
  const dispatch = useDispatch();
  const [showEditTagsModal, setShowEditTagsModal] = useState(false)
  const { cases, loading } = useSelector((state) => state?.contact);
  const tagDetails = useSelector((state) => state.tag.tag);
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
    } else {
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
      tags: values?.tags,
      // contactType: contactdetails?.contactType,
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
    if (values?.addressLine1) {
      dispatch(createAddressRequest(data))
    } else {
      dispatch(updateContactRequest(data?.contact))
    }
    toggleEdit()
  }, []);

  const caseTypeOptions = [
    { value: CASETYPE.PURCHASING, label: "Purchaser" },
    { value: CASETYPE.SELLING, label: "Realtor" },
  ];
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format'),
    cellNumber: Yup.string().matches(/^[0-9]+$/, 'Cell number must be a number'),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    // addressLine1: Yup.string().required("Address is required"),
    // // addressLine2: Yup.string('Address Line 2 is required'),
    // city: Yup.string().required("City is required"),
    // state: Yup.string().required("State is required"),
    // zipCode: Yup.string().required("Zip code is required"),
  });
  const initialValues = {
    tags: contactdetails?.tags || '',
    contactId: contactdetails?.contactId || '',
    contactType: contactdetails?.contactType || '',
    firstName: contactdetails?.firstName || '',
    lastName: contactdetails?.lastName || '',
    company: contactdetails?.company || '',
    position: contactdetails?.position || '',
    ...(contactdetails && contactdetails.cellNumber && { cellNumber: contactdetails?.cellNumber }),
    email: contactdetails?.email || '',
    mailingAddress: contactdetails?.mailingAddress || '',
    wechatAccount: contactdetails?.wechatAccount || '',
    workNumber: contactdetails?.workNumber || '',
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
  const formattedOptions = tagDetails.map(option => ({
    ...option,
    value: option.label, // Convert label to a suitable value format
  }));

  const customStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white', border: 'none' }),
    // option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    //   ...styles,
    //   color: isDisabled ? '#ccc' : isSelected ? 'white' : data.color,
    //   cursor: isDisabled ? 'not-allowed' : 'default',
    // }),

    multiValue: (styles, { data }) => ({
      ...styles,
      borderRadius: '50px',
      backgroundColor: data.color1,
      color: data.color2,
      fontSize: '15px', /* Equivalent to text-sm */
      fontWeight: '600',    /* Equivalent to font-semibold */
      // padding: '0.25rem 0.75rem', /* Equivalent to py-1 px-3 */
    }),
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color2,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color2,
      ':hover': {
        backgroundColor: data.color1,
        borderRadius: '50px',
      },
    }),
  };

  const handleEditTags = () => {
    setShowEditTagsModal(true);
  };

  // const customStyles = {
  //     multiValue: (styles) => ({
  //         ...styles,
  //         backgroundColor: "#e0e7ff", // Light blue background
  //         borderRadius: "12px",
  //         padding: "3px 8px",
  //         margin: "2px",
  //         color: "#1e3a8a", // Dark blue text
  //     }),
  //     multiValueLabel: (styles) => ({
  //         ...styles,
  //         color: "#1e3a8a", // Adjust color to your liking
  //     }),
  //     multiValueRemove: (styles) => ({
  //         ...styles,
  //         // color: "#1e3a8a",
  //         cursor: "pointer",
  //         // ":hover": {
  //         //     color: "#1e40af", // Darker blue on hover
  //         // },
  //     }),
  // };
  // const CustomMultiValue = (props) => {
  //     const { data } = props;
  //     return (
  //         <components.MultiValue {...props}>
  //             <span
  //                 className="text-sm font-semibold py-1 px-3 rounded-full inline-block"
  //                 style={{
  //                     backgroundColor: data.color1, // Background color from tag data
  //                     color: data.color2, // Text color from tag data
  //                 }}
  //             >
  //                 {data.label}
  //             </span>
  //         </components.MultiValue>
  //     );
  // };
  const CustomOption = (props) => {
    const { data, innerRef, innerProps } = props;

    // Check if this is the "Edit Tags" special option
    if (data.isSpecial) {
      return (
        <div
          ref={innerRef}
          {...innerProps}
          className="m-3 cursor-pointer"
          style={{
            borderTop: '2px solid #E5E7EB',
            fontSize: '15px',
            fontWeight: '600',
            color: '#366093', // Highlight "Edit Tags" option
          }}
          onClick={() => handleEditTags()} // Trigger edit tags logic
        >
          <XButton
            text="Edit Tag"
            icon={<img
              src={IMAGES.editTagBlue}
              alt="icon"
              className='w-[14px] h-[14px] mr-2 mt-1  inline-block '
            />}
          // icon={<FiPlus className="text-base mr-2 inline-block" />}
          // className={buttonClass}
          // onClick={toggleModal}
          />
          {/* {data.label} */}
        </div>
      );
    }

    // Regular option rendering
    return (
      <div ref={innerRef} {...innerProps} className="m-3">
        <span
          className="text-sm font-semibold py-1 px-3 rounded-full inline-block cursor-pointer"
          style={{
            backgroundColor: data.color1, // Background color for each option
            color: data.color2, // Text color for each option
          }}
        >
          {data.label}
        </span>
      </div>
    );
  };
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
                    <div className="bg-white rounded-2xl mb-5 p-4 shadow-shadow-light">
                      <div className="flex">
                        <img src={`https://ui-avatars.com/api/?name=${initialValues?.firstName}+${initialValues?.lastName}`} alt="Profile" className="mr-3 rounded-full w-[150px] h-[150px]" />

                        {/* <img
                          src={IMAGES.avatarpic}
                          alt="Profile"
                          className="rounded-full"
                          style={{ height: '150px', width: '150px' }}
                        // className="mt-2"
                        /> */}
                        <div className="ml-6">
                          <div className="mb-16">
                            <p className="text-[22px] font-medium text-secondary-800">{initialValues?.firstName} {initialValues?.lastName}</p>
                            {/* <p className="font-medium text-secondary-800 text-sm mb-10">Brokers</p> */}
                            <Field
                              as={Select}
                              isMulti
                              name="tags"
                              styles={customStyles}
                              components={{
                                Option: CustomOption,
                                // MultiValue: CustomMultiValue, // Use the custom badge component
                              }}
                              options={[...formattedOptions, { label: "Edit Tags", value: "edit-tags", isSpecial: true }]}
                              value={formattedOptions.filter(option =>
                                values.tags.includes(option.value)
                              )}
                              onChange={(selectedOptions) => {
                                // Check if "Edit Tags" is clicked
                                if (selectedOptions && selectedOptions.some(option => option.value === "edit-tags")) {
                                  handleEditTags(); // Call the edit tags functionality
                                  return; // Prevent adding "Edit Tags" to the selected options
                                }

                                setFieldValue(
                                  "tags",
                                  selectedOptions ? selectedOptions.map(option => option.value) : []
                                );
                              }}
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
                  <div className="card bg-card-300 px-2 py-3 shadow-shadow-light">
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
                  <div className="card bg-card-300 px-2 py-3 shadow-shadow-light">
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
            <div className="col-span-3 ">
              <div className="card bg-card-300 px-2 py-3 shadow-shadow-light">
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
                    </Spinner></div> :
                  <div className="grid">
                    {cases?.length > 0 && cases[0][1]?.map((item, index) => (
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
              <div className="card bg-card-300 px-2 py-3 shadow-shadow-light">
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
                      </Spinner></div> :
                    cases?.length > 0 && cases[0][0]?.map((item, index) => (
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
        {showEditTagsModal && <TagModal onClose={() => setShowEditTagsModal(!showEditTagsModal)} />}
      </div>

    </>
  );
};

export default ContactPartnerIndividual;
