import React from "react";
import { Dropdown, Checkbox, Label } from "flowbite-react";
import XButton from "../button/XButton";

const DropdownMenu = ({
  filterSections,
  onApply,
  onReset,
  searchArr,
  setSearchArr
}) => {
  const handleCheckboxChange = (value) => {
    setSearchArr(prevArr => {
      // Check if value already exists in the array
      if (prevArr.includes(value)) {
        // Remove the value if it exists
        return prevArr.filter(item => item !== value);
      } else {
        // Add the value if it doesn't exist
        return [...prevArr, value];
      }
    });
  };

  const isChecked = (value) => {
    // Check if the value exists in the searchArr
    return searchArr.includes(value);
  };
  return (
    <div className="items-dropdown mr-4">
      <Dropdown
        label="Filter"
        inline
        className="rounded-2xl w-64 shadow-shadow-light-2"
        dismissOnClick={false}
      >
        {filterSections?.map((section, index) => (
          <div key={index}>
            <div
              className={`px-4 py-3 ${index !== 0 ? "border-t border-border-line-100" : ""
                }`}
            >
              <span className="block text-sm font-medium text-secondary-800">
                {section.title}
              </span>
            </div>
            {section.options.map((option) => (
              <Dropdown.Item key={option.value} className="py-3">
                <div className="flex items-center gap-2">
                  <Checkbox id={option.value} checked={isChecked(option.value)}
                    onClick={() => handleCheckboxChange(option.value)} />
                  <Label htmlFor={option.value} className="text-secondary-800">
                    {option.label}
                  </Label>
                </div>
              </Dropdown.Item>
            ))}
          </div>
        ))}
        <div className="text-center py-3">
          <XButton
            text={"Reset"}
            className="bg-card-300 text-sm text-secondary-800 py-[10px] px-8 rounded-[100px]"
            onClick={onReset}
          />
          <XButton
            type="submit"
            text={"Apply"}
            className="bg-primary text-sm text-white py-[10px] px-8 rounded-[100px] ml-3"
            onClick={onApply}
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default DropdownMenu;
