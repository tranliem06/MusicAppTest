import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetDetailPlaylist } from "../api";
import moment from "moment";

import { Lists } from "../components";

const Album = () => {
  const { title, pid } = useParams();
  console.log({ title, pid });

  const [playlistData, setPlaylistData] = useState({});
  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await GetDetailPlaylist(pid);
      console.log(response);
      //   console.log(response.data);
      if (response?.data.err === 0) {
        setPlaylistData(response.data?.data);
      }
    };

    fetchDetailPlaylist();
  }, [pid]);

  //   console.log(playlistData.song.items);
  return (
    <div className="flex gap-8 w-full px-[59px]">
      <div className="flex-none w-1/4 border border-red-500 flex flex-col items-center gap-2">
        <img
          src={playlistData?.thumbnailM}
          alt="thumbnail"
          className="w-full object-contain rounded-md shadow-md"
        />
        <div className="flex flex-col items-center gap-1 text-gray-500">
          <h3 className="text-[18px] font-bold text-gray-700">
            {playlistData?.title}
          </h3>
          <span className="flex gap-2 items-center text-gray-500 text-xs ">
            <span>Update: </span>
            <span>
              {moment
                .unix(playlistData?.contentLastUpdate)
                .format("DD/MM/YYYY")}
            </span>
          </span>
          <span className="flex gap-2 items-center text-gray-500 text-sm">
            {playlistData?.artistsNames}
          </span>
          <span className="flex gap-2 items-center text-gray-500 text-sm">{`${
            playlistData?.like / 1000
          }K love`}</span>
        </div>
      </div>
      <div className="flex-auto  border border-blue-500">
        <span className="text-sm">
          <span className="text-gray-600">Intro: </span>
          <span>{playlistData?.sortDescription}</span>
        </span>
        <Lists
          songs={playlistData?.song?.items}
          totalDuration={playlistData?.song?.totalDuration}
        />
      </div>
    </div>
  );
};

export default Album;
