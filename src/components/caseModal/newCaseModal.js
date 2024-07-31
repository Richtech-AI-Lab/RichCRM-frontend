import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, FieldArray, ErrorMessage } from "formik";
import { Label, Modal } from "flowbite-react";
import TextInput from "../TextInput";
import XButton from "../button/XButton";
import SelectInput from "../selectinput";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { fetchPremisesRequest, registerPremisesRequest } from "../../redux/actions/premisesActions";
import { caseCreateRequest } from "../../redux/actions/caseAction";
import { toast } from "react-toastify";
import { clearData } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../constants/api";
import { registerClientRequest } from "../../redux/actions/clientActions";
import { registerAddressRequest } from "../../redux/actions/utilsActions";
import XSpinnerLoader from "../spinnerLoader/XSpinnerLoader";

const NewCaseModal = ({ onClose }) => {
    const dispatch=useDispatch();
    const {client, error, loading} = useSelector((state) => state.client);
    const {address} = useSelector((state) => state.utils);
    const {premises} = useSelector((state) => state.premises);
    const {user} = useSelector((state) => state.case.createCase);
    const [showClientFields, setShowClientFields] = useState(false);

    const handleAddClientClick = () => {
        setShowClientFields(true);
    };

    const handleCloseClientFields = () => {
        setShowClientFields(false);
    };
    const navigate = useNavigate()
    const initialValues = {
        caseType: "",
        casePurpose: "",
        // clientType: "",
        // clientfirstName: "",
        // clientLastName: "",
        address: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        clients: [
            {
                clientType: "",
                clientfirstName: "",
                clientLastName: "",
                cellNumber: "",
                email: "",
            },
        ],
    };
    const validationSchema = Yup.object({
        // caseType: Yup.string().required('Case Type is required'),
        // casePurpose: Yup.string().required('Case Purpose is required'),
        // clientType: Yup.string().required('Client Type is required'),
        // clientfirstName: Yup.string().required('Client First Name is required'),
        // clientLastName: Yup.string().required('Client Last Name is required'),
        // address: Yup.string().required('Address is required'),
        // addressLine2: Yup.string('Address Line 2 is required'),
        // city: Yup.string().required('City is required'),
        // state: Yup.string().required('State is required'),
        // zipCode: Yup.string().required('Zip code is required'),
        clients: Yup.array().of(
            Yup.object().shape({
                // clientType: Yup.string().required('Client Type is required'),
                clientfirstName: Yup.string().required('Client First Name is required'),
                clientLastName: Yup.string().required('Client Last Name is required'),
                cellNumber: Yup.string()
                .matches(/^[0-9]+$/, 'Cell number must be a number')
                .required('Cell Number is required'),                email: Yup.string().email('Invalid email format').required('Email is required'),
            })
        ),
    });
    const handleNewCaseInfo = async (values) => {
      const clientDetails = values.clients[0];
      const clientPayload = {
        firstName: clientDetails.clientfirstName,
        lastName: clientDetails.clientLastName,
        cellNumber: clientDetails.cellNumber,
        email: clientDetails.email,
      };


      try {
        const clientResponse = await dispatch(registerClientRequest(clientPayload));
        if (client && client?.status === "success") {
          toast.success("Client created successfully");
          navigate(ROUTES.NEW_CASE_INFO);

          const addressPayload = {
            addressLine1: values.address,
            city: values.city,
            state: values.state,
            zipCode: values.zipCode,
          };
        //   const addressrResponse = await dispatch(
        //     registerAddressRequest(addressPayload)
        //   );

        //   if (address.status === "success") {
        //     toast.success("Address successfully registered!");
        //     const premisesPayload = {
        //       name: `${clientDetails.clientfirstName} ${clientDetails.clientLastName}`,
        //       addressId:
        //         "1600 AMPHITHEATRE PKWY, MOUNTAIN VIEW, CA 94043-1351 US",
        //       propertyType: 2,
        //     };
        //     const fetchResponse = await dispatch(
        //       registerPremisesRequest(premisesPayload)
        //     );

        //     if (premises.status === "success") {
        //       toast.success("Premises successfully registered!");

        //       const casePayload = {
        //         premisesId: "b394ec2a-24c0-4913-b065-09bcaecbeb9a",
        //         creatorId: "test1@gmail.com",
        //         stage: 0,
        //         clientType: 0,
        //         buyerId: "f3117eaa-e3a7-4b3e-88fb-37a8741a181e",
        //       };
        //       const createCaseResponse = await dispatch(
        //         caseCreateRequest(casePayload)
        //       );

        //       if (user.status === "success") {
        //         toast.success("Case created successfully!");
        //         navigate("/rich-crm/newcaseinfo");
        //       } else {
        //         toast.error("Failed to create case.");
        //       }
        //     } else {
        //       toast.error("Failed to register premises.");
        //     }
        //   } else {
        //     toast.error("Failed to register address.");
        //   }
        } else {
          toast.error("Failed to register client.");
        }

        // dispatch(clearData());
      } catch (error) {
        console.error("Error while handling new case information", error);
        toast.error("An error occurred while creating the case.");
      }
    };
    

    return (
        <>
        <XSpinnerLoader loading={loading} size="lg" />
        <Modal show={true} size="md" onClose={onClose} className="new-case-modal">
            <Modal.Header className="border-b-0">
                <div>
                    <h2 className="mb-2 text-[28px] leading-9 font-medium text-secondary-800">Create a New Case</h2>
                    <p className="text-sm leading-5 text-secondary-700">Create a new case by filling the basic information.</p>
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
                                        <SelectInput
                                            name="caseType"
                                            value={values.caseType}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            options={[
                                                { value: "condo", label: "Condo" },
                                                { value: "house", label: "House" },
                                                { value: "co-op", label: "Co-op" },
                                                { value: "commercial", label: "Commercial" },
                                                { value: "land", label: "Land" },
                                                { value: "condo-op", label: "Condo-op" },
                                            ]}
                                            inputClassName="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                                        />
                                        {touched.caseType && errors.caseType ? (
                                            <div className="text-red-500 text-sm">{errors.caseType}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-2 block">
                                        <SelectInput
                                            name="casePurpose"
                                            value={values.casePurpose}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            options={[
                                                { value: "selling", label: "Selling" },
                                                { value: "purchasing", label: "Purchasing" },
                                            ]}
                                            inputClassName="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                                        />
                                        {touched.casePurpose && errors.casePurpose ? (
                                            <div className="text-red-500 text-sm">{errors.casePurpose}</div>
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
                                <div className="mb-8" > <Label value="Client" className="mb-2" />
                                    <FieldArray name="clients">
                                        {({ remove, push }) => (
                                            <>
                                                {values.clients.map((client, index) => (
                                                    <div key={index} className="mb-2 block -mt-8" >
                                                        {/* <Label htmlFor={`clients.${index}.clientType`} value="Client" /> */}
                                                        <div className="relative mb-8">
                                                            {index > 0 && (
                                                                <IoIosClose onClick={() => remove(index)} className="absolute top-0 right-0 cursor-pointer" size={24} />
                                                            )}
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                        <div className="mb-2 block">
                                                            <SelectInput
                                                                name={`clients.${index}.clientType`}
                                                                value={client.clientType}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                options={[
                                                                    { value: "individual", label: "Individual" },
                                                                    { value: "company", label: "Company" },
                                                                    { value: "trust", label: "Trust" },
                                                                ]}
                                                                inputClassName="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                                                            />
                                                            <ErrorMessage name={`clients.${index}.clientType`} component="div" className="text-red-500 text-sm" />
                                                        </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 ">
                                                            <div className="mb-2 block">
                                                                <TextInput
                                                                    name={`clients.${index}.clientfirstName`}
                                                                    type="text"
                                                                    placeholder="First Name"
                                                                    value={client.clientfirstName}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    field={{ name: `clients.${index}.clientfirstName` }}
                                                                    form={{ errors, touched }}
                                                                />
                                                                <ErrorMessage name={`clients.${index}.clientfirstName`} component="div" className="text-red-500 text-sm" />
                                                            </div>
                                                            <div className="mb-2 block">
                                                                <TextInput
                                                                    name={`clients.${index}.clientLastName`}
                                                                    type="text"
                                                                    placeholder="Last Name"
                                                                    value={client.clientLastName}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    field={{ name: `clients.${index}.clientLastName` }}
                                                                    form={{ errors, touched }}
                                                                />
                                                                <ErrorMessage name={`clients.${index}.clientLastName`} component="div" className="text-red-500 text-sm" />
                                                            </div>
                                                            <div className="mb-8">
                                <TextInput
                                  type="number"
                                  name={`clients.${index}.cellNumber`}
                                  value={client.cellNumber}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  placeholder="Cell Number"
                                  field={{ name: `clients.${index}.cellNumber` }}
                                  form={{ errors, touched }}
                                />
                                <ErrorMessage
                                  name={`clients.${index}.cellNumber`}
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                              <div className="mb-8">
                                <TextInput
                                  type="email"
                                  name={`clients.${index}.email`}
                                  id={`clients.${index}.email`}
                                  value={client.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  placeholder="Email"
                                  field={{ name: `clients.${index}.email` }}
                                  form={{ errors, touched }}
                                />
                                <ErrorMessage
                                  name={`clients.${index}.email`}
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                                                        </div>
                                                        {/* <div className="relative mb-8">
                                                        {index > 0 && (
                                                            <IoIosClose onClick={() => remove(index)} className="absolute top-0 right-0 cursor-pointer" size={24} />
                                                        )}
                                                    </div> */}
                                                    </div>
                                                ))}
                                                {/* <a className="ml-6 text-primary2" onClick={() => push({ clientType: "", clientfirstName: "", clientLastName: "" })}>  <IoIosAdd /> Add a client</a> */}
                                                <a className="ml-6 text-primary2 flex items-center" onClick={() => push({ clientType: "", clientfirstName: "", clientLastName: "" })}>
                                                    <IoIosAdd className="mr-1" /> Add a client
                                                </a>

                                            </>
                                        )}
                                    </FieldArray>
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="premiseInfo" value="Premise Information" />
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
                                        <SelectInput
                                            name="state"
                                            value={values.state}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            options={[
                                                { value: "AL", label: "Alabama" },
                                                { value: "AK", label: "Alaska" },
                                                { value: "AZ", label: "Arizona" },
                                                { value: "AR", label: "Arkansas" },
                                                { value: "CA", label: "California" },
                                                { value: "CO", label: "Colorado" },
                                                { value: "CT", label: "Connecticut" },
                                                { value: "DE", label: "Delaware" },
                                                { value: "FL", label: "Florida" },
                                                { value: "GA", label: "Georgia" },
                                                { value: "HI", label: "Hawaii" },
                                                { value: "ID", label: "Idaho" },
                                                { value: "IL", label: "Illinois" },
                                                { value: "IN", label: "Indiana" },
                                                { value: "IA", label: "Iowa" },
                                                { value: "KS", label: "Kansas" },
                                            ]}
                                            inputClassName="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                                        />
                                        {touched.state && errors.state ? (
                                            <div className="text-red-500 text-sm">{errors.state}</div>
                                        ) : null}
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
        </Modal >
        </>
    );
};

export default NewCaseModal;
