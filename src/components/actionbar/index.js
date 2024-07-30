import React, { useState } from "react";
import XButton from "../button/XButton";
import SelectInput from "../selectinput";
import NewCaseModal from "../caseModal/newCaseModal";
import { SORT_OPTIONS } from "../../constants/constants";
import { FiPlus } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";

const Actionbar = () => {
  const [sortBy, setSortBy] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="relative flex items-center">
        <div className="relative flex items-center justify-center w-[200px] h-[44px] rounded-full overflow-hidden shadow-shadow-light mr-4">
          <div className="absolute top-0 left-0 w-1/2 h-full  bg-active-blue flex items-center justify-center">
            <span className="text-base font-medium text-active-blue-text">Open</span>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white flex items-center justify-center">
            <span className="text-base font-medium text-secondary-800">Closed</span>
          </div>
        </div>
        <div className="bg-white shadow-shadow-light py-[10px] px-5 rounded-full flex items-center mr-4">
          <IoFilterSharp className="text-xl mr-2 inline-block" />

        <span className="text-base font-medium text-secondary-800">Filter</span>
        </div>
        <SelectInput
          inputClassName="bg-white shadow-shadow-light py-[12px] px-6 rounded-full border-0 text-base leading-5 font-semibold text-label"
          labelClassName="ext-label mr-3"
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
      </div>
      <XButton text="New case" icon={<FiPlus className="text-base mr-2 inline-block" />} className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium" onClick={toggleModal} />
      {isModalOpen && <NewCaseModal onClose={toggleModal} />}
    </div>
  );
};

export default Actionbar;

