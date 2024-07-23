import React from "react";
import Badge from "../badge";

const CardItem = ({ badgeColor, badgeText, caseDetails,onClick ,innerCardClass}) => (
  <div className={`card rounded-2xl mb-2 ${innerCardClass}`} onClick={onClick} style={{ cursor: 'pointer' }}>
    <Badge color={badgeColor}>{badgeText}</Badge>
    <p className="text-sm text-secondary-800 font-semibold mt-3">
      {caseDetails}
    </p>
    <span className="text-secondary-700 text-xs">Selling</span>
  </div>
);
export default CardItem;
