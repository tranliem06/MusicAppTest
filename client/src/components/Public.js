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

const Public = () => {
  const [{ isSongPlaying, isSongZingPlaying }, dispatch] = useStateValue();

  return (
    <div className=" w-full flex flex-col min-h-screen ">
      <div className="w-full h-full flex flex-col flex-auto">
        <div className="w-full flex-none border border-blue-500">
          <Header />
        </div>

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
