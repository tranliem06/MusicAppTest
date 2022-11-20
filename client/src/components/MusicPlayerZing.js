import React, { useEffect, useState } from "react";
import { useStateValue } from "../Context/StateProvider";
import { IoMdClose } from "react-icons/io";
import { IoArrowRedo, IoArrowUndo, IoMusicalNote } from "react-icons/io5";
import { motion } from "framer-motion";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { actionType } from "../Context/reducer";
import { MdPlaylistPlay } from "react-icons/md";
import { getAllSongs, getDetailSong, getSong } from "../api";
import { RiPlayListFill } from "react-icons/ri";
import { PlayListCard } from "./";

const MusicPlayerZing = () => {
  // const [isPlayList, setIsPlayList] = useState(false);
  const [
    {
      isSongPlaying,
      miniPlayer,
      isSongZingPlaying,
      curSongId,
      isPlayListAllSong,
    },
    dispatch,
  ] = useStateValue();

  const [songInfo, setSongInfo] = useState(null);
  const [source, setSource] = useState(null);

  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        getDetailSong(curSongId),
        getSong(curSongId),
      ]);
      console.log(res1);

      // console.log(response);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
      }
      if (res2.data.err === 0) {
        setSource(res2.data.data["128"]);
      }
    };

    fetchDetailSong();
  }, [curSongId]);

  const closeMusicPlayer = () => {
    if (isSongZingPlaying) {
      dispatch({
        type: actionType.PLAY_SONG_FROM_ZING,
        isSongZingPlaying: false,
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

  // const nextTrack = () => {
  //   if (song > allSongs.length) {
  //     dispatch({
  //       type: actionType.SET_SONG,
  //       song: 0,
  //     });
  //   } else {
  //     dispatch({
  //       type: actionType.SET_SONG,
  //       song: song + 1,
  //     });
  //   }
  // };

  // const previousTrack = () => {
  //   if (song === 0) {
  //     dispatch({
  //       type: actionType.SET_SONG,
  //       song: 0,
  //     });
  //   } else {
  //     dispatch({
  //       type: actionType.SET_SONG,
  //       song: song - 1,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (song > allSongs.length) {
  //     dispatch({
  //       type: actionType.SET_SONG,
  //       song: 0,
  //     });
  //   }
  // }, [song]);

  return (
    <div className="w-full h-[96px] full flex items-center gap-3 overflow-hidden">
      <div
        className={`w-full full items-center gap-3 p-4  ${
          miniPlayer ? "hidden" : "flex relative"
        }`}
      >
        <div className="w-[30%] flex flex-auto gap-3 items-center">
          <img
            src={songInfo?.thumbnail}
            className="w-16 h-16 object-cover rounded-md"
            alt=""
          />
          <div className="flex items-start flex-col">
            <p className="text-[14px] text-gray-700 font-semibold">
              {`${
                songInfo?.title.length > 30
                  ? `${songInfo?.title?.slice(0, 30)}...`
                  : songInfo?.title
              }`}
              {/* <span className="text-base">({allSongs[song]?.album})</span> */}
            </p>
            <p className="text-textColor">{songInfo?.artistsNames} </p>
          </div>
        </div>
        <div className="w-[40%]">
          <AudioPlayer
            src={`http://api.mp3.zing.vn/api/streaming/audio/${curSongId}/320`}
            onPlay={() => console.log("is playing")}
            autoPlay={true}
            showSkipControls={true}
            // onClickNext={nextTrack}
            // onClickPrevious={previousTrack}
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
              // onClick={() => {
              //   dispatch({
              //     type: actionType.SET_PLAYLIST_ALL_SONG,
              //     isPlayListAllSong: !isPlayListAllSong ? true : false,
              //   });
              // }}
            >
              <RiPlayListFill className="text-textColor hover:text-headingColor text-3xl cursor-pointer" />
            </motion.i>
          </div>
        </div>
      </div>

      {miniPlayer && (
        <div className="fixed right-2 bottom-2 ">
          <div className="w-40 h-40 rounded-full flex items-center justify-center  relative ">
            <div className="absolute inset-0 rounded-full bg-[#4285f4] blur-xl animate-pulse"></div>
            <img
              onClick={togglePlayer}
              src={songInfo?.thumbnail}
              className="z-50 w-32 h-32 rounded-full object-cover cursor-pointer"
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayerZing;
