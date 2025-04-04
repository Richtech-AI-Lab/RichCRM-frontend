import React, { useEffect } from "react";
import CardItem from "../carditem";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { ROUTES } from "../../constants/api";
import { useNavigate } from "react-router-dom";

const CardData = ({ title, count, items, cardClass, onClick, includeClasses, card }) => {
  const navigate = useNavigate();
  const { cases } = useSelector((state) => state.case.casesData);
  const { searchData } = useSelector((state) => state.case.casesData);
  const { filterStatus } = useSelector((state) => state.case.casesData);
  const searchfilterData  = searchData?.filter((caseItem) => caseItem.stage === card.value);
  const filteredCases = cases?.filter((caseItem) => caseItem.stage === card.value);
  const stageCount = filteredCases?.length;

  // useEffect(()=>{
  //   console.log(searchData,"searchData")
  // },[searchData])
  // alert(searchData)
  const handleCardClick = () => {
    const filteredCases = cases?.filter((caseItem) => caseItem.stage === card.value);
    onClick(card, filteredCases, stageCount);
  };
  const handleCaseCardClick = (casedetails) => {
    localStorage.setItem("c_id", casedetails?.caseId)
    navigate(ROUTES.CASES_DATA, { state: { casedetails } });
  };
  return (
    <div className={`card ${cardClass} p-0 min-h-[calc(100vh-230px)]`} >
      <div className="flex justify-between items-center mb-[10px] p-4 bg-white rounded-tl-3xl rounded-tr-3xl shadow-shadow-light" style={{ cursor: 'pointer' }} onClick={handleCardClick}>
        <div className="flex">
          <p className="text-secondary-800 text-base leading-[30px] font-semibold mr-2"  >
            {title}
          </p>
          <span className="text-secondary-800 font-semibold text-sm bg-badge-gray rounded-full w-8 h-8 p-1 inline-block text-center leading-[22px]">
            {stageCount}
          </span>
        </div>
        <IoIosArrowForward className="text-secondary-400" />
      </div>
      <div className="pl-2 pr-2">
        {/* {items?.map((item, index) => ( */}
        {/* Copy code */}
{stageCount > 0 ? (
  searchData && searchData.length > 0 ? (
    // If searchData has results, display searchfilterData
    searchfilterData.map((item, index) => {
      // console.log("Item at index", index, ":", item);

      return (
        <CardItem
          onClick={() => { handleCaseCardClick(item); }}
          key={index}
          badgeColor={item.badgeColor}
          badgeText={item.badgeText}
          caseDetails={item?.premisesName}
          caseTitle={item?.clientName}
          caseCount={item.caseCount}
          caseType={item?.caseType}
          caseStatus={item?.caseStatus}
          innerCardClass={includeClasses ? "bg-input-surface" : "bg-white shadow-shadow-light"}
        />
      );
    })
  ) : searchData && searchData.length === 0 && filterStatus ? (
    // If searchData is empty after filtering, show "No cases available"
    <div className="text-center p-4 text-gray-500 h-full">
      No cases available
    </div>
  ) : (
    // If no filter is applied and searchData is initially empty, display all cases (filteredCases)
    filteredCases.map((item, index) => {
      // console.log("Item at index", index, ":", item);

      return (
        <CardItem
          onClick={() => { handleCaseCardClick(item); }}
          key={index}
          badgeColor={item.badgeColor}
          badgeText={item.badgeText}
          caseDetails={item?.premisesName}
          caseTitle={item?.clientName}
          caseCount={item.caseCount}
          caseType={item?.caseType}
          caseStatus={item?.caseStatus}
          innerCardClass={includeClasses ? "bg-input-surface" : "bg-white shadow-shadow-light"}
        />
      );
    })
  )
) : (
  <div className="text-center p-4 text-gray-500 h-full">
    No cases available
  </div>
)}
      </div>
    </div>
  );
};

export default CardData;
