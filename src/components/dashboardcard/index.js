import React from "react";
import CardItem from "../carditem";

const DashboardCardData = ({ title, count, items, cardClass, onClick ,includeClasses}) => {
  return (
    <div className={`card ${cardClass} h-max`} >
      <div className="flex justify-between items-center mb-4">
        <p className="text-secondary-100 text-base leading-[30px] font-semibold" style={{ cursor: 'pointer' }} onClick={onClick}>
          {title}
        </p>
        {/* <span className="text-text-blue-300 font-extrabold text-base">
          {count}
        </span> */}
      </div>
      {items.map((item, index) => (
        <CardItem
          key={index}
          badgeColor={item.badgeColor}
          badgeText={item.badgeText}
          caseDetails={item.caseDetails}
          caseCount={item.caseCount}
          innerCardClass={includeClasses ? "bg-input-surface" : "bg-white shadow-shadow-light"}
          />
      ))}
    </div>
  );
};

export default DashboardCardData;
