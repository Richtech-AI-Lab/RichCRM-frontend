import React, { useState } from "react";
import Content from "./Content";
import { Header, SideNav } from "../../components";

const Layout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <div className="h-screen flex">

      <SideNav isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}/>
      {/* Main content area */}
      <div className={`${isDrawerOpen ? 'w-[calc(100%-264px)]' : 'w-full'} p-6`}>
        {/* SideNav */}

        {/* Main content wrapper */}
        <Header toggleDrawer={toggleDrawer} />
        <main className="mt-14">
          <Content />
        </main>
      </div>
    </div>
  );
};

export default Layout;
