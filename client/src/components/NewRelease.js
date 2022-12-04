import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import { useStateValue } from "../Context/StateProvider";
import { SongItem } from "../components";
import { actionType } from "../Context/reducer";
const NewRelease = () => {
  //   const { newRelease } = useSelector((state) => state.app);
  const [{ newRelease, curPlaylistZing }, dispatch] = useStateValue();
  const [isActived, setIsActived] = useState(0);
  const [songs, setSongs] = useState([]);

  // console.log(newRelease);
  useEffect(() => {
    isActived
      ? setSongs(newRelease?.items?.others)
      : setSongs(newRelease?.items?.vPop);
  }, [isActived, newRelease]);
  // console.log(songs);
  return (
    <div className="mt-12 px-[59px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-5 font-bold text-[#4285f4]">New Release</h3>
        <span className="text-xs">All</span>
      </div>
      <div className="flex items-center gap-5 text-xs">
        <button
          type="button"
          onClick={() => setIsActived(0)}
          className={`py-1 px-4 rounded-l-full rounded-r-full border border-[#4285f4] bg-transparent ${
            isActived === 0 && "bg-blue-500 border-none text-white"
          }`}
        >
          VIETNAMESE
        </button>
        <button
          type="button"
          onClick={() => {
            setIsActived(1);
          }}
          className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-transparent ${
            isActived === 1 && "bg-[#4285f4]  text-white"
          }`}
        >
          OTHERS
        </button>
      </div>
      <div className="flex flex-wrap w-full justify-between">
        {songs?.map((item) => (
          //   <div key={item.encodeId} className="w-[45%] min-[1024px]:w-[30%]">
          <SongItem
            thumbnail={item.thumbnail}
            title={item.title}
            artists={item.artistsNames}
            releaseDate={item.releaseDate}
            sid={item.encodeId}
            key={item.encodeId}
            state={isActived}
          />
          //   </div>
        ))}
      </div>
    </div>
  );
};

export default NewRelease;
