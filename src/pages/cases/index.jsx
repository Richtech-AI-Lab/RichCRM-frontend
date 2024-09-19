import React, { useEffect, useState } from "react";
import { Actionbar, CardGrid, XSpinnerLoader } from "../../components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/api";
import ClosedCasesGrid from "../../components/closedcasesgrid";
import { useDispatch, useSelector} from "react-redux";
import { fetchAllCasesRequest, setSearchCases } from "../../redux/actions/caseAction";
import { stageTypes } from "../../utils/formItem";
import { clearStageData } from "../../redux/actions/stagesActions";
import { clearTaskData } from "../../redux/actions/taskActions";

const Cases = () => {
  const dispatch = useDispatch();
  const {cases,loading}= useSelector((state) => state.case.casesData);
  const { searchData } = useSelector((state) => state.case.casesData);
  const [filter, setFilter] = useState("Open");
  const navigate = useNavigate();
  const handleCardClick = (card,filteredCases,stageCount) => {
    navigate(ROUTES.CASES_CATEGORY, { state: { card, filteredCases,stageCount } });
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  useEffect(() => {
    const fetchAllCases = async () => {
      try {
        const payload = {
          creatorId: localStorage.getItem("authEmail"),
          closed: filter === "Open" ? false : true
        };
        dispatch(fetchAllCasesRequest(payload));
      } catch (error) {
        console.error("Error fetching cases:", error);
      }
    };

    fetchAllCases();
  }, [filter, dispatch]);

  useEffect(()=>{
    dispatch(clearStageData())
    dispatch(clearTaskData())
  },[dispatch])

  return (
    <>
    <XSpinnerLoader loading={loading} size="lg" />

    <div className="mt-14">
      <Actionbar onFilterChange={handleFilterChange} />
      {filter === "Open" ? (
        <CardGrid 
        cards={stageTypes} 
        // cards={cases?.data}
        onCardClick={handleCardClick} />
      ) : (
        <ClosedCasesGrid closedCases={searchData && searchData.length > 0 ? searchData : cases} />
      )}
    </div>
    </>
  );
};

export default Cases;
