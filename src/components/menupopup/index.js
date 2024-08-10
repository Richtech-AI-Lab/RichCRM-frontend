import React from "react";
import { Dropdown } from "flowbite-react";
import { BsThreeDotsVertical } from "react-icons/bs";

const MenuPopup = ({ dropdownItems , icon}) => {
  return (
    <Dropdown
      arrowIcon={false}
      label={icon}
      placement="left-start"
      inline={true}
      dismissOnClick={false}
    >
      {dropdownItems.map((item, index) => (
        <Dropdown.Item key={index}>
          {item}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default MenuPopup;
