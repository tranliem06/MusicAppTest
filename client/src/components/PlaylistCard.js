import React from "react";
import { useEffect } from "react";
import { getAllSongs } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { motion } from "framer-motion";
import { IoMusicalNote } from "react-icons/io5";

const PlayListCard = () => {
  const [{ allSongs, song, isSongPlaying }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);

  const setCurrentPlaySong = (songindex) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== songindex) {
      dispatch({
        type: actionType.SET_SONG,
        song: songindex,
      });
    }
  };

  return (
    <div className=" py-2  w-full h-510  flex flex-col overflow-y-scroll scrollbar-thin bg-primary">
      {allSongs.length > 0 ? (
        allSongs.map((music, index) => (
          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer ${
              music?._id === song._id ? "bg-card" : "bg-transparent"
            }`}
            onClick={() => setCurrentPlaySong(index)}
          >
            <div className="flex items-start flex-col">
              <p className="text-[14px] text-headingColor font-semibold">
                {`${
                  music?.name.length > 30
                    ? music?.name.slice(0, 30)
                    : music?.name
                }...`}
                {/* <span className="text-base">({music?.album})</span> */}
              </p>
              <p className="text-[12px] text-textColor">
                {music?.artist}
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

export default PlayListCard;
