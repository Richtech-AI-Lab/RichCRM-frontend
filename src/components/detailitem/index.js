import React from "react";

const DetailItem = ({ label, value }) => (
  <li>
    <span className="left-txt">{label}</span>
    <span className="text-right text-secondary-800 max-w-[160px] lg:text-sm xl:text-base">{value}</span>
  </li>
);

export default DetailItem;
