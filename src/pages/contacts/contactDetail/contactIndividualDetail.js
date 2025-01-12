import React, { useState } from "react";
import { IMAGES } from "../../../constants/imagePath";
import { caseTypeOptions } from "../../../utils/formItem";
import { NewBadge, SelectInput } from "../../../components";
import { Field } from "formik";

const ContactIndividualDetail = ({ contact, address }) => {
    const contactTypeLabels = {
        0: 'Realtor',
        1: "Attorney",
        2: "Title",
        3: "Lender",
        4: "Client",
        5: "Other"
    };
    return (
        <>
            <div className="bg-white rounded-2xl mb-5 p-4 shadow-shadow-light">
                <div className="flex">
                <img src={`https://ui-avatars.com/api/?name=${contact.firstName}+${contact.lastName}`} alt="Profile" className="mr-3 rounded-full w-[150px] h-[150px]" />
                       
                    {/* <img
                        src={IMAGES.avatarpic}
                        alt="Profile"
                        className="rounded-full"
                        style={{ height: '150px', width: '150px' }}
                    // className="mt-2"
                    /> */}
                    <div className="ml-6">
                        <div className="mb-16">
                            <p className="text-[22px] font-medium text-secondary-800">{contact?.firstName} {contact?.lastName}</p>
                            {/* <NewBadge label={contact?.}/> */}
                            {contact?.tags.map((tag) =>  <NewBadge label={tag}/>)}
                        </div>
                        <p className="text-secondary-300 text-sm">{contact?.contactId}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-4 rounded-2xl mb-5 shadow-shadow-light">

                <ul className="card-details">
                    <li>
                        <span className="left-txt flex items-center" >First Name</span>
                        <span className="left-txt flex items-center" >{contact?.firstName}</span>
                    </li>
                    <li>
                        <span className="left-txt flex items-center" >Last Name</span>
                        <span className="left-txt flex items-center" >{contact?.lastName}</span>
                    </li>
                </ul>
            </div>
            <div className="bg-white p-4 rounded-2xl mb-5 shadow-shadow-light">

                <ul className="card-details">
                    <li>
                        <span className="left-txt flex items-center" >Position</span>
                        <span className="left-txt flex items-center" >{contact?.position}</span>
                    </li>
                    <li>
                        <span className="left-txt flex items-center" >Company</span>
                        <span className="left-txt flex items-center" >{contact?.company}</span>
                    </li>
                </ul>
            </div>
            <div className="bg-white p-4 rounded-2xl mb-5 shadow-shadow-light">

                <ul className="card-details">
                    <li>
                        <span className="left-txt flex items-center" >Email</span>
                        <span className="left-txt flex items-center" >{contact?.email} </span>
                    </li>
                    <li>
                        <span className="left-txt flex items-center" >Cell Phone</span>
                        <span className="left-txt flex items-center" >{contact?.cellNumber}</span>
                    </li>
                    <li>
                        <span className="left-txt flex items-center" >Work Phone</span>
                        <span className="left-txt flex items-center" >{contact?.workNumber} </span>
                    </li>
                    <li>
                        <span className="left-txt flex items-center" >WeChat</span>
                        <span className="left-txt flex items-center" >{contact?.wechatAccount} </span>
                    </li>
                    <li>
                        <span className="left-txt flex items-center" >WhatsApp</span>
                        <span className="left-txt flex items-center" >{contact?.whatsApp}</span>
                    </li>
                    <li>
                        <span className="left-txt flex items-center" >Line</span>
                        <span className="left-txt flex items-center" >{contact?.line}</span>
                    </li>
                    <li>
                        <span className="left-txt flex items-center">Mailing address</span>
                        <span className="left-txt flex items-center">{address?.addressLine1} {address?.addressLine2} {address?.city} {address?.state} {address?.zipCode} </span>
                    </li>

                </ul>
            </div>
            <div className="bg-white p-4 rounded-2xl mb-5 shadow-shadow-light">

                <ul className="card-details">
                    <li>
                        <span className="left-txt flex items-center" >SSN</span>
                        <span className="left-txt flex items-center" >{contact?.ssn} </span>
                    </li>
                    <li>
                        <span className="left-txt flex items-center" >Driving License</span>
                        <span className="left-txt flex items-center" >{contact?.drivinglicense}</span>
                    </li>
                </ul>
            </div>
            <div className="bg-white p-4 rounded-2xl mb-5 shadow-shadow-light">

                <ul className="card-details">
                    <li>
                        <span className="left-txt flex items-center" >Note</span>
                        <span className="left-txt flex items-center" >{contact?.note} </span>
                    </li>
                </ul>
            </div>
        </>
    )
};

export default ContactIndividualDetail;
