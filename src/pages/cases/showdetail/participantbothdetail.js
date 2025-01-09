import React, { useState } from "react";
import states from "../../../constants/states.json";
import { BsThreeDotsVertical } from "react-icons/bs";


const ParticipantBothDetail = ({ client, organization, title }) => {
  // console.log(organization,"organizatssssion")
  const [collapse, setCollapse] = useState(false);
  const findLabelByValue = (value) => {
    const result = states?.find(item => item.value === value);
    return result ? result.label : 'NA';
  };
  return (
    <>
{  collapse ?  <div className="bg-white p-4 rounded-2xl mb-5 shadow-shadow-light">
    {title && <div className="flex justify-between items-center mb-5">
      <span className="text-base text-secondary-800 font-bold">{title}(Client)</span>
      <div className="flex items-center gap-2">
        <BsThreeDotsVertical className="text-lg opacity-40" />
        <button className="rotate-180 active"  onClick={()=>{setCollapse(false)} } ><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" class="h-6 w-6 shrink-0 rotate-180" data-testid="flowbite-accordion-arrow" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
      </div>
    </div>}
  </div>:
    <div className="bg-white p-4 rounded-2xl mb-5 shadow-shadow-light">
      {<div className="flex justify-between items-center mb-5">
        <span className="text-base text-secondary-800 font-bold">{title}(Client)</span>
        <div className="flex items-center gap-2">
          <BsThreeDotsVertical className="text-lg opacity-40" />
          <button className="rotate-180 active" onClick={()=>{setCollapse(true)} }><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" class="h-6 w-6 shrink-0" data-testid="flowbite-accordion-arrow" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
        </div> 
      </div>}
      {client ?
        <ul className="card-details show">
          <li>
            <span className="left-txt flex items-center" > Name</span>
            <span className="left-txt flex items-center" >{`${client?.firstName} ${client?.lastName}`}</span>
          </li>
          <li>
            <span className="left-txt flex items-center" > SSN</span>
            <span className="left-txt flex items-center" > {client?.ssn} </span>
          </li>
          <li>
            <span className="left-txt flex items-center" > Email</span>
            <span className="left-txt flex items-center" > {client?.email} </span>
          </li>
          <li>
            <span className="left-txt flex items-center" > Cell Phone</span>
            <span className="left-txt flex items-center" >{client?.cellNumber}</span>
          </li>
          <li>
            <span className="left-txt flex items-center" > Work Phone</span>
            <span className="left-txt flex items-center" > {client?.workNumber} </span>
          </li>
          <li>
            <span className="left-txt flex items-center" >WeChat</span>
            <span className="left-txt flex items-center" > {client?.wechatAccount} </span>
          </li>
          <li>
            <span className="left-txt flex items-center" >WhatsApp</span>
            <span className="left-txt flex items-center" > {client?.whatsApp}</span>
          </li>
          <li>
            <span className="left-txt flex items-center">Mailing address</span>
            <span className="left-txt flex items-center">{client?.addressLine1} {client?.addressLine2} {client?.city} {findLabelByValue(client?.state)} {client?.zipCode} </span>
          </li>
          {/* {client?.line && <li>
            <span className="left-txt flex items-center" >Line</span>
            <span className="left-txt flex items-center" > {client?.line} </span>
          </li>} */}
          {/* {address[0] && Object.keys(address[0]).some(key =>
            ['addressLine1', 'addressLine2', 'city', 'state', 'zipCode'].includes(key) && address[0][key]
          ) && (
              <li>
                <span className="left-txt flex items-center">Mailing address</span>
                <span className="left-txt flex items-center">{address[0]?.addressLine1} {address[0]?.addressLine2} {address[0]?.city} {address[0]?.state} {address[0]?.zipCode} </span>
              </li>
            )} */}
        </ul> : ""}

        {organization ?
        <ul className="card-details">
          <li>
            <span className="left-txt flex items-center" > Name</span>
            <span className="left-txt flex items-center" >{`${organization?.organizationName}`}</span>
          </li>
          <li>
            <span className="left-txt flex items-center" > Email</span>
            <span className="left-txt flex items-center" > {organization?.email} </span>
          </li>
          <li>
            <span className="left-txt flex items-center" > Cell Phone</span>
            <span className="left-txt flex items-center" >{organization?.cellNumber}</span>
          </li>
          <li>
            <span className="left-txt flex items-center" > Website</span>
            <span className="left-txt flex items-center" >{organization?.website}</span>
          </li>
          <li>
            <span className="left-txt flex items-center">Mailing address</span>
            <span className="left-txt flex items-center">{organization?.addressLine1} {organization?.addressLine2} {organization?.city} {findLabelByValue(organization?.state)} {organization?.zipCode} </span>
          </li>
          {/* {address[0] && Object.keys(address[0]).some(key =>
            ['addressLine1', 'addressLine2', 'city', 'state', 'zipCode'].includes(key) && address[0][key]
          ) && (
              <li>
                <span className="left-txt flex items-center">Mailing address</span>
                <span className="left-txt flex items-center">{address[0]?.addressLine1} {address[0]?.addressLine2} {address[0]?.city} {address[0]?.state} {address[0]?.zipCode} </span>
              </li>
            )} */}
        </ul> : ""}
    </div>}
    </>

  )
};

export default ParticipantBothDetail;
