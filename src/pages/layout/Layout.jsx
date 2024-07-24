import React, { useState } from "react";
import Content from "./Content";
import { Header, SideNav } from "../../components";

const Layout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [title, setTitle] = useState('Dashboard');

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <div className="h-screen flex">

      <SideNav isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} setTitle={setTitle}/>
      {/* Main content area */}
      <div className={`${isDrawerOpen ? 'ml-[264px]' : 'ml-0'} p-6 w-full main-content`}>

        {/* Main content wrapper */}
        <Header toggleDrawer={toggleDrawer} title={title}/>
        <main className="mt-9 pb-6">
          <Content />
        </main>
      </div>
    </div>
  );
};

export default Layout;
