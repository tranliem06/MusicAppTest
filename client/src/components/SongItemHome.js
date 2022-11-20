import React from "react";
import { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
// import { useDispatch } from "react-redux";
// import * as actions from "../store/actions";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";
import { NewRelease } from ".";

const SongItemHome = ({ thumbnail, title, artists, index }) => {
  const [
    {
      isSongPlaying,
      curSongId,
      isSongZingPlaying,
      newRelease,
      isPlayListAllSong,
      isPlayListZing,
      song,
    },
    dispatch,
  ] = useStateValue();
  const addSongToContext = () => {
    if (isPlayListZing) {
      dispatch({
        type: actionType.SET_PLAYLIST_FROM_ZING,
        isPlayListZing: false,
      });
    }
    if (!isPlayListAllSong) {
      dispatch({
        type: actionType.SET_PLAYLIST_ALL_SONG,
        isPlayListAllSong: true,
      });
    }
    if (isSongZingPlaying) {
      dispatch({
        type: actionType.PLAY_SONG_FROM_ZING,
        isSongZingPlaying: false,
      });
    }
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== index) {
      dispatch({
        type: actionType.SET_SONG,
        song: index,
      });
    }
  };
  return (
    <div
      onClick={() => {
        addSongToContext(index);
      }}
      className={`w-[30%] flex-auto flex  gap-[10px] justify-between items-center rounded-md cursor-pointer hover:bg-blue-200`}
    >
      <div className="w-[30%] flex-auto flex gap-[10px] p-[10px]">
        <img
          src={thumbnail}
          alt="thumbnail"
          className="w-[60px] h-[60px] object-cover rounded-md"
        />
        <div className="flex flex-col">
          <span className="text-[12px] font-semibold">{`${
            title.length > 25 ? `${title.slice(0, 25)}...` : title
          }`}</span>
          <span className="text-xs opacity-70">{artists}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(SongItemHome);
