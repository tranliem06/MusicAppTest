import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetDetailPlaylist } from "../api";
import moment from "moment";
import { Scrollbars } from "react-custom-scrollbars-2";

import { Lists, Loading2 } from "../components";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";

const Album = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { title, pid } = useParams();
  // console.log({ title, pid });

  const [{ curPlaylistZing }, dispatch] = useStateValue();

  const [playlistData, setPlaylistData] = useState({});
  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await GetDetailPlaylist(pid);
      console.log(response);
      //   console.log(response.data);
      if (response?.data.err === 0) {
        setPlaylistData(response.data?.data);
        dispatch({
          type: actionType.SET_PLAYLIST_ZING,
          curPlaylistZing: response?.data?.data?.song?.items,
        });
      }
    };

    fetchDetailPlaylist();
  }, [pid]);

  //   console.log(playlistData.song.items);
  return (
    <div className="flex relative gap-8 w-full h-full px-[59px] pt-5">
      <div className="absolute top-0 bottom-0 left-0 right-0 z-50 bg-overlay-30">
        {/* <Loading2 /> */}
      </div>
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

      <Scrollbars style={{ width: "100%", height: "100%" }}>
        <div className="flex-auto p-4 mb-40  border border-blue-500">
          <span className="text-sm">
            <span className="text-gray-600">Intro: </span>
            <span>{playlistData?.sortDescription}</span>
          </span>
          <Lists
            songs={playlistData?.song?.items}
            totalDuration={playlistData?.song?.totalDuration}
          />
        </div>
      </Scrollbars>
    </div>
  );
};

export default Album;
