import { Table, TextInput } from "flowbite-react";
import React, { useState } from "react";
import dummyData from "../../../utils/dummyData.json";
import { ROUTES } from "../../../constants/api";
import { useNavigate } from "react-router-dom";
import ContactsActionbar from "../../../components/actionbar/contactsActionBar";
import CardItem from "../../../components/carditem";
import FormButton from "../../../components/formButton";
import { contactItemFirst, contactItems, contactItemSecond, sellerItems } from "../../../utils/formItem";
import { CaseCardDetails } from "../../../components";
import { Formik } from "formik";
import { IMAGES } from "../../../constants/imagePath";

const ContactPartnerCard = ({ active }) => {
  const handleSubmit = (x) => {
    console.log(x)
  }
  const initialValues = {
    contactName: "",
    contactCompanyName: "",
    contactEmail: "",
    contactCellPhone: "",
    contactWorkPhone: "",
    contactWeChat: "",
    contactWhatsApp: "",
    contactLine: "",
    contactAddress: "",
    contactAddress2: "",
    contactCity: "",
    contactState: "",
    contactZipcode: "",
    contactNote:""

  };
  const closedCases = [
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" },
    { caseDetails: "535 W 52nd St #9G coop", caseTitle: "Gee, First Name" }
  ];
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-6">
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
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-2xl mb-5">
                <div className="flex">
                  <img
                    src={IMAGES.avatarpic}
                    alt="Profile"
                    className="rounded-full m-2"
                    style={{height:'150px', width:'150px'}}
                    // className="mt-2"
                  />
                  <div style={{ display: 'flex', flexDirection: 'column' }} className="ml-5 mt-2">
                    <span className="left-txt font-medium text-secondary-800">Lessy Wang</span>
                    <span className="left-txt font-medium text-secondary-800 text-sm">Brokers</span>
                    <span className="left-txt font-medium text-secondary-800 text-sm  mt-5">1232324</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl mb-5">
                <CaseCardDetails items={contactItemFirst} handle={handleChange} form={{ errors, touched }} />
              </div>

              <CaseCardDetails items={contactItemSecond} handle={handleChange} form={{ errors, touched }} />
              <div className="bg-white rounded-2xl mb-5">
                <TextInput
                  name="add a note"
                  type="text"
                  placeholder="Add a note for "
                // value={values.clientfirstName}
                // onChange={handleChange}
                // onBlur={handleBlur}
                // field={{ name: "clientfirstName" }}
                // form={{ errors, touched }}
                />
              </div>
              <FormButton onSave={handleSubmit} />
            </form>
          )}
        </Formik>
      </div>
      <div className="col-span-3">
        <div className="card bg-card-300 px-2 py-3">
          <h1 className="px-5">Involved Open Cases</h1>
          <div className="grid">
            {closedCases.map((item, index) => (
              <CardItem
                key={index}
                caseDetails={item.caseDetails}
                caseTitle={item.caseTitle}
                closedCases={closedCases}
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
            {closedCases.map((item, index) => (
              <CardItem
                key={index}
                caseDetails={item.caseDetails}
                caseTitle={item.caseTitle}
                closedCases={closedCases}
                innerCardClass="m-2"
              />
            ))}
          </div>
        </div>
      </div>
    </div>

  );
};

export default ContactPartnerCard;
