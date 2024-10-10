import React, { useState } from "react";
import states from "../../../constants/states.json";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CASETYPE, PREMISES_TYPE } from "../../../constants/constants";
import { format } from "date-fns";


const OtherDetail = ({ dummy }) => {

  return (
    <>
      <div className="col-span-6">
        <div className="bg-white p-4 rounded-2xl mb-5">
          {<div className="flex justify-between items-center mb-5">
            <span className="text-base text-secondary-800 font-medium">Case</span>
            {/* <div className="flex items-center gap-2">
          <BsThreeDotsVertical className="text-lg opacity-40" />
        </div> */}
          </div>}
          {true ?
            <ul className="card-details">
              <li>
                <span className="left-txt flex items-center" >Case Type</span>
                <span className="left-txt flex items-center" >{dummy?.caseType == 0 && "Selling"} {dummy?.caseType == 0 && "Purchasing"}</span>
              </li>
              <li>
                <span className="left-txt flex items-center" >Purchaser Price</span>
                <span className="left-txt flex items-center" >{dummy?.purchasePrice}</span>
              </li>
              <li>
                <span className="left-txt flex items-center" >Down Payment</span>
                <span className="left-txt flex items-center" > {dummy?.downPayment} </span>
              </li>
              <li>
                <span className="left-txt flex items-center" >Mortgage Amount</span>
                <span className="left-txt flex items-center" > {dummy?.mortgageAmount} </span>
              </li>
              <li>
                <span className="left-txt flex items-center" >Annual Property Tax</span>
                <span className="left-txt flex items-center" > {dummy?.annualPropertyTax}  </span>
              </li>
              <li>
                <span className="left-txt flex items-center" >Seller's Concession</span>
                <span className="left-txt flex items-center" > {dummy?.sellerConcession} </span>
              </li>

            </ul> : ""}
        </div>
        <div className="bg-white p-4 rounded-2xl mb-5">
          {<div className="flex justify-between items-center mb-5">
            <span className="text-base text-secondary-800 font-medium">Realtors</span>
            {/* <div className="flex items-center gap-2">
          <BsThreeDotsVertical className="text-lg opacity-40" />
        </div> */}
          </div>}
          {true ?
            <ul className="card-details">
              <li>
                <span className="left-txt flex items-center" >Realtor Sale</span>
                <span className="left-txt flex items-center" >{dummy?.brokerSale}</span>
              </li>
              <li>
                <span className="left-txt flex items-center" >Realtor Listing</span>
                <span className="left-txt flex items-center" >{dummy?.brokerListing}</span>
              </li>              
            </ul> : ""}
        </div>
      </div>
      <div className="col-span-6">
        <div className="bg-white p-4 rounded-2xl mb-5">
          {<div className="flex justify-between items-center mb-5">
            <span className="text-base text-secondary-800 font-medium">Closing</span>
            {/* <div className="flex items-center gap-2">
          <BsThreeDotsVertical className="text-lg opacity-40" />
        </div> */}
          </div>}
   
            <ul className="card-details">
            <li>
                <span className="left-txt flex items-center" > Schedule Date</span>
                <span className="left-txt flex items-center" > {dummy?.scheduleDate && format(dummy?.scheduleDate, 'MMMM dd, yyyy')}  </span>
              </li>
              <li>
                <span className="left-txt flex items-center" > Closing Date</span>
                <span className="left-txt flex items-center" >  {dummy?.closingDate && format(dummy?.closingDate, 'MMMM dd, yyyy')} </span>
              </li>
            </ul>
        </div>
        <div className="bg-white p-4 rounded-2xl mb-5">
          {<div className="flex justify-between items-center mb-5">
            <span className="text-base text-secondary-800 font-medium">Others</span>
            {/* <div className="flex items-center gap-2">
          <BsThreeDotsVertical className="text-lg opacity-40" />
        </div> */}
          </div>}
            
          <ul className="card-details">
          <li>
                <span className="left-txt flex items-center" > Referral</span>
                <span className="left-txt flex items-center" > {dummy?.referred}  </span>
              </li>
              <li>
                <span className="left-txt flex items-center" > Bank</span>
                <span className="left-txt flex items-center" > {dummy?.bank} </span>
              </li>

              <li>
                <span className="left-txt flex items-center" > Personal Note</span>
                <span className="left-txt flex items-center" >{dummy?.personalNotes}</span>
              </li>
              <li>
                <span className="left-txt flex items-center" > Excluded Note</span>
                <span className="left-txt flex items-center" > {dummy?.excludedNotes} </span>
              </li>
          </ul>
        </div>
      </div>

    </>

  )
};

export default OtherDetail;
