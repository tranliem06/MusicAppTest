import React, { memo } from "react";
import icons from "../utils/icons";
import moment from "moment";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "./../Context/reducer";

const { BsMusicNoteBeamed } = icons;

const List = ({ songData }) => {
  const [
    { isSongZingPlaying, isSongPlaying, miniPlayer, isPlayListAllSong },
    dispatch,
  ] = useStateValue();

  //   console.log(songData);
  return (
    <div
      className="flex justify-between items-center p-[10px] border-t border-blue-500 hover:bg-blue-200 cursor-pointer"
      onClick={() => {
        dispatch({
          type: actionType.SET_PLAYLIST_ALL_SONG,
          isPlayListAllSong: false,
        });
        dispatch({
          type: actionType.SET_SONG_PLAYING,
          isSongPlaying: false,
        });
        dispatch({
          type: actionType.PLAY_SONG_FROM_ZING,
          isSongZingPlaying: true,
        });
        dispatch({
          type: actionType.SET_CUR_SONG_ID,
          curSongId: songData.encodeId,
        });
      }}
    >
      <div className="w-[50%] flex items-center gap-3 flex-1">
        <div className="flex justify-center items-center gap-1">
          <span>
            <BsMusicNoteBeamed />
          </span>
          <img
            src={songData?.thumbnail}
            alt="thumbnail"
            className="w-10 h-10 object-cover rounded-md"
          />
        </div>
        {/* title and aritsts */}
        <span className="flex flex-col">
          <span className="text-[12px] font-semibold whitespace-nowrap">
            {songData?.title?.length > 30
              ? `${songData?.title.slice(0, 30)}...`
              : songData?.title}
          </span>
          <span>{songData?.artistsNames}</span>
        </span>
      </div>
      <div className="w-[40%]  flex justify-center">
        {songData?.album?.title?.length > 30
          ? `${songData?.album?.title.slice(0, 30)}...`
          : songData?.album?.title}
      </div>
      <div className="w-[10%]  flex justify-end">
        {moment.utc(songData?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};

export default memo(List);
