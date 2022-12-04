import React from "react";
// import { useEffect } from "react";
// import { getAllSongs } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { motion } from "framer-motion";
// import { IoMusicalNote } from "react-icons/io5";

const PlayListCardZing = () => {
  const [
    { isPlayListZing, curPlaylistZing, isSongZingPlaying, curSongId },
    dispatch,
  ] = useStateValue();
  // useEffect(() => {
  //   if (!allSongs) {
  //     getAllSongs().then((data) => {
  //       dispatch({
  //         type: actionType.SET_ALL_SONGS,
  //         allSongs: data.data,
  //       });
  //     });
  //   }
  // }, []);

  const setCurrentPlaySong = (songindex) => {
    // if (!isSongZingPlaying) {
    //   dispatch({
    //     type: actionType.SET_SONG_PLAYING,
    //     isSongPlaying: true,
    //   });
    // }
    if (curSongId !== songindex) {
      dispatch({
        type: actionType.SET_CUR_SONG_ID,
        curSongId: curPlaylistZing[songindex].encodeId,
      });
    }
  };

  return (
    <div className=" py-2  w-full h-full  flex flex-col overflow-y-scroll scrollbar-thin bg-primary">
      {curPlaylistZing.length > 0 ? (
        curPlaylistZing.map((music, index) => (
          <motion.div
            initial={{ opacity: 0, translateX: 150 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`group w-full p-2 hover:bg-gray-300 flex gap-3 items-center cursor-pointer ${
              music?.encodeId === curSongId ? "bg-[#4285f4]" : "bg-transparent"
            }`}
            onClick={() => setCurrentPlaySong(index)}
            key={music.encodeId}
          >
            <div className="w-[20%]">
              <img
                src={music?.thumbnail}
                alt="img-cover"
                className="w-12 h-12 object-cover rounded-md"
              />
            </div>
            <div className="w-auto flex flex-col">
              <p
                className={`text-[12px]  font-semibold ${
                  music?.encodeId === curSongId
                    ? "text-white"
                    : "text-headingColor"
                }`}
              >
                {`${
                  music?.title?.length > 25
                    ? `${music?.title?.slice(0, 25)}...`
                    : music?.title
                }`}
                {/* <span className="text-base">({music?.album})</span> */}
              </p>
              <p
                className={`text-[10px] ${
                  music?.encodeId === curSongId
                    ? "text-white"
                    : "text-textColor"
                } `}
              >
                {music?.artistsNames}
                {/* <span className="text-sm text-textColor font-semibold">
                    ({music?.category})
                  </span> */}
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default PlayListCardZing;
