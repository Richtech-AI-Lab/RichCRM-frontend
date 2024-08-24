import React, { useState } from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { CASETYPE } from "../../../constants/constants";


const ParticipantDetail = ({ client, caseType, address}) => {


  return (
    <div className="bg-white p-4 rounded-2xl mb-5">
      { <div className="flex justify-between items-center mb-5">
        <span className="text-base text-secondary-800 font-medium">{caseType ? "Seller" : "Purchaser"}</span>
        {/* <div className="flex items-center gap-2">
          <BsThreeDotsVertical className="text-lg opacity-40" />
        </div> */}
      </div>}
      {client?.length > 0 ?
        <ul className="card-details">
          {client[0]?.firstName && <li>
            <span className="left-txt flex items-center" > Name</span>
            <span className="left-txt flex items-center" >{`${client[0].firstName} ${client[0].lastName}`}</span>
          </li>}
          {client[0]?.ssn && <li>
            <span className="left-txt flex items-center" > SSN</span>
            <span className="left-txt flex items-center" > {client[0]?.ssn} </span>
          </li>}
          {client[0]?.email && <li>
            <span className="left-txt flex items-center" > Email</span>
            <span className="left-txt flex items-center" > {client[0]?.email } </span>
          </li>}
          {client[0]?.cellNumber && <li>
            <span className="left-txt flex items-center" > Cell Phone</span>
            <span className="left-txt flex items-center" >{client[0]?.cellNumber }</span>
          </li>}
          {client[0]?.workNumber && <li>
            <span className="left-txt flex items-center" > Work Phone</span>
            <span className="left-txt flex items-center" > {client[0]?.workNumber} </span>
          </li>}
          {client[0]?.wechatAccount && <li>
            <span className="left-txt flex items-center" >WeChat</span>
            <span className="left-txt flex items-center" > {client[0]?.wechatAccount} </span>
          </li>}
          {client[0]?.whatsApp && <li>
            <span className="left-txt flex items-center" >WhatsApp</span>
            <span className="left-txt flex items-center" > {client[0]?.whatsApp}</span>
          </li>}
          {/* {client[0]?.line && <li>
            <span className="left-txt flex items-center" >Line</span>
            <span className="left-txt flex items-center" > {client[0]?.line} </span>
          </li>} */}
          {address[0]?.addressLine1 && <li>
            <span className="left-txt flex items-center" > Street Name</span>
            <span className="left-txt flex items-center" > {address[0]?.addressLine1} </span>
          </li>}
          {address[0]?.addressLine2 && <li>
            <span className="left-txt flex items-center" >Apt. Suite, Floor</span>
            <span className="left-txt flex items-center" > {address[0]?.addressLine2} </span>
          </li>}
          {address[0]?.city && <li>
            <span className="left-txt flex items-center" > City</span>
            <span className="left-txt flex items-center" > {address[0]?.city}  </span>
          </li>}
          {address[0]?.state && <li>
            <span className="left-txt flex items-center" > State</span>
            <span className="left-txt flex items-center" > {address[0]?.state} </span>
          </li>}
          {address[0]?.zipCode && <li>
            <span className="left-txt flex items-center" > Zipcode</span>
            <span className="left-txt flex items-center" > {address[0]?.zipCode} </span>
          </li>}
        </ul> : ""}
    </div>
    
  )
};

export default ParticipantDetail;
