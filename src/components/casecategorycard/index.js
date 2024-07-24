import React from "react";
import CardItem from "../carditem";
import LabelCard from "../labelcard";
import LabelText from "../labeltext";
import { BsExclamationOctagon } from "react-icons/bs";
import { BsHourglass } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";

const CasesCategoryCard = ({ startedItems, confirmingItems,readyItems, onCardClick }) => {
  return (
    <div className="card bg-card-300">
      <LabelText labelText="Started" count="11" />
      <div className="grid grid-cols-3 gap-6">
        <div>
          <LabelCard labelCardText="Unsolved" icon={<BsExclamationOctagon className="text-base mr-2 inline-block" />} />
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
          <LabelCard labelCardText="Processing"  icon={<BsHourglass className="text-base mr-2 inline-block" />}/>
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
          <LabelCard labelCardText="Ready"  icon={<FiCheckCircle  className="text-base mr-2 inline-block" />}/>
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
