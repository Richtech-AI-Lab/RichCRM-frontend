import React, { useState } from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { CASETYPE, PREMISES_TYPE } from "../../../constants/constants";


const PremisesDetail = ({ premises,  address}) => {


  return (
    <div className="bg-white p-4 rounded-2xl mb-5">
      { <div className="flex justify-between items-center mb-5">
        <span className="text-base text-secondary-800 font-medium">Premises</span>
        {/* <div className="flex items-center gap-2">
          <BsThreeDotsVertical className="text-lg opacity-40" />
        </div> */}
      </div>}
      {premises?.length > 0 ?
        <ul className="card-details">
          {premises[0]?.propertyType && <li>
            <span className="left-txt flex items-center" >Premises Type</span>
            <span className="left-txt flex items-center" >{PREMISES_TYPE[premises[0].propertyType]}</span>
          </li>}
          {premises[0]?.parkingSpaces && <li>
            <span className="left-txt flex items-center" >Households Number</span>
            <span className="left-txt flex items-center" >{`${premises[0].parkingSpaces}`}</span>
          </li>}
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

          {premises[0]?.block && <li>
            <span className="left-txt flex items-center" > Block</span>
            <span className="left-txt flex items-center" >{premises[0]?.block }</span>
          </li>}
          {premises[0]?.lot && <li>
            <span className="left-txt flex items-center" > Lot</span>
            <span className="left-txt flex items-center" > {premises[0]?.lot} </span>
          </li>}
          {premises[0]?.section && <li>
            <span className="left-txt flex items-center" >Section</span>
            <span className="left-txt flex items-center" > {premises[0]?.section} </span>
          </li>}
          {premises[0]?.type && <li>
            <span className="left-txt flex items-center" >Type</span>
            <span className="left-txt flex items-center" > {premises[0]?.type}</span>
          </li>}
          {premises[0]?.vacantAtClosing && <li>
            <span className="left-txt flex items-center" >Vacant at closing</span>
            <span className="left-txt flex items-center" >{`${premises[0].vacantAtClosing? "yes" : "no"}`}</span>
          </li>}
          {<li>
            <span className="left-txt flex items-center" >Subject to Tenancy</span>
            <span className="left-txt flex items-center" >{`${premises[0].subjectToTenancy? "yes" : "no"}`}</span>
          </li>}
          {premises[0]?.hoa && <li>
            <span className="left-txt flex items-center" >HOA</span>
            <span className="left-txt flex items-center" >{`${premises[0].hoa ? "yes" : "no"}`}</span>
          </li>}
          {premises[0]?.parkingSpaces && <li>
            <span className="left-txt flex items-center" >Parking Space</span>
            <span className="left-txt flex items-center" >{`${premises[0].parkingSpaces}`}</span>
          </li>}
          {premises[0]?.maintenanceFee && <li>
            <span className="left-txt flex items-center" >Maintenance fee</span>
            <span className="left-txt flex items-center" >{`${premises[0].maintenanceFee} ${premises[0].maintenanceFeePer === 1 ? 'per year' : 'per month'}`}</span>
          </li>}
          {premises[0]?.assessments && <li>
            <span className="left-txt flex items-center" >Assessments</span>
            <span className="left-txt flex items-center" >{premises[0].assessments}</span>
          </li>}
          {premises[0]?.assessmentsPaidById && <li>
            <span className="left-txt flex items-center" >Paid By</span>
            <span className="left-txt flex items-center" >{`${premises[0].assessmentsPaidById}`}</span>
          </li>}
          {premises[0]?.managingCompany && <li>
            <span className="left-txt flex items-center" >Managing Company</span>
            <span className="left-txt flex items-center" >{`${premises[0].managingCompany}`}</span>
          </li>} 
        </ul> : ""}
    </div>
    
  )
};

export default PremisesDetail;
