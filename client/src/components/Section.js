import React from "react";
import { memo } from "react";
// import { useStateValue } from "../Context/StateProvider";
import { useNavigate } from "react-router-dom";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";

const Section = ({ data }) => {
  const [{ isPlayListZing }, dispatch] = useStateValue();
  const navigate = useNavigate();

  return (
    <div
      className="mt-12 px-[59px] flex flex-col gap-5"
      onClick={() => {
        dispatch({
          type: actionType.SET_PLAYLIST_FROM_ZING,
          isPlayListZing: true,
        });
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-5 font-bold text-[#4285f4]">{data?.title}</h3>
        <span className="text-xs">All</span>
      </div>
      <div className="flex items-start justify-between gap-[28px]">
        {data &&
          data.items?.length > 0 &&
          data.items
            .filter((item, index) => index <= 4)
            ?.map((item) => (
              <div
                key={item.encodeId}
                className="flex flex-col gap-2 flex-auto w-1/5 text-sm cursor-pointer"
                onClick={() => {
                  // console.log(albumPath);
                  navigate(item?.link?.split(".")[0]);
                }}
              >
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={item.thumbnailM}
                    alt="songCover"
                    className="w-full h-auto object-contain rounded-lg hover:scale-125"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold">
                    {item.title.length > 20
                      ? `${item.title.slice(0, 20)}...`
                      : item.title}
                  </span>

                  {data?.sectionId === "h100" ? (
                    <span>{item?.artistsNames}</span>
                  ) : (
                    <span className="text-[12px]">
                      {item.sortDescription?.length > 40
                        ? `${item.sortDescription?.slice(0, 40)}...`
                        : item.sortDescription}
                    </span>
                  )}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default memo(Section);
