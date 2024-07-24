import React from "react";
import { MdModeEdit, MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { IoLogoWechat } from "react-icons/io5";
import ContactDetailItem from "../contactdetailitem";
import { GrLocation } from "react-icons/gr";

const ContactCard = ({
   contactData 
  // profileImage,
  // name,
  // // notes,
  // email,
  // phone,
  // weChat,
  // address,
}) => {
  return (
    <div className="bg-white py-4 rounded-2xl mb-5">
      <div className="flex justify-between items-center mb-6 px-4">
        <span className="text-xl text-title font-medium">Contacts</span>
        <MdModeEdit />
      </div>
      {contactData.map((data, index) => (
        <React.Fragment key={index}>
      <ul className="card-details">
        <li className="profile content-between">
          <div className="flex items-center">
          <img src={data.profileImage} alt="Profile" className="mr-8" />
            <span className="left-txt">{data.name}</span>
            {/* <p>{notes}</p> */}
          </div>
          <ContactDetailItem  isInput={true} />
        </li>
        
        <ContactDetailItem
          label="Referred by"
          content="Add a referral"
          isInput={false}
          className="text-text-blue-400 font-semibold"
        />
        <ContactDetailItem
          icon={<MdOutlineEmail className="text-xl"/>}
          label="Email"
          content={data.email}
          isInput={false}
        />
        <ContactDetailItem
          icon={<MdOutlinePhone className="text-xl"/>}
          label="Cell Phone"
          content={data.phone}
          isInput={false}
        />
        <ContactDetailItem
          icon={<IoLogoWechat className="text-xl" />}
          label="WeChat"
          content={data.weChat}
          isInput={false}
        />
        <ContactDetailItem
          icon={<GrLocation className="text-xl"/>}
          label="Address"
          content={data.address}
          isInput={false}
        />
      </ul>
      {index < contactData.length - 1 && (
            <div className="border-b border-gray-300 my-4"></div>
          )}
        </React.Fragment>
      ))}
      {/* <div className="border-b border-gray-300 my-4"></div>
    
      
        <ul className="card-details">
          <li className="profile mb-4">
            <img src={profileImage} alt="Profile" className="mr-8" />
            <div>
              <span className="left-txt">{name}</span>
            </div>
          </li>
          <ContactDetailItem label="Type" isInput={true} />
          <ContactDetailItem
            label="Referred by"
            content="Add a referral"
            isInput={false}
            className="text-text-blue-400 font-semibold"
          />
          <ContactDetailItem
            icon={<MdEmail className="text-black" />}
            label="Email"
            content={email}
            isInput={false}
          />
          <ContactDetailItem
            icon={<MdCall className="text-black" />}
            label="Cell Phone"
            content={phone}
            isInput={false}
          />
          <ContactDetailItem
            icon={<IoLogoWechat className="text-black" />}
            label="WeChat"
            content={weChat}
            isInput={false}
          />
          <ContactDetailItem
            icon={<HiLocationMarker className="text-black" />}
            label="Address"
            content={address}
            isInput={false}
          />
        </ul> */}
      
    </div>
  );
};

export default ContactCard;
