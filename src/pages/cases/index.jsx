import React, { useState } from "react";
import { Actionbar, CardGrid } from "../../components";
import { casesCardData, closedCasesCardData } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/api";

const Cases = () => {
  const [filter, setFilter] = useState("Open");
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(ROUTES.CASES_CATEGORY);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const getFilteredData = () => {
    if (filter === "Open") {
      return casesCardData;
    } else if (filter === "Closed") {
      return closedCasesCardData;
    } else {
      return casesCardData;
    }
  };

  return (
    <div className="mt-14">
      <Actionbar onFilterChange={handleFilterChange} />
      <CardGrid cards={getFilteredData()} onCardClick={handleCardClick} />
    </div>
  );
};

export default Cases;
