import { Table } from "flowbite-react";
import React, { useState } from "react";
import ContactsActionbar from "../../../components/actionbar/contactsActionBar";
import ContactPartnerCard from "../contactPartnerCard";

const ContactPartner = ({ active }) => {
  return (
    <div className="mt-14">
    <ContactsActionbar />
    <ContactPartnerCard />
  </div>
  );
};

export default ContactPartner;
