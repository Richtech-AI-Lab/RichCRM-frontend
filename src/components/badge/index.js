import React from "react";

const badgeList = [
  { className: "bg-badge-green" },
  { className: "bg-badge-pink" },
  { className: "bg-badge-yellow" },
  { className: "bg-badge-blue" },
  { className: "bg-badge-gray" },
];

const Badge = ({ color, children }) => {
  const badge = badgeList.find((b) => b.className === `bg-badge-${color}`);
  return <span className={`badge ${badge.className}`}>{children}</span>;
};

export default Badge;
