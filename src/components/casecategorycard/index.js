import React from "react";
import CardItem from "../carditem";
import LabelCard from "../labelcard";
import LabelText from "../labeltext";
import { BsExclamationOctagon } from "react-icons/bs";
import { BsHourglass } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";

const CasesCategoryCard = ({ startedItems, confirmingItems,readyItems, onCardClick }) => {
  return (
    <div className="card bg-card-300 p-0">
      <LabelText labelText="Contract Preparing" count="11" />
      <div className="grid grid-cols-4 gap-2 mx-2 my-[10px]">
        <div>
          {startedItems.map((item, index) => (
            <CardItem
              key={index}
              badgeColor={item.badgeColor}
              badgeText={item.badgeText}
              caseDetails={item.caseDetails}
              onClick={onCardClick}
            />
          ))}
        </div>
        <div>
          {confirmingItems.map((item, index) => (
            <CardItem
              key={index}
              badgeColor={item.badgeColor}
              badgeText={item.badgeText}
              caseDetails={item.caseDetails}
            />
          ))}
        </div>
        <div>
          {readyItems.map((item, index) => (
            <CardItem
              key={index}
              badgeColor={item.badgeColor}
              badgeText={item.badgeText}
              caseDetails={item.caseDetails}
            />
          ))}
        </div>
        <div>
          {readyItems.map((item, index) => (
            <CardItem
              key={index}
              badgeColor={item.badgeColor}
              badgeText={item.badgeText}
              caseDetails={item.caseDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CasesCategoryCard;
