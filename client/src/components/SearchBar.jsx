import React from "react";
import { IoSearch } from "react-icons/io5";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";

const SearchBar = () => {
  const [{ searchTerm }, dispatch] = useStateValue();

  const setSearchTerm = (value) => {
    dispatch({
      type: actionType.SET_SEARCH_TERM,
      searchTerm: value,
    });
  };

  return (
    <div className="w-full h-8  flex items-center justify-center">
      <div className="w-full gap-4 p-2  bg-[#4285f4]  shadow-md rounded-md flex items-center">
        <IoSearch className="text-2xl text-white" />
        <input
          type="text"
          value={searchTerm}
          className="w-full h-full bg-transparent text-lg text-white  border-none outline-none placeholder:text-white"
          placeholder="Search here ...."
          spellCheck="false"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
