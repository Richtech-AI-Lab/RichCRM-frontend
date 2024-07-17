import React from "react";

const Badge = ({ color, children }) => (
  <span className={`badge bg-badge-${color}`}>{children}</span>
);

export default Badge;
