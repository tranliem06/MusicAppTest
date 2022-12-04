import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetArtist } from "./../api/index";
import { BsFillPlayFill } from "react-icons/bs";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import moment from "moment";
import Scrollbars from "react-custom-scrollbars-2";

const Singer = () => {
  const { singer } = useParams();
  const [isHoverPlay, setIsHoverPlay] = useState(false);
  // const [artistData, setArtistData] = useState(null);
  const [{ artistData }, dispatch] = useStateValue();
  console.log(singer);

  useEffect(() => {
    const fetchArtistData = async () => {
      const res = await GetArtist(singer);
      console.log(res);
      if (res.data.err === 0) {
        dispatch({
          type: actionType.SET_ARTIST_DATA,
          artistData: res.data.data,
        });
      }
    };

    singer && fetchArtistData();
  }, [singer]);

  // console.log(artistData?.sections[0]?.items);
  return (
    <Scrollbars autoHide style={{ width: "100%", height: " 100%" }}>
      <div className="flex flex-col w-full">
        {/* cover */}
        <div className="relative">
          <img src={artistData?.cover} alt="background" className="w-full" />
          <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] text-white to-transparent">
            <div className="absolute bottom-0 pb-6 px-[60px] ">
              <div className="flex gap-8 items-center">
                <h1 className="text-[60px] font-bold">{artistData?.name}</h1>
                <span
                  className="p-2 relative rounded-full bg-[#fff] text-[#4285f4] cursor-pointer hover:text-gray-100"
                  onMouseEnter={() => setIsHoverPlay(true)}
                  onMouseLeave={() => setIsHoverPlay(false)}
                >
                  <div className="w-8 h-8">
                    {isHoverPlay && (
                      <span className="absolute top-[-1px] animate-scape-up-center left-[-1px] bottom-[-1px] right-[-1px] bg-[#4285f4] rounded-full"></span>
                    )}
                    <span className="absolute p-2 top-[-2px] left-[1px] right-[-4px] bottom-[-2px] z-10">
                      <BsFillPlayFill size={36} />
                    </span>
                  </div>
                </span>
              </div>
              <div className="flex  items-center gap-4">
                {/* <div className="flex items-center justify-center gap-4"> */}
                <span className="text-[16px] whitespace-nowrap">{`${Number(
                  artistData?.totalFollow.toFixed(1)
                ).toLocaleString()} followers`}</span>
                {/* <span className="text-[14px]">Followers</span> */}
                {/* </div> */}
                <button
                  type="button"
                  className="bg-[#4285f4]  text-white rounded-l-full rounded-r-full px-5 py-1 justify-center gap-1"
                >
                  <span className="text-[16px]">Follow</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Top songs */}
        <div>
          {/* Songs */}
          <div className="flex flex-col mt-4 px-[59px] mb-[200px]">
            <h3 className="text-lg font-bold text-[#32323d] mb-4">Top Songs</h3>
            <div className="flex  justify-between flex-wrap w-full ">
              {/* <div className="flex-1"> */}
              {artistData?.sections[0]?.items
                ?.slice(0, 8)
                .map((item, index) => (
                  <div
                    key={item.encodeId}
                    className={`"flex-auto w-[45%] " ${
                      index % 2 === 0 ? "pl-4" : "pr-4"
                    }`}
                  >
                    <ListSearch songData={item} index={index} />
                  </div>
                ))}
              {/* </div> */}
              {/* <div className="flex-1">Song</div>  */}
            </div>
          </div>
        </div>
      </div>
    </Scrollbars>
  );
};

export default Singer;

export const ListSearch = ({ songData }) => {
  const [
    {
      // isSongZingPlaying,
      // isSongPlaying,
      // miniPlayer,
      // isPlayListAllSong,
      // isPlayListZing,
      // searchData,
      artistData,
    },
    dispatch,
  ] = useStateValue();

  //   console.log(songData);
  return (
    <div
      className="flex justify-between items-center p-[10px]  hover:bg-blue-200 cursor-pointer"
      onClick={() => {
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

        dispatch({
          type: actionType.SET_PLAYLIST_ZING,
          curPlaylistZing: artistData?.sections[0]?.items,
        });
      }}
    >
      <div className="w-[50%] flex items-center gap-3 flex-1">
        <div className="flex justify-center items-center gap-1">
          <img
            src={songData?.thumbnail}
            alt="thumbnail"
            className="w-10 h-10 object-cover rounded-md"
          />
        </div>
        {/* title and aritsts */}
        <span className="flex flex-col">
          <span className="text-[14px] font-semibold whitespace-nowrap text-[#32323d]">
            {songData?.title?.length > 30
              ? `${songData?.title.slice(0, 30)}...`
              : songData?.title}
          </span>
          <span className="text-[12px]">{songData?.artistsNames}</span>
        </span>
      </div>

      <div className="w-[10%]  flex justify-end">
        {moment.utc(songData?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};
