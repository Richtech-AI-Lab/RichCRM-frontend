import React from "react";
import Badge from "../badge";

const CardItem = ({ badgeColor, badgeText, caseDetails,onClick }) => (
  <div className="card rounded-2xl mb-2 bg-input-surface" onClick={onClick} style={{ cursor: 'pointer' }}>
    <Badge color={badgeColor}>{badgeText}</Badge>
    <p className="text-sm text-secondary-100 font-semibold mt-3">
      {caseDetails}
    </p>
    <span className="text-secondary-700 text-xs">Selling</span>
  </div>
);
export default CardItem;
