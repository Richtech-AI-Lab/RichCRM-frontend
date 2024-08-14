import React from "react";
import Badge from "../badge";

const CardItem = ({
  badgeColor,
  badgeText,
  caseDetails,
  caseTitle,
  caseCount,
  onClick,
  innerCardClass,
  closedCases
}) => (
  <div
    className={`card rounded-2xl ${closedCases ? 'mb-0 shadow-shadow-light' : 'mb-2'}  ${innerCardClass}`}
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    <div className="flex items-center justify-between">
    {badgeColor && badgeText && <Badge color={badgeColor}>{badgeText}</Badge>}
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

    <span className={`text-xs ${closedCases ? 'text-secondary-800' : 'text-secondary-700'}`}>Selling</span>
  </div>
);
export default CardItem;
