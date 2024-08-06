import React, { useState } from "react";
import CardListItem from "../cardlistitem";
import { BsThreeDotsVertical } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
import { IoIosAddCircle } from "react-icons/io";

const CaseCardDetails = ({ title, items, handle }) => {
  const [fields, setFields] = useState(items)

  const handleShowClick = (index) => {
    setFields(prevFields => {
      const newFields = [...prevFields];
      newFields[index].show = true;
      return newFields;
    });
  };

  const handleHideClick = (index) => {
    setFields(prevFields => {
      const newFields = [...prevFields];
      newFields[index].show = false;
      return newFields;
    });
  };
  return (
    <div className="bg-white py-4 rounded-2xl mb-5">
      {title &&
        <div className="flex justify-between items-center mb-5 px-4">
          <span className="text-base text-secondary-800 font-medium">{title}</span>
          <div className="flex items-center gap-2">
            <BsThreeDotsVertical className="text-lg" />
          </div>
        </div>
      }
      <ul className="card-details">
        {fields?.map((item, index) => item.show === false ? 
        (
            <>
              <span className="left-txt flex items-center" onClick={()=>handleShowClick(index)}>
                <span className="icon mr-2 cursor-pointer">{<IoIosAddCircle  className="text-xl ml-3" />}
                </span>
                {item.buttonText}
              </span>
            </>
          ):
          (
            <>
              <CardListItem
                optional={item.optional}
                funcHandleHideClick={() => handleHideClick(index)}
                key={index}
                label={item.label}
                value={item.value}
                name={item.name}
                icon={item.icon}
                isCheckbox={item.isCheckbox}
                isDropdown={item.isDropdown}
                checkboxOptions={item.checkboxOptions}
                dropdownOptions={item.dropDownOptions}
                nestedItems={item.nestedItems}
                floor={item.floor}
                inputProps={{
                  type: "text",
                  onChange: handle,
                  placeholder: item.placeholder,
                }}
              />
            </>
          )
          )}
      </ul>
    </div>
  )
};

export default CaseCardDetails;
