import React from "react";
import { Outlet } from "react-router-dom";
import {
  Header,
  Player,
  SidebarLeft,
  SidebarRight,
  MusicPlayer,
  MusicPlayerZing,
} from "../components";
import { useStateValue } from "../Context/StateProvider";
import { motion } from "framer-motion";
// import { Scrollbars } from "react-custom-scrollbars-2";

const Public = () => {
  const [{ isSongPlaying, isSongZingPlaying }, dispatch] = useStateValue();

  return (
    <div className=" w-full flex flex-col min-h-screen ">
      <div className="w-full h-full flex flex-col flex-auto">
        <div className="w-full flex-none shadow-md ">
          <Header />
        </div>

        <div className="w-full h-full flex flex-auto">
          <div className="w-[240px] flex-none shadow-md">
            <SidebarLeft />
          </div>
          <div className="flex-auto mt-4 ">
            <Outlet />
          </div>
          <div className="w-[329px] shadow-md  flex-none animate-slide-left">
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
      {/* <div className="flex-none fixed bottom-0 left-0 right-0"> */}
      {isSongPlaying && (
        // <motion.div
        //   initial={{ opacity: 0, y: 50 }}
        //   animate={{ opacity: 1, y: 0 }}
        //   exit={{ opacity: 0, y: 50 }}
        //   className={`fixed min-w-[700px] h-[96px]  inset-x-0 bottom-0  bg-white drop-shadow-xl backdrop-blur-md flex items-center justify-center`}
        // >
        <MusicPlayer />
        // </motion.div>
      )}
      {isSongZingPlaying && <MusicPlayerZing />}
      {/* </div> */}
    </div>
  );
};

export default Public;
