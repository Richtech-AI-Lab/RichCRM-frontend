import React from "react";
import CardData from "../carddata";

const CardGrid = ({ cards }) => (
  <div className="bg-white p-6 rounded-3xl mb-6">
    <div className="flex justify-between items-center mb-6">
      <span className="text-lg leading-[30px] font-bold">Case Pipelines</span>
      <a className="text-text-blue-200 text-base font-medium">View All</a>
    </div>
    <div className="grid grid-cols-4 gap-2">
      {cards.map((card, index) => (
        <CardData
          key={index}
          title={card.title}
          count={card.count}
          items={card.items}
        />
      ))}
    </div>
  </div>
);

export default CardGrid;
