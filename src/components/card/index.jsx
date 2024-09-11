import React from "react";

const Card = ({ title, dueText, dueInDays }) => {
  return (
    <div className="card shadow-card">
      <p className="text-[22px] text-secondary-800 font-medium leading-[30px] mb-[18px]">
        <span>Mortgage is Due in</span>
        <span className="text-error ml-2"> 20 days</span>
      </p>
      <p className="text-base text-secondary-800 font-semibold mb-1">Woooo, Larry</p>
          <p className="text-sm text-secondary-800 font-medium mb-1">130 W 3rd St # 1203_New York NY 10012-1296</p>
          <span className="text-sm text-secondary-300">Selling</span>
    </div>
  );
};

export default Card;
