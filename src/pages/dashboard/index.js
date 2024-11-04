import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Card, CardGrid, UpcomingEventCard } from "../../components";
import { ROUTES } from "../../constants/api";
import ContactListing from "../contacts/contactListing";
import ContactTabs from "../../components/actionbar/contactTabs";
import { addFromContactTabs } from "../../constants/constants";
import CaseOverview from "./caseOverview";
import CaseAlert from "./caseAlert";
import { fetchAllCasesRequest } from "../../redux/actions/caseAction";
import Contacts from "../contacts";
import { IMAGES } from "../../constants/imagePath";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchAllCases = async () => {
      try {
        const payload = {
          creatorId: localStorage.getItem("authEmail"),
          closed: false
        };
        dispatch(fetchAllCasesRequest(payload));
      } catch (error) {
        console.error("Error fetching cases:", error);
      }
    };

    fetchAllCases();
  }, []);
  // const caseData = {
  //   totalOpenCases: 25, // Total number of open cases
  //   settingUp: 5,       // Cases in the "Setting Up" stage
  //   contractPreparing: 8,  // Cases in the "Contract Preparing" stage
  //   contractSigning: 4,    // Cases in the "Contract Signing" stage
  //   mortgageTitle: 6,      // Cases in the "Mortgage & Title" stage
  //   closing: 2,            // Cases in the "Closing" stage
  // };

  return (
    <div>
      <CaseOverview />

      <div className="flex justify-between gap-4">
        <div className="basis-4/6">
      <div className="card">
       
       <div className="msg_box"> 
  
        <div className="msg-box-head flex justify-between">
          <div className="col-span-2">
          <p class="text-[22px] text-secondary-800 font-medium leading-[30px] mb-[18px]">AI Assistant</p>
          </div>
          <div className="col-span-2">
          <BsThreeDotsVertical className="text-lg opacity-40" />
          </div>
        </div>
        <div className="msg-box-cnt">
        <div className="msgr-name flex justify-center content-center">
            <p className="text-sm text-secondary-300">Hello Gary</p>
          </div>
        <div className="y-msg flex justify-end">
         <p className=" text-secondary-800 font-normal rounded-[50px] px-[25px] py-[10px] bg-gray-200 mb-[30px]">Help me find Tom’s case</p>
        </div>
        <div className="agt-msg flex gap-3 pr-[10px] pb-[20px]">
          <div className="ag-img">
           <img src={IMAGES.contact_avtar} alt="Profile" className="mr-3 rounded-full" />
          </div>
        <div className="ag-msg ">
         <p className="text-[16px] text-secondary-800 font-normal pb-[20px]">Absolutely! Here are some cases listed under the name Tom. Please let me know which one you need. You can click on the correct case, and I'll take you there directly.</p>
         <div className="grid gap-4 grid-cols-3">
         <div className="basis-1/3">
         <div className="card bg-gray-200">
<div className="flex justify-between">
<span class="bg-badge-yellow text-secondary-100 text-sm font-semibold px-4 py-1 rounded-full inline-block">To-do</span>
  <span className="text-[12]">1/3</span>
</div>

<p class="text-[22px] text-secondary-800 font-medium leading-[30px] mb-[18px]"><span class="text-error ml-2">2 days</span></p><p class="text-base text-secondary-800 font-semibold mb-1">Lt, Gamer</p><p class="text-sm text-secondary-800 font-medium mb-1">5330 Cordova St_Anchorage AK 99518-1268</p><span class="text-sm text-secondary-300">Purchasing</span>
</div>
</div>
<div className="basis-1/3">
         <div className="card bg-gray-200">
<div className="flex justify-between">
<span class="bg-badge-yellow text-secondary-100 text-sm font-semibold px-4 py-1 rounded-full inline-block">To-do</span>
  <span className="text-[12]">1/3</span>
</div>

<p class="text-[22px] text-secondary-800 font-medium leading-[30px] mb-[18px]"><span class="text-error ml-2">2 days</span></p><p class="text-base text-secondary-800 font-semibold mb-1">Lt, Gamer</p><p class="text-sm text-secondary-800 font-medium mb-1">5330 Cordova St_Anchorage AK 99518-1268</p><span class="text-sm text-secondary-300">Purchasing</span>
</div>
</div>
<div className="basis-1/3">
         <div className="card bg-gray-200">
<div className="flex justify-between">
<span class="bg-badge-yellow text-secondary-100 text-sm font-semibold px-4 py-1 rounded-full inline-block">To-do</span>
  <span className="text-[12]">1/3</span>
</div>

<p class="text-[22px] text-secondary-800 font-medium leading-[30px] mb-[18px]"><span class="text-error ml-2">2 days</span></p><p class="text-base text-secondary-800 font-semibold mb-1">Lt, Gamer</p><p class="text-sm text-secondary-800 font-medium mb-1">5330 Cordova St_Anchorage AK 99518-1268</p><span class="text-sm text-secondary-300">Purchasing</span>
</div>
</div>
<div className="basis-1/3">
         <div className="card bg-gray-200">
<div className="flex justify-between">
<span class="bg-badge-yellow text-secondary-100 text-sm font-semibold px-4 py-1 rounded-full inline-block">To-do</span>
  <span className="text-[12]">1/3</span>
</div>

<p class="text-[22px] text-secondary-800 font-medium leading-[30px] mb-[18px]"><span class="text-error ml-2">2 days</span></p><p class="text-base text-secondary-800 font-semibold mb-1">Lt, Gamer</p><p class="text-sm text-secondary-800 font-medium mb-1">5330 Cordova St_Anchorage AK 99518-1268</p><span class="text-sm text-secondary-300">Purchasing</span>
</div>
</div>





         </div>
        </div>
        </div>
        </div>
        <div className="bg-badge-gray rounded-[24px] p-[10px]">
          <form>
           <div className="type-msg">
              <textarea placeholder="Ask AI Assistant for any help!" ></textarea>

              
           </div>
           <div className="msg-act flex justify-between">
           <div className="col-span-2">
           <button class="bg-badge-gray shadow-shadow-light text-secondary-800 py-3 px-6 rounded-full font-medium flex">
            
           <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.125 3.94186V12.375C13.125 14.6532 11.2782 16.5 9 16.5C6.72183 16.5 4.875 14.6532 4.875 12.375V4.25C4.875 2.73122 6.10622 1.5 7.625 1.5C9.14378 1.5 10.375 2.73122 10.375 4.25V12.3343C10.375 13.0937 9.75939 13.7093 9 13.7093C8.24061 13.7093 7.625 13.0937 7.625 12.3343V4.98837" stroke="#366093" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
Attach</button>
           </div>
           <div className="col-span-2">
           <button type="button" class="bg-primary text-base text-white py-[10px] px-6 rounded-[100px] ml-4">Send</button>

           </div>
           </div>
           </form>
        </div>


       </div>
       </div>
      </div>
      <div className="basis-2/6">
      <CaseAlert />
      </div>
      </div>
      {/* <div className="card">
        <p className="text-[22px] text-secondary-800 font-medium leading-[30px] mb-[18px]">
          <span>Recent Contacts</span>
        </p>
        <ContactTabs active={activeTab} setActive={setActiveTab} tabs={addFromContactTabs} />
        <div className="contacts-table db-contacts mt-2 bg-input-surface px-4 py-0 rounded-2xl">
        <ContactListing active={activeTab} parent={"dashboard"} />
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
