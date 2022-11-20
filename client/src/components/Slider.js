import React, { useEffect } from "react";
import { actionType } from "../Context/reducer";
// import { useSelector } from "react-redux"

//**************************** */
import { useStateValue } from "../Context/StateProvider";
import { getArrSlider } from "../utils/supportfunctions";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  // const { banner } = useSelector((state) => state.app);
  const navigate = useNavigate();

  const [{ banner, isPlayListZing }, dispatch] = useStateValue();

  // console.log(banner);

  useEffect(() => {
    const sliderEls = document.getElementsByClassName("slider-item");
    // console.log(sliderEls);

    let min = 0;
    let max = 2;
    const intervalId = setInterval(() => {
      // console.log(1);
      const list = getArrSlider(min, max, sliderEls.length - 1);

      for (let i = 0; i < sliderEls.length; i++) {
        //Delete classname css

        sliderEls[i]?.classList.remove(
          "animate-slide-right",
          "order-last",
          "z-20"
        );
        sliderEls[i]?.classList.remove(
          "animate-slide-left",
          "order-first",
          "z-10"
        );
        sliderEls[i]?.classList.remove(
          "animate-slide-left2",
          "order-2",
          "z-10"
        );

        //Hider or show img
        if (list.some((item) => item === i)) {
          sliderEls[i].style.cssText = "display: block";
        } else {
          sliderEls[i].style.cssText = "display: none";
        }
      }

      //add animation
      list.forEach((item) => {
        if (item === max) {
          sliderEls[item]?.classList.add(
            "animate-slide-right",
            "order-last",
            "z-20"
          );
        } else if (item === min) {
          sliderEls[item]?.classList.add(
            "animate-slide-left",
            "order-first",
            "z-10"
          );
        } else {
          sliderEls[item]?.classList.add(
            "animate-slide-left2",
            "order-2",
            "z-10"
          );
        }
      });
      // sliderEls[max].classList.add("animate-slide-right");

      min = min === sliderEls.length - 1 ? 0 : min + 1;
      max = max === sliderEls.length - 1 ? 0 : max + 1;

      // console.log(list);
    }, 2500);
    return () => {
      intervalId && clearInterval(intervalId);
    };
  });

  const handleClickBanner = (item) => {
    // console.log(item);
    // console.log("hello");
    dispatch({
      type: actionType.SET_PLAYLIST_FROM_ZING,
      isPlayListZing: false,
    });
    if (item?.type === 1) {
      dispatch({
        type: actionType.SET_CUR_SONG_ID,
        curSongId: item.encodeId,
      });
    } else if (item?.type === 4) {
      // console.log(item);
      const albumPath = item?.link?.split(".")[0];
      // console.log(albumPath);
      navigate(albumPath);
    }
  };
  return (
    <div className="w-full overflow-hidden px-[59px] pt-5">
      <div className="flex flex-col gap-5">
        <h3 className="text-5 font-bold text-[#4285f4]">Spotlight today</h3>

        <div className=" flex gap-8  w-full">
          {banner?.map((item, index) => (
            <img
              key={item.encodeId}
              src={item.banner}
              alt="banner"
              onClick={() => handleClickBanner(item)}
              className={`slider-item flex-1 object-contain w-[30%] rounded-md ${
                index <= 2 ? "block" : "hidden"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
