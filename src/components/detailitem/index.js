import React from "react";

const DetailItem = ({ label, value }) => (
  <li>
    <span className="left-txt">{label}</span>
    <span className="text-right">{value}</span>
  </li>
);

export default DetailItem;
