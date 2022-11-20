import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo2 } from "../assets/img";
import { useStateValue } from "../Context/StateProvider";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { motion } from "framer-motion";

import { SearchBar } from "../components";

const Header = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const logout = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex items-center justify-between w-full p[10px] md:py-2 md:px-6">
      <div className=" w-[20%] items-start">
        <NavLink to={"/"} cla>
          <div className="flex gap-2 items-center justify-start">
            <img src={Logo2} className="w-10" alt="" />
            <p className="text-[18px] text-blue-500 font-semibold">
              BLUEPLAYER
            </p>
          </div>
        </NavLink>
      </div>

      {/* <ul className="flex flex-auto items-center justify-center">
        <li className="mx-5 text-[10px]"><NavLink to={'/home'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Home</NavLink></li>
        <li className="mx-5 text-[10px]"><NavLink to={'/musics'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Musics</NavLink></li>
        <li className="mx-5 text-[10px]"><NavLink to={'/premium'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Premium</NavLink></li>
        <li className="mx-5 text-[10px]"><NavLink to={'/contact'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Contact</NavLink></li>
      </ul> */}
      <div className="w-[40%]">
        <SearchBar />
      </div>

      <div className="w-[20%]">
        <div
          className="flex  justify-end items-center ml-auto cursor-pointer gap-2 relative"
          onMouseEnter={() => setIsMenu(true)}
          onMouseLeave={() => setIsMenu(false)}
        >
          <div className="flex w-[160px] justify-center items-center gap-2 ">
            <div>
              <p className="text-textColor text-lg hover:text-headingColor ">
                {user?.user.name}
              </p>
              {/* <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">
                Premium Member.{" "}
                <FaCrown className="text-xm -ml-1 text-yellow-500" />{" "}
              </p> */}
            </div>
            <img
              className="w-12 min-w-[44px] object-cover rounded-full shadow-lg"
              src={user?.user?.imageURL}
              alt=""
              referrerPolicy="no-referrer"
            />
          </div>
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="absolute z-10 top-12 right-0 w-275 p-4 gap-4 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col"
            >
              <NavLink to={"/userProfile"}>
                <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                  Profile
                </p>
              </NavLink>
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                My Favourites
              </p>
              <hr />
              {user?.user.role === "admin" && (
                <>
                  <NavLink to={"/dashboard/home"}>
                    <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                      Dashboard
                    </p>
                  </NavLink>
                  <hr />
                </>
              )}
              <p
                className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out"
                onClick={logout}
              >
                Sign out
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
