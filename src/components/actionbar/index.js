import React, { useState } from "react";
import XButton from "../button/XButton";
import SelectInput from "../selectinput";
import NewCaseModal from "../caseModal/newCaseModal";
import { SORT_OPTIONS } from "../../constants/constants";
import { FiPlus } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/api";

const Actionbar = ({ onFilterChange }) => {
  const location = useLocation();
  const [sortBy, setSortBy] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Open");

  const sortOptions = [
    { value: SORT_OPTIONS.CASE_START, label: SORT_OPTIONS.CASE_START },
    { value: SORT_OPTIONS.CONTRACT, label: SORT_OPTIONS.CONTRACT },
    { value: SORT_OPTIONS.MORTGAGE_TITLE, label: SORT_OPTIONS.MORTGAGE_TITLE },
    { value: SORT_OPTIONS.CLOSING, label: SORT_OPTIONS.CLOSING },
  ];

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
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
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
      {shouldShowOpenClosed() && (
        <div className="flex">
          <div
            onClick={() => handleFilterChange("Open")}
            className={`px-4 py-2 rounded-full mr-4 cursor-pointer ${activeFilter === "Open" ? "bg-badge-gray" : ""}`}
          >
            <span className="text-base font-medium text-secondary-800">Open</span>
          </div>
          <div
            onClick={() => handleFilterChange("Closed")}
            className={`px-4 py-2 rounded-full cursor-pointer ${activeFilter === "Closed" ? "bg-badge-gray" : ""}`}
          >
            <span className="text-base font-medium text-secondary-800">Closed</span>
          </div>
        </div>
        )}
      </div>
      <div className="flex">
      <div className="bg-white shadow-shadow-light py-[10px] px-5 rounded-full flex items-center mr-4">
          <IoFilterSharp className="text-xl mr-2 inline-block" />

        <span className="text-base font-medium text-secondary-800">Filter</span>
        </div>
        <SelectInput
          inputClassName="bg-white shadow-shadow-light py-[12px] px-6 rounded-full border-0 text-base leading-5 font-semibold text-label"
          labelClassName="text-label mr-3"
          // label="Sort by"
          name="sortBy"
          defaultLabel="Sort by: Status"
          value={sortBy}
          onChange={handleSortChange}
          options={sortOptions.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
        />
      <XButton text="New case" icon={<FiPlus className="text-base mr-2 inline-block" />} className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium ml-4" onClick={toggleModal} />
      {isModalOpen && <NewCaseModal onClose={toggleModal} />}
      </div>
    </div>
  );
};

export default Actionbar;

