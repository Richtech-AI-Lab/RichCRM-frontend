import { Table } from "flowbite-react";
import React, { useState } from "react";
import ContactsActionbar from "../../../components/actionbar/contactsActionBar";
import ContactPartnerCard from "../contactPartnerCard";

const ContactPartner = () => {
  const [isEdit, setIsEdit] = useState(false);
  const toggleEdit = () => {
    console.log(isEdit)
    setIsEdit(prevState => !prevState);
  };
  return (
    <div className="mt-14">
    <ContactsActionbar isEdit={isEdit} toggleEdit={()=>{toggleEdit()}} />
    <ContactPartnerCard isEdit={isEdit} toggleEdit={()=>{toggleEdit()}}/>
  </div>
  );
};

export default ContactPartner;
