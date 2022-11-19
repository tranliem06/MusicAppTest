import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import {
  getAuth,
  GoogleAuthProvider,
  inMemoryPersistence,
  signInWithPopup,
} from "firebase/auth";

import { app } from "./config/firebase.config";
import { getAllSongs, validateUser } from "./api";

import {
  Dashboard,
  Home,
  Loader,
  Login,
  MusicPlayer,
  UserProfile,
  Public,
  Album,
} from "./components";

import { useStateValue } from "./Context/StateProvider";
import { actionType } from "./Context/reducer";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [
    { user, allSongs, song, isSongPlaying, miniPlayer, banner },
    dispatch,
  ] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          // console.log(token);
          window.localStorage.setItem("auth", "true");
          validateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
        setIsLoading(false);
      } else {
        setAuth(false);
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        setIsLoading(false);
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, []);

  useEffect(() => {
    if (!allSongs && user) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);

  //***************************** */
  useEffect(() => {
    if (banner.length === 0) {
      async function fetchHomeData() {
        // ...
        const resquestUrl = "https://api-zingmp3-public.herokuapp.com/api/home";
        const response = await fetch(resquestUrl);
        const responseJSON = await response.json();
        // console.log("hello");
        // console.log({ responseJSON });

        dispatch({
          type: actionType.GET_HOME,
          homeData: responseJSON.data.items,
        });
      }

      fetchHomeData();
    }
  });

  return (
    <AnimatePresence>
      <div className="h-auto flex items-center justify-center min-w-[680px]">
        {isLoading ||
          (!user && (
            <div className="fixed inset-0 bg-loaderOverlay backdrop-blur-sm ">
              <Loader />
            </div>
          ))}
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/*" element={<Public />}>
            <Route path="" element={<Home />} />
            <Route path="album/:title/:pid" element={<Album />} />
          </Route>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/userProfile" element={<UserProfile />} />
        </Routes>

        {isSongPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed min-w-[700px] h-26  inset-x-0 bottom-0  bg-white drop-shadow-xl backdrop-blur-md flex items-center justify-center`}
          >
            <MusicPlayer />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}

export default App;
