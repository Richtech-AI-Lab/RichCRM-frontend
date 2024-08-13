import React, { useState } from "react";
import XButton from "../button/XButton";
import SelectInput from "../selectinput";
import NewCaseModal from "../caseModal/newCaseModal";
import { SORT_OPTIONS } from "../../constants/constants";
import { FiPlus } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/api";
import { Checkbox, Dropdown, Label } from "flowbite-react";
import { FaCheck } from "react-icons/fa";

const Actionbar = ({ onFilterChange }) => {
  const location = useLocation();
  const [sortBy, setSortBy] = useState("Status");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Open");
  const [dropdownFilter, setDropdownFilter] = useState("Warning");

  const sortOptions = [
    { value: SORT_OPTIONS.STATUS, label: SORT_OPTIONS.STATUS },
    { value: SORT_OPTIONS.PROGRESS, label: SORT_OPTIONS.PROGRESS },
  ];

  const filterOptions = [
    { value: "Warning", label: "Warning" },
    { value: "Unsolved", label: "Unsolved" },
    { value: "Waiting", label: "Waiting" },
    { value: "Finished", label: "Finished" },
    { value: "Selling", label: "Selling" },
    { value: "Purchasing", label: "Purchasing" },
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
  const handleDropdownFilterChange = (e) => {
    const value = e.target.value;
    setDropdownFilter(value);
    if (onFilterChange) {
      onFilterChange(value);
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
      {/* <div className="bg-white shadow-shadow-light  px-5 rounded-full flex items-center mr-4">
          <IoFilterSharp className="text-xl mr-2 inline-block" />
           <SelectInput
            inputClassName=" px-0 py-[12px] border-0 text-base leading-5 font-semibold text-label focus:ring-transparent"
            labelClassName="text-label mr-3"
            name="filterBy"
            defaultLabel={`${dropdownFilter}`}
            value={dropdownFilter}
            onChange={handleDropdownFilterChange}
            options={filterOptions.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
          />
        </div> */}
        <div className="items-dropdown mr-4">          
          <Dropdown label="Filter" inline className="rounded-2xl w-64 shadow-shadow-light-2" dismissOnClick={false}>
            <div className="px-4 py-3">
              <span className="block text-sm font-medium text-secondary-800">Status</span>
            </div>
            <Dropdown.Item className="py-3">
              <div className="flex items-center gap-2">
                <Checkbox id="dashboard" />
                <Label htmlFor="remember" className="text-secondary-800">All Status</Label>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="py-3">
              <div className="flex items-center gap-2">
                <Checkbox id="dashboard" />
                <Label htmlFor="remember" className="text-secondary-800">Warning</Label>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="py-3">
              <div className="flex items-center gap-2">
                <Checkbox id="dashboard" />
                <Label htmlFor="remember" className="text-secondary-800">Waiting</Label>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="py-3">
              <div className="flex items-center gap-2">
                <Checkbox id="dashboard" />
                <Label htmlFor="remember" className="text-secondary-800">Finished</Label>
              </div>
            </Dropdown.Item>
            <div className="border-t border-border-line-100 px-4 py-3">
              <span className="block text-sm font-medium text-secondary-800">Case Type</span>
            </div>
            <Dropdown.Item className="py-3">
              <div className="flex items-center gap-2">
                <Checkbox id="dashboard" />
                <Label htmlFor="remember" className="text-secondary-800">All Case Type</Label>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="py-3">
              <div className="flex items-center gap-2">
                <Checkbox id="dashboard" />
                <Label htmlFor="remember" className="text-secondary-800">Selling</Label>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="py-3">
              <div className="flex items-center gap-2">
                <Checkbox id="dashboard" />
                <Label htmlFor="remember" className="text-secondary-800">Purchasing</Label>
              </div>
            </Dropdown.Item>
            <div className="text-center py-3">
              <XButton
                text={"Reset"}
                className="bg-card-300 text-sm text-secondary-800 py-[10px] px-8 rounded-[100px]"
              />
              <XButton
                type="submit"
                text={"Apply"}
                className="bg-primary text-sm text-white py-[10px] px-8 rounded-[100px] ml-3"
              />
            </div>
          </Dropdown>
        </div>
        {/* <SelectInput
          inputClassName="bg-white shadow-shadow-light py-[12px] px-6 rounded-full border-0 text-base leading-5 font-semibold text-label"
          labelClassName="text-label mr-3"
          // label="Sort by"
          name="sortBy"
          defaultLabel="Sort by: Status"
          value={sortBy}
          onChange={handleSortChange}
          options={sortOptions.map((option) => ({
            value: option.value,
            label: `Sort by: ${option.label}`,
          }))}
        /> */}
      <div className="items-dropdown single-select">
          <Dropdown label="Sort by: Status" inline className="rounded-2xl w-64 shadow-shadow-light-2" dismissOnClick={false}>
            <Dropdown.Item className="py-3">
                <span htmlFor="remember" className="text-secondary-800"><FaCheck className="inline-block mr-1" /> Status</span>
            </Dropdown.Item>
            <Dropdown.Item className="py-3">
                <span htmlFor="remember" className="text-secondary-800"><FaCheck className="inline-block mr-1" />Progress</span>
            </Dropdown.Item>
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

