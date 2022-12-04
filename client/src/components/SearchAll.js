import moment from "moment";
import React from "react";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { handleNumber } from "./../utils/supportfunctions";
import { SongItem, SectionItem, ArtistZing } from "./";
import { BsMusicNoteBeamed } from "react-icons/bs";
import Scrollbars from "react-custom-scrollbars-2";
import { Link } from "react-router-dom";
const SearchAll = () => {
  const [{ searchData }, dispatch] = useStateValue();
  return (
    <Scrollbars autoHide style={{ width: "100%", height: " 100%" }}>
      <div className="w-full h-full flex flex-col mb-20">
        {/* *Top result */}
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-[#32323d]">Top results</h3>
          <div className="mt-4 ">
            {searchData?.top && (
              <div className="px-[10px] rounded-md flex gap-8 items-center ">
                <div className="flex gap-6 w-[30%] ">
                  <Link
                    to={searchData.top.link}
                    className="overflow-hidden rounded-full"
                  >
                    <img
                      src={searchData.top.thumbnail}
                      alt="avatar"
                      className="w-[84px] h-[84px] object-cover rounded-full
                      hover:scale-125
                      "
                    />
                  </Link>
                  <div className="flex flex-col text-xs">
                    <span className="mb-[6px]">
                      {searchData.top.objectType === "artist" ? "Aritsts" : ""}
                    </span>
                    <Link
                      to={searchData.top.link}
                      className="text-sm font-semibold hover:text-[#4285f4]"
                    >
                      {searchData.top.title || searchData.top.name}
                    </Link>
                    {searchData.top.objectType === "artist" && (
                      <span>
                        {handleNumber(searchData.artists[0]?.totalFollow) +
                          " followers"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <SongItemForSearch
                    key={searchData.songs[0].encodeId}
                    thumbnail={searchData.songs[0].thumbnail}
                    sid={searchData.songs[0].encodeId}
                    title={searchData.songs[0].title}
                    artists={searchData.songs[0].artistsNames}
                  />
                </div>
                <div className="flex-1">
                  <SongItemForSearch
                    key={searchData.songs[1].encodeId}
                    thumbnail={searchData.songs[1].thumbnail}
                    sid={searchData.songs[1].encodeId}
                    title={searchData.songs[1].title}
                    artists={searchData.songs[1].artistsNames}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Songs */}
        <div className="flex flex-col mt-4">
          <h3 className="text-lg font-bold text-[#32323d] mb-4">Songs</h3>
          <div className="flex  justify-between flex-wrap w-full ">
            {/* <div className="flex-1"> */}
            {searchData?.songs?.slice(0, 8).map((item, index) => (
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

        {/* Playlists/albums */}
        <div className="flex flex-col w-full  mt-4">
          <h3 className="text-lg font-bold text-[#32323d] mb-4">
            Playlists/Albums
          </h3>
          <div className="flex justify-between  w-full gap-[28px]">
            {searchData?.playlists.slice(0, 5).map((item, index) => (
              <SectionItem
                key={item.encodeId}
                title={item.title}
                link={item.link}
                sortDescription={item.sortDescription}
                thumbnailM={item.thumbnailM}
              />
            ))}
          </div>
        </div>

        {/* artitst */}
        <div className="flex flex-col w-full  mt-4">
          <h3 className="text-lg font-bold text-[#32323d] mb-4">Artists</h3>
          <div className="flex  w-full gap-[28px] mb-[500px]">
            {searchData?.artists.slice(0, 5).map((item, index) => (
              <ArtistZing
                key={item.id}
                title={item.name}
                image={item.thumbnailM}
                follower={item.totalFollow}
                link={item.link}
              />
            ))}
          </div>
        </div>
      </div>
    </Scrollbars>
  );
};

export default SearchAll;

export const SongItemForSearch = ({
  thumbnail,
  title,
  artists,
  sid,
  releaseDate,
  order,
  percent,
  style,
  state,
}) => {
  const [
    {
      isSongPlaying,
      curSongId,
      isSongZingPlaying,
      newRelease,
      isPlayListAllSong,
      isPlayListZing,
    },
    dispatch,
  ] = useStateValue();

  // console.log(state);
  return (
    <div
      onClick={() => {
        // dispatch(actions.setCurSongId(sid));
        if (state === 0) {
          dispatch({
            type: actionType.SET_PLAYLIST_ZING,
            curPlaylistZing: newRelease.items.vPop,
          });
        } else {
          dispatch({
            type: actionType.SET_PLAYLIST_ZING,
            curPlaylistZing: newRelease.items.others,
          });
        }

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
          type: actionType.SET_CUR_SONG_ID,
          curSongId: sid,
        });
        dispatch({
          type: actionType.PLAY_SONG_FROM_ZING,
          isSongZingPlaying: true,
        });
      }}
      className={` flex-auto flex  gap-[10px] justify-between items-center rounded-md cursor-pointer hover:bg-blue-200 ${
        style || "text-black hover:bg-main-200"
      }`}
    >
      <div className="w-[30%] flex-auto flex gap-[10px] p-[10px]">
        {order && (
          <span
            className={`${
              order === 1 ? "text-shadow" : ""
            } text-[rgba(77,34,104,0.9)] text-[32px] m-auto`}
          >
            {order}
          </span>
        )}
        <img
          src={thumbnail}
          alt="thumbnail"
          className="w-[84px] h-[84px] object-cover rounded-md"
        />
        <div className="flex flex-col">
          <span className="text-[12px] text-textColor font-semibold mb-[6px]">
            Song
          </span>
          <span className="text-[14px] font-semibold">{`${
            title.length > 25 ? `${title.slice(0, 25)}...` : title
          }`}</span>
          <span className="text-xs opacity-70 mt-1">{artists}</span>
          {releaseDate && (
            <span className={`text-xs opacity-70`}>
              {moment(releaseDate * 1000).fromNow()}
            </span>
          )}
        </div>
      </div>
      {percent && <span>{`${percent}%`}</span>}
    </div>
  );
};

export const ListSearch = ({ songData }) => {
  const [
    {
      isSongZingPlaying,
      isSongPlaying,
      miniPlayer,
      isPlayListAllSong,
      isPlayListZing,
      searchData,
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
          curPlaylistZing: searchData.songs,
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
