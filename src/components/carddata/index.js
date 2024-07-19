import React from "react";
import CardItem from "../carditem";

const CardData = ({ title, count, items, cardClass, onClick }) => {
  return (
    <div className={`card ${cardClass} h-max`} >
      <p className="text-secondary-100 text-base leading-[30px] font-semibold mb-4" style={{ cursor: 'pointer' }} onClick={onClick}>
        {title}{" "}
        <span className="text-text-blue-300 font-extrabold ml-4">{count}</span>
      </p>
      {items.map((item, index) => (
        <CardItem
          key={index}
          badgeColor={item.badgeColor}
          badgeText={item.badgeText}
          caseDetails={item.caseDetails}
        />
      ))}
    </div>
  );
};

export default CardData;
