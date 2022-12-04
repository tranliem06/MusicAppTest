import React, { memo } from "react";
import { List } from "../components";
import icons from "../utils/icons";
import moment from "moment";
import { useStateValue } from "../Context/StateProvider";

const { BsDot } = icons;

const Lists = ({ totalDuration }) => {
  // console.log({ songs, totalDuration });
  const [{ dataForRenderAlbum }, dispatch] = useStateValue();

  return (
    <div className=" w-full flex flex-col text-xs text-gray-600">
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

      <div className="flex flex-col">
        {dataForRenderAlbum?.map((item) => (
          <List key={item.encodeId} songData={item} />
        ))}
      </div>

      <span className="flex items-center gap-2 px-4 py-[10px] border-t border-blue-500">
        <span>{`${dataForRenderAlbum?.length} songs`}</span>
        <BsDot size={24} />
        <span>{moment.utc(totalDuration * 1000).format("HH:mm:ss")}</span>
      </span>
    </div>
  );
};

export default memo(Lists);
