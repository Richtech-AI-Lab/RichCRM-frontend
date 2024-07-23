import React, { useState } from "react";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import XButton from "../button/XButton";
import SelectInput from "../selectinput";
import NewCaseModal from "../caseModal/newCaseModal";
import { SORT_OPTIONS } from "../../constants/constants";
import { FiPlus } from "react-icons/fi";

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
      <div className="flex items-center">
        <a>
          <BsFillGrid3X2GapFill className="text-[28px] mr-4" />
        </a>
        <a>
          <FaList className="text-xl mr-8" />
        </a>
        {/* <div>  
        <a>
          <FaList className="text-xl mr-8" />
        </a> 
        <p>filter</p>
        </div> */}
        <SelectInput
          inputClassName="border border-stroke rounded-lg py-[6px] px-[16px] bg-white text-base leading-5 font-semibold text-label"
          labelClassName="ext-label mr-3"
          // label="Sort by"
          name="sortBy"
          defaultLabel="Sort by:Last edit"
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

