import React, { useState } from "react";
import { contactTab } from "../../constants/constants";
import ContactsActionbar from "../../components/actionbar/contactsActionBar";
import ContactListingV1 from "./contactListingV1";

const Contacts = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mt-14">
      <ContactsActionbar active={activeTab} setActive={setActiveTab} />
      <ContactListingV1 active={activeTab} />
    </div>
  );
};

export default Contacts;
