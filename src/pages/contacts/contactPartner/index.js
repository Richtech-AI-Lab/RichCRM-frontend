import { Table } from "flowbite-react";
import React, { useState } from "react";
import ContactsActionbar from "../../../components/actionbar/contactsActionBar";
import ContactPartnerIndividual from "../contactPartnerCard/contactPartnerIndividual";
import ContactPartnerOrganization from "../contactPartnerCard/contactPartnerOrganization";
import { useLocation } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { ROUTES } from "../../../constants/api";
import { PageHeader } from "../../../components";
import { useSelector } from "react-redux";

const ContactPartner = () => {
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const { active } = location.state || {};
  const contactdetails = useSelector((state) => state?.contact?.selectedItem);
  const organizationdetails = useSelector((state) => state?.organization?.selectedItem);
  const toggleEdit = () => {
    // console.log(isEdit)
    setIsEdit(prevState => !prevState);
  };
  let contactName = active ? organizationdetails?.organizationName : `${contactdetails?.firstName} ${contactdetails?.lastName}`;
  const headerItems = [
    { text: "Contact", link:ROUTES.CONTACTS, className: "mr-4" },
    { text: contactName, separator: <SlArrowRight className="inline mr-4" />},
  ];
  return (
    <div className="mt-14">
      <PageHeader items={headerItems} />
      <ContactsActionbar isEdit={isEdit} toggleEdit={() => { toggleEdit() }} />
      {
        active ? <ContactPartnerOrganization isEdit={isEdit} toggleEdit={() => { toggleEdit() }} /> : <ContactPartnerIndividual isEdit={isEdit} toggleEdit={() => { toggleEdit() }} />
      }


    </div>
  );
};

export default ContactPartner;
