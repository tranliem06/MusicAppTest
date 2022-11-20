import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStateValue } from "../Context/StateProvider";
import { Link } from "react-router-dom";
import { IoLogoInstagram, IoLogoTwitter } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { getAllArtist } from "../api";
import { actionType } from "../Context/reducer";
import { useNavigate } from "react-router-dom";

const Artists = () => {
  const [{ artists, homeData }, dispatch] = useStateValue();
  //   useEffect(() => {
  //     if (!artists) {
  //       getAllArtist().then((data) => {
  //         dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
  //       });
  //     }
  //   }, []);

  return (
    <div className="w-full p-4 flex items-center justify-start flex-col">
      <div>
        <p className="text-[20px] text-[#4285f4] font-bold">
          Your Favorite Aritst?
        </p>
      </div>
      <div className="relative w-full gap-3  my-4 p-4 rounded-md flex flex-wrap justify-start">
        {artists &&
          artists.map((data, index) => (
            <>
              <ArtistCard key={index} data={data} index={index} />
            </>
          ))}
      </div>
    </div>
  );
};

export const ArtistCard = ({ data, index }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [{ artists, banner }, dispatch] = useStateValue();
  useEffect(() => {
    if (banner) {
      setIsLoading(true);
    }
  }, [banner]);
  console.log(isLoading);
  const handleClickArtist = (artistname) => {
    const artistPath = artistname?.toLowerCase().split(" ").join("");
    if (isLoading) {
      console.log(artistPath);
    }
    // navigate(artistPath);
  };
  return (
    <motion.div
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="w-44 min-w-200 px-2 py-4 gap-3 cursor-pointer  rounded-lg flex flex-col items-center overflow-hidden"
      onClick={handleClickArtist(data?.name)}
    >
      <div className="overflow-hidden transition-all 0.3s ease-in-out">
        <img
          src={data?.imageURL}
          className="w-full h-40 object-cover rounded-md hover:scale-110"
          alt="artist"
        />
      </div>
      <p className="text-base text-textColor font-semibold">{data.name}</p>
    </motion.div>
  );
};

export default Artists;
