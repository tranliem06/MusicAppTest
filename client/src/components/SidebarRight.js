import React from "react";
import PlayListCard from "./PlaylistCard";
import { useStateValue } from "../Context/StateProvider";
import PlayListCardZing from "./PlaylistCardZing";
import { Scrollbars } from "react-custom-scrollbars-2";

const SidebarRight = () => {
  const [{ isPlayListAllSong, isPlayListZing }, dispatch] = useStateValue();
  return (
    <Scrollbars style={{ width: "100%", height: "100%" }}>
      <div className="flex flex-col p-4">
        <div>
          <p>Explore your music</p>
        </div>
        {isPlayListAllSong && <PlayListCard />}
        {isPlayListZing && <PlayListCardZing />}
      </div>
    </Scrollbars>
  );
};

export default SidebarRight;
