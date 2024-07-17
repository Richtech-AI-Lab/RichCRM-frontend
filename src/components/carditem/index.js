import React from "react";
import Badge from "../badge";

const CardItem = ({ badgeColor, badgeText, caseDetails }) => (
  <div className="card rounded-lg mb-2">
    <Badge color={badgeColor}>{badgeText}</Badge>
    <p className="text-sm text-secondary-100 font-semibold mt-3">
      {caseDetails}
    </p>
  </div>
);

export default CardItem;
