import React, { memo } from "react";
import { List } from "../components";

const Lists = ({ songs, totalDuration }) => {
  // console.log({ songs, totalDuration });

  return (
    <div className=" w-full flex flex-col text-xs text-gray-600">
      <div className="border border-green-500 flex justify-between  p-[10px] font-semibold uppercase">
        <span>Title</span>
        <span>Album</span>
        <span>Length</span>
      </div>
      <div className="flex flex-col">
        {songs?.map((item) => (
          <List key={item.encodeId} songData={item} />
        ))}
      </div>
    </div>
  );
};

export default memo(Lists);
