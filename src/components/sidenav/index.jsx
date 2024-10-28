import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import {
  PiLayout,
  PiUsersThree,
  PiFolderSimple,
  PiLinkSimpleHorizontal,
} from "react-icons/pi";
import { BiCalendar } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { FiFileText } from "react-icons/fi";
import { ROUTES } from "../../constants/api";
import { IMAGES } from "../../constants/imagePath";

const SideNav = ({ isDrawerOpen, toggleDrawer, setTitle }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path) => {
    const casesPaths = [
      ROUTES.CASES,
      ROUTES.CASES_DATA,
      ROUTES.CASES_DETAILS,
      ROUTES.CASES_CATEGORY,
      ROUTES.NEW_CASE_INFO,
    ];

    if (casesPaths.includes(currentPath)) {
      return path === ROUTES.CASES;
    }
    return currentPath === path;
  };

  useEffect(() => {
    const storedTitle = localStorage.getItem("headerTitle");
    if (storedTitle) {
      setTitle(storedTitle);
    }
  }, [setTitle]);

  const handleTitleChange = (title) => {
    setTitle(title);
    localStorage.setItem("headerTitle", title);
    // if (toggleDrawer) {
    //   toggleDrawer();
    // }
  };

  return (
    <Sidebar
      className={`w-[160px] xl:w-[264px] sidebar ${
        isDrawerOpen ? "" : "sidebar-toggle"
      } fixed bg-input-surface`}
    >
      {/* <h1 className="text-secondary-700 text-xl font-bold pt-5 pb-3 px-4 whitespace-nowrap">MG Law Group</h1> */}
      {/* <img src={logo}/> */}
      <img
        src={IMAGES.logo}
        alt="logo"
        className="mr-0 w-14 ml-2 mt-5 sidebar-logo"
      />
      <Sidebar.Items className="mt-10 sidebar-items flex flex-col justify-between h-[calc(100vh-140px)]">
        <Sidebar.ItemGroup>
          <Sidebar.Item
            as={Link}
            to={ROUTES.DASHBOARD}
            className={
              isActive(ROUTES.DASHBOARD)
                ? "sidebar-item active-item"
                : "sidebar-item"
            }
            onClick={() => handleTitleChange("Dashboard")}
          >
            <span className="flex items-center">
              <img src={IMAGES.dbIcon} alt="logo" className="" />
              <span className="item-title">Dashboard</span>
            </span>
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to={ROUTES.CASES}
            className={
              isActive(ROUTES.CASES)
                ? "sidebar-item active-item"
                : "sidebar-item"
            }
            onClick={() => handleTitleChange("Cases")}
          >
            <span className="flex items-center">
              <img src={IMAGES.cases} alt="logo" className="" />
              <span className="item-title">Cases</span>
            </span>
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to={ROUTES.CALENDAR}
            className={
              isActive(ROUTES.CALENDAR)
                ? "sidebar-item active-item"
                : "sidebar-item"
            }
            onClick={() => handleTitleChange("Calendar")}
          >
            <span className="flex items-center">
              <img src={IMAGES.calendar} alt="logo" className="" />
              <span className="item-title">Calendar</span>
            </span>
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to={ROUTES.CONTACTS}
            className={
              isActive(ROUTES.CONTACTS)
                ? "sidebar-item active-item"
                : "sidebar-item"
            }
            onClick={() => handleTitleChange("Contacts")}
          >
            <span className="flex items-center">
              <img src={IMAGES.contact} alt="logo" className="" />
              <span className="item-title">Contacts</span>
            </span>
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to={ROUTES.DOCUMENTS}
            className={
              isActive(ROUTES.DOCUMENTS)
                ? "sidebar-item active-item"
                : "sidebar-item"
            }
            onClick={() => handleTitleChange("Documents")}
          >
            <span className="flex items-center">
              <img src={IMAGES.document} alt="logo" className="" />
              <span className="item-title">Documents</span>
            </span>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          {/* <Sidebar.Item as={Link} to="/rich-crm/links" icon={PiLinkSimpleHorizontal} className={isActive("/rich-crm/links") ? "active-item" : ""} onClick={() => handleTitleChange('External Links')}>
            External Links
          </Sidebar.Item> */}
          <Sidebar.Item
            as={Link}
            to={ROUTES.SETTINGS}
            // icon={IoSettingsOutline}
            className={
              isActive(ROUTES.SETTINGS)
                ? "sidebar-item active-item"
                : "sidebar-item"
            }
            onClick={() => handleTitleChange("Settings")}
          >
             <span className="flex items-center">
              <img src={IMAGES.document} alt="logo" className="" />
              <span className="item-title">Setting</span>
            </span>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideNav;
