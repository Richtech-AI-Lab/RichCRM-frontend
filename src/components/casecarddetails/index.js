import React from "react";
import CardListItem from "../cardlistitem";

const CaseCardDetails = ({ title, items }) => (
  <div className="bg-white py-4 rounded-2xl mb-5">
    {title && <p className="mb-2">{title}</p>}
    <ul className="card-details">
      {items?.map((item, index) => (
        <CardListItem
          key={index}
          label={item.label}
          value={item.value}
          icon={item.icon}
          isCheckbox={item.isCheckbox}
          checkboxOptions={item.checkboxOptions}
          nestedItems={item.nestedItems}
          floor={item.floor}
          inputProps={{
            type: "text",
            // onChange: handleChange,
            placeholder: item.placeholder ,
          }}
        />
      ))}
    </ul>
  </div>
);

export default CaseCardDetails;
