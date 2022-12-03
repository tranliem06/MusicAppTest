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
  NewRelease,
  SongItemUpload,
  ChartSection,
  SongItemHome,
} from "../components";

import { Scrollbars } from "react-custom-scrollbars-2";
import { Link } from "react-router-dom";
// import ChartSection from "./ChartSection";

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
      newMusic,
      weekChart,
      favoritedArtist,
      artistFilter,
      filterTerm,
      albumFilter,
      languageFilter,
      isSongZingPlaying,
    },
    dispatch,
  ] = useStateValue();

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

  return (
    <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
      <div className="w-full h-auto flex flex-col items-center justify-center bg-primary mb-20">
        <div>
          <div>
            <Slider />
          </div>
          <div>
            <Section data={today} />
          </div>
          <div>
            <NewRelease />
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
          <div>
            <Section data={newMusic} />
          </div>
          <div className="flex items-center px-[43px] w-full mt-12">
            {weekChart?.map((item) => (
              <div
                to={item?.link?.split(".")[0]}
                key={item.link}
                className="flex-1 px-4"
              >
                <img
                  src={item.cover}
                  alt="cover"
                  className=" w-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>
          {/* <div>
            <ChartSection />
          </div> */}

          <div className="mt-12 px-[59px] flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h3 className="text-5 font-bold text-[#4285f4]">
                Favorite Aritst
              </h3>
              <span className="text-xs">All</span>
            </div>
            <div className="flex mx-[-16px]">
              {favoritedArtist?.items
                ?.filter((i, index) => index <= 4)
                .map((singer) => {
                  return (
                    <div key={singer.encodeId} className="flex-1 px-4 relative">
                      <img
                        src={singer.thumbnail}
                        alt="singer"
                        className="w-full object-contain rounded-md"
                      />
                      <div className="absolute w-full bottom-[16px] flex justify-evenly pr-8">
                        <img
                          src={singer?.song?.items[0].thumbnail}
                          alt="singer"
                          className="w-[25%] rounded-md object-cover"
                        />
                        <img
                          src={singer?.song?.items[1].thumbnail}
                          alt="singer"
                          className="w-[25%] rounded-md object-cover"
                        />
                        <img
                          src={singer?.song?.items[2].thumbnail}
                          alt="singer"
                          className="w-[25%] rounded-md object-cover"
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="w-full h-auto flex flex-col p-[59px] gap-4">
            <div>
              <span className="text-5 font-bold text-[#4285f4]">
                Recently Upload
              </span>
            </div>
            {/* <HomeSongContainer musics={filteredSongs ? filteredSongs : allSongs} /> */}
            <div className="flex w-full justify-evenly gap-4 flex-wrap">
              {/* <HomeSongContainer musics={allSongs} /> */}
              {allSongs?.map((item, index) => (
                <SongItemHome
                  thumbnail={item.imageURL}
                  title={item.name}
                  artists={item.artist}
                  index={index}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Scrollbars>
  );
};

// export const HomeSongContainer = ({ musics }) => {
//   const [
//     {
//       isSongPlaying,
//       song,
//       isSongZingPlaying,
//       isPlayListZing,
//       isPlayListAllSong,
//     },
//     dispatch,
//   ] = useStateValue();

//   const addSongToContext = (index) => {
//     if (isPlayListZing) {
//       dispatch({
//         type: actionType.SET_PLAYLIST_FROM_ZING,
//         isPlayListZing: false,
//       });
//     }
//     if (!isPlayListAllSong) {
//       dispatch({
//         type: actionType.SET_PLAYLIST_ALL_SONG,
//         isPlayListAllSong: true,
//       });
//     }
//     if (isSongZingPlaying) {
//       dispatch({
//         type: actionType.PLAY_SONG_FROM_ZING,
//         isSongZingPlaying: false,
//       });
//     }
//     if (!isSongPlaying) {
//       dispatch({
//         type: actionType.SET_SONG_PLAYING,
//         isSongPlaying: true,
//       });
//     }
//     if (song !== index) {
//       dispatch({
//         type: actionType.SET_SONG,
//         song: index,
//       });
//     }
//   };
//   return (
//     <>
//       {musics?.map((data, index) => (
//         <motion.div
//           key={data._id}
//           whileTap={{ scale: 0.8 }}
//           initial={{ opacity: 0, translateX: -50 }}
//           animate={{ opacity: 1, translateX: 0 }}
//           transition={{ duration: 0.3, delay: index * 0.1 }}
//           className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
//           onClick={() => addSongToContext(index)}
//         >
//           <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
//             <motion.img
//               whileHover={{ scale: 1.05 }}
//               src={data.imageURL}
//               alt=""
//               className=" w-full h-full rounded-lg object-cover"
//             />
//           </div>

//           <div className="flex items-center justify-center">
//             <p className="flex items-center justify-center flex-col text-[12px] text-headingColor font-semibold my-2">
//               {data.name.length > 25
//                 ? `${data.name.slice(0, 25)}...`
//                 : data.name}
//               <span className="block text-[10px] text-gray-400 my-1">
//                 {data.artist}
//               </span>
//             </p>
//           </div>
//         </motion.div>
//       ))}
//     </>
//   );
// };

export default Home;
