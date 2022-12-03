import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";

import { Search } from "../api/index";
import { useNavigate, createSearchParams } from "react-router-dom";

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
      // const response = await Search(keyword);
      // console.log(response);
      // dispatch({
      //   type: actionType.SEARCH,
      //   searchData: response.data.data,
      // });
      // console.log(keyword);

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
    <div className="w-full h-8  flex items-center justify-center">
      <div className="w-full gap-4 p-2  bg-[#4285f4]  shadow-md rounded-md flex items-center">
        <IoSearch className="text-2xl text-white" />
        <input
          type="text"
          value={keyword}
          className="w-full h-full bg-transparent text-lg text-white  border-none outline-none placeholder:text-white"
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
