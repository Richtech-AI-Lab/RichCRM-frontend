import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { Card, CardGrid, UpcomingEventCard } from "../../components";
import { ROUTES } from "../../constants/api";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

   const cardData = [
    {
      title: "Gee - 535 W 52nd St #9G coop",
      dueText: "FEK due in",
      dueInDays: "7 days",
    },
    {
      title: "Gee - 535 W 52nd St #9G coop",
      dueText: "FEK due in",
      dueInDays: "7 days",
    },
    {
      title: "Gee - 535 W 52nd St #9G coop",
      dueText: "FEK due in",
      dueInDays: "7 days",
    },
    {
      title: "Gee - 535 W 52nd St #9G coop",
      dueText: "FEK due in",
      dueInDays: "7 days",
    },
  ];

   const cardsData = [
    {
      title: "Started",
      count: 11,
      items: [
        {
          badgeColor: "yellow",
          badgeText: "Setting up",
          caseDetails: "Client’s Name - Case Type",
        },
        {
          badgeColor: "gray",
          badgeText: "Confirming",
          caseDetails: "Client’s Name - Case Type",
        },
        {
          badgeColor: "green",
          badgeText: "Confirmed",
          caseDetails: "Client’s Name - Case Type",
        },
        {
          badgeColor: "green",
          badgeText: "Confirmed",
          caseDetails: "Client’s Name - Case Type",
        },
      ],
    },
    {
      title: "Contract",
      count: 3,
      items: [
        {
          badgeColor: "yellow",
          badgeText: "Preparing",
          caseDetails: "Client’s Name - Case Type",
        },
        {
          badgeColor: "yellow",
          badgeText: "Preparing",
          caseDetails: "Client’s Name - Case Type",
        },
        {
          badgeColor: "yellow",
          badgeText: "Signing",
          caseDetails: "Client’s Name - Case Type",
        },
        {
          badgeColor: "green",
          badgeText: "Fully Signed",
          caseDetails: "Client’s Name - Case Type",
        },
      ],
    },
    {
      title: "Mortgage & Title",
      count: 14,
      items: [
        {
          badgeColor: "yellow",
          badgeText: "Confirming",
          caseDetails: "Client’s Name - Case Type",
        },
        {
          badgeColor: "gray",
          badgeText: "Pending",
          caseDetails: "Client’s Name - Case Type",
        },
        {
          badgeColor: "green",
          badgeText: "Clear",
          caseDetails: "Client’s Name - Case Type",
        },
        {
          badgeColor: "gray",
          badgeText: "Pending",
          caseDetails: "Client’s Name - Case Type",
        },
      ],
    },
    {
      title: "Closing",
      count: 10,
      items: [
        {
          badgeColor: "yellow",
          badgeText: "Preparing",
          caseDetails: "Client’s Name - Case Type",
        },
        {
          badgeColor: "yellow",
          badgeText: "Preparing",
          caseDetails: "Client’s Name - Case Type",
        },
        {
          badgeColor: "yellow",
          badgeText: "All Done",
          caseDetails: "Client’s Name - Case Type",
        },
        {
          badgeColor: "yellow",
          badgeText: "All Done",
          caseDetails: "Client’s Name - Case Type",
        },
      ],
    },
  ];

  return (
    <div className="mt-14">
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-8 md">
          <div className="grid grid-cols-2 gap-6">
            {cardData.map((data, index) => (
              <Card
                key={index}
                title={data.title}
                dueText={data.dueText}
                dueInDays={data.dueInDays}
                ignoreLink={data.ignoreLink}
                viewDetailsLink={data.viewDetailsLink}
              />
            ))}
          </div>
        </div>
        <div className="col-span-4">
          <div className="grid grid-cols-1">
            <div className="card shadow-card">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl leading-[30px] font-medium">
                  Upcoming Events
                </span>
                <a className="text-primary2 text-base font-medium">
                  View All
                </a>
              </div>
              <UpcomingEventCard
                title="Meeting with Du"
                description="Contract signing"
                time="4:30-5:30 PM EDT"
              />
              <UpcomingEventCard
                title="Consultation with a new client"
                description="Contract signing"
                time="4:30-5:30 PM EDT"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
      <CardGrid cards={cardsData} includeClasses={true} />
      </div>
    </div>
  );
};

export default Dashboard;
