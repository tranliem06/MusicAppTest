import React from "react";
import { sidebarMenu } from "../utils/menu";
import { NavLink } from "react-router-dom";
import { Premium } from "../assets/img";
import { FaCrown } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
// import path from "./../ultis/path";

const notActiveStyle =
  "py-2 px-[25px] text-[13px] font-semibold flex gap-[12px] items-center text-[#32323d]  hover:bg-[#bfdbfe]";
const activeStyle =
  "py-2 px-[25px] text-[13px] font-semibold flex gap-[12px] items-center text-[#4285f4] hover:bg-[#bfdbfe]";

const SidebarLeft = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full pt-4 px-4">
      <div className="flex flex-col h-full ">
        {sidebarMenu.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            end={item.end}
            className={({ isActive }) =>
              isActive ? activeStyle : notActiveStyle
            }
          >
            {item.icons}
            <span>{item.text}</span>
          </NavLink>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div className="mx-4 rounded-md">
          <img
            src={Premium}
            alt="premium"
            className="object-contain  rounded-lg"
          />
        </div>
        <div className="mx-4 mb-4 rounded-md bg-[#fdd100] flex flex-col items-center justify-center py-2">
          <span>
            <FaCrown size={40} />
          </span>
          <span className="text-center text-[14px] font-semibold">
            Upgrage to Premium
          </span>
        </div>
      </div>
    </div>
  );
};

export default SidebarLeft;
