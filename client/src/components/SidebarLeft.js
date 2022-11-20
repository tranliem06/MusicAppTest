import React from "react";
import { sidebarMenu } from "../utils/menu";
import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";
// import path from "./../ultis/path";

const notActiveStyle =
  "py-2 px-[25px] text-[13px] font-semibold flex gap-[12px] items-center text-[#32323d] ";
const activeStyle =
  "py-2 px-[25px] text-[13px] font-semibold flex gap-[12px] items-center text-[#4285f4] ";

const SidebarLeft = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full pt-4">
      <div className="flex flex-col h-full">
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
    </div>
  );
};

export default SidebarLeft;
