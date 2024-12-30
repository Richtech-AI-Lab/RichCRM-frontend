import React, { useEffect, useState } from "react";
import XButton from "../button/XButton";
import { addFromContactTab, addFromContactTabs, addFromContactV1Tabs, ORGANIZATION_TYPE, } from "../../constants/constants";
import { FiEdit3, FiPlus } from "react-icons/fi";
import { RiDownloadLine } from "react-icons/ri";
import CaseExportModal from "../caseExportModal";
import { ROUTES } from "../../constants/api";
import NewCaseModal from "../caseModal/newCaseModal";
import { useLocation } from "react-router-dom";
import ContactTabs from "./contactTabs";
import { AiOutlineLink } from "react-icons/ai";
import ContactButtonWithModal from "../newContactButton";
import NewIndividualContactModalV1 from "../contactModal/newIndividualContactModalV1";
import NewOrganizationContactModalV1 from "../contactModal/newOrganizationContactModalV1";
import { Checkbox, Dropdown } from "flowbite-react";
import { IoCheckmarkSharp, IoFilter } from "react-icons/io5";
import TagButtonWithModal from "../tagModal/newTagButton";
import TagModal from "../tagModal/tagModal";
import { useSelector } from "react-redux";
import NewBadge from "../newBadge";

const ContactsActionbar = ({ active = "", setActive = "", activeFilterOrg = "", setActiveFilterOrg = () => { }, activeFilterTag = "", setActiveFilterTag = () => { }, isAddFromContactModal, isEdit, toggleEdit }) => {
  const location = useLocation();
  const tagDetails = useSelector((state) => state.tag.tag);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilterLocal, setActiveFilterLocal] = useState(activeFilterTag?.length > 0 ? activeFilterTag : []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (active == 1) {
      setActiveFilterOrg(1)
    } else {
      // setActiveFilterTag(tagDetails[0]?.label)
    }
  }, [active])

  const shouldShow = (routePath) => {
    const pathsToShow = [routePath];
    return pathsToShow.includes(location.pathname);
  };

  const onReset = () =>{
    setActiveFilterTag([])
    setActiveFilterLocal([])
  }

  const onApply = ()=>{
      if (activeFilterLocal?.length > 0) {
        // Remove the value if it's already selected
        setActiveFilterTag(activeFilterLocal);
      } 
  }

  const IndividualOptions = [
    { value: 0, label: "Realtor" },
    { value: 1, label: "Attorney" },
    { value: 2, label: "Title" },
    { value: 3, label: "Lender" },
    { value: 4, label: "Client" },
    { value: 5, label: "Other" },
  ];

  const OrganizationOptions = [
    // { value: 0, label: ORGANIZATION_TYPE[0] },
    { value: 1, label: ORGANIZATION_TYPE[1] },
    { value: 2, label: ORGANIZATION_TYPE[2] },
  ];
  function getContactLabelAndColor(status, name) {
    let label = '';
    let displayColor = '';
    if (active == "0") {
      switch (status) {
        case 0:
          label = 'Realtor';
          displayColor = 'blue';
          break;
        case 1:
          label = 'Attorney';
          displayColor = 'yellow';
          break;
        case 2:
          label = 'Title';
          displayColor = 'green';
          break;
        case 3:
          label = 'Lender';
          displayColor = 'yellow';
          break;
        case 4:
          label = 'Client';
          displayColor = 'yellow';
          break;
        case 5:
          label = 'Other';
          displayColor = 'yellow';
          break;
        default:
          label = 'Unknown';
          displayColor = 'black';
      }
    } else {
      switch (status) {
        case 1:
          label = 'Company';
          displayColor = 'green';
          break;
        case 2:
          label = 'Trust';
          displayColor = 'yellow';
          break;
        default:
          label = 'Unknown';
          displayColor = 'black';
      }
    }

    if (name === "label") {
      return label;
    } else {
      return displayColor
    }

  }

  const formattedOptions = tagDetails.map(option => ({
    ...option,
    value: option.label,
  }));

  return (
    <>
      {shouldShow(ROUTES.CONTACTS) && (
        <div className="flex justify-between items-center mb-6">
          <ContactTabs active={active} setActive={setActive} tabs={addFromContactV1Tabs} />
          {active === 0 ?
            <div className="flex">
              <div className={`items-dropdown single-select mr-4`}>
                <Dropdown
                  label={
                    <>
                      <IoFilter size={20} className="mr-2" /> Filter
                      {/* {formattedOptions.find((option) => option.value === activeFilterTag)?.label || 'Default Label'} */}
                    </>
                  }
                  inline
                  className="rounded-2xl w-64 shadow-shadow-light-2"
                  dismissOnClick={true}
                >
                  {formattedOptions?.length > 0 ? (
                    formattedOptions.map((option, index) => (
                      <li
                        className="px-2 py-2 hover:bg-input-surface flex justify-between items-center"
                        key={option.value}
                      >
                        <div className="flex items-center cursor-pointer">
                          <Checkbox
                            className="mr-6"
                            id={index}
                            checked={activeFilterLocal?.includes(option.value)} // Check if the value is in the array
                            onChange={() => {
                              if (activeFilterLocal?.includes(option.value)) {
                                // Remove the value if it's already selected
                                setActiveFilterLocal(activeFilterLocal?.filter((tag) => tag !== option.value));
                              } else {
                                // Add the value if it's not selected
                                setActiveFilterLocal([...activeFilterLocal, option.value]);
                              }
                            }}
                          />
                          <div>
                            <NewBadge label={option.label} />
                            {/* <p className="text-base text-secondary-800">{option.label}</p> */}
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p className="text-sm text-text-gray-100">No options available</p>
                  )}

                  {/* {formattedOptions.map((option) => (
                    <Dropdown.Item
                      key={option.value}
                      className="py-3"
                      onClick={() => setActiveFilterTag(option.value)}
                    >
                      <div className="flex items-center gap-2">
                        <IoCheckmarkSharp size={20} className={`inline-block mr-1 ${activeFilterTag == option.value ? "" : "opacity-0"
                          }`} />

                        <NewBadge label={option.label} />
                      </div>
                    </Dropdown.Item>
                  ))} */}
                  <div className="text-center py-3">
                    <XButton
                      text={"Reset"}
                      className="bg-card-300 text-sm text-secondary-800 py-[10px] px-8 rounded-[100px]"
                      onClick={onReset}
                    />
                    <XButton
                      type="submit"
                      text={"Apply"}
                      className="bg-primary text-sm text-white py-[10px] px-8 rounded-[100px] ml-3"
                    onClick={onApply}
                    />
                  </div>
                </Dropdown>
              </div>
              <TagButtonWithModal
                buttonClass="flex justify-center item-center bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[11px] px-7 rounded-[100px] font-medium mr-4"
                // modalClass=""  
                modalContent={<TagModal />}
              />
              <ContactButtonWithModal
                buttonClass="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[11px] px-7 rounded-[100px] font-medium"
                // modalClass=""  
                modalContent={active == 0 ? <NewIndividualContactModalV1 /> : <NewOrganizationContactModalV1 />}
              />
            </div>
            :
            <div className="flex">
              <div className={`items-dropdown single-select mr-4`}>
                <Dropdown
                  label={
                    <>
                      <IoFilter size={20} className="mr-2" /> Filter
                      {/* {formattedOptions.find((option) => option.value === activeFilterTag)?.label || 'Default Label'} */}
                    </>
                  }
                  // label={OrganizationOptions.find((option) => option.value === activeFilterOrg)?.label}
                  // value={"0"}
                  inline
                  className="rounded-2xl w-64 shadow-shadow-light-2"
                  dismissOnClick={true}
                >
                  {OrganizationOptions.map((option) => (
                    <Dropdown.Item
                      key={option.value}
                      className="py-3"
                      onClick={() => setActiveFilterOrg(option.value)}
                    >
                      <div className="flex items-center gap-2">
                        {/* {sortBy === option.value && ( */}
                        <IoCheckmarkSharp size={20} className={`inline-block mr-1 ${activeFilterOrg == option.value ? "" : "opacity-0"
                          }`} />

                        <span className={`bg-badge-${getContactLabelAndColor(option.value, "color")} text-secondary-100 text-sm font-semibold py-1 px-3 rounded-full inline-block`}>
                          {/* {getContactLabelAndColor(option.value, "label")} */}
                          {option.label}
                        </span>
                      </div>
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>

              <ContactButtonWithModal
                buttonClass="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[11px] px-7 rounded-[100px] font-medium"
                // modalClass=""  
                modalContent={active == 0 ? <NewIndividualContactModalV1 /> : <NewOrganizationContactModalV1 />}
              />
              {/* <XButton
              text="New Contact"
              icon={<FiPlus className="text-base mr-2 inline-block" />}
              className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4"
              onClick={toggleModal}
            />
            {isModalOpen && <NewContactModal onClose={toggleModal} />} */}
            </div>}
        </div>
      )}

      {shouldShow(ROUTES.DASHBOARD) && (
        <div className="flex justify-between items-center mb-6">
          <ContactTabs active={active} setActive={setActive} tabs={addFromContactV1Tabs} />
          <div>

            {/* <XButton
              text="New Contact"
              icon={<FiPlus className="text-base mr-2 inline-block" />}
              className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4"
              onClick={toggleModal}
            />
            {isModalOpen && <NewContactModal onClose={toggleModal} />} */}
          </div>
        </div>
      )}

      {isAddFromContactModal && (
        <div className="flex justify-between items-center mb-6">
          <ContactTabs active={active} setActive={setActive} tabs={addFromContactTabs} isAddFromContactModal={isAddFromContactModal} />
        </div>
      )}
      {shouldShow(ROUTES.CONTACT_PARTNER) &&
        <div className="flex justify-end items-center mb-6">
          <div>

            <XButton
              text="Connect"
              icon={<AiOutlineLink className="text-base mr-2 inline-block" />}
              className="shadow-shadow-light-2 text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium"
            />
            {!isEdit && <XButton
              onClick={() => toggleEdit()}
              text="Edit"
              icon={<FiEdit3 className="text-base mr-2 inline-block" />}
              className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4"
            />}
          </div>
        </div>}
    </>
  );
};

export default ContactsActionbar;

