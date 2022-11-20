import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getAuth,
  GoogleAuthProvider,
  inMemoryPersistence,
  signInWithPopup,
} from "firebase/auth";

import { app } from "./config/firebase.config";
import { getAllAlbums, getAllArtist, getAllSongs, validateUser } from "./api";

import {
  Dashboard,
  Home,
  Loading2,
  Login,
  MusicPlayer,
  UserProfile,
  Public,
  Album,
  WeekRank,
} from "./components";

import { useStateValue } from "./Context/StateProvider";
import { actionType } from "./Context/reducer";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [
    {
      user,
      allSongs,
      artists,
      allAlbums,
      song,
      isSongPlaying,
      miniPlayer,
      banner,
    },
    dispatch,
  ] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    if (!artists) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
      });
    }
  }, []);
  useEffect(() => {
    // setIsLoading(true);
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
        // setIsLoading(false);
      } else {
        setAuth(false);
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        // setIsLoading(false);
        console.log(isLoading);
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
        setIsLoading(true);

        // ...
        const resquestUrl = "https://api-zingmp3-public.herokuapp.com/api/home";
        const response = await fetch(resquestUrl);
        const responseJSON = await response.json();
        // console.log("hello");
        console.log({ responseJSON });
        setIsLoading(false);

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
      <div className="relative h-auto flex items-center justify-center min-w-[680px]">
        {isLoading && (
          <div className="absolute top-0 bottom-0 left-0 right-0 z-50 bg-[#f5f3f3] flex items-center justify-center">
            <Loading2 />
          </div>
        )}
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/*" element={<Public />}>
            <Route path="" element={<Home />} />
            <Route path="album/:title/:pid" element={<Album />} />
            <Route path="playlist/:title/:pid" element={<Album />} />
            {/* <Route path="zing-chart-tuan/:title/:pid" element={<WeekRank />} /> */}
          </Route>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/userProfile" element={<UserProfile />} />
        </Routes>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </AnimatePresence>
  );
}

export default App;
