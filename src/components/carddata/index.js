import React from "react";
import CardItem from "../carditem";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
const CardData = ({ title, count, items, cardClass, onClick ,includeClasses,card}) => {
  const {cases}= useSelector((state) => state.case.casesData);
  const stageCount = cases?.filter((caseItem) => caseItem.stage === card.value).length;
 
  const handleCardClick = () => {
    const filteredCases = cases?.filter((caseItem) => caseItem.stage === card.value);
    onClick(card,filteredCases,stageCount); 
  };
  return (
    <div className={`card ${cardClass} h-max p-0`} >
      <div className="flex justify-between items-center mb-[10px] p-4 bg-white rounded-tl-3xl rounded-tr-3xl shadow-shadow-light" style={{ cursor: 'pointer'}} onClick={handleCardClick}>
        <div className="flex">
          <p className="text-secondary-800 text-base leading-[30px] font-semibold mr-2"  >
            {title}
          </p>
          <span className="text-secondary-800 font-semibold text-sm bg-badge-gray rounded-full w-8 h-8 p-1 inline-block text-center leading-[22px]">
            {stageCount}
          </span>
        </div>
        <IoIosArrowForward className="text-secondary-400" />
      </div>
      <div className="pl-2 pr-2">
      {/* {items?.map((item, index) => ( */}
      {cases?.filter((caseItem) => caseItem.stage === card.value)
        .map((item,index) => (
        <CardItem
          key={index}
          badgeColor={item.badgeColor}
          badgeText={item.badgeText}
          caseDetails={item?.premisesId}
          caseTitle={`${item.clientsId.lastName}, ${item.clientsId.firstName}` }
          caseCount={item.caseCount}
          caseType={item?.caseType}
          innerCardClass={includeClasses ? "bg-input-surface" : "bg-white shadow-shadow-light"}
          />
      ))}
      </div>
    </div>
  );
};

export default CardData;
