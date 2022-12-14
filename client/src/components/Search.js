import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { GetSearchData } from "../api";
import { Loading2 } from "./";
import { NavLink, useSearchParams } from "react-router-dom";

import { searchMenu } from "../utils/menu";

const Search = () => {
  // const [searchParams] = useSearchParams();
  // console.log(searchParams);
  //   const [data, setData] = useState({});

  const [{ searchData, isLoading }, dispatch] = useStateValue();

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  let keyword = params.q;

  console.log("hello");
  console.log(keyword);
  console.log(keyword.split(" ").join("+"));

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
          {searchMenu.map((item) => (
            <NavLink
              key={item.path}
              to={`${item.path}?q=${keyword.split(" ").join("+")}`}
              className={({ isActive }) =>
                isActive
                  ? "px-4  font-semibold cursor-pointer  text-[#4285f4]"
                  : "px-4 hover:text-[#4285f4] font-semibold cursor-pointer"
              }
            >
              {item.text}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Search;
