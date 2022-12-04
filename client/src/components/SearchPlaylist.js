import React, { useEffect } from "react";
import { GetArtist } from "../api";
import { useStateValue } from "./../Context/StateProvider";
import { SectionItem } from "./";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Scrollbars from "react-custom-scrollbars-2";

const SearchPlaylist = () => {
  const [{ searchData }, dispatch] = useStateValue();

  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await GetArtist(searchData?.top?.alias);
      console.log(res);
      if (res.data.err === 0) {
        setPlaylists(res.data.data.sections[1]);
      }
    };

    fetch();
  }, [searchData]);
  return (
    <Scrollbars style={{ width: "100%", height: "100%" }}>
      <div className=" px-[20px] flex flex-col ">
        <div className="flex items-start flex-wrap justify-between w-full  mb-[200px]">
          {playlists &&
            playlists?.items?.length > 0 &&
            playlists?.items?.map((item, index) => (
              <SectionItemSearch
                key={item.encodeId}
                title={item.title}
                link={item.link}
                sortDescription={item.sortDescription}
                thumbnailM={item.thumbnailM}
              />
            ))}
        </div>
      </div>
    </Scrollbars>
  );
};

export default SearchPlaylist;

export const SectionItemSearch = ({
  link,
  title,
  thumbnailM,
  artistsNames,
  data,
  sortDescription,
}) => {
  const navigate = useNavigate();
  const imageRef = useRef();

  return (
    <div
      onClick={() => {
        navigate(link?.split(".")[0], { state: { playAlbum: false } });
      }}
      className="flex flex-col gap-3 justify-start w-[20%] text-sm cursor-pointer p-4"
    >
      <div className="w-full relative overflow-hidden rounded-lg">
        <div className="overflow-hidden">
          <img
            ref={imageRef}
            src={thumbnailM}
            alt="avatar"
            className="w-full h-auto rounded-lg hover:scale-125"
          />
        </div>
      </div>
      <span className="flex flex-col">
        <span className="text-[12px] font-semibold">
          {title?.length > 30 ? title.slice(0, 30) + "..." : title}
        </span>
        {data?.sectionId === "h100" ? (
          <span>{artistsNames}</span>
        ) : (
          <span className="text-[12px]">
            {sortDescription?.length >= 40
              ? `${sortDescription?.slice(0, 40)}...`
              : sortDescription}
          </span>
        )}
      </span>
    </div>
  );
};
