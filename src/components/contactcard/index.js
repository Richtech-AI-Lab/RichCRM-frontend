import React, { useState } from "react";
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
  Dropdown,
} from "flowbite-react";
import AddFromContactModal from "../caseModal/addFromContactModal";
import { IMAGES } from "../../constants/imagePath";

const ContactCard = ({
  clientDetails,
  loading
  // profileImage,
  // name,
  // // notes,
  // email,
  // phone,
  // weChat,
  // address,
}) => {
  const [isAddFromContactsModalOpen, setIsAddFromContactsModalOpen] = useState(false); // Modal state
  const toggleAddFromContactsModal = () => {
    setIsAddFromContactsModalOpen(!isAddFromContactsModalOpen);
  };
  return (
    <div className="bg-white pt-4 rounded-2xl mb-5">
      <div className="flex justify-between items-center mb-4 px-4">
        <span className="text-xl text-title font-medium">Participants</span>
        <Dropdown arrowIcon={false} label={<BsThreeDotsVertical className="text-secondary-800 opacity-40" />} placement="left-start" inline={true} dismissOnClick={false} >
          <Dropdown.Item onClick={toggleAddFromContactsModal}>Add from Contacts</Dropdown.Item>
          <Dropdown.Item>Create a New Contact</Dropdown.Item>
          <Dropdown.Item>Edit</Dropdown.Item>
        </Dropdown>
      </div>
      <Accordion className="border-0">
        {clientDetails?.map((data, index) => (
          <AccordionPanel key={index}>
            <AccordionTitle className="py-3 px-4 border-t border-badge-gray rounded-none first:rounded-t-none bg-white hover:bg-white focus:ring-transparent contact-accordian-title">
              <div className="flex items-center">
                <img
                  src={data?.profileImage || IMAGES.profile}
                  alt="Profile"
                  className="mr-4 w-10 h-10 rounded-full"
                />
                <div style={{display:'flex',flexDirection:'column'}}>
                <span className="left-txt font-medium text-secondary-800">{`${data.firstName} ${data.lastName}` }</span>
                <span className="left-txt font-medium text-secondary-800 text-sm">Purchaser (Client)</span>
                </div>
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
                  content={data.email || 'not available'}
                  isInput={false}
                />
                <ContactDetailItem
                  // icon={<MdOutlinePhone className="text-xl" />}
                  label="Cell Phone"
                  content={data.cellNumber || 'not available'}
                  isInput={false}
                />
                <ContactDetailItem
                  // icon={<IoLogoWechat className="text-xl" />}
                  label="WeChat"
                  content={data.wechatAccount || 'not available'}
                  isInput={false}
                />
                <ContactDetailItem
                  // icon={<GrLocation className="text-xl" />}
                  label="Address"
                  content={data.addressId || 'not available'}
                  isInput={false}
                />
              </ul>
            </AccordionContent>
          </AccordionPanel>
        ))}
      </Accordion>
      {isAddFromContactsModalOpen && <AddFromContactModal onClose={toggleAddFromContactsModal} />}
    </div>
  );
};

export default ContactCard;
