import React, { useState } from "react";
import states from "../../../constants/states.json";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CASETYPE, PREMISES_TYPE } from "../../../constants/constants";
import { format } from "date-fns";


const PremisesDetail = ({ premises, address }) => {
  const [collapse, setCollapse] = useState(false);
  const [collapseTenant, setCollapseTenant] = useState(false);
  const findLabelByValue = (value) => {
    const result = states?.find(item => item.value === value);
    return result ? result.label : 'NA';
  };
  return (
    <>
      {collapse ?
        <div className="col-span-6">
          <div className="bg-white p-4 rounded-2xl mb-5">
            {<div className="flex justify-between items-center mb-5">
              <span className="text-base text-secondary-800 font-medium">Premises</span>
              <div className="flex items-center gap-2">
                <button className="rotate-180 active" onClick={() => { setCollapse(false) }}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" class="h-6 w-6 shrink-0 rotate-180" data-testid="flowbite-accordion-arrow" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
              </div>
            </div>}
          </div>
        </div> :
        <div className="col-span-6">
          <div className="bg-white p-4 rounded-2xl mb-5">
            {<div className="flex justify-between items-center mb-5">
              <span className="text-base text-secondary-800 font-medium">Premises</span>
              <div className="flex items-center gap-2">
                <button className="rotate-180 active" onClick={() => { setCollapse(true) }}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" class="h-6 w-6 shrink-0" data-testid="flowbite-accordion-arrow" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
              </div>
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
                        : `$${premises[0].maintenanceFee} ${premises[0]?.maintenanceFeePer == 0
                          ? 'per month'
                          : premises[0]?.maintenanceFeePer == 1
                            ? 'per year' : ''
                        // : premises[0]?.maintenanceFeePer == 2
                        //   ? 'per year'
                        //   : ''
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
                        : `$${premises[0]?.assessments} ${premises[0]?.assessmentsPer == 0
                          ? 'per month'
                          : premises[0]?.assessmentsPer == 1
                            ? 'per quarter'
                            : premises[0]?.assessmentsPer == 2
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

                <li>
                  <span className="left-txt flex items-center" >Annual Property Tax</span>
                  <span className="left-txt flex items-center" >{premises[0]?.annualPropertyTax && "$"}{premises[0]?.annualPropertyTax}  </span>
                </li>
              </ul> : ""}
          </div>
        </div>}
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
            {collapseTenant ?
              <div className="flex justify-between items-center mb-5">
                <span className="text-base text-secondary-800 font-medium">Tenant</span>
                <div className="flex items-center gap-2">
                  <button className="rotate-180 active" onClick={() => { setCollapseTenant(false) }}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" class="h-6 w-6 shrink-0" data-testid="flowbite-accordion-arrow" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
                </div>
              </div> :
              <>
                <div className="flex justify-between items-center mb-5">
                  <span className="text-base text-secondary-800 font-medium">Tenant</span>
                  <div className="flex items-center gap-2">
                    <button className="rotate-180 active" onClick={() => { setCollapseTenant(true) }}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" class="h-6 w-6 shrink-0 rotate-180" data-testid="flowbite-accordion-arrow" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
                  </div>
                </div>
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
              </>}
          </div>}
      </div>

    </>

  )
};

export default PremisesDetail;
