import React, { useEffect } from "react";
// import { LoginBg } from "../assets/video";
import { Bg1, Bg2, Bg3, Gif1, Logo2 } from "../assets/img";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";

import { ImGoogle } from "react-icons/im";

const Login = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [{ user, isLoadingHome }, dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    // dispatch({
    //   type: actionType.LOADING_HOME,
    //   isLoadingHome: false,
    // });
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              window.localStorage.setItem("auth", "true");
              validateUser(token).then((data) => {
                dispatch({
                  type: actionType.SET_USER,
                  user: data,
                });
              });
            });
            navigate("/", { replace: true });
          } else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null,
            });
            navigate("/login");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true")
      navigate("/", { replace: true });
  }, []);

  return (
    <div className="relative w-screen h-screen bg-gray-100">
      {/* <div className="w-full h-full object-cover">
        <img src={Bg2} alt="bg" />
      </div> */}
      <div className="absolute inset-0  flex items-center justify-center p-4">
        <div className="w-full md:w-375 p-4 bg-gray-100 rounded-md backdrop-blur-md flex flex-col items-center justify-center gap-4">
          <div className="flex gap-2 items-center justify-start">
            <img src={Logo2} className="w-10" alt="" />
            <p className="text-[18px] text-blue-500 font-semibold">
              BLUEPLAYER
            </p>
          </div>
          <div className="w-[500px] flex items-center justify-center">
            <span className="text-[14px] text-center">
              Feeling Blue? Dont worry we are here for you
            </span>
          </div>
          <div className="w-[500px] h-auto rounded-lg">
            <img
              src={Gif1}
              alt="gif1"
              className="object-cover w-full rounded-lg"
            />
          </div>
          <div
            onClick={loginWithGoogle}
            className="flex items-center justify-center  gap-2 px-6 py-4 rounded-md bg-[#4285f4] text-white cursor-pointer hover:bg-[#4f68b2] duration-100 ease-in-out transition-all"
          >
            <ImGoogle size={30} />
            <p className="">Sign In With Google</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
