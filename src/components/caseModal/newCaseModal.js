import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, FieldArray, ErrorMessage, Field, replace } from "formik";
import { Label, Modal, Dropdown } from "flowbite-react";
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
import { API_ENDPOINTS, ROUTES } from "../../constants/api";
import { registerClientRequest } from "../../redux/actions/clientActions";
import { registerAddressRequest } from "../../redux/actions/utilsActions";
import XSpinnerLoader from "../spinnerLoader/XSpinnerLoader";
import { CASETYPE, CLIENTTYPE } from "../../constants/constants";
import states from "../../constants/states.json";
import { debounce, isEmpty } from "lodash";
import avatar from '../../assets/images/avatar.png'
import { IoCloseCircleOutline } from "react-icons/io5";
import NewCaseDropdown from "../newcasedropdown";
import { caseTypeOptions, premisesTypes } from "../../utils/formItem";
import axios from "axios";
import { getRequest, postRequest } from "../../axios/interceptor";
import { registerOrganizationRequest } from "../../redux/actions/organizationActions";

const clientTypeOptions = [
  { value: CLIENTTYPE.INDIVIDUAL, label: "Individual" },
  { value: CLIENTTYPE.COMPANY, label: "Company" },
  { value: CLIENTTYPE.TRUST, label: "Trust" },
];

const NewCaseModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [clientType, setClientType] = useState(CLIENTTYPE.INDIVIDUAL)
  const [searchResults, setSearchResults] = useState([]);
  const [activeSearchIndex, setActiveSearchIndex] = useState(null);
  const { client, error, loading } = useSelector((state) => state.client);
  const { address } = useSelector((state) => state.utils);
  const { premises } = useSelector((state) => state.premises);
  const [showClientFields, setShowClientFields] = useState(false);

  const debouncedClientFunction = useCallback(
    debounce(async (value, index) => {
      if (value != "" || value.length > 0) {
        const response = await postRequest(API_ENDPOINTS.FETCH_CLIENT_BY_QUERY, {
          keyword: value
        }
        )
        const filteredResults = response?.data?.data;
        setSearchResults(filteredResults);
      } else {
        setSearchResults([]);
      }
      setActiveSearchIndex(index)
    }, 1000),
     [setSearchResults, setActiveSearchIndex]
  );

  const debouncedCompanyFunction = useCallback(
    debounce(async (value, index) => {
      if (value != "" || value.length > 0) {
        const response = await postRequest(API_ENDPOINTS.FETCH_ORGANIZATION_BY_QUERY, {
          keyword: value
        }
        )
        const filteredResults = response?.data?.data;
        setSearchResults(filteredResults);
      } else {
        setSearchResults([]);
      }
      setActiveSearchIndex(index)
      // You can call any API or perform any other actions here
    }, 1000),
    [setSearchResults, setActiveSearchIndex]
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
        clientId: "",
      },
    ],
    companyInfo: [
      {
        companyName: "",
        companyCellNumber: "",
        companyEmail: "",
        companyOrganizationId: ""
      },
    ],
    trustInfo: [
      {
        trustName: "",
        trustCellNumber: "",
        trustEmail: "",
        trustOrganizationId: ""
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
        clientfirstName: Yup.string().when('$clientType', {
          is: (value) => value == 0,
          then: () => Yup.string().required("Client First Name is required"),
          otherwise: () => Yup.string().notRequired()
        }),
        clientLastName: Yup.string().when('$clientType', {
          is: (value) => value == 0,
          then: () => Yup.string().required("Client Last Name is required"),
          otherwise: () => Yup.string().notRequired()
        }),
        clientcellNumber: Yup.string().matches(/^[0-9]+$/, 'Cell number must be a number'),
        clientemail: Yup.string().email('Invalid email format'),
      })
    ),
    companyInfo: Yup.array().of(
      Yup.object().shape({
        companyName: Yup.string().when('$clientType', {
          is: (value) => value == 1,
          then: () => Yup.string().required("Company Name is required"),
          otherwise: () => Yup.string().notRequired()
        }),
        companyCellNumber: Yup.string().matches(/^[0-9]+$/, 'Cell number must be a number'),
        companyEmail: Yup.string().email('Invalid email format'),
      })
    ),
    trustInfo: Yup.array().of(
      Yup.object().shape({
        trustName: Yup.string().when('$clientType', {
          is: (value) => value == 2,
          then: () => Yup.string().required("Trust Name is required"),
          otherwise: () => Yup.string().notRequired()
        }),
        trustCellNumber: Yup.string().matches(/^[0-9]+$/, 'Cell number must be a number'),
        trustEmail: Yup.string().email('Invalid email format'),
      })
    ),
  });
  const processEntities = (values, entityType) => {
    const { [entityType]: entityInfo } = values;

    if (entityInfo.length <= 1) return []; // Return early if not enough entities

    const remainingEntities = entityInfo.slice(1);

    return remainingEntities.map(entity => {
      const isClient = entityType === 'clients';
      const isCompany = entityType === 'companyInfo';
      const isTrust = entityType === 'trustInfo';

      return {
        ...(isClient && { clientType: values.clientType }),
        ...(isClient && entity.clientfirstName && { firstName: entity.clientfirstName }),
        ...(isClient && entity.clientLastName && { lastName: entity.clientLastName }),
        ...(isClient && entity.clientcellNumber && { cellNumber: entity.clientcellNumber }),
        ...(isClient && entity.clientemail && { email: entity.clientemail }),
        ...(isClient && entity.clientId && { clientId: entity.clientId }),

        ...(isCompany && { organizationType: values.clientType }),
        ...(isCompany && entity.companyName && { organizationName: entity.companyName }),
        ...(isCompany && entity.companyCellNumber && { cellNumber: entity.companyCellNumber }),
        ...(isCompany && entity.companyEmail && { email: entity.companyEmail }),
        ...(isCompany && entity.companyOrganizationId && { organizationId: entity.companyOrganizationId }),

        ...(isTrust && { organizationType: values.clientType }),
        ...(isTrust && entity.trustName && { organizationName: entity.trustName }),
        ...(isTrust && entity.trustCellNumber && { cellNumber: entity.trustCellNumber }),
        ...(isTrust && entity.trustEmail && { email: entity.trustEmail }),
        ...(isTrust && entity.trustOrganizationId && { organizationId: entity.trustOrganizationId }),
      };
    });
  };

  const handleNewCaseInfo = async (values) => {
    const entityType = values.clientType === 0 ? 'clients' : (values.clientType === 1 ? 'companyInfo' : 'trustInfo');
    const mainEntity = values[entityType][0];

    const processedList = processEntities(values, entityType);

    const isClient = entityType === 'clients';
    const isCompany = entityType === 'companyInfo';
    const isTrust = entityType === 'trustInfo';
    const mainDetails = {
      ...(isClient && { clientType: values.clientType }),
      ...(isClient && mainEntity.clientfirstName && { firstName: mainEntity.clientfirstName }),
      ...(isClient && mainEntity.clientLastName && { lastName: mainEntity.clientLastName }),
      ...(isClient && mainEntity.clientcellNumber && { cellNumber: mainEntity.clientcellNumber }),
      ...(isClient && mainEntity.clientemail && mainEntity.clientemail.trim() !== "" && { email: mainEntity.clientemail }), // Only add if not empty
      ...(isClient && mainEntity.clientId && { clientId: mainEntity.clientId }),
    
      ...(isCompany && { organizationType: values.clientType }),
      ...(isCompany && mainEntity.companyName && { organizationName: mainEntity.companyName }),
      ...(isCompany && mainEntity.companyCellNumber && { cellNumber: mainEntity.companyCellNumber }),
      ...(isCompany && mainEntity.companyEmail && mainEntity.companyEmail.trim() !== "" && { email: mainEntity.companyEmail }), // Only add if not empty
      ...(isCompany && mainEntity.companyOrganizationId && { organizationId: mainEntity.companyOrganizationId }),
    
      ...(isTrust && { organizationType: values.clientType }),
      ...(isTrust && mainEntity.trustName && { organizationName: mainEntity.trustName }),
      ...(isTrust && mainEntity.trustCellNumber && { cellNumber: mainEntity.trustCellNumber }),
      ...(isTrust && mainEntity.trustEmail && mainEntity.trustEmail.trim() !== "" && { email: mainEntity.trustEmail }), // Only add if not empty
      ...(isTrust && mainEntity.trustOrganizationId && { organizationId: mainEntity.trustOrganizationId }),
    };
    

    const combinedPayload = {
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
        caseType: parseInt(values.caseType),
        clientType: parseInt(values.clientType),
      },
      ...(isClient && { clientList: processedList, clientDetails: mainDetails }),
      ...(isCompany && { companyList: processedList, companyDetails: mainDetails }),
      ...(isTrust && { trustList: processedList, trustDetail: mainDetails }),
    };

    try {
      if (isClient) {
        dispatch(registerClientRequest(combinedPayload, navigate));
      } else {
        dispatch(registerOrganizationRequest(combinedPayload, navigate));
      }
      // dispatch(clearData());
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
                {/* {console.log(errors)} */}
                <div className="block">
                  <Label htmlFor="caseType" value="Case Type" />
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="block">
                      <div className={`items-dropdown ${values.caseType == "0" || values.caseType == "1" ? "" : "default"}  single-select mt-3`}>
                        <Field
                          as={NewCaseDropdown}
                          defaultLabel="Select Case Type"
                          name="caseType"
                          value={values.caseType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          options={caseTypeOptions}
                          data-lpignore="true" 
                        // inputClassName={values.caseType ? "text-secondary-600 bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3":"bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"  }
                        />
                        {touched.caseType && errors.caseType ? (
                          <div className="text-red-500 text-sm">
                            {errors.caseType}
                          </div>
                        ) : null}
                      </div>
                      {/* <Field
                        as={SelectInput}
                        defaultLabel="Select Case Type"
                        name="caseType"
                        value={values.caseType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        options={[
                          { value: 1, label: "Selling" },
                          { value: 0, label: "Purchasing" },
                        ]}
                        inputClassName="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                      /> */}

                      {/* {touched.caseType && errors.caseType ? (
                        <div className="text-red-500 text-sm">
                          {errors.caseType}
                        </div>
                      ) : null} */}
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
                      <div className="block">
                        <div className={`items-dropdown ${values.clientType == "0" || values.clientType == "1" || values.clientType == "2" ? "" : "default"}  single-select mt-3`}>
                          <Field
                            as={NewCaseDropdown}
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
                            data-lpignore="true" 
                          />
                          {touched.clientType && errors.clientType ? (
                            <div className="text-red-500 text-sm">
                              {errors.clientType}
                            </div>
                          ) : null}
                        </div>
                        {/* <Field
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
                        /> */}

                      </div>
                    </div>
                    {clientType == CLIENTTYPE.INDIVIDUAL &&
                      <div className="mb-8">
                        <FieldArray name="clients">
                          {({ remove, push, replace }) => (
                            <>
                              {values?.clients.map((client, index) => (
                                <div key={index} className="block pt-4 relative">
                                  {/* <Label htmlFor={`clients.${index}.clientType`} value="Client" /> */}
                                  {client.isCard !== true ? (<div>
                                    {index >= 0 && (
                                      <IoIosClose
                                        onClick={() => remove(index)}
                                        className="absolute top-0 right-0 cursor-pointer"
                                        size={24}
                                      />
                                    )}
                                  </div>) : ""}
                                  {/* <div className="grid grid-cols-2 gap-4">
                                    <div className="mb-2 block"> */}
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
                                  {/* </div>
                                  </div> */}
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
                                    <div className="grid grid-cols-2 gap-x-3">
                                      <div className="block">
                                        <TextInput
                                          name={`clients.${index}.clientfirstName`}
                                          type="text"
                                          placeholder="First Name"
                                          value={client.clientfirstName}
                                          onChange={(e) => {
                                            handleChange(e);
                                            debouncedClientFunction(e.target.value, index);
                                          }}
                                          onBlur={handleBlur}
                                          field={{
                                            name: `clients.${index}.clientfirstName`,
                                          }}
                                          form={{ errors, touched }}
                                          data-lpignore="true"
                                        />
                                        {activeSearchIndex == index && (
                                          <ul className={'search-list-dropdown overflow-hidden rounded-2xl shadow-shadow-light-2'}>
                                            {searchResults.map((item, i) => (
                                              <li
                                                key={i}
                                                className={'px-4 py-2 hover:bg-input-surface'}
                                                onClick={() => {
                                                  replace(index, {
                                                    isCard: true,
                                                    clientfirstName: item.firstName,
                                                    clientLastName: item.lastName,
                                                    clientcellNumber: item.cellNumber,
                                                    clientemail: item.email,
                                                    clientId: item.clientId
                                                  });
                                                  setSearchResults([]);
                                                }}
                                                key={item.id} // Adding a key for each list item for better performance
                                              >
                                                <div className="flex items-center">
                                                  <img src={avatar} className="w-8 mr-3" />
                                                  <div>
                                                    <p className="text-base text-secondary-800">{item.firstName} {item.lastName}</p>
                                                    <span className="text-text-gray-100 text-sm">{item?.email}</span>
                                                  </div>
                                                </div>
                                              </li>
                                            ))}
                                          </ul>
                                        )}

                                        <ErrorMessage
                                          name={`clients.${index}.clientfirstName`}
                                          component="div"
                                          className="text-red-500 text-sm"
                                        />
                                      </div>
                                      <div className="block">
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
                                          data-lpignore="true"
                                        />
                                        <ErrorMessage
                                          name={`clients.${index}.clientLastName`}
                                          component="div"
                                          className="text-red-500 text-sm"
                                        />
                                      </div>
                                      <div className="">
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
                                          data-lpignore="true"
                                        />
                                        <ErrorMessage
                                          name={`clients.${index}.clientcellNumber`}
                                          component="div"
                                          className="text-red-500 text-sm"
                                        />
                                      </div>
                                      <div className="">
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
                                          data-lpignore="true"
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
                                className="text-primary2 flex items-center mt-4"
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

                    {clientType == CLIENTTYPE.COMPANY &&
                      <div className="mb-8">
                        <FieldArray name="companyInfo">
                          {({ remove, push, replace }) => (
                            <>
                              {values?.companyInfo.map((company, index) => (
                                <div key={index} className="block pt-4 relative">
                                  {/* <Label htmlFor={`clients.${index}.clientType`} value="Client" /> */}
                                  {company.isCard !== true ? (<div>
                                    {index >= 0 && (
                                      <IoIosClose
                                        onClick={() => remove(index)}
                                        className="absolute top-0 right-0 cursor-pointer"
                                        size={24}
                                      />
                                    )}
                                  </div>) : ""}

                                  {company.isCard === true ?
                                    <div className="flex justify-between items-center border border-card-300 p-4 rounded-2xl">
                                      <div className="flex items-center">
                                        <img src={avatar} className="w-8 mr-3" />
                                        <span>{company.companyName}</span>
                                      </div>
                                      <IoCloseCircleOutline
                                        onClick={() => remove(index)}
                                        className="text-xl text-text-gray-100 cursor-pointer"
                                        size={24}
                                      />
                                      {/* <IoCloseCircleOutline className="" /> */}
                                    </div> :
                                    <div className="grid grid-cols-2 gap-x-3">
                                      <div className="block">
                                        <TextInput
                                          name={`companyInfo.${index}.companyName`}
                                          type="text"
                                          placeholder="Company Name"
                                          value={company.companyName}
                                          onChange={(e) => {
                                            handleChange(e);
                                            debouncedCompanyFunction(e.target.value, index);
                                          }}
                                          onBlur={handleBlur}
                                          field={{
                                            name: `companyInfo.${index}.companyName`,
                                          }}
                                          form={{ errors, touched }}
                                          data-lpignore="true"
                                        />
                                        {activeSearchIndex == index && (
                                          <ul className={'search-list-dropdown overflow-hidden rounded-2xl shadow-shadow-light-2'}>
                                            {searchResults.map((item, i) => (
                                              <li
                                                key={i}
                                                className={'px-4 py-2 hover:bg-input-surface'}
                                                onClick={() => {
                                                  replace(index, {
                                                    isCard: true,
                                                    companyName: item.organizationName,
                                                    companyCellNumber: item.cellNumber,
                                                    companyEmail: item.email,
                                                    companyOrganizationId: item.organizationId
                                                  });
                                                  setSearchResults([]);
                                                }}
                                                key={item.id} // Adding a key for each list item for better performance
                                              >
                                                <div className="flex items-center">
                                                  <img src={avatar} className="w-8 mr-3" />
                                                  <div>
                                                    <p className="text-base text-secondary-800">{item?.organizationName}</p>
                                                    <span className="text-text-gray-100 text-sm">{item?.email}</span>
                                                  </div>
                                                </div>
                                              </li>
                                            ))}
                                          </ul>
                                        )}

                                        <ErrorMessage
                                          name={`companyInfo.${index}.companyName`}
                                          component="div"
                                          className="text-red-500 text-sm"
                                        />
                                      </div>
                                      <div className="">
                                        <TextInput
                                          type="number"
                                          name={`companyInfo.${index}.companyCellNumber`}
                                          value={company.companyCellNumber}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          placeholder="Cell Number"
                                          field={{
                                            name: `companyInfo.${index}.companyCellNumber`,
                                          }}
                                          form={{ errors, touched }}
                                          data-lpignore="true"
                                        />
                                        <ErrorMessage
                                          name={`companyInfo.${index}.companyCellNumber`}
                                          component="div"
                                          className="text-red-500 text-sm"
                                        />
                                      </div>
                                      <div className="">
                                        <TextInput
                                          type="email"
                                          name={`companyInfo.${index}.companyEmail`}
                                          id={`companyInfo.${index}.companyEmail`}
                                          value={company.companyEmail}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          placeholder="Email"
                                          field={{ name: `companyInfo.${index}.companyEmail` }}
                                          form={{ errors, touched }}
                                          data-lpignore="true"
                                        />
                                        <ErrorMessage
                                          name={`companyInfo.${index}.companyEmail`}
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
                                className="text-primary2 flex items-center mt-4"
                                onClick={() =>
                                  push({
                                    companyName: "",
                                    companyCellNumber: "",
                                    companyEmail: "",
                                    companyOrganizationId: ""
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

                    {clientType == CLIENTTYPE.TRUST &&
                      <div className="mb-8">
                        <FieldArray name="trustInfo">
                          {({ remove, push, replace }) => (
                            <>
                              {values?.trustInfo.map((trust, index) => (
                                <div key={index} className="block pt-4 relative">
                                  {/* <Label htmlFor={`clients.${index}.clientType`} value="Client" /> */}
                                  {trust.isCard !== true ? (<div>
                                    {index >= 0 && (
                                      <IoIosClose
                                        onClick={() => remove(index)}
                                        className="absolute top-0 right-0 cursor-pointer"
                                        size={24}
                                      />
                                    )}
                                  </div>) : ""}

                                  {trust.isCard === true ?
                                    <div className="flex justify-between items-center border border-card-300 p-4 rounded-2xl">
                                      <div className="flex items-center">
                                        <img src={avatar} className="w-8 mr-3" />
                                        <span>{trust.trustName}</span>
                                      </div>
                                      <IoCloseCircleOutline
                                        onClick={() => remove(index)}
                                        className="text-xl text-text-gray-100 cursor-pointer"
                                        size={24}
                                      />
                                      {/* <IoCloseCircleOutline className="" /> */}
                                    </div> :
                                    <div className="grid grid-cols-2 gap-x-3">
                                      <div className="block">
                                        <TextInput
                                          name={`trustInfo.${index}.trustName`}
                                          type="text"
                                          placeholder="Trust Name"
                                          value={trust.trustName}
                                          onChange={(e) => {
                                            handleChange(e);
                                            debouncedCompanyFunction(e.target.value, index);
                                          }}
                                          onBlur={handleBlur}
                                          field={{
                                            name: `trustInfo.${index}.trustName`,
                                          }}
                                          form={{ errors, touched }}
                                          data-lpignore="true"
                                        />
                                        {activeSearchIndex == index && (
                                          <ul className={'search-list-dropdown overflow-hidden rounded-2xl shadow-shadow-light-2'}>
                                            {searchResults.map((item, i) => (
                                              <li
                                                key={i}
                                                className={'px-4 py-2 hover:bg-input-surface'}
                                                onClick={() => {
                                                  replace(index, {
                                                    isCard: true,
                                                    trustName: item.organizationName,
                                                    trustCellNumber: item.cellNumber,
                                                    trustEmail: item.email,
                                                    trustOrganizationId: item.organizationId
                                                  });
                                                  setSearchResults([]);
                                                }}
                                                key={item.id} // Adding a key for each list item for better performance
                                              >
                                                <div className="flex items-center">
                                                  <img src={avatar} className="w-8 mr-3" />
                                                  <div>
                                                    <p className="text-base text-secondary-800">{item.organizationName}</p>
                                                    <span className="text-text-gray-100 text-sm">{item?.email}</span>
                                                  </div>
                                                </div>
                                              </li>
                                            ))}
                                          </ul>
                                        )}

                                        <ErrorMessage
                                          name={`trustInfo.${index}.trustName`}
                                          component="div"
                                          className="text-red-500 text-sm"
                                        />
                                      </div>
                                      <div className="">
                                        <TextInput
                                          type="number"
                                          name={`trustInfo.${index}.trustCellNumber`}
                                          value={trust.trustCellNumber}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          placeholder="Cell Number"
                                          field={{
                                            name: `trustInfo.${index}.trustCellNumber`,
                                          }}
                                          form={{ errors, touched }}
                                          data-lpignore="true"
                                        />
                                        <ErrorMessage
                                          name={`trustInfo.${index}.trustCellNumber`}
                                          component="div"
                                          className="text-red-500 text-sm"
                                        />
                                      </div>
                                      <div className="">
                                        <TextInput
                                          type="email"
                                          name={`trustInfo.${index}.trustEmail`}
                                          id={`trustInfo.${index}.trustEmail`}
                                          value={trust.trustEmail}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          placeholder="Email"
                                          field={{ name: `trustInfo.${index}.trustEmail` }}
                                          form={{ errors, touched }}
                                          data-lpignore="true"
                                        />
                                        <ErrorMessage
                                          name={`trustInfo.${index}.trustEmail`}
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
                                className="text-primary2 flex items-center mt-4"
                                onClick={() =>
                                  push({
                                    trustName: "",
                                    trustCellNumber: "",
                                    trustEmail: "",
                                    trustOrganizationId: ""
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
                  </div>
                </div>

                <div>
                  <div className="block">

                    <Label htmlFor="premiseInfo" value="Premise Information" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="block">
                        <div className={`items-dropdown ${values.premisesType >= "0" && values.premisesType <= "6" ? "" : "default"} single-select mt-3`}
                        >
                          <Field
                            as={NewCaseDropdown}
                            defaultLabel="Select Premises Type"
                            name="premisesType"
                            value={values.premisesType}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            options={premisesTypes}
                            inputClassName="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                          />
                          {touched.premisesType && errors.premisesType ? (
                            <div className="text-red-500 text-sm">
                              {errors.premisesType}
                            </div>
                          ) : null}
                        </div>
                        {/* <Field
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
                        ) : null} */}
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
                      data-lpignore="true"
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
                      data-lpignore="true"
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
                        data-lpignore="true"
                      />
                      <div className={`items-dropdown ${values.state == null || values.state == undefined || values.state == "" ? "default" : ""} single-select mt-3`}  >                      <Field
                        as={NewCaseDropdown}
                        defaultLabel="Select State"
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        options={states}
                        field={{ name: "state" }}
                        form={{ errors, touched }}
                      />

                      </div>
                      {/* 
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
                      /> */}

                      <TextInput
                        name="zipCode"
                        type="text"
                        placeholder="Zip code"
                        value={values.zipCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        field={{ name: "zipCode" }}
                        form={{ errors, touched }}
                        data-lpignore="true"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-end mt-8">
                  <XButton
                    text={"Cancel"}
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="bg-card-300 text-sm text-primary2 py-[10px] px-6 rounded-[100px]"
                  />
                  <XButton
                    type="submit"
                    text={"Create"}
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
