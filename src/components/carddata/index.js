import React from "react";
import CardItem from "../carditem";
import { IoIosArrowForward } from "react-icons/io";

const CardData = ({ title, count, items, cardClass, onClick ,includeClasses}) => {
  return (
    <div className={`card ${cardClass} h-max p-0`} >
      <div className="flex justify-between items-center mb-[10px] p-4 bg-white rounded-tl-3xl rounded-tr-3xl shadow-shadow-light">
        <div className="flex">
          <p className="text-secondary-800 text-base leading-[30px] font-semibold mr-2" style={{ cursor: 'pointer' }} onClick={onClick}>
            {title}
          </p>
          <span className="text-secondary-800 font-semibold text-sm bg-badge-gray rounded-full w-8 h-8 p-1 inline-block text-center leading-[22px]">
            {count}
          </span>
        </div>
        <IoIosArrowForward className="text-secondary-400" />
      </div>
      <div className="pl-2 pr-2">
      {items.map((item, index) => (
        <CardItem
          key={index}
          badgeColor={item.badgeColor}
          badgeText={item.badgeText}
          caseDetails={item.caseDetails}
          caseTitle={item.caseTitle}
          caseCount={item.caseCount}
          innerCardClass={includeClasses ? "bg-input-surface" : "bg-white shadow-shadow-light"}
          />
      ))}
      </div>
    </div>
  );
};

export default CardData;
