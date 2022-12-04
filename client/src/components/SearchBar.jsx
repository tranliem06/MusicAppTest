import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";

import { Search } from "../api/index";
import { useNavigate, createSearchParams } from "react-router-dom";
import { GrClose } from "react-icons/gr";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [{ searchData }, dispatch] = useStateValue();
  const navigate = useNavigate();

  // useEffect(() => {
  //   window.addEventListener("keyup", handleSearch);
  //   return () => {
  //     window.removeEventListener("keyup", handleSearch);
  //   };
  // }, []);
  const handleSearch = (e) => {
    // setKeyword(e.target.value);
    if (e.keyCode === 13) {
      navigate({
        pathname: "/tim-kiem/tat-ca",
        search: createSearchParams({
          q: keyword,
        }).toString(),
      });
    }

    // navigate(``);
  };

  return (
    <div className={`" w-full h-8  flex items-center justify-center"`}>
      <div className=" relative w-full absolute gap-4 p-2  bg-gray-200 rounded-md flex items-center ">
        {keyword && (
          <span
            onClick={() => setKeyword("")}
            className="absolute right-[16px]"
          >
            <GrClose />
          </span>
        )}
        <IoSearch className="text-[#32323d] text-[20px]" />
        <input
          type="text"
          value={keyword}
          className="w-full h-full bg-transparent text-lg text-[#32323d]  border-none outline-none placeholder:text-[#32323d]"
          placeholder="Search here ...."
          spellCheck="false"
          onChange={(e) => setKeyword(e.target.value)}
          onKeyUp={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
