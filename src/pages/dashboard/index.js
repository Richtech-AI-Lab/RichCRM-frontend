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
import ChatBox from "./chatBox";

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
          <ChatBox />
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