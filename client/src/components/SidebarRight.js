import React from "react";
import PlayListCard from "./PlaylistCard";
import { useStateValue } from "../Context/StateProvider";
import PlayListCardZing from "./PlaylistCardZing";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Nothing } from "../assets/img";

const SidebarRight = () => {
  const [{ isPlayListAllSong, isPlayListZing }, dispatch] = useStateValue();
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center justify-center mt-2 mb-2">
        <span className="bg-[#4285f4] text-white py-2 px-5 rounded-l-full rounded-r-full">
          Current Playlist
        </span>
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
          {isPlayListAllSong && <PlayListCard />}
          {isPlayListZing && <PlayListCardZing />}
        </div>
      </Scrollbars>
    </div>
  );
};

export default SidebarRight;
