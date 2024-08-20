import React from "react";
import CardItem from "../carditem";
import LabelCard from "../labelcard";
import LabelText from "../labeltext";
import { BsExclamationOctagon } from "react-icons/bs";
import { BsHourglass } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";

const CasesCategoryCard = ({ cases,onCardClick ,categoryTitle,stageCount}) => {
  const startedItems = cases.filter((item) => item.badgeText === "No Response");
  const confirmingItems = cases.filter((item) => item.badgeText === "Unfinished");
  const readyItems = cases.filter((item) => item.badgeText === "Done");
  const waitingItems = cases.filter((item) => item.badgeText === "Waiting");
  return (
    <div className="card bg-card-300 p-0">
      <LabelText labelText={categoryTitle} count={stageCount} />
      <div className="grid grid-cols-4 gap-2 mx-2 my-[10px]">
        <div>
          {cases.map((item, index) => (
            <CardItem
              key={index}
              badgeColor={item.badgeColor}
              badgeText={item.badgeText}
              caseDetails={item.premisesId}
              onClick={onCardClick}
              caseType={item?.caseType}
              caseTitle={`${item.clientsId.firstName} ${item.clientsId.lastName}` }
              caseCount={item.caseCount}
            />
          ))}
        </div>
        {/* <div>
          {confirmingItems.map((item, index) => (
            <CardItem
              key={index}
              badgeColor={item.badgeColor}
              badgeText={item.badgeText}
              caseDetails={item.caseDetails}
              caseTitle={item.caseTitle}
              caseCount={item.caseCount}
              onClick={onCardClick}
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
              caseTitle={item.caseTitle}
              caseCount={item.caseCount}
              onClick={onCardClick}
            />
          ))}
        </div>
        <div>
          {waitingItems.map((item, index) => (
            <CardItem
              key={index}
              badgeColor={item.badgeColor}
              badgeText={item.badgeText}
              caseDetails={item.caseDetails}
              caseTitle={item.caseTitle}
              caseCount={item.caseCount}
              onClick={onCardClick}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default CasesCategoryCard;
