import React, { memo } from "react";
import icons from "../utils/icons";
import moment from "moment";

const { BsMusicNoteBeamed } = icons;

const List = ({ songData }) => {
  //   console.log(songData);
  return (
    <div className="flex justify-between items-center p-[10px]">
      <div className="flex items-center gap-3 flex-1">
        <span>
          <BsMusicNoteBeamed />
        </span>
        <img
          src={songData?.thumbnail}
          alt="thumbnail"
          className="w-10 h-10 object-cover rounded-md"
        />
        {/* title and aritsts */}
        <span className="flex flex-col">
          <span className="text-sm font-semibold">
            {songData?.title?.length > 30
              ? `${songData?.title.slice(0, 30)}...`
              : songData?.title}
          </span>
          <span>{songData?.artistsNames}</span>
        </span>
      </div>
      <div className="flex-1 flex justify-center">
        {songData?.album?.title.length > 0
          ? songData?.album?.title
          : `${songData?.title} (single)`}
      </div>
      <div className="flex-1 flex justify-end">
        {moment.utc(songData?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};

export default memo(List);
