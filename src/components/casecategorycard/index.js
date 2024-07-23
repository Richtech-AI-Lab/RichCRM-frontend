import React from "react";
import CardItem from "../carditem";
import LabelCard from "../labelcard";
import LabelText from "../labeltext";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";

const CasesCategoryCard = ({ startedItems, confirmingItems,readyItems, onCardClick }) => {
  return (
    <div className="card bg-card-300">
      <LabelText labelText="Started" count="11" />
      <div className="grid grid-cols-4 gap-6">
        <div>
          <LabelCard labelCardText="Unresolved" icon={<IoIosInformationCircleOutline className="text-base mr-2 inline-block" />} />
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
          <LabelCard labelCardText="Processing"  icon={<IoCheckmarkDoneCircleOutline className="text-base mr-2 inline-block" />}/>
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
          <LabelCard labelCardText="Ready"  icon={<IoCheckmarkDoneCircleOutline className="text-base mr-2 inline-block" />}/>
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
