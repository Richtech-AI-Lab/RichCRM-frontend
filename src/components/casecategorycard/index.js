import React from "react";
import CardItem from "../carditem";
import LabelCard from "../labelcard";
import LabelText from "../labeltext";

const CasesCategoryCard = ({ startedItems, confirmingItems, onCardClick }) => {
  return (
    <div className="card bg-card-200">
      <LabelText labelText="Started" count="11" />
      <div className="grid grid-cols-4 gap-6">
        <div>
          <LabelCard labelCardText="Set up" count="11" badgeColor="yellow" />
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
          <LabelCard labelCardText="Confirming" count="11" badgeColor="green" />
          {confirmingItems.map((item, index) => (
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
