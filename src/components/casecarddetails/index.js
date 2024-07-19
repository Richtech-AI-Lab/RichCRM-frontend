import React from "react";
import CardListItem from "../cardlistitem";

const CaseCardDetails = ({ title, items }) => (
  <div className="bg-white py-4 px-6 rounded-lg mb-5">
    {title && <p className="mb-2">{title}</p>}
    <ul className="card-details">
      {items?.map((item, index) => (
        <CardListItem
          key={index}
          label={item.label}
          value={item.value}
          isCheckbox={item.isCheckbox}
          checkboxOptions={item.checkboxOptions}
        />
      ))}
    </ul>
  </div>
);

export default CaseCardDetails;
