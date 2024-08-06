import React from "react";

const PageHeader = ({ items }) => (
  <div className="mb-6">
    {items?.map((item, index) => (
      <React.Fragment key={index}>
        {index > 0 && <span>{item.separator}</span>}
        <span className={`text-xl text-secondary-800 font-medium ${item.className}`}>
          {item.text}
        </span>
      </React.Fragment>
    ))}
  </div>
);

export default PageHeader;
