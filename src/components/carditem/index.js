import React from "react";
import Badge from "../badge";
import { caseTypeOptions } from "../../utils/formItem";
import { formatDateToCustomString } from "../../utils";
import { format } from "date-fns";

const CardItem = ({
  badgeColor,
  badgeText,
  item = {},
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
        badgeColor = 'gray';
        badgeText = 'Waiting';
        break;
      case 2:
        badgeColor = 'green';
        badgeText = 'Done';
        break;
      case 3:
        badgeColor = 'red';
        badgeText = 'Warning';
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
      className={`card rounded-2xl ${closedCases ? 'mb-0 shadow-shadow-light' : 'mb-2 shadow-shadow-light'}  ${innerCardClass}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="flex items-center justify-between">
        {closedCases?.length >= 0 ? "" : showLabel(caseStatus)}
        {caseCount && (
          <span className="ml-2 text-secondary-800 text-sm font-medium">
            {caseCount}
          </span>
        )}
      </div>

      {closedCases?.length >= 0 && <p className="text-sm text-secondary-800 font-medium mt-1 " style={{opacity:'0.4'}}>Closed on {item?.closingDate && format(item?.closingDate, 'MMM dd, yyyy')}</p>  }

      {caseTitle && (
        <p className={`text-base text-secondary-800 font-semibold ${closedCases ? 'mt-0' : 'mt-2'}`}>
          {caseTitle}
        </p>
      )}

      {closedCases?.length >= 0 ? <p className="text-sm text-secondary-800 font-medium mt-1" >{item?.premisesName}</p> :
        <p className="text-sm text-secondary-800 font-medium mt-1">{caseDetails}</p>
      }

      <span className={`text-xs ${closedCases ? 'text-secondary-800' : 'text-secondary-700'}`} style={{opacity:closedCases?.length >= 0 ? '0.4' : '',}}>{caseTypeLabel}</span>
    </div>
  );
};
export default CardItem;
