import React from "react";
import Badge from "../badge";
import { caseTypeOptions } from "../../utils/formItem";

const CardItem = ({
  badgeColor,
  badgeText,
  caseDetails,
  caseTitle,
  caseCount,
  caseStatus,
  onClick,
  innerCardClass,
  closedCases,
  caseType
}) => {
  const showLabel = (status) => {
    let badgeColor = '';
    let badgeText = '';

    switch (status) {
      case 0:
        badgeColor = 'yellow';
        badgeText = 'To-do';
        break;
      case 1:
        badgeColor = 'yellow';
        badgeText = 'Unfinished';
        break;
      case 2:
        badgeColor = 'gray';
        badgeText = 'Waiting';
        break;
      case 3:
        badgeColor = 'red';
        badgeText = 'No Response';
        break;
      case 4:
        badgeColor = 'green';
        badgeText = 'Done';
        break;
      default:
        badgeColor = 'yellow';
        badgeText = 'Unknown';
        break;
    }

    return <Badge color={badgeColor}>{badgeText}</Badge>;
  };

  const caseTypeLabel = caseTypeOptions.find(option => option.value === caseType)?.label || "Unknown";
  return (
    <div
      className={`card rounded-2xl ${closedCases ? 'mb-0 shadow-shadow-light' : 'mb-2'}  ${innerCardClass}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="flex items-center justify-between">
        {showLabel(caseStatus)}
        {caseCount && (
          <span className="ml-2 text-secondary-800 text-sm font-medium">
            {caseCount}
          </span>
        )}
      </div>
      {caseTitle && (
        <p className={`text-base text-secondary-800 font-semibold ${closedCases ? 'mt-0' : 'mt-2'}`}>
          {caseTitle}
        </p>
      )}


      <p className="text-sm text-secondary-800 font-medium mt-1">{caseDetails}</p>

      <span className={`text-xs ${closedCases ? 'text-secondary-800' : 'text-secondary-700'}`}>{caseTypeLabel}</span>
    </div>
  );
};
export default CardItem;
