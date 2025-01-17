import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { cleanupAdditionalClientRequest, fetchAdditionalClientByIdsRequest } from "../../redux/actions/clientActions";
import { fetchAdditionalOrganizationByIdsRequest } from "../../redux/actions/organizationActions";

const ContactCard = ({
  clientDetails,
  casedetails,
  loading
  // profileImage,
  // name,
  // // notes,
  // email,
  // phone,
  // weChat,
  // address,
}) => {
  const dispatch = useDispatch();
  const [addtionalInfo, setAdditionalInfo] = useState([]); // Modal state
  const [isAddFromContactsModalOpen, setIsAddFromContactsModalOpen] = useState(false); // Modal state
  const { additionalClient } = useSelector((state) => state.client);
  const { additionalOrganization } = useSelector((state) => state.organization);
  const attorneyDetails = useSelector((state) => state.contact.attorney);
 
  useEffect(() => {
    if(casedetails?.clientType ==0){
      dispatch(fetchAdditionalClientByIdsRequest(casedetails?.additionalClients));
    }else{
      dispatch(fetchAdditionalOrganizationByIdsRequest(casedetails?.additionalOrganizations));
    }
  //  return () => {
  //   dispatch(cleanupAdditionalClientRequest()); 
  // };    
  // console.log(additionalOrganization,additionalClient, attorneyDetails)
  }, []);

  useEffect(() => {
    if(casedetails?.clientType ==0){
      if (additionalClient?.length > 0) {
        setAdditionalInfo(additionalClient)
      }
    }else{
      if (additionalOrganization?.length > 0) {
        setAdditionalInfo(additionalOrganization)
      }
    }
  }, [additionalClient, additionalOrganization]);

  const toggleAddFromContactsModal = () => {
    setIsAddFromContactsModalOpen(!isAddFromContactsModalOpen);
  };
  // console.log(additionalClient, "addtionalClient")
  return (
    <div className="bg-white rounded-2xl mb-5  pt-4 pb-3 shadow-shadow-light">
      <div className="flex justify-between  mb-4 px-4 items-center">
        <span className="text-xl text-title font-medium">Participants</span>
        {/* <Dropdown arrowIcon={false} label={<BsThreeDotsVertical className="text-secondary-800 opacity-40" />} placement="left-start" inline={true} dismissOnClick={false} >
          <Dropdown.Item onClick={toggleAddFromContactsModal}>Add from Contacts</Dropdown.Item>
          <Dropdown.Item>Create a New Contact</Dropdown.Item>
          <Dropdown.Item>Edit</Dropdown.Item>
        </Dropdown> */}
      </div>
      <Accordion className="border-0">
        {clientDetails?.map((data, index) => (
          <AccordionPanel key={index}>
            <AccordionTitle className="py-3 px-4 rounded-bl-[10px] rounded-br-[10px] border-t border-badge-gray first:rounded-t-none bg-white hover:bg-white focus:ring-transparent contact-accordian-title">
              <div className="flex items-center">
                {/* <img
                  src={data?.profileImage || IMAGES.profile}
                  alt="Profile"
                  className="mr-4 w-10 h-10 rounded-full"
                /> */}
                <img src={`https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}`} alt="Profile" className="mr-3 rounded-full w-8 h-8" />
                       
                {
                  casedetails?.clientType ==0 ?
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="left-txt font-medium text-secondary-800">{`${data.firstName} ${data.lastName}`}</span>
                      <span className="left-txt font-medium text-secondary-800 text-sm">{!casedetails?.caseType ? "Purchaser" : "Seller"} (Client)</span>
                    </div> :
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="left-txt font-medium text-secondary-800">{`${data.organizationName}`}</span>
                      <span className="left-txt font-medium text-secondary-800 text-sm">{!casedetails?.caseType ? "Purchaser" : "Seller"} (Organization)</span>
                    </div>
                }
              </div>
            </AccordionTitle>
            <AccordionContent className="bg-light-purple py-3 px-4 contact-accordian-body">
              <ul className="card-details">
                <ContactDetailItem
                  label="Role"
                  content={`${!casedetails?.caseType ? "Purchaser" : "Seller"} (${!casedetails?.clientType ? "Client" : "Organization"})`}
                  isInput={false} />
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
      <Accordion className="border-0 " collapseAll>
        {addtionalInfo?.map((data, index) => (
          <AccordionPanel key={index} >
            <AccordionTitle className="py-3 px-4 border-t border-badge-gray rounded-none first:rounded-t-none bg-white hover:bg-white focus:ring-transparent contact-accordian-title">
              <div className="flex items-center">
                {/* <img
                  src={data?.profileImage || IMAGES.profile}
                  alt="Profile"
                  className="mr-4 w-10 h-10 rounded-full"
                /> */}
                <img src={`https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}`} alt="Profile" className="mr-3 rounded-full w-8 h-8" />
                       
                {
                  casedetails?.clientType ==0 ?
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="left-txt font-medium text-secondary-800">{`${data.firstName} ${data.lastName}`}</span>
                      <span className="left-txt font-medium text-secondary-800 text-sm">{!casedetails?.caseType ? "Purchaser" : "Seller"} (Additional Client)</span>
                    </div> :
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="left-txt font-medium text-secondary-800">{`${data.organizationName}`}</span>
                      <span className="left-txt font-medium text-secondary-800 text-sm">{!casedetails?.caseType ? "Purchaser" : "Seller"} (Additional Organization)</span>
                    </div>
                }
              </div>
            </AccordionTitle>
            <AccordionContent className="bg-light-purple py-3 px-4 contact-accordian-body">
              <ul className="card-details">
                <ContactDetailItem
                  label="Role"
                  content={`${!casedetails?.caseType ? "Purchaser" : "Seller"} (${!casedetails?.clientType ? "Additional Client" : "Additional Organization"})`}
                  isInput={false} />
                {/* <ContactDetailItem
                  label="Referred by"
                  content="Add a referral"
                  isInput={false}
                  className="text-text-blue-400 font-semibold"
                  /> */}
                <ContactDetailItem
                  // icon={<MdOutlineEmail className="text-xl" />}
                  label="Email"
                  content={data?.email || 'not available'}
                  isInput={false}
                />
                <ContactDetailItem
                  // icon={<MdOutlinePhone className="text-xl" />}
                  label="Cell Phone"
                  content={data?.cellNumber || 'not available'}
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
      <Accordion className="border-0  " collapseAll>
        {attorneyDetails?.map((data, index) => (
          <AccordionPanel key={index} >
            <AccordionTitle className="py-3 px-4 border-t border-badge-gray rounded-none first:rounded-t-none bg-white hover:bg-white focus:ring-transparent contact-accordian-title">
              <div className="flex items-center">
                {/* <img
                  src={data?.profileImage || IMAGES.profile}
                  alt="Profile"
                  className="mr-4 w-10 h-10 rounded-full"
                /> */}
                <img src={`https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}`} alt="Profile" className="mr-3 rounded-full w-8 h-8" />
                 

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="left-txt font-medium text-secondary-800">{`${data?.firstName} ${data?.lastName}`}</span>
                      <span className="left-txt font-medium text-secondary-800 text-sm">{data.company}</span>
                    </div>
              </div>
            </AccordionTitle>
            <AccordionContent className="bg-light-purple py-3 px-4 contact-accordian-body">
              <ul className="card-details">
                <ContactDetailItem
                  label="Role"
                  content={`${data.company}`}
                  isInput={false} />
                {/* <ContactDetailItem
                  label="Referred by"
                  content="Add a referral"
                  isInput={false}
                  className="text-text-blue-400 font-semibold"
                  /> */}
                <ContactDetailItem
                  // icon={<MdOutlineEmail className="text-xl" />}
                  label="Email"
                  content={data?.email || 'not available'}
                  isInput={false}
                />
                <ContactDetailItem
                  // icon={<MdOutlinePhone className="text-xl" />}
                  label="Cell Phone"
                  content={data?.cellNumber || 'not available'}
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
