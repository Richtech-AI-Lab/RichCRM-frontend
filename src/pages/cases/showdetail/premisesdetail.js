import React, { useState } from "react";
import states from "../../../constants/states.json";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CASETYPE, PREMISES_TYPE } from "../../../constants/constants";
import { format } from "date-fns";


const PremisesDetail = ({ premises, address }) => {

  const findLabelByValue = (value) => {
    const result = states?.find(item => item.value === value);
    return result ? result.label : 'NA';
  };
  return (
    <>
      <div className="col-span-6">
        <div className="bg-white p-4 rounded-2xl mb-5">
          {<div className="flex justify-between items-center mb-5">
            <span className="text-base text-secondary-800 font-medium">Premises</span>
            {/* <div className="flex items-center gap-2">
          <BsThreeDotsVertical className="text-lg opacity-40" />
        </div> */}
          </div>}
          {premises?.length > 0 ?
            <ul className="card-details">
              <li>
                <span className="left-txt flex items-center" >Premises Type</span>
                <span className="left-txt flex items-center" >{PREMISES_TYPE[premises[0]?.propertyType]}</span>
              </li>
              <li>
                <span className="left-txt flex items-center" >Households Number</span>
                <span className="left-txt flex items-center" >{premises[0]?.parkingSpaces}</span>
              </li>
              <li>
                <span className="left-txt flex items-center" > Street Name</span>
                <span className="left-txt flex items-center" > {address[0]?.addressLine1} </span>
              </li>
              <li>
                <span className="left-txt flex items-center" >Apt. Suite, Floor</span>
                <span className="left-txt flex items-center" > {address[0]?.addressLine2} </span>
              </li>
              <li>
                <span className="left-txt flex items-center" > City</span>
                <span className="left-txt flex items-center" > {address[0]?.city}  </span>
              </li>
              <li>
                <span className="left-txt flex items-center" > State</span>
                <span className="left-txt flex items-center" > {findLabelByValue(address[0]?.state)} </span>
              </li>
              <li>
                <span className="left-txt flex items-center" > Zipcode</span>
                <span className="left-txt flex items-center" > {address[0]?.zipCode} </span>
              </li>

              <li>
                <span className="left-txt flex items-center" > Block</span>
                <span className="left-txt flex items-center" >{premises[0]?.block}</span>
              </li>
              <li>
                <span className="left-txt flex items-center" > Lot</span>
                <span className="left-txt flex items-center" > {premises[0]?.lot} </span>
              </li>
              <li>
                <span className="left-txt flex items-center" >Section</span>
                <span className="left-txt flex items-center" > {premises[0]?.section} </span>
              </li>
              <li>
                <span className="left-txt flex items-center" >Type</span>
                <span className="left-txt flex items-center" > {premises[0]?.type}</span>
              </li>
              <li>
                <span className="left-txt flex items-center">Vacant at closing</span>
                <span className="left-txt flex items-center">
                  {premises[0]?.vacantAtClosing === undefined || premises[0]?.vacantAtClosing === ""
                    ? ""
                    : premises[0]?.vacantAtClosing === "1"
                      ? "Yes"
                      : "No"}
                </span>
              </li>
              <li>
                <span className="left-txt flex items-center">Subject to Tenancy</span>
                <span className="left-txt flex items-center">
                  {premises[0]?.subjectToTenancy === undefined || premises[0]?.subjectToTenancy === ""
                    ? ""
                    : premises[0]?.subjectToTenancy === "1"
                      ? "Yes"
                      : "No"}
                </span>
              </li>
              <li>
                <span className="left-txt flex items-center">HOA</span>
                <span className="left-txt flex items-center">
                  {premises[0]?.hoa === undefined || premises[0]?.hoa === ""
                    ? ""
                    : premises[0]?.hoa === "1"
                      ? "Yes"
                      : "No"}
                </span>
              </li>
              <li>
                <span className="left-txt flex items-center" >Parking Space</span>
                <span className="left-txt flex items-center" >{premises[0]?.parkingSpaces}</span>
              </li>
              <li>
                <span className="left-txt flex items-center">Maintenance fee</span>
                <span className="left-txt flex items-center">
                  {
                    premises[0]?.maintenanceFee === undefined || premises[0]?.maintenanceFee === ""
                      ? ""
                      : `${premises[0].maintenanceFee} ${premises[0]?.maintenanceFeePer == 0
                        ? 'per month'
                        : premises[0]?.maintenanceFeePer == 1
                          ? 'per quarter'
                          : premises[0]?.maintenanceFeePer == 2
                            ? 'per year'
                            : ''
                      }`
                  }
                </span>
              </li>
              <li>
                <span className="left-txt flex items-center">Assessments</span>
                <span className="left-txt flex items-center">
                  {
                    premises[0]?.assessments === undefined || premises[0]?.assessments === ""
                      ? ""
                      : `${premises[0]?.assessments} ${premises[0]?.assessmentsPaidById == 0
                        ? 'per month'
                        : premises[0]?.assessmentsPaidById == 1
                          ? 'per quarter'
                          : premises[0]?.assessmentsPaidById == 2
                            ? 'per year'
                            : ''
                      }`
                  }
                </span>
              </li>

              <li>
                <span className="left-txt flex items-center" >Managing Company</span>
                <span className="left-txt flex items-center" >{premises[0]?.managingCompany}</span>
              </li>
            </ul> : ""}
        </div>
      </div>
      <div className="col-span-6">
        <div className="bg-white p-4 rounded-2xl mb-5">
          {<div className="flex justify-between items-center mb-5">
            <span className="text-base text-secondary-800 font-medium">Engineer Inspection</span>
            {/* <div className="flex items-center gap-2">
          <BsThreeDotsVertical className="text-lg opacity-40" />
        </div> */}
          </div>}
          {premises?.length > 0 ?
            <ul className="card-details">
              <li>
                <span className="left-txt flex items-center" >Need Engineer Inspection</span>
                <span className="left-txt flex items-center" >{premises[0]?.needInspection == 1 ? "Yes" : "No"}</span>
              </li>
              <li>
                <span className="left-txt flex items-center" >Schedule Date</span>
                <span className="left-txt flex items-center" >{premises[0]?.inspectionDate && format(premises[0]?.inspectionDate, 'MMMM dd, yyyy')}</span>
              </li>
              <li>
                <span className="left-txt flex items-center" >Received Date</span>
                <span className="left-txt flex items-center" >{premises[0]?.receivedDate && format(premises[0]?.receivedDate, 'MMMM dd, yyyy')}</span>
              </li>


            </ul> : ""}
        </div>
        <div className="bg-white p-4 rounded-2xl mb-5">
          {<div className="flex justify-between items-center mb-5">
            <span className="text-base text-secondary-800 font-medium">Termites Inspection</span>
            {/* <div className="flex items-center gap-2">
          <BsThreeDotsVertical className="text-lg opacity-40" />
        </div> */}
          </div>}
          {premises?.length > 0 ?
            <ul className="card-details">
              <li>
                <span className="left-txt flex items-center" >Need Termites Inspection</span>
                <span className="left-txt flex items-center" >{premises[0]?.needTermitesInspection == 1 ? "Yes" : "No"}</span>
              </li>

            </ul> : ""}
        </div>
        {premises[0].tenant?.length > 0 &&
          <div className="bg-white p-4 rounded-2xl mb-5">
            {<div className="flex justify-between items-center mb-5">
              <span className="text-base text-secondary-800 font-medium">Tenant</span>
            </div>}
            {premises[0].tenant?.length > 0 && (
              <ul className="card-details">
                {premises[0].tenant?.map((tenant, index) => (
                  <>
                    <li key={index}>
                      <span className="left-txt flex items-center">Tenant Name</span>
                      <span className="left-txt flex items-center">{`${tenant.firstName} ${tenant.lastName}`}</span>
                    </li>
                    <li>
                      <span className="left-txt flex items-center">Rent</span>
                      <span className="left-txt flex items-center">NA</span>
                    </li>
                    <li>
                      <span className="left-txt flex items-center">Sec.</span>
                      <span className="left-txt flex items-center">NA</span>
                    </li>
                    <li>
                      <span className="left-txt flex items-center">Lease</span>
                      <span className="left-txt flex items-center">NA</span>
                    </li>
                  </>
                ))}

              </ul>
            )}

          </div>
        }
      </div>

    </>

  )
};

export default PremisesDetail;
