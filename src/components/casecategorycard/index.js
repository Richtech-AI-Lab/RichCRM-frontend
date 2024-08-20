import React from "react";
import CardItem from "../carditem";
import LabelCard from "../labelcard";
import LabelText from "../labeltext";
import { BsExclamationOctagon } from "react-icons/bs";
import { BsHourglass } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";

const CasesCategoryCard = ({ cases,onCardClick ,categoryTitle,stageCount}) => {
  console.log(cases,"cases in category card")
  // const badgeTexts = [...new Set(cases.map((item) => item.badgeText))];

  return (
    <div className="card bg-card-300 p-0">
      <LabelText labelText={categoryTitle} count={stageCount} />
      <div className="grid grid-cols-4 gap-2 mx-2 my-[10px]">
      {/* {badgeTexts.map((badge) => ( */}
        <div 
        // key={badge}
        >
          {cases
          // .filter((item) => item.badgeText === badge)
          .map((item, index) => (
            <CardItem
            key={index}
            badgeColor={item.badgeColor}
            badgeText={item.badgeText}
            caseDetails={item.premisesId}
            onClick={onCardClick}
            caseType={item?.caseType}
            caseTitle={`${item.clientsId.lastName}, ${item.clientsId.firstName}` }
            caseCount={item.caseCount}
          />

          ))}
        </div>
      {/* ))} */}
    </div>
  </div>
  );
};

export default CasesCategoryCard;
