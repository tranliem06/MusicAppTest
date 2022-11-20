import React from "react";
import { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
// import { useDispatch } from "react-redux";
// import * as actions from "../store/actions";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";

const SongItem = ({
  thumbnail,
  title,
  artists,
  sid,
  releaseDate,
  order,
  percent,
  style,
}) => {
  const [{ isSongPlaying, curSongId, isSongZingPlaying }, dispatch] =
    useStateValue();

  return (
    <div
      onClick={() => {
        // dispatch(actions.setCurSongId(sid));
        dispatch({
          type: actionType.SET_SONG_PLAYING,
          isSongPlaying: false,
        });
        dispatch({
          type: actionType.SET_CUR_SONG_ID,
          curSongId: sid,
        });
        dispatch({
          type: actionType.PLAY_SONG_FROM_ZING,
          isSongZingPlaying: true,
        });
      }}
      className={`w-[30%] flex-auto flex p-[10px] gap-[10px] justify-between items-center rounded-md cursor-pointer ${
        style || "text-black hover:bg-main-200"
      }`}
    >
      <div className="w-[30%] flex-auto flex gap-[10px] p-[10px]">
        {order && (
          <span
            className={`${
              order === 1 ? "text-shadow" : ""
            } text-[rgba(77,34,104,0.9)] text-[32px] m-auto`}
          >
            {order}
          </span>
        )}
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
          {releaseDate && (
            <span className={`text-xs opacity-70`}>
              {moment(releaseDate * 1000).fromNow()}
            </span>
          )}
        </div>
      </div>
      {percent && <span>{`${percent}%`}</span>}
    </div>
  );
};

export default memo(SongItem);
