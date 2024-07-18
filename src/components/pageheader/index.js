import React from "react";

const PageHeader = ({ mainText, secondaryText, children }) => (
  <div className="mb-[18px]">
    <span className="text-base text-title font-medium mr-8">{mainText}</span>
    {children}
    <span className="text-base text-title font-medium">{secondaryText}</span>
  </div>
);

export default PageHeader;
