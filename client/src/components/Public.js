import React from "react";
import { Outlet } from "react-router-dom";

import { Header, Player, SidebarLeft, SidebarRight } from "../components";

import { Scrollbars } from "react-custom-scrollbars-2";
// import { useStateValue } from "../Context/StateProvider";

const Public = () => {
  //   const [{ isSongPlaying }, dispatch] = useStateValue();

  return (
    <div className=" w-full flex flex-col min-h-screen ">
      <div className="w-full h-full flex flex-col flex-auto">
        <div className="w-full flex-none border border-blue-500">
          <Header />
        </div>
        {/* <div className="flex-auto border border-red-500">
          <Outlet />
        </div> */}

        <div className="w-full h-full flex flex-auto">
          <div className="w-[240px] flex-none border border-blue-500">
            <SidebarLeft />
          </div>
          <div className="flex-auto border border-red-500 pb-10 ">
            <Outlet />
          </div>
          <div className="w-[329px]  1600:flex flex-none border border-green-500 animate-slide-left">
            <SidebarRight />
          </div>
        </div>
        {/* <div className="w-[329px] hidden 1600:flex flex-none border border-green-500 animate-slide-left">
          <SidebarRight />
        </div> */}
      </div>
      {/* <div className="flex-none h-[90px] w-full fixed bottom-0 left-0 right-0">
        <Player />
      </div> */}
    </div>
  );
};

export default Public;
