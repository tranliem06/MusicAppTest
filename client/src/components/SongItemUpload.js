import React from "react";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { motion } from "framer-motion";

const SongItemUpload = () => {
  const [
    {
      isSongPlaying,
      song,
      allSongs,
      isSongZingPlaying,
      isPlayListZing,
      isPlayListAllSong,
    },
    dispatch,
  ] = useStateValue();

  const addSongToContext = (index) => {
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
    <div>
      <div className=" py-2  w-full  flex flex-col overflow-y-scroll scrollbar-thin bg-primary">
        {allSongs.length > 0 ? (
          allSongs.map((music, index) => (
            <motion.div
              initial={{ opacity: 0, translateX: 150 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`group w-full p-2 hover:bg-gray-300 flex gap-3 items-center cursor-pointer ${
                music?._id === allSongs[song]._id
                  ? "bg-[#4285f4]"
                  : "bg-transparent"
              }`}
              onClick={() => addSongToContext(index)}
              key={song._id}
            >
              <div className="w-[20%]">
                <img
                  src={music?.imageURL}
                  alt="img-cover"
                  className="w-12 h-12 object-cover rounded-md"
                />
              </div>
              <div className="w-auto flex flex-col">
                <p
                  className={`text-[12px] ${
                    music?._id === allSongs[song]._id
                      ? "text-white"
                      : "text-headingColor"
                  } font-semibold`}
                >
                  {`${
                    music?.name.length > 25
                      ? `${music?.name.slice(0, 25)}...`
                      : music?.name
                  }`}
                  {/* <span className="text-base">({music?.album})</span> */}
                </p>
                <p
                  className={`text-[10px] ${
                    music?._id === allSongs[song]._id
                      ? "text-white"
                      : "text-textColor"
                  }`}
                >
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
    </div>
  );
};

export default SongItemUpload;
