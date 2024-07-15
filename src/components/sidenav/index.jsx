import React from "react";
import { Link } from "react-router-dom";
import { Drawer, Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

const SideNav = ({ isDrawerOpen, toggleDrawer }) => {
  return (
    // <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
    // <Drawer.Header title="MG Law Group" titleIcon={() => <></>} />
    // <Drawer.Items>
    <Sidebar className={`w-[264px] sidebar ${isDrawerOpen ? '' : 'sidebar-toggle'}`}>
      <h1 className="text-secondary-400 text-xl font-bold pt-5 pb-3 px-4">MG Law Group</h1>
      <Sidebar.Items className="mt-10 sidebar-items flex flex-col justify-between h-[calc(100vh-140px)]">
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to="/rich-crm/dashboard" icon={HiChartPie} className="active-item">
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/rich-crm/cases" icon={HiViewBoards}>
            Cases
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/rich-crm/calendar" icon={HiInbox}>
            Calender
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/rich-crm/contacts" icon={HiUser}>
            Contacts
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/rich-crm/documents" icon={HiShoppingBag}>
            Documents
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to="/rich-crm/links" icon={HiChartPie}>
            External Links
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/rich-crm/settings" icon={HiViewBoards}>
            Settings
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    // </Drawer.Items>
    // </Drawer>
  );
};

export default SideNav;
