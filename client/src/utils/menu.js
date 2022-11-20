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
    text: "Cá Nhân",
    icons: <MdOutlineLibraryMusic size={24} />,
  },

  {
    path: "",
    text: "Khám Phá",
    end: true,
    icons: <HiOutlineChartPie size={24} />,
  },
  {
    path: "zing-chart",
    text: "#Zingchart",
    icons: <BiLineChartDown size={24} />,
  },
  {
    path: "Follow",
    text: "follow",
    icons: <MdOutlineFeed size={24} />,
  },
];
