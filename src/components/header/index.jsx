import React from "react";
import { IMAGES } from "../../constants/imagePath";
import { GiHamburgerMenu } from "react-icons/gi";


const Header = ({ toggleDrawer, title }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="flex items-center text-[28px] text-title font-medium leading-9">
      <span onClick={toggleDrawer} className="cursor-pointer mr-1"><GiHamburgerMenu /></span>
        {title}
      </h1>
      <div className="flex items-center">
        <div className="relative">
          <input
            className="text-base text-label font-normal leading-6 bg-bg-input py-2 px-6 rounded-[28px] w-[360px]"
            placeholder="Hinted search text"
          />
          <img
            src={IMAGES.searchIcon}
            alt="icon"
            className="absolute right-5 top-[10px]"
          />
        </div>
        <img src={IMAGES.profile} alt="avatar" className="ml-6" />
      </div>
    </div>
  );
};

export default Header;
