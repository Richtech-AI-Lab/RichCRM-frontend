import React from "react";
import { IMAGES } from "../../constants/imagePath";
import { GiHamburgerMenu } from "react-icons/gi";
import { Dropdown } from "flowbite-react";
import { IoIosLogOut } from "react-icons/io";
import { logout } from "../../redux/actions/authActions";
import { deleteUserRequest } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/api";

const Header = ({ toggleDrawer, title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('authEmail');
    localStorage.setItem("headerTitle", 'Dashboard');
    navigate(ROUTES.LOGIN);
  };


  return (
    <div className="flex justify-between items-center">
      <h1 className="flex items-center text-[28px] text-title font-medium leading-9">
        <span onClick={toggleDrawer} className="cursor-pointer mr-1">
          <GiHamburgerMenu />
        </span>
        {title}
      </h1>
      <div className="flex items-center">
        <div className="relative">
        <input
            className="text-base text-secondary-700 font-normal leading-6 bg-bg-gray-100 py-2 px-6 rounded-[28px] w-[360px]"
            placeholder="Search case, contact or address"
          />
          <img
            src={IMAGES.searchIcon}
            alt="icon"
            className="absolute right-5 top-[10px]"
          />
        </div>
        <Dropdown
          arrowIcon={false}
          label={<img src={IMAGES.profile} className="cursor-pointer ml-6" />}
          inline={true}
          dismissOnClick={false}
          className="shadow-none border-neutral-border"
        >
          <Dropdown.Item className="text-text-danger" onClick={handleLogout}>
            <IoIosLogOut className="mr-2" /> Log out
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
