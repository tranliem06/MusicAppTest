import icons from "./icons";

const { BsFillPersonFill, RiEarthFill, BsBarChartFill, HiUserGroup } = icons;

export const sidebarMenu = [
  {
    path: "myMusic",
    text: "Personal",
    icons: <BsFillPersonFill size={24} />,
  },

  {
    path: "",
    text: "Explore",
    end: true,
    icons: <RiEarthFill size={24} />,
  },
  {
    path: "zing-chart",
    text: "TopSong",
    icons: <BsBarChartFill size={24} />,
  },
  {
    path: "allartists",
    text: "Artists",
    icons: <HiUserGroup size={24} />,
  },
];
