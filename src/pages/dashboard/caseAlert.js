import React from "react";
import { Card } from "../../components"; // Assuming you have a Card component

const CaseAlert = ({ eventData }) => {

  const events = [
    { id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }
  ];

  return (
    <div className="grid grid-cols-12 gap-6 mb-6">
      <div className="col-span-12 md">
        <div className="grid grid-cols-3 gap-6">
          {events?.map((data, index) => (
            <Card
              key={index}
              title={data.title}
              dueText={data.dueText}
              dueInDays={data.dueInDays}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseAlert;
