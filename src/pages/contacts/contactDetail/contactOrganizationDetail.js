import React, { useState } from "react";
import { IMAGES } from "../../../constants/imagePath";
import { caseTypeOptions } from "../../../utils/formItem";
import { SelectInput } from "../../../components";
import { Field } from "formik";
import { BsThreeDotsVertical } from "react-icons/bs";
import MenuPopup from "../../../components/menupopup";

const ContactOrganizationDetail = ({ contact, address }) => {
    const menuOption = [
        'Edit', 'Share case', 'Delete case'
      ];
    return (
        <>
            <div className="bg-white rounded-2xl mb-5 p-4">
                <div className="flex">
                    <img
                        src={IMAGES.avatarpic}
                        alt="Profile"
                        className="rounded-full"
                        style={{ height: '150px', width: '150px' }}
                    // className="mt-2"
                    />
                    <div className="ml-6">
                        <div className="mb-16">
                            <p className="text-[22px] font-medium text-secondary-800">{contact?.firstName} {contact?.lastName}</p>
                            <p className="font-medium text-secondary-800 text-sm mb-10">Brokers</p>

                        </div>
                        <p className="text-secondary-300 text-sm">{contact?.contactId}</p>
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
                    </li>

                </ul>
            </div>
            <div className="bg-white p-4 rounded-2xl mb-5">

                <ul className="card-details">
                    <li>
                        <span className="left-txt flex items-center" > Note</span>
                        <span className="left-txt flex items-center" > {contact?.note} </span>
                    </li>
                </ul>
            </div>
        </>
    )
};

export default ContactOrganizationDetail;
