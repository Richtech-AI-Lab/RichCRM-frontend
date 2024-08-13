import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, FieldArray, ErrorMessage, Field, replace } from "formik";
import { Label, Modal } from "flowbite-react";
import TextInput from "../TextInput";
import XButton from "../button/XButton";
import SelectInput from "../selectinput";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import {
  fetchPremisesRequest,
  registerPremisesRequest,
} from "../../redux/actions/premisesActions";
import { caseCreateRequest } from "../../redux/actions/caseAction";
import { toast } from "react-toastify";
import { clearData } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../constants/api";
import { registerClientRequest } from "../../redux/actions/clientActions";
import { registerAddressRequest } from "../../redux/actions/utilsActions";
import XSpinnerLoader from "../spinnerLoader/XSpinnerLoader";
import { CASETYPE, CLIENTTYPE } from "../../constants/constants";
import states from "../../constants/states.json";
import { debounce } from "lodash";
import avatar from '../../assets/images/avatar.png'
import { IoCloseCircleOutline } from "react-icons/io5";

const clientTypeOptions = [
  { value: CLIENTTYPE.INDIVIDUAL, label: "Individual" },
  { value: CLIENTTYPE.COMPANY, label: "Company" },
  { value: CLIENTTYPE.TRUST, label: "Trust" },
];

const caseTypeOptions = [
  { value: CASETYPE.PURCHASING, label: "Purchasing" },
  { value: CASETYPE.SELLING, label: "Selling" },
]

const searchOption = [
  {
    "clientId": "123456789",
    "firstName": "John",
    "lastName": "Doe",
    "cellNumber": "1234567890",
    "email": "john.doe@hotmail.com"
  },
  {
    "clientId": "123-45-6789",
    "firstName": "Marry",
    "lastName": "Doe",
    "cellNumber": "1234567890",
    "email": "john.doe@hotmail.com"
  },
  {
    "clientId": "123-45-6789",
    "firstName": "Aqua",
    "lastName": "Doe",
    "cellNumber": "1234567890",
    "email": "john.doe@hotmail.com"
  }
];

const NewCaseModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [clientType, setClientType] = useState(CLIENTTYPE.INDIVIDUAL)
  const [searchResults, setSearchResults] = useState([]);
  const [activeSearchIndex, setActiveSearchIndex] = useState(null);
  const { client, error, loading } = useSelector((state) => state.client);
  const { address } = useSelector((state) => state.utils);
  const { premises } = useSelector((state) => state.premises);
  const { cases } = useSelector((state) => state.case.createCase);
  const [showClientFields, setShowClientFields] = useState(false);

  const debouncedFunction = useCallback(
    debounce((value, index) => {
      // Additional function to call after debouncing
      if (value != "" || value.length > 0) {
        const filteredResults = searchOption.filter(option =>
          option.firstName.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filteredResults);
      } else {
        setSearchResults([]);
      }
      setActiveSearchIndex(index)
      // You can call any API or perform any other actions here
    }, 1000),
    []
  );

  const handleAddClientClick = () => {
    setShowClientFields(true);
  };

  const handleCloseClientFields = () => {
    setShowClientFields(false);
  };
  const navigate = useNavigate();
  const initialValues = {
    caseType: "",
    clientType: "",
    // clientfirstName: "",
    // clientLastName: "",
    premisesType: "",
    address: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    clients: [
      {
        clientfirstName: "",
        clientLastName: "",
        clientcellNumber: "",
        clientemail: "",
      },
    ],
    companyInfo: [
      {
        companyname: ""
      },
    ],
    trustInfo: [
      {
        trustname: ""
      },
    ],
  };
  const validationSchema = Yup.object({
    caseType: Yup.string().required('Case Type is required'),
    clientType: Yup.string().required('Client Type is required'),
    premisesType: Yup.string().required('Premises Type is required'),
    address: Yup.string().required("Address is required"),
    // addressLine2: Yup.string('Address Line 2 is required'),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string().required("Zip code is required"),
    clients: Yup.array().of(
      Yup.object().shape({
        clientfirstName: Yup.string().required("Client First Name is required"),
        clientLastName: Yup.string().required("Client Last Name is required"),
        clientcellNumber: Yup.string()
          .matches(/^[0-9]+$/, 'Cell number must be a number')
        // .required('Cell Number is required')
        ,
        clientemail: Yup.string().email('Invalid email format')
        //  .required('Email is required'),
      })
    ),
  });

  const handleNewCaseInfo = async (values) => {

    const clientData = values.clients[0];
    const clientDetails = {
      clientType: parseInt(values.clientType),
      firstName: clientData.clientfirstName,
      lastName: clientData.clientLastName,
      ...(clientData.clientcellNumber && { cellNumber: clientData.clientcellNumber }),
      ...(clientData.clientemail && { email: clientData.clientemail }),
    };
    const combinedPayload = {
      clientDetails,
      addressDetails: {
        addressLine1: values.address,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
      },
      premisesPayload: {
        propertyType: parseInt(values.premisesType),
      },
      casePayload: {
        creatorId: localStorage.getItem("authEmail"),
        stage: 0,
        caseType: parseInt(values.caseType)
      }
    };
    // console.log(combinedPayload, values)
    // return true;
    try {
      dispatch(registerClientRequest(combinedPayload, navigate))

      // if (client?.status === "success") {
      //   toast.success("Client created successfully");

      //   const addressrResponse = await dispatch(
      //     registerAddressRequest(addressPayload)
      //   );
      //   console.log(address,"addresst")

      //   if (address?.status === "success" && address?.data?.length > 0) {
      //     toast.success("Address successfully registered!");
      //     const addressId = address?.data[0]?.addressId;
      //     const premisesPayload = {
      //       name: `${clientDetails.clientfirstName} ${clientDetails.clientLastName}`,
      //       addressId: addressId,
      //       propertyType: 2,
      //     };
      //     const fetchResponse = await dispatch(
      //       registerPremisesRequest(premisesPayload)
      //     );
      //     console.log(premises,"premises")
      //     if (premises?.status === "success" && premises?.data?.length > 0) {
      //       toast.success("Premises successfully registered!");
      //       navigate(ROUTES.NEW_CASE_INFO);

      //       const premisesId = premises.data[0]?.premisesId;
      //       //   const casePayload = {
      //       //     premisesId: premisesId,
      //       //     creatorId: "test1@gmail.com",
      //       //     stage: 0,
      //       //     clientType: clientDetails.clientType,
      //       //     buyerId: "f3117eaa-e3a7-4b3e-88fb-37a8741a181e",
      //       //   };
      //       //   const createCaseResponse = await dispatch(
      //       //     caseCreateRequest(casePayload)
      //       //   );

      //       //   if (cases.status === "success") {
      //       //     toast.success("Case created successfully!");
      //       //     navigate("/rich-crm/newcaseinfo");
      //       //   } else {
      //       //     toast.error("Failed to create case.");
      //       //   }
      //     } else {
      //         toast.error("Failed to register premises.");
      //     }
      //   } else {
      //     toast.error("Failed to register address.");
      //   }
      // } else {
      //     toast.error("Failed to register client.");
      // }

      dispatch(clearData());
    } catch (error) {
      console.error("Error while handling new case information", error);
      // toast.error("An error occurred while creating the case.");
    }
  };

  return (
    <>
      <XSpinnerLoader loading={loading} size="lg" />
      <Modal show={true} size="md" onClose={onClose} className="new-case-modal">
        <Modal.Header className="border-b-0">
          <div>
            <h2 className="mb-2 text-[28px] leading-9 font-medium text-secondary-800">
              Create a New Case
            </h2>
            <p className="text-sm leading-5 text-secondary-700">
              Create a new case by filling the basic information.
            </p>
          </div>
        </Modal.Header>
        <Modal.Body>
          {/* <AuthFormContainer title="New Case" subtitle="Create a new case by filling the basic information."> */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleNewCaseInfo}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="">
                <div className="mb-2 block">
                  <Label htmlFor="caseType" value="Case Type" />
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="mb-2 block">
                      <Field
                        as={SelectInput}
                        defaultLabel="Select Case Type"
                        name="caseType"
                        value={values.caseType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        options={caseTypeOptions}
                        inputClassName="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                      />
                      {touched.caseType && errors.caseType ? (
                        <div className="text-red-500 text-sm">
                          {errors.caseType}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {/* <div className="mb-8">
                                    <Label htmlFor="clientFirstName" value="Client" />
                                    <div className="mb-2 block">
                                        <SelectInput
                                            name="clientType"
                                            value={values.clientType}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            options={[
                                                { value: "individual", label: "Individual" },
                                                { value: "company", label: "Company" },
                                                { value: "trust", label: "Trust" },
                                            ]}
                                            inputClassName="bg-input-surface rounded-[40px] border-0 py-2 px-4 text-sm leading-6 mt-3"
                                        />
                                        {touched.clientType && errors.clientType ? (
                                            <div className="text-red-500 text-sm">{errors.clientType}</div>
                                        ) : null}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="mb-2 block">
                                            <TextInput
                                                name="clientfirstName"
                                                type="text"
                                                placeholder="First Name"
                                                value={values.clientfirstName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                field={{ name: "clientfirstName" }}
                                                form={{ errors, touched }}
                                            />
                                        </div>
                                        <div className="mb-2 block">
                                            <TextInput
                                                name="clientLastName"
                                                type="text"
                                                placeholder="Last Name"
                                                value={values.clientLastName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                field={{ name: "clientLastName" }}
                                                form={{ errors, touched }}
                                            />
                                        </div>
                                    </div>
                                    <a className="ml-6 text-primary2">  <IoIosAdd /> Add a client</a>
                                </div> */}
                  <div className="mb-8">
                    {" "}
                    <Label value="Client" className="mb-2" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="mb-2 block">
                        <Field
                          as={SelectInput}
                          defaultLabel="Select Client Type"
                          name={`clientType`}
                          value={values.clientType}
                          onChange={(e) => {
                            handleChange(e);
                            const selectedClientType = e.target.value;
                            setClientType(selectedClientType)
                          }}
                          onBlur={handleBlur}
                          options={clientTypeOptions}
                          inputClassName="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                        />
                        {touched.clientType && errors.clientType ? (
                          <div className="text-red-500 text-sm">
                            {errors.clientType}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    {clientType == CLIENTTYPE.INDIVIDUAL &&
                      <div className="mb-8">
                        <FieldArray name="clients">
                          {({ remove, push, replace }) => (
                            <>
                              {values?.clients.map((client, index) => (
                                <div key={index} className="mb-2 block -mt-8">
                                  {/* <Label htmlFor={`clients.${index}.clientType`} value="Client" /> */}
                                  {client.isCard !== true ?(<div className="relative mb-8">
                                    {index >= 0 && (
                                      <IoIosClose
                                        onClick={() => remove(index)}
                                        className="absolute top-0 right-0 cursor-pointer"
                                        size={24}
                                      />
                                    )}
                                  </div>): ""}
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="mb-2 block">
                                      {/* <Field
                                      as={SelectInput}
                                      defaultLabel="Select Client Type"
                                      name={`clients.${index}.clientType`}
                                      value={client.clientType}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      options={clientTypeOptions}
                                      inputClassName="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                                    />
                                    <ErrorMessage
                                      name={`clients.${index}.clientType`}
                                      component="div"
                                      className="text-red-500 text-sm"
                                    /> */}
                                    </div>
                                  </div>
                                  {client.isCard === true ?
                                  <div className="flex justify-between items-center border border-card-300 p-4 rounded-2xl">
                                      <div className="flex items-center">
                                        <img src={avatar} className="w-8 mr-3" />
                                        <span>{client.clientfirstName}</span>
                                      </div>
                                      <IoCloseCircleOutline
                                        onClick={() => remove(index)}
                                        className="text-xl text-text-gray-100 cursor-pointer"
                                        size={24}
                                      />
                                      {/* <IoCloseCircleOutline className="" /> */}
                                    </div> :
                                    <div className="grid grid-cols-2 gap-4 ">
                                      <div className="mb-2 block">
                                        <TextInput
                                          name={`clients.${index}.clientfirstName`}
                                          type="text"
                                          placeholder="First Name"
                                          value={client.clientfirstName}
                                          onChange={(e) => {
                                            handleChange(e);
                                            debouncedFunction(e.target.value, index);
                                          }}
                                          onBlur={handleBlur}
                                          field={{
                                            name: `clients.${index}.clientfirstName`,
                                          }}
                                          form={{ errors, touched }}
                                        />
                                        {activeSearchIndex == index &&
                                          searchResults.map(item => {
                                            return <ul className={'search-list-dropdown overflow-hidden rounded-2xl shadow-shadow-light-2'}><li className={'px-4 py-2 hover:bg-input-surface'} onClick={() => {
                                              replace(index, {
                                                isCard: true,
                                                clientfirstName: item.firstName,
                                                clientLastName: item.lastName,
                                                clientcellNumber: item.cellNumber,
                                                clientemail: item.email,
                                              })
                                              setSearchResults([])
                                            }
                                            }>
                                              <div className="flex items-center">
                                                <img src={avatar} className="w-8 mr-3" />
                                                <div>
                                                  <p className="text-base text-secondary-800">{item.firstName}</p>
                                                  <span className="text-text-gray-100 text-sm">707684</span>
                                                </div>
                                              </div>
                                            </li></ul>
                                          })
                                        }
                                        <ErrorMessage
                                          name={`clients.${index}.clientfirstName`}
                                          component="div"
                                          className="text-red-500 text-sm"
                                        />
                                      </div>
                                      <div className="mb-2 block">
                                        <TextInput
                                          name={`clients.${index}.clientLastName`}
                                          type="text"
                                          placeholder="Last Name"
                                          value={client.clientLastName}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          field={{
                                            name: `clients.${index}.clientLastName`,
                                          }}
                                          form={{ errors, touched }}
                                        />
                                        <ErrorMessage
                                          name={`clients.${index}.clientLastName`}
                                          component="div"
                                          className="text-red-500 text-sm"
                                        />
                                      </div>
                                      <div className="mb-8">
                                        <TextInput
                                          type="number"
                                          name={`clients.${index}.clientcellNumber`}
                                          value={client.clientcellNumber}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          placeholder="Cell Number"
                                          field={{
                                            name: `clients.${index}.clientcellNumber`,
                                          }}
                                          form={{ errors, touched }}
                                        />
                                        <ErrorMessage
                                          name={`clients.${index}.clientcellNumber`}
                                          component="div"
                                          className="text-red-500 text-sm"
                                        />
                                      </div>
                                      <div className="mb-8">
                                        <TextInput
                                          type="email"
                                          name={`clients.${index}.clientemail`}
                                          id={`clients.${index}.clientemail`}
                                          value={client.clientemail}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          placeholder="Email"
                                          field={{ name: `clients.${index}.clientemail` }}
                                          form={{ errors, touched }}
                                        />
                                        <ErrorMessage
                                          name={`clients.${index}.clientemail`}
                                          component="div"
                                          className="text-red-500 text-sm"
                                        />
                                      </div>
                                    </div>}
                                  {/* <div className="relative mb-8">
                                                          {index > 0 && (
                                                              <IoIosClose onClick={() => remove(index)} className="absolute top-0 right-0 cursor-pointer" size={24} />
                                                          )}
                                                      </div> */}
                                </div>
                              ))}
                              {/* <a className="ml-6 text-primary2" onClick={() => push({ clientType: "", clientfirstName: "", clientLastName: "" })}>  <IoIosAdd /> Add a client</a> */}
                              <a
                                className="ml-6 text-primary2 flex items-center"
                                onClick={() =>
                                  push({
                                    clientfirstName: "",
                                    clientLastName: "",
                                    clientcellNumber: "",
                                    clientemail: "",
                                  })
                                }
                              >
                                <IoIosAdd className="mr-1" /> Add a client
                              </a>
                            </>
                          )}
                        </FieldArray>
                      </div>
                    }
                    {/* {clientType == clientType.INDIVIDUAL &&
                      <div className="grid grid-cols-2 gap-4">
                        <div className="mb-2 block">
                        
                          <TextInput
                            name={`clientfirstName`}
                            type="text"
                            placeholder="First Name"
                            // value={client.clientfirstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            field={{
                              name: `clientfirstName`,
                            }}
                            form={{ errors, touched }}
                          />
                        </div>
                        <div className="mb-2 block">
                          <TextInput
                            name={`clientLastName`}
                            type="text"
                            placeholder="Last Name"
                            // value={client.clientLastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            field={{
                              name: `clientLastName`,
                            }}
                            form={{ errors, touched }}
                          />
                        </div>
                      </div>
                    } */}
                    {clientType == CLIENTTYPE.COMPANY &&
                      <FieldArray name="companyInfo">
                        {({ remove, push, replace }) => (
                          <>
                            {values.companyInfo.map((company, index) => (
                              <div className="mb-2 block" key={index}>
                                  <div className="relative mb-8">
                                    {index >= 0 && (
                                      <IoIosClose
                                        onClick={() => remove(index)}
                                        className="absolute top-0 right-0 cursor-pointer"
                                        size={24}
                                      />
                                    )}
                                  </div>
                                <TextInput
                                  name={`companyInfo.${index}.companyname`}
                                  type="text"
                                  placeholder="Company Name"
                                  value={company.companyname}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  field={{
                                    name: `companyInfo.${index}.companyname`,
                                  }}
                                  form={{ errors, touched }}
                                />
                                {/* <ErrorMessage
                                name={`companyInfo.${index}.companyname`}
                                component="div"
                                className="text-red-500 text-sm"
                              /> */}

                              </div>
                            ))}
                            <a
                              className="ml-6 text-primary2 flex items-center"
                              onClick={() =>
                                push({
                                  companyname: "",
                                })
                              }
                            >
                              <IoIosAdd className="mr-1" /> Add a client
                            </a>
                          </>
                        )}

                      </FieldArray>
                    }
                    {clientType == CLIENTTYPE.TRUST &&
                    <div className="mb-8">
                      <FieldArray name="trustInfo">
                        {({ remove, push, replace }) => (
                          <>
                            {
                              values.trustInfo.map((trust, index) => (
                                <div className="mb-2 block" key={index}>
                                  <div className="relative mb-8">
                                    {index >= 0 && (
                                      <div>
                                        
                                      <IoIosClose
                                        onClick={() => remove(index)}
                                        className="absolute top-0 right-0 cursor-pointer"
                                        size={24}
                                      />
                                      {/* <h1>close</h1> */}
                                      </div>
                                    )}
                                  </div>
                                  <TextInput
                                    name={`trustInfo.${index}.trustname`}
                                    type="text"
                                    placeholder="Trust Name"
                                    value={trust.trustname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    field={{
                                      name: `trustInfo.${index}.trustname`,
                                    }}
                                    form={{ errors, touched }}
                                  />
                                  {/* <ErrorMessage
                                name={`trustInfo.${index}.trustname`}
                                component="div"
                                className="text-red-500 text-sm"
                              /> */}

                                </div>))}
                            <a
                              className="ml-6 text-primary2 flex items-center"
                              onClick={() =>
                                push({
                                  trustname: "",
                                })
                              }
                            >
                              <IoIosAdd className="mr-1" /> Add a client
                            </a>
                          </>

                        )}
                      </ FieldArray>
                    </div>
                    }
                  </div>
                </div>

                <div>
                  <div className="mb-2 block">

                    <Label htmlFor="premiseInfo" value="Premise Information" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="mb-2 block">
                        <Field
                          as={SelectInput}
                          defaultLabel="Select Premises Type"
                          name="premisesType"
                          value={values.premisesType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          options={[
                            { value: 0, label: "Condo" },
                            { value: 1, label: "House" },
                            { value: 2, label: "Co-op" },
                            { value: 3, label: "Commercial" },
                            { value: 4, label: "Land" },
                            { value: 5, label: "Condo-op" },
                            { value: 6, label: "House (Multiple)" },
                          ]}
                          inputClassName="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                        />
                        {touched.premisesType && errors.premisesType ? (
                          <div className="text-red-500 text-sm">
                            {errors.premisesType}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <TextInput
                      name="address"
                      type="text"
                      placeholder="Address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      field={{ name: "address" }}
                      form={{ errors, touched }}
                    />
                    <TextInput
                      name="addressLine2"
                      type="text"
                      placeholder="Address Line 2 (Optional)"
                      value={values.addressLine2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      field={{ name: "addressLine2" }}
                      form={{ errors, touched }}
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <TextInput
                        name="city"
                        type="text"
                        placeholder="City"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        field={{ name: "city" }}
                        form={{ errors, touched }}
                      />
                      <Field
                        as={SelectInput}
                        defaultLabel="Select State"
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        options={states}
                        error={errors.state}
                        touched={touched.state}
                        inputClassName="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                      />
                      <TextInput
                        name="zipCode"
                        type="text"
                        placeholder="Zip code"
                        value={values.zipCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        field={{ name: "zipCode" }}
                        form={{ errors, touched }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-end mt-8">
                  <XButton
                    text={"Cancel"}
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="bg-card-300 text-sm text-secondary-800 py-[10px] px-6 rounded-[100px]"
                  />
                  <XButton
                    type="submit"
                    text={"Next"}
                    disabled={isSubmitting}
                    className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px] ml-4"
                  />
                </div>
              </form>
            )}
          </Formik>
          {/* </AuthFormContainer> */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewCaseModal;
