import React from "react";
import { Dropdown } from "flowbite-react";
import { BsThreeDotsVertical } from "react-icons/bs";

const MenuPopup = ({ dropdownItems , icon, handleOptionSubmit}) => {
  return (
    <Dropdown
      arrowIcon={false}
      label={icon}
      placement="left-start"
      inline={true}
      dismissOnClick={true}
    >
      {dropdownItems.map((item, index) => (
        <Dropdown.Item key={index} onClick={() => handleOptionSubmit(index, item)}>
          {item}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default MenuPopup;
