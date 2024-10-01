import { Table } from "flowbite-react";
import React, { useState } from "react";
import ContactsActionbar from "../../../components/actionbar/contactsActionBar";
import ContactPartnerIndividual from "../contactPartnerCard/contactPartnerIndividual";
import ContactPartnerOrganization from "../contactPartnerCard/contactPartnerOrganization";
import { useLocation } from "react-router-dom";

const ContactPartner = () => {
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const { active } = location.state || {};
  const toggleEdit = () => {
    // console.log(isEdit)
    setIsEdit(prevState => !prevState);
  };
  return (
    <div className="mt-14">
      <ContactsActionbar isEdit={isEdit} toggleEdit={() => { toggleEdit() }} />
      {
        active ? <ContactPartnerOrganization isEdit={isEdit} toggleEdit={() => { toggleEdit() }} /> : <ContactPartnerIndividual isEdit={isEdit} toggleEdit={() => { toggleEdit() }} />
      }


    </div>
  );
};

export default ContactPartner;
