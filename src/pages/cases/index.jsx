import React from "react";
import { Actionbar, CardGrid } from "../../components";
import { casesCardData } from "../../constants/constants";

const Cases = () => {
  return (
    <div>
      <Actionbar />
      <CardGrid cards={casesCardData} />
    </div>
  );
};

export default Cases;
