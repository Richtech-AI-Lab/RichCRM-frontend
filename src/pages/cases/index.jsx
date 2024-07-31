import React from "react";
import { Actionbar, CardGrid } from "../../components";
import { casesCardData } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/api";

const Cases = () => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(ROUTES.CASES_CATEGORY);
  };

  return (
    <div className="mt-14">
      <Actionbar />
      <CardGrid cards={casesCardData} onCardClick={handleCardClick} />
    </div>
  );
};

export default Cases;
