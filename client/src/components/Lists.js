import React, { memo } from "react";
import { List } from "../components";
import icons from "../utils/icons";
import moment from "moment";

const { BsDot } = icons;

const Lists = ({ songs, totalDuration }) => {
  // console.log({ songs, totalDuration });

  return (
    <div className=" w-full flex flex-col text-xs text-gray-600">
      <div className="border border-green-500 flex   p-[10px] font-semibold uppercase">
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

      <div className="flex flex-col">
        {songs?.map((item) => (
          <List key={item.encodeId} songData={item} />
        ))}
      </div>

      <span className="flex items-center gap-2 px-4 py-[10px] border-t border-blue-500">
        <span>{`${songs?.length} songs`}</span>
        <BsDot size={24} />
        <span>{moment.utc(totalDuration * 1000).format("HH:mm:ss")}</span>
      </span>
    </div>
  );
};

export default memo(Lists);
