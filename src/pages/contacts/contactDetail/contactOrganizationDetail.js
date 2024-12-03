import React, { useState } from "react";
import { IMAGES } from "../../../constants/imagePath";
import { caseTypeOptions } from "../../../utils/formItem";
import { SelectInput } from "../../../components";
import { Field } from "formik";
import { BsThreeDotsVertical } from "react-icons/bs";
import MenuPopup from "../../../components/menupopup";
import { ORGANIZATION_TYPE } from "../../../constants/constants";

const ContactOrganizationDetail = ({ organization, address }) => {
    const menuOption = [
        'option1', 'option2', 'option3'
    ];

    function getContactLabelAndColor(status, name) {
        let label = '';
        let displayColor = '';

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
    
        if (name === "label") {
          return label;
        } else {
          return displayColor
        }
    
      }
    return (
        <>
            <div className="bg-white rounded-2xl mb-5 p-4">
                <div className="flex">
                <img src={`https://ui-avatars.com/api/?name=${organization?.organizationName}`} alt="Profile" className="mr-3 rounded-full w-[150px] h-[150px]" />
{/*                     
                    <img
                        src={IMAGES.avatarpic}
                        alt="Profile"
                        className="rounded-full"
                        style={{ height: '150px', width: '150px' }}
                    // className="mt-2"
                    /> */}
                    <div className="ml-6">
                        <div className="mb-16">
                            <p className="text-[22px] font-medium text-secondary-800">{organization?.organizationName}</p>
                            <p className="">
                                {/* <span className={`bg-badge-${getTaskLabelAndColor(contact.contactType, "color")} text-secondary-100 text-sm font-semibold py-1 px-3 rounded-full inline-block`}>
                                            {getTaskLabelAndColor(contact.contactType, "label")}
                                        </span> */}
                                 <span className={`bg-badge-${getContactLabelAndColor(organization?.organizationType, "color")} text-secondary-100 text-sm font-semibold py-1 px-3 rounded-full inline-block`}>
                                            {getContactLabelAndColor(organization?.organizationType, "label")}
                                        </span>
                            </p>

                        </div>
                        <p className="text-secondary-300 text-sm">{organization?.organizationId}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl mb-5">
                <div className="flex justify-between items-center mb-6 ">
                    <div>
                        <span className="md:text-[22px] lg:text-lg block mb-2 leading-7 text-secondary-800 font-medium">Individual Contact</span>
                        {/* <p className="text-base leading-6 text-secondary-800 font-medium">{address}</p> */}
                    </div>
                    <MenuPopup dropdownItems={menuOption} icon={<BsThreeDotsVertical className="text-secondary-800 opacity-40" />} />
                </div>
                <ul className="card-details">
                    <li>
                        <div className="flex">
                        <img src={`https://ui-avatars.com/api/?name=${organization?.organizationName}`} alt="Profile" className="mr-3 rounded-full w-[50px] h-[50px]" />
                            {/* <img
                                src={IMAGES.avatarpic}
                                alt="Profile"
                                className="rounded-full"
                                style={{ height: '50px', width: '50px' }}
                            // className="mt-2"
                            /> */}
                            <div className="ml-6">
                                <div className="">
                                    <p className="text-[18px] font-medium text-secondary-800">{organization?.organizationName}</p>
                                    {/* <p className="font-medium text-secondary-800 text-sm ">{getTaskLabelAndColor(contact?.contactType, "label")}</p> */}
                                    <p className="">
                                        <span className={`bg-badge-${getContactLabelAndColor(organization?.organizationType, "color")} text-secondary-100 text-sm font-semibold py-1 px-3 rounded-full inline-block`}>
                                            {getContactLabelAndColor(organization?.organizationType, "label")}
                                        </span>
                                        {/* <span className={`bg-badge-${getTaskLabelAndColor(contact.contactType, "color")} text-secondary-100 text-sm font-semibold py-1 px-3 rounded-full inline-block`}>
                                            {getTaskLabelAndColor(contact.contactType, "label")}
                                        </span> */}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                    {/* <li>
                        <div className="flex">
                            <img
                                src={IMAGES.avatarpic}
                                alt="Profile"
                                className="rounded-full"
                                style={{ height: '50px', width: '50px' }}
                            // className="mt-2"
                            />
                            <div className="ml-6">
                                <div className="">
                                    <p className="text-[18px] font-medium text-secondary-800">{contact?.firstName} {contact?.lastName}</p>
                                    <p className="font-medium text-secondary-800 text-sm ">Brokers</p>

                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="flex">
                            <img
                                src={IMAGES.avatarpic}
                                alt="Profile"
                                className="rounded-full"
                                style={{ height: '50px', width: '50px' }}
                            // className="mt-2"
                            />
                            <div className="ml-6">
                                <div className="">
                                    <p className="text-[18px] font-medium text-secondary-800">{contact?.firstName} {contact?.lastName}</p>
                                    <p className="font-medium text-secondary-800 text-sm ">Brokers</p>

                                </div>
                            </div>
                        </div>
                    </li> */}

                </ul>
            </div>
            <div className="bg-white p-4 rounded-2xl mb-5">

                <ul className="card-details">
                    <li>
                        <span className="left-txt flex items-center" > Note</span>
                        <span className="left-txt flex items-center" > {organization?.note} </span>
                    </li>
                </ul>
            </div>
        </>
    )
};

export default ContactOrganizationDetail;
