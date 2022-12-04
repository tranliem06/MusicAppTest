import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useStateValue } from "../Context/StateProvider";
import { ArtistZing } from "./";

const SearchArtist = () => {
  const [{ searchData }] = useStateValue();

  return (
    <Scrollbars autoHide style={{ width: "100%", height: " 100%" }}>
      <div>
        <div className="flex flex-col w-full  mt-4">
          <h3 className="text-lg font-bold text-[#32323d] mb-4">Artists</h3>
          <div className="flex flex-wrap justify-between  w-full gap-[28px] mb-[500px]">
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

export default SearchArtist;
