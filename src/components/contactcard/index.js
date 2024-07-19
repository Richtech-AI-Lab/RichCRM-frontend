import React from "react";
import { MdModeEdit, MdEmail, MdCall } from "react-icons/md";
import { IoLogoWechat } from "react-icons/io5";
import { HiLocationMarker } from "react-icons/hi";
import ContactDetailItem from "../contactdetailitem";

const ContactCard = ({
  profileImage,
  name,
  notes,
  email,
  phone,
  weChat,
  address,
}) => {
  return (
    <div className="bg-white py-4 px-6 rounded-lg mb-5">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xl text-title font-medium">Contacts</span>
        <MdModeEdit />
      </div>
      <ul className="card-details">
        <li className="profile">
          <img src={profileImage} alt="Profile" className="mr-8" />
          <div>
            <span className="left-txt">{name}</span>
            <p>{notes}</p>
          </div>
        </li>
        <ContactDetailItem label="Type" isInput={true} />
        <ContactDetailItem
          label="Referred by"
          content="+Add a referral"
          isInput={false}
          className="text-text-blue-400 font-semibold"
        />
        <ContactDetailItem
          icon={<MdEmail className="text-black" />}
          content={email}
          isInput={false}
        />
        <ContactDetailItem
          icon={<MdCall className="text-black" />}
          content={phone}
          isInput={false}
        />
        <ContactDetailItem
          icon={<IoLogoWechat className="text-black" />}
          content={weChat}
          isInput={false}
        />
        <ContactDetailItem
          icon={<HiLocationMarker className="text-black" />}
          content={address}
          isInput={false}
        />
      </ul>
    </div>
  );
};

export default ContactCard;
