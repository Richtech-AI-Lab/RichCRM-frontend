import React from "react";
import CardData from "../carddata";
import { useLocation } from "react-router-dom";
import DashboardCardData from "../dashboardcard";

const CardGrid = ({ cards, includeClasses,onCardClick }) => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.includes("/rich-crm/dashboard");
  return (
    <div className={includeClasses ? "bg-white p-6 rounded-3xl mb-6" : ""}>
      {includeClasses && (
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg leading-[30px] font-bold">Cases</span>
          <a className="text-primary2 text-base font-medium">View All</a>
        </div>
      )}
      <div className="grid grid-cols-4 gap-2">
        {isDashboardRoute ? (
          <>
            {cards.map((card, index) => (
              <DashboardCardData
                key={index}
                title={card.title}
                // count={card.count}
                items={card.items}
                cardClass={includeClasses ? "bg-white p-0" : "bg-card-300"}
                onClick={onCardClick}
                includeClasses={includeClasses}
              />
            ))}
          </>
        ) : (
          <>
            {cards.map((card, index) => (
              <CardData
                key={index}
                title={card.title}
                count={card.count}
                items={card.items}
                cardClass={includeClasses ? "bg-white p-0" : "bg-card-300"}
                onClick={onCardClick}
                includeClasses={includeClasses}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CardGrid;
