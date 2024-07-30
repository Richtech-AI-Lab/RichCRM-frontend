import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { PiLayout, PiUsersThree, PiFolderSimple, PiLinkSimpleHorizontal  } from "react-icons/pi";
import { BiCalendar } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { FiFileText } from "react-icons/fi";
import { ROUTES } from "../../constants/api";

const SideNav = ({ isDrawerOpen, toggleDrawer, setTitle }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path) => {
    const casesPaths = [
      ROUTES.CASES,
      ROUTES.CASES_DATA,
      ROUTES.CASES_DETAILS,
      ROUTES.CASES_CATEGORY,
      ROUTES.NEW_CASE_INFO
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
    <Sidebar className={`w-[264px] sidebar ${isDrawerOpen ? '' : 'sidebar-toggle'} fixed bg-input-surface`}>
      <h1 className="text-secondary-700 text-xl font-bold pt-5 pb-3 px-4 whitespace-nowrap">MG Law Group</h1>
      <Sidebar.Items className="mt-10 sidebar-items flex flex-col justify-between h-[calc(100vh-140px)]">
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to={ROUTES.DASHBOARD} icon={PiLayout} className={isActive(ROUTES.DASHBOARD) ? "active-item" : ""} onClick={() => handleTitleChange('Dashboard')}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item as={Link} to={ROUTES.CASES} icon={FiFileText}  className={isActive(ROUTES.CASES) ? "active-item" : ""} onClick={() => handleTitleChange('Cases')}>
            Cases
          </Sidebar.Item>
          <Sidebar.Item as={Link} to={ROUTES.CALENDAR} icon={BiCalendar} className={isActive(ROUTES.CALENDAR) ? "active-item" : ""} onClick={() => handleTitleChange('Calendar')}>
            Calender
          </Sidebar.Item>
          <Sidebar.Item as={Link} to={ROUTES.CONTACTS} icon={PiUsersThree} className={isActive(ROUTES.CONTACTS) ? "active-item" : ""} onClick={() => handleTitleChange('Contacts')}>
            Contacts
          </Sidebar.Item>
          <Sidebar.Item as={Link} to={ROUTES.DOCUMENTS} icon={PiFolderSimple} className={isActive(ROUTES.DOCUMENTS) ? "active-item" : ""} onClick={() => handleTitleChange('Documents')}>
            Documents
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          {/* <Sidebar.Item as={Link} to="/rich-crm/links" icon={PiLinkSimpleHorizontal} className={isActive("/rich-crm/links") ? "active-item" : ""} onClick={() => handleTitleChange('External Links')}>
            External Links
          </Sidebar.Item> */}
          <Sidebar.Item as={Link} to={ROUTES.SETTINGS} icon={IoSettingsOutline} className={isActive(ROUTES.SETTINGS) ? "active-item" : ""} onClick={() => handleTitleChange('Settings')}>
            Settings
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideNav;
