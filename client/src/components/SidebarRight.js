import React from "react";
import PlayListCard from "./PlaylistCard";
import { useStateValue } from "../Context/StateProvider";

const SidebarRight = () => {
  const [{ isPlayListAllSong }, dispatch] = useStateValue();
  return (
    <div className="flex flex-col p-4">
      <div>
        <p>Explore your music</p>
      </div>
      {isPlayListAllSong && <PlayListCard />}
    </div>
  );
};

export default SidebarRight;
