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

const Actionbar = ({ onFilterChange }) => {
  const location = useLocation();
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.STATUS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Open");

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

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };
  const shouldShowOpenClosed = () => {
    const pathsToShow = [ROUTES.CASES];
    return pathsToShow.includes(location.pathname);
  };
  const handleApply = () => {
    console.log("Apply button clicked");
  };

  const handleReset = () => {
    console.log("Reset button clicked");
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
          onClick={()=>alert('helo')}
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
