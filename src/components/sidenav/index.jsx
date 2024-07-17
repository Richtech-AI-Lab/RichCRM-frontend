import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { PiLayout, PiUsersThree, PiFolderSimple, PiLinkSimpleHorizontal  } from "react-icons/pi";
import { BiCalendar } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { FiFileText } from "react-icons/fi";

const SideNav = ({ isDrawerOpen, toggleDrawer, setTitle }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path) => currentPath === path;

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
    <Sidebar className={`w-[264px] sidebar ${isDrawerOpen ? '' : 'sidebar-toggle'} fixed bg-bg-body`}>
      <h1 className="text-secondary-400 text-xl font-bold pt-5 pb-3 px-4 whitespace-nowrap">MG Law Group</h1>
      <Sidebar.Items className="mt-10 sidebar-items flex flex-col justify-between h-[calc(100vh-140px)]">
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to="/rich-crm/dashboard" icon={PiLayout} className={isActive("/rich-crm/dashboard") ? "active-item" : ""} onClick={() => handleTitleChange('Dashboard')}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/rich-crm/cases" icon={FiFileText}  className={isActive("/rich-crm/cases") ? "active-item" : ""} onClick={() => handleTitleChange('Cases')}>
            Cases
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/rich-crm/calendar" icon={BiCalendar} className={isActive("/rich-crm/calendar") ? "active-item" : ""} onClick={() => handleTitleChange('Calendar')}>
            Calender
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/rich-crm/contacts" icon={PiUsersThree} className={isActive("/rich-crm/contacts") ? "active-item" : ""} onClick={() => handleTitleChange('Contacts')}>
            Contacts
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/rich-crm/documents" icon={PiFolderSimple} className={isActive("/rich-crm/documents") ? "active-item" : ""} onClick={() => handleTitleChange('Documents')}>
            Documents
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to="/rich-crm/links" icon={PiLinkSimpleHorizontal} className={isActive("/rich-crm/links") ? "active-item" : ""} onClick={() => handleTitleChange('External Links')}>
            External Links
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/rich-crm/settings" icon={IoSettingsOutline} className={isActive("/rich-crm/settings") ? "active-item" : ""} onClick={() => handleTitleChange('Settings')}>
            Settings
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideNav;
