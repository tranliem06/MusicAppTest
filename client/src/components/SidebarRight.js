import React from "react";
import PlayListCard from "./PlaylistCard";
import { useStateValue } from "../Context/StateProvider";
import PlayListCardZing from "./PlaylistCardZing";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Nothing } from "../assets/img";
import { RiPlayListFill } from "react-icons/ri";
import icons from "./../utils/icons";

const SidebarRight = () => {
  const [{ isPlayListAllSong, isPlayListZing }, dispatch] = useStateValue();
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center justify-center mt-2 ">
        <div className=" flex justify-center items-center">
          {/* <span>
            <RiPlayListFill size={20} />
          </span> */}
          <span className=" text-[#4285f4] text-[14px] font-bold py-2 px-5  ">
            Current Playlist
          </span>
        </div>
      </div>
      <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
        <div className="flex flex-col p-4">
          {/* <div>
            <p>Explore your music</p>
          </div> */}

          {!isPlayListAllSong && !isPlayListZing && (
            <div className="flex flex-col justify-center items-center gap-4 m-4">
              <span className="text-[16px]">Nothing is playing</span>
              <img
                src={Nothing}
                alt="nothing"
                className="object-contain rounded-md"
              />
            </div>
          )}
          {isPlayListAllSong && isPlayListZing && <PlayListCard />}
          {isPlayListAllSong && !isPlayListZing && <PlayListCard />}
          {isPlayListZing && !isPlayListAllSong && <PlayListCardZing />}
        </div>
      </Scrollbars>
    </div>
  );
};

export default SidebarRight;
