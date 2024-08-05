import React, { useState } from "react";
import { CaseCardDetails } from "../../../components";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { IoLogoWechat } from "react-icons/io5";
import CaseAttorneyItems from "./caseAttorneyItems";

const ParticipantCaseDetails = () => {
  const sellerItems = [
    { label: "Name", placeholder: "Enter seller name" },
    { label: "SSN", placeholder: "Enter a SSN" },
    { label: "Email", placeholder: "Enter a Email Address" },
    {
      show: false, optional: true,  buttonText: "add Work Phone", label: "Work Phone",  placeholder: "Enter a work phone",
    },
    {
      show: false, optional: true, buttonText: "add We Chat", label: "We Chat",  placeholder: "Enter a we chat",
    },
    {
      show: false, optional: true, buttonText: "add WhatsApp", label: "WhatsApp",  placeholder: "Enter a whatsApp",
    },
    {
      show: false, optional: true, buttonText: "add Line", label: "Line",  placeholder: "Enter a Line",
    },
    {
      label: "Mailing Address",
      placeholder: "Enter Address",
    },
  ];
  const buyerItems = [
    { label: "Name", placeholder: "Add a purchaser" },
    { label: "SSN", placeholder: "Enter a SSN" },
    { label: "Email", placeholder: "Enter a Email Address" },
    {
      show: false, optional: true,  buttonText: "add Work Phone", label: "Work Phone",  placeholder: "Enter a work phone",
    },
    {
      show: false, optional: true, buttonText: "add We Chat", label: "We Chat",  placeholder: "Enter a we chat",
    },
    {
      show: false, optional: true, buttonText: "add WhatsApp", label: "WhatsApp",  placeholder: "Enter a whatsApp",
    },
    {
      show: false, optional: true, buttonText: "add Line", label: "Line",  placeholder: "Enter a Line",
    },
    {
      label: "Mailing Address", placeholder: "Enter Address",
    },
  ];
  const companyTitleItems = [
    { label: "Title Company", placeholder: "Enter an title company" },
    { label: "Title Number", placeholder: "Enter an title number" },
    { label: "Mortage", placeholder: "Enter an mortage" },
  ];
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-6">
        <CaseCardDetails items={sellerItems} title="Seller" />
        <CaseCardDetails items={buyerItems} title="Puchaser" />
      </div>
      <div className="col-span-6">
        <CaseAttorneyItems title="Attorneys" />
        {/* <CaseCardDetails items={attorneyItems} /> */}
        <CaseCardDetails items={companyTitleItems} title="Title & Mortgage" />
      </div>
    </div >
  );
};

export default ParticipantCaseDetails;

