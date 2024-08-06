import React from "react";
import { MdModeEdit, MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { IoLogoWechat } from "react-icons/io5";
import ContactDetailItem from "../contactdetailitem";
import { GrLocation } from "react-icons/gr";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Accordion,
  AccordionPanel,
  AccordionTitle,
  AccordionContent,
} from "flowbite-react";

const ContactCard = ({
  contactData,
  // profileImage,
  // name,
  // // notes,
  // email,
  // phone,
  // weChat,
  // address,
}) => {
  return (
    <div className="bg-white pt-4 rounded-2xl mb-5">
      <div className="flex justify-between items-center mb-4 px-4">
        <span className="text-xl text-title font-medium">Contacts</span>
        <BsThreeDotsVertical className="text-secondary-800 opacity-40" />
      </div>
      <Accordion alwaysOpen={true} className="border-0">
        {contactData.map((data, index) => (
          <AccordionPanel key={index}>
            <AccordionTitle className="py-3 px-4 border-t border-badge-gray rounded-none first:rounded-t-none bg-white hover:bg-white focus:ring-transparent contact-accordian-title">
              <div className="flex items-center">
                <img
                  src={data.profileImage}
                  alt="Profile"
                  className="mr-4 w-10 h-10 rounded-full"
                />
                <span className="left-txt font-medium text-secondary-800">{data.name}</span>
              </div>
            </AccordionTitle>
            <AccordionContent className="bg-light-purple py-3 px-4 contact-accordian-body">
              <ul className="card-details">
                <ContactDetailItem 
                 label="Role"
                isInput={true} />
                {/* <ContactDetailItem
                  label="Referred by"
                  content="Add a referral"
                  isInput={false}
                  className="text-text-blue-400 font-semibold"
                /> */}
                <ContactDetailItem
                  // icon={<MdOutlineEmail className="text-xl" />}
                  label="Email"
                  content={data.email}
                  isInput={false}
                />
                <ContactDetailItem
                  // icon={<MdOutlinePhone className="text-xl" />}
                  label="Cell Phone"
                  content={data.phone}
                  isInput={false}
                />
                <ContactDetailItem
                  // icon={<IoLogoWechat className="text-xl" />}
                  label="WeChat"
                  content={data.weChat}
                  isInput={false}
                />
                <ContactDetailItem
                  // icon={<GrLocation className="text-xl" />}
                  label="Address"
                  content={data.address}
                  isInput={false}
                />
              </ul>
            </AccordionContent>
          </AccordionPanel>
        ))}
      </Accordion>
    </div>
  );
};

export default ContactCard;
