import React, { memo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../utils/icons";

const { AiOutlineHeart, BsThreeDots } = icons;

const SectionItem = ({
  link,
  title,
  thumbnailM,
  artistsNames,
  data,
  sortDescription,
}) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const imageRef = useRef();

  const handleHover = () => {
    setIsHover(true);
    imageRef.current.classList?.remove("animate-scale-down-image");
    imageRef.current.classList?.add("animate-scale-up-image");
  };
  const handleLeave = () => {
    setIsHover(false);
    imageRef.current.classList?.remove("animate-scale-up-image");
    imageRef.current.classList?.add("animate-scale-down-image");
  };
  return (
    <div
      onClick={() => {
        navigate(link?.split(".")[0], { state: { playAlbum: false } });
      }}
      className="flex flex-col gap-3 flex-auto justify-start w-1/5 text-sm cursor-pointer"
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
          {title?.length > 20 ? title.slice(0, 20) + "..." : title}
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

export default memo(SectionItem);
