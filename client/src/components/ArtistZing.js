import React from "react";
import { memo } from "react";
import { handleNumber } from "./../utils/supportfunctions";
import { Link } from "react-router-dom";

const ArtistZing = ({ title, image, follower, link }) => {
  console.log(title);
  console.log(follower);
  console.log(image);
  return (
    <div className="w-[20%] flex flex-col gap-[10px]">
      <Link className="overflow-hidden rounded-full" to={link}>
        <img
          src={image}
          alt="singer"
          className="w-full object-cover rounded-full hover:scale-125"
        />
      </Link>

      <div className="flex flex-col items-center ">
        <Link
          to={link}
          className="text-[16px] font-semibold text-[#32323d] hover:text-[#4285f4]"
        >
          {title.length > 15 ? `${title.slice(0, 15)}...` : title}
        </Link>
        <span className="text-[14px]">{`${handleNumber(
          follower
        )} followers`}</span>
        <button
          type="button"
          className="bg-[#4285f4] text-white w-full mt-4 py-2 rounded-l-full rounded-r-full"
        >
          <span>Follow</span>
        </button>
      </div>
    </div>
  );
};

export default memo(ArtistZing);
