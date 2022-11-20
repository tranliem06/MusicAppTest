import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getAllSongs } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";

import {
  SearchBar,
  Slider,
  Player,
  SongCard,
  Header,
  Filter,
  Section,
} from "../components";

import { Scrollbars } from "react-custom-scrollbars-2";

const Home = () => {
  const [
    {
      searchTerm,
      isSongPlaying,
      song,
      allSongs,
      today,
      newSongEveryday,
      top100,
      xone,
      artistFilter,
      filterTerm,
      albumFilter,
      languageFilter,
      isSongZingPlaying,
    },
    dispatch,
  ] = useStateValue();

  // const [filteredSongs, setFilteredSongs] = useState(null);

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

  // useEffect(() => {
  //   if (searchTerm.length > 0) {
  //     const filtered = allSongs.filter(
  //       (data) =>
  //         data.artist.toLowerCase().includes(searchTerm) ||
  //         data.language.toLowerCase().includes(searchTerm) ||
  //         data.name.toLowerCase().includes(searchTerm) ||
  //         data.artist.includes(artistFilter)
  //     );
  //     setFilteredSongs(filtered);
  //   } else {
  //     setFilteredSongs(null);
  //   }
  // }, [searchTerm]);

  // useEffect(() => {
  //   const filtered = allSongs?.filter((data) => data.artist === artistFilter);
  //   if (filtered) {
  //     setFilteredSongs(filtered);
  //   } else {
  //     setFilteredSongs(null);
  //   }
  // }, [artistFilter]);

  // useEffect(() => {
  //   const filtered = allSongs?.filter(
  //     (data) => data.category.toLowerCase() === filterTerm
  //   );
  //   if (filtered) {
  //     setFilteredSongs(filtered);
  //   } else {
  //     setFilteredSongs(null);
  //   }
  // }, [filterTerm]);

  // useEffect(() => {
  //   const filtered = allSongs?.filter((data) => data.album === albumFilter);
  //   if (filtered) {
  //     setFilteredSongs(filtered);
  //   } else {
  //     setFilteredSongs(null);
  //   }
  // }, [albumFilter]);

  // useEffect(() => {
  //   const filtered = allSongs?.filter(
  //     (data) => data.language === languageFilter
  //   );
  //   if (filtered) {
  //     setFilteredSongs(filtered);
  //   } else {
  //     setFilteredSongs(null);
  //   }
  // }, [languageFilter]);

  return (
    <Scrollbars style={{ width: "100%", height: "100%" }}>
      <div className="w-full h-auto flex flex-col items-center justify-center bg-primary mb-10">
        {/* <Header /> */}
        {/* <SearchBar /> */}

        {/* {searchTerm.length > 0 && (
          <p className="my-4 text-base text-textColor">
            Searched for :
            <span className="text-xl text-cartBg font-semibold">
              {searchTerm}
            </span>
          </p>
        )} */}

        <div>
          <div>
            <Slider />
          </div>
          <div>
            <Section data={today} />
          </div>
          <div>
            <Section data={top100} />
          </div>
          <div>
            <Section data={newSongEveryday} />
          </div>
          <div>
            <Section data={xone} />
          </div>
          <div className="w-full h-auto flex flex-col p-[59px] gap-4">
            <div>
              <span className="text-5 font-bold text-[#4285f4]">
                Recently Upload
              </span>
            </div>
            {/* <HomeSongContainer musics={filteredSongs ? filteredSongs : allSongs} /> */}
            <div className="flex items-center justify-evenly gap-4 flex-wrap">
              <HomeSongContainer musics={allSongs} />
            </div>
          </div>
        </div>
      </div>
    </Scrollbars>
  );
};

export const HomeSongContainer = ({ musics }) => {
  const [
    {
      isSongPlaying,
      song,
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
    if (isPlayListZing) {
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
    <>
      {musics?.map((data, index) => (
        <motion.div
          key={data._id}
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
          onClick={() => addSongToContext(index)}
        >
          <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={data.imageURL}
              alt=""
              className=" w-full h-full rounded-lg object-cover"
            />
          </div>

          <div className="flex items-center justify-center">
            <p className="flex items-center justify-center flex-col text-[12px] text-headingColor font-semibold my-2">
              {data.name.length > 25
                ? `${data.name.slice(0, 25)}...`
                : data.name}
              <span className="block text-[10px] text-gray-400 my-1">
                {data.artist}
              </span>
            </p>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default Home;
