import React, { useEffect, useState } from "react";
import { useStateValue } from "../Context/StateProvider";
import { getDetailSong } from "../api";
import icons from "../utils/icons";
import { actionType } from "../Context/reducer";

const {
  AiOutlineHeart,
  AiFillHeart,
  BsThreeDots,
  MdSkipNext,
  MdSkipPrevious,
  MdRepeat,
  BsPlayFill,
  BsPauseFill,
  MdShuffle,
} = icons;

const Player = () => {
  const [
    {
      //   searchTerm,
      //   isSongPlaying,
      //   song,
      //   allSongs,
      //   artistFilter,
      //   filterTerm,
      //   albumFilter,
      //   languageFilter,
      curSongId,
      isPlaying,
    },
    dispatch,
  ] = useStateValue();

  //   console.log(curSongId);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchDetailSong = async () => {
      const response = await getDetailSong(curSongId);
      //   console.log(response);
      if (response.data.err === 0) {
        setSongInfo(response.data.data);
      }
    };

    fetchDetailSong();
  }, [curSongId]);
  const handleTogglePlayMusic = () => {
    // setIsPlaying((prev) => !prev);
    dispatch({
      type: actionType.PLAY,
      isPlaying: true,
    });
  };
  return (
    <div className="bg-[#a5c4f6] px-5 h-full flex">
      <div className="w-[30%] flex-auto flex gap-3 items-center">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="w-16 h-16 object-cover rounded-md"
        />

        <div className="flex flex-col ">
          <span className="font-semibold text-gray-700 text-sm">
            {songInfo?.title}
          </span>
          <span className="text-xs text-gray-500">
            {songInfo?.artistsNames}
          </span>
        </div>

        <div className="flex gap-4 pl-2">
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>
      <div className="w-[40%] flex flex-col gap-2  justify-center items-center flex-auto border border-red-500 py-2">
        <div className="flex gap-8 justify-center items-center">
          <span title="Random Song">
            <MdShuffle className="cursor-pointer" size={24} />
          </span>
          <span>
            <MdSkipPrevious className="cursor-pointer" size={24} />
          </span>
          <span
            className="p-2 border border-gray-700 rounded-full"
            onClick={handleTogglePlayMusic}
          >
            {isPlaying ? (
              <BsPauseFill className="cursor-pointer" size={30} />
            ) : (
              <BsPlayFill className="cursor-pointer" size={30} />
            )}
          </span>
          <span>
            <MdSkipNext className="cursor-pointer" size={24} />
          </span>
          <span title="Repeat">
            <MdRepeat className="cursor-pointer" size={24} />
          </span>
        </div>
        <div>progress bar</div>
      </div>
      <div className="w-[30%] flex-auto border border-red-500">Volume</div>
    </div>
  );
};

export default Player;
