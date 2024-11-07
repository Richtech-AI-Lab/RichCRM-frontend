import React, { useEffect, useState } from "react";
import XButton from "../button/XButton";
import { addFromContactTab, addFromContactTabs, addFromContactV1Tabs, contactTab, ORGANIZATION_TYPE, SORT_OPTIONS } from "../../constants/constants";
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
import { Dropdown } from "flowbite-react";
import { IoCheckmarkSharp } from "react-icons/io5";
import TagButtonWithModal from "../tagModal/newTagButton";
import TagModal from "../tagModal/tagModal";

const ContactsActionbar = ({ active = "", setActive = "", activeFilter = "", setActiveFilter = () => { }, isAddFromContactModal, isEdit, toggleEdit }) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (active == 1) {
      setActiveFilter(1)
    } else {
      setActiveFilter(0)
    }
  }, [active])

  const shouldShow = (routePath) => {
    const pathsToShow = [routePath];
    return pathsToShow.includes(location.pathname);
  };

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
  const label =
    active === 0
      ? IndividualOptions.find((option) => option.value === activeFilter)?.label
      : OrganizationOptions.find((option) => option.value === activeFilter)?.label;
  return (
    <>
      {shouldShow(ROUTES.CONTACTS) && (
        <div className="flex justify-between items-center mb-6">
          <ContactTabs active={active} setActive={setActive} tabs={addFromContactV1Tabs} />

          <div className="flex">
            <div className={`items-dropdown single-select ${activeFilter == "0" ? 'sort-by-filter' : 'sort-by-filter'} mr-4`}>
              <Dropdown
                label={label}
                // value={"0"}
                inline
                className="rounded-2xl w-64 shadow-shadow-light-2"
                dismissOnClick={true}
              >
                {(active == "0" ? IndividualOptions : OrganizationOptions).map((option) => (
                  <Dropdown.Item
                    key={option.value}
                    className="py-3"
                    onClick={() => setActiveFilter(option.value)}
                  >
                    <div className="flex items-center gap-2">
                      {/* {sortBy === option.value && ( */}
                      <IoCheckmarkSharp size={20} className={`inline-block mr-1 ${activeFilter == option.value ? "" : "opacity-0"
                        }`} />

                      <span className={`bg-badge-${getContactLabelAndColor(option.value, "color")} text-secondary-100 text-sm font-semibold py-1 px-3 rounded-full inline-block`}>
                        {getContactLabelAndColor(option.value, "label")}
                      </span>
                    </div>
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
            <TagButtonWithModal
              buttonClass="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[11px] px-7 rounded-[100px] font-medium"
              // modalClass=""  
              modalContent={<TagModal />}
            />
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
          </div>
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

