import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { IoLogoGameControllerA } from "react-icons/io";
import { RiPingPongFill } from "react-icons/ri";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Space Invaders",
    path: "/",
    icon: <IoLogoGameControllerA />,
    cName: "nav-text",
  },
  {
    title: "Pong",
    path: "/",
    icon: <RiPingPongFill />,
    cName: "nav-text",
  },
];