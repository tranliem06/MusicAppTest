import React, { useEffect, useState } from "react";
import { useStateValue } from "../Context/StateProvider";
import { IoMdClose } from "react-icons/io";
import { IoArrowRedo, IoArrowUndo, IoMusicalNote } from "react-icons/io5";
import { motion } from "framer-motion";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { actionType } from "../Context/reducer";
import { MdPlaylistPlay } from "react-icons/md";
import { getAllSongs } from "../api";
import { RiPlayListFill } from "react-icons/ri";
import { PlayListCard } from "./";

const MusicPlayer = () => {
  // const [isPlayList, setIsPlayList] = useState(false);
  const [
    { allSongs, song, isSongPlaying, miniPlayer, isPlayListAllSong },
    dispatch,
  ] = useStateValue();

  const closeMusicPlayer = () => {
    if (isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: false,
      });
    }
  };

  const togglePlayer = () => {
    if (miniPlayer) {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: false,
      });
    } else {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: true,
      });
    }
  };

  const nextTrack = () => {
    if (song > allSongs.length) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG,
        song: song + 1,
      });
    }
  };

  const previousTrack = () => {
    if (song === 0) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG,
        song: song - 1,
      });
    }
  };

  useEffect(() => {
    if (song > allSongs.length) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    }
  }, [song]);

  return (
    <div className="w-full h-[96px] full flex items-center gap-3 overflow-hidden">
      <div
        className={`w-full full items-center gap-3 p-4  ${
          miniPlayer ? "hidden" : "flex relative"
        }`}
      >
        <div className="w-[30%] flex flex-auto gap-3 items-center">
          <img
            src={allSongs[song]?.imageURL}
            className="w-16 h-16 object-cover rounded-md"
            alt=""
          />
          <div className="flex items-start flex-col">
            <p className="text-[14px] text-gray-700 font-semibold">
              {`${
                allSongs[song]?.name.length > 30
                  ? `${allSongs[song]?.name.slice(0, 30)}...`
                  : allSongs[song]?.name
              }`}
              {/* <span className="text-base">({allSongs[song]?.album})</span> */}
            </p>
            <p className="text-textColor">{allSongs[song]?.artist} </p>
          </div>
        </div>
        <div className="w-[40%]">
          <AudioPlayer
            src={allSongs[song]?.songURL}
            onPlay={() => console.log("is playing")}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
            onEnded={nextTrack}
          />
        </div>
        <div className="w-[30%] pr-10">
          <div className="h-full flex justify-end items-center  gap-3">
            <motion.i whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
              <IoMdClose className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
            </motion.i>
            <motion.i whileTap={{ scale: 0.8 }} onClick={togglePlayer}>
              <IoArrowRedo className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
            </motion.i>
            <motion.i
              whileTap={{ scale: 0.8 }}
              onClick={() => {
                dispatch({
                  type: actionType.SET_PLAYLIST_ALL_SONG,
                  isPlayListAllSong: !isPlayListAllSong ? true : false,
                });
              }}
            >
              <RiPlayListFill className="text-textColor hover:text-headingColor text-3xl cursor-pointer w-6 h-6" />
            </motion.i>
          </div>
        </div>
      </div>

      {miniPlayer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed right-2 bottom-2 "
        >
          <div className="w-40 h-40 rounded-full flex items-center justify-center  relative ">
            <div className="absolute inset-0 rounded-full bg-[#4285f4] animate-pulse"></div>
            <img
              onClick={togglePlayer}
              src={allSongs[song]?.imageURL}
              className="z-50 w-32 h-32 rounded-full object-cover cursor-pointer"
              alt=""
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MusicPlayer;
