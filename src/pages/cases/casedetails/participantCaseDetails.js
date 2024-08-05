import React, { useState } from "react";
import { CaseCardDetails } from "../../../components";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { IoLogoWechat } from "react-icons/io5";
import CaseAttorneyItems from "./caseAttorneyItems";

const ParticipantCaseDetails = () => {
      const sellerItems = [
        { label: "Seller", placeholder: "Enter seller name" },
        { label: "SSN", placeholder: "Enter a SSN" },
        { label: "Email",icon: <MdOutlineEmail className="text-xl"/>, placeholder: "Enter a Email Address" },
        {
          label: "Cell Phone",
          // icon: <MdOutlinePhone className="text-xl"/>,
          placeholder: "Enter a Phone Number",
        },
        {
          label: "Work Phone",
          // icon: <MdOutlinePhone className="text-xl"/>,
          placeholder: "Enter a Phone Number",
        },
        { label: "WeChat", placeholder: "Enter a WeChat Number", icon: <IoLogoWechat className="text-xl"/> },
        {
          label: "Mailing Address",
          // icon: <GrLocation className="text-xl"/>,
          placeholder: "Enter Address",
        },
      ];
      const buyerItems = [
        { label: "Purchaser", placeholder: "Add a purchaser" },
        { label: "SSN", placeholder: "Enter a SSN" },
        { label: "Email",icon: <MdOutlineEmail className="text-xl"/>, placeholder: "Enter a Email Address" },
        {
          label: "Cell Phone",
          // icon: <MdOutlinePhone className="text-xl"/>,
          placeholder: "Enter a Phone Number",
        },
        {
          label: "Work Phone",
          // icon: <MdOutlinePhone className="text-xl"/>,
          placeholder: "Enter a Phone Number",
        },
        { label: "WeChat", icon: <IoLogoWechat className="text-xl"/>, placeholder: "Enter a WeChat Number" },
        {
          label: "Address",
          // icon: <GrLocation className="text-xl"/>,
          placeholder: "Enter address",
        },
      ];
      // const attorneyItems = [
      //   { label: "Seller Attorney",  placeholder: "Enter an attorney" },
      //   { label: "Purchaser Attorney",  placeholder: "Enter an attorney" },
      //   { label: "Bank Attorney",  placeholder: "Enter an attorney" },
      //   { label: "Co-op Attorney",  placeholder: "Enter an attorney" },
      // ];
      const companyTitleItems = [
        { label: "Title Company",  placeholder: "Enter an title company" },
        { label: "Title Number",  placeholder: "Enter an title number" },
        { label: "Mortage",  placeholder: "Enter an mortage" },
      ];
    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6">
                <CaseCardDetails items={sellerItems} />
                <CaseCardDetails items={buyerItems} />
            </div>
            <div className="col-span-6">
                <CaseAttorneyItems />
                {/* <CaseCardDetails items={attorneyItems} /> */}
                <CaseCardDetails items={companyTitleItems} />
            </div>
        </div >
    );
};

export default ParticipantCaseDetails;

