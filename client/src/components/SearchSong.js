import React, { useEffect } from "react";
import { Lists, List, Loading2 } from "./";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";
import { GetSearchSongs } from "../api/";
import { BsDot } from "react-icons/bs";
import Scrollbars from "react-custom-scrollbars-2";
import icons from "../utils/icons";
import moment from "moment";

const SearchSong = () => {
  const [{ searchData, searchSongData }, dispatch] = useStateValue();
  useEffect(() => {
    const fetchSearchData = async () => {
      const response = await GetSearchSongs(searchData?.top?.id);
      console.log(response);

      if (response?.data.err === 0) {
        // setData(response.data?.data);
        dispatch({
          type: actionType.SEARCH_SONG,
          searchSongData: response?.data?.data.items,
        });
      }
      //   console.log(response.data);
    };

    fetchSearchData();
  }, [searchData]);

  return (
    <Scrollbars style={{ width: "100%", height: "100%" }}>
      <div>
        <ListsSearch />
      </div>
    </Scrollbars>
  );
};

export default SearchSong;

export const ListsSearch = () => {
  // console.log({ songs, totalDuration });
  const [{ searchSongData }, dispatch] = useStateValue();

  return (
    <div className=" w-full flex flex-col text-xs text-gray-600 mb-[200px]">
      <div className=" flex   p-[10px] font-semibold uppercase">
        <div className="w-[50%]">
          <span>Title</span>
        </div>
        <div className="w-[40%] flex items-center justify-center">
          <span>Album</span>
        </div>
        <div className="w-[10%]">
          <span>Length</span>
        </div>
      </div>

      <div className="w-full h-full flex flex-col">
        {searchSongData?.map((item) => (
          <ListForSearch key={item.encodeId} songData={item} />
        ))}
      </div>
    </div>
  );
};

const { BsMusicNoteBeamed } = icons;

export const ListForSearch = ({ songData }) => {
  const [{ searchSongData }, dispatch] = useStateValue();

  //   console.log(songData);
  return (
    <div
      className="flex justify-between items-center p-[10px] border-t border-blue-500 hover:bg-blue-200 cursor-pointer"
      onClick={() => {
        dispatch({
          type: actionType.SET_PLAYLIST_ZING,
          curPlaylistZing: searchSongData,
        });
        dispatch({
          type: actionType.SET_PLAYLIST_ALL_SONG,
          isPlayListAllSong: false,
        });
        dispatch({
          type: actionType.SET_PLAYLIST_FROM_ZING,
          isPlayListZing: true,
        });
        dispatch({
          type: actionType.SET_SONG_PLAYING,
          isSongPlaying: false,
        });
        dispatch({
          type: actionType.PLAY_SONG_FROM_ZING,
          isSongZingPlaying: true,
        });
        dispatch({
          type: actionType.SET_CUR_SONG_ID,
          curSongId: songData.encodeId,
        });
      }}
    >
      <div className="w-[50%] flex items-center gap-3 flex-1">
        <div className="flex justify-center items-center gap-1">
          <span>
            <BsMusicNoteBeamed />
          </span>

          <img
            src={songData?.thumbnail}
            alt="thumbnail"
            className="w-10 h-10 object-cover rounded-md"
          />
        </div>
        {/* title and aritsts */}
        <span className="flex flex-col">
          <span className="text-[12px] font-semibold whitespace-nowrap">
            {songData?.title?.length > 30
              ? `${songData?.title.slice(0, 30)}...`
              : songData?.title}
          </span>
          <span>{songData?.artistsNames}</span>
        </span>
      </div>
      <div className="w-[40%]  flex justify-center">
        {songData?.album?.title?.length > 30
          ? `${songData?.album?.title.slice(0, 30)}...`
          : songData?.album?.title}
      </div>

      <div className="w-[10%]  flex justify-end">
        {moment.utc(songData?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};
