import React, { useEffect, useState } from "react";
import XButton from "../button/XButton";
import NewCaseModal from "../caseModal/newCaseModal";
import { SORT_OPTIONS } from "../../constants/constants";
import { FiPlus } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/api";
import { Dropdown } from "flowbite-react";
import { FaCheck } from "react-icons/fa";
import DropdownMenu from "../dropdownmenu";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCasesSuccess, setSearchCases } from "../../redux/actions/caseAction";

const Actionbar = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.STATUS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Open");
  const [searchArr, setSearchArr] = useState([]);
  const { cases } = useSelector((state) => state.case.casesData);
  // const filteredCases = cases?.filter((caseItem) => caseItem.stage === card.value);


  useEffect(()=>{
    if(activeFilter==="Open"){
      setSortBy(SORT_OPTIONS.STATUS)
    }else{
      setSortBy(SORT_OPTIONS.NEWOLD)
    }
  },[activeFilter])

  const openfilterSections = [
    {
      title: "Status",
      options: [
        // { value: "allStatus", label: "All Status" },
        { value: "warning", label: "Warning" },
        { value: "waiting", label: "Waiting" },
        { value: "finished", label: "Finished" },
      ],
    },
    {
      title: "Case Type",
      options: [
        // { value: "allCaseType", label: "All Case Type" },
        { value: "selling", label: "Selling" },
        { value: "purchasing", label: "Purchasing" },
      ],
    },
  ];

  const closedfilterSections = [
    {
      title: "Status",
      options: [
        { value: "last30Days", label: "Last 30 Days" },
        { value: "2024", label: "2024" },
        // { value: "allTime", label: "All Time" },
      ],
    },
    {
      title: "Case Type",
      options: [
        // { value: "allCaseType", label: "All Case Type" },
        { value: "selling", label: "Selling" },
        { value: "purchasing", label: "Purchasing" },
      ],
    },
  ];

  const sortOptions = [
    { value: SORT_OPTIONS.STATUS, label: SORT_OPTIONS.STATUS },
    { value: SORT_OPTIONS.PROGRESS, label: SORT_OPTIONS.PROGRESS },
  ];

  const closeSortOptions = [
    { value: SORT_OPTIONS.NEWOLD, label: SORT_OPTIONS.NEWOLD },
    { value: SORT_OPTIONS.OLDNEW, label: SORT_OPTIONS.OLDNEW },
  ];

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // const handleAddOrRemove = (x) => {
  //   console.log(x,"_________")
  // };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (onFilterChange) {
      onFilterChange(filter);
      setSearchArr([])
      dispatch(setSearchCases([]))
    }
  };
  const shouldShowOpenClosed = () => {
    const pathsToShow = [ROUTES.CASES];
    return pathsToShow.includes(location.pathname);
  };

  const filterCases = (cases, searchArr) => {
    let data=cases?.filter(caseRecord => {

      const isWarning = searchArr?.includes("warning") && caseRecord.caseStatus===3 ;

      const isWaiting  = searchArr?.includes("waiting") && caseRecord.caseStatus===1 ;

      const isFinished = searchArr?.includes("finished") && caseRecord.caseStatus===2;

      const isSelling = searchArr?.includes("selling") &&caseRecord.caseType === 1;
  
      const isPurchasing = searchArr?.includes("purchasing") && caseRecord.caseType === 0;

      return isSelling || isPurchasing ||  isWarning || isWaiting || isFinished;
    });

    return data;
  };

  const handleApply = () => {
    if(searchArr.length > 0){
      let mainCases=filterCases(cases, searchArr)
      dispatch(setSearchCases(mainCases, true))
    }
  };

  const handleReset = () => {
    // if(searchArr.length > 0){
      setSearchArr([])
      dispatch(setSearchCases([]))
    // }
  };
  const label = activeFilter === "Open" ? `Sort by: ${sortBy}` : `Closed Date: ${sortBy}`;

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        {shouldShowOpenClosed() && (
          <div className="flex">
            <div
              onClick={() => handleFilterChange("Open")}
              className={`px-4 py-2 rounded-full mr-4 cursor-pointer ${
                activeFilter === "Open" ? "bg-badge-gray" : ""
              }`}
            >
              <span className="text-base font-medium text-secondary-800">
                Open
              </span>
            </div>
            <div
              onClick={() => handleFilterChange("Closed")}
              className={`px-4 py-2 rounded-full cursor-pointer ${
                activeFilter === "Closed" ? "bg-badge-gray" : ""
              }`}
            >
              <span className="text-base font-medium text-secondary-800">
                Closed
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="flex">
        <DropdownMenu
          filterSections={activeFilter === "Open" ? openfilterSections : closedfilterSections}
          onFilterChange={handleFilterChange}
          onApply={handleApply}
          onReset={handleReset}
          // onClick={handleAddOrRemove}
          searchArr={searchArr}
          setSearchArr={setSearchArr}
        />
        <div className={`items-dropdown single-select ${activeFilter === "Open"?'sort-by-filter':''}`}>
          <Dropdown
            label={label}
            value={sortBy}
            inline
            className="rounded-2xl w-64 shadow-shadow-light-2"
            dismissOnClick={true}
          >
            {(activeFilter === "Open" ? sortOptions : closeSortOptions).map((option) => (
              <Dropdown.Item
              
                key={option.value}
                className="py-3"
                onClick={() => handleSortChange(option.value)}
              >
                <div className="flex items-center gap-2">
                  {/* {sortBy === option.value && ( */}
                 
                    <IoCheckmarkSharp size={20}  className={`inline-block mr-1 ${
                      sortBy === option.value ? "" : "opacity-0"
                    }`} />
                 
                  <span className="text-secondary-800">{option.label}</span>
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
        {activeFilter !== "Closed" && (
          <XButton
            text="New case"
            icon={<FiPlus className="text-base mr-2 inline-block" />}
            className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4"
            onClick={toggleModal}
          />
        )}
        {isModalOpen && <NewCaseModal onClose={toggleModal} />}
      </div>
    </div>
  );
};

export default Actionbar;
