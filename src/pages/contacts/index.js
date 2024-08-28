import React, { useState } from "react";
import { contactTab } from "../../constants/constants";
import ContactsActionbar from "../../components/actionbar/contactsActionBar";
import ContactListing from "./contactListing";

const Contacts = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mt-14">
      <ContactsActionbar active={activeTab} setActive={setActiveTab} />
      <ContactListing active={activeTab} />
    </div>
  );
};

export default Contacts;
