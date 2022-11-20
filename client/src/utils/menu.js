import icons from "./icons";

const {
  MdOutlineLibraryMusic,
  HiOutlineChartPie,
  BiLineChartDown,
  MdOutlineFeed,
} = icons;

export const sidebarMenu = [
  {
    path: "myMusic",
    text: "Personal",
    icons: <MdOutlineLibraryMusic size={24} />,
  },

  {
    path: "",
    text: "Explore",
    end: true,
    icons: <HiOutlineChartPie size={24} />,
  },
  {
    path: "zing-chart",
    text: "TopSong",
    icons: <BiLineChartDown size={24} />,
  },
  {
    path: "Follow",
    text: "Follow",
    icons: <MdOutlineFeed size={24} />,
  },
];
