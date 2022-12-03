import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { GetSearchData } from "../api";
import { useState } from "react";
import { Loading2 } from "./";
import { Scrollbars } from "react-custom-scrollbars-2";

const Search = () => {
  //   const [data, setData] = useState({});

  const [{ searchData, isLoading }, dispatch] = useStateValue();

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  let keyword = params.q;
  console.log(keyword);

  useEffect(() => {
    const fetchSearchData = async () => {
      dispatch({
        type: actionType.LOADING,
        isLoading: true,
      });
      console.log("hello");
      const response = await GetSearchData(keyword);
      console.log(response);

      dispatch({
        type: actionType.LOADING,
        isLoading: false,
      });

      if (response?.data.err === 0) {
        // setData(response.data?.data);
        dispatch({
          type: actionType.SEARCH,
          searchData: response?.data?.data,
        });
      }
      //   console.log(response.data);
    };

    fetchSearchData();
  }, [keyword]);

  return (
    <div className="relative w-full h-full px-[59px] ">
      {isLoading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-50 bg-[#f5f3f3] flex items-center justify-center">
          <Loading2 />
          {/* <Loading /> */}
        </div>
      )}
      <div className="flex h-[50px] mb-7 items-center text-sm border-b border-gray-400 pl-[60px] pb-1">
        <span className="text-[24px] font-bold pr-6 text-[#32323d]">
          Search Results
        </span>

        <div className="flex items-center">
          <span className="px-4 hover:text-[#4285f4] font-semibold cursor-pointer ">
            All
          </span>
          <span className="px-4 hover:text-[#4285f4] font-semibold cursor-pointer ">
            Songs
          </span>
          <span className="px-4 hover:text-[#4285f4] font-semibold cursor-pointer ">
            Playlist/Album
          </span>
        </div>
      </div>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Search;
