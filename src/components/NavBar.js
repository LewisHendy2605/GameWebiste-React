import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import "./NavBar.css";
import { IconContext } from "react-icons";
import DropDownItem from "./dropDownItem.js";

export default function NavBar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const [aboutMeLinks, setaboutMeLinks] = useState(false);
  const showAboutMeLinks = () => {
    console.log(aboutMeLinks);
    setaboutMeLinks(!aboutMeLinks);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="navbar-items" onClick={showAboutMeLinks}>
            <h2>About Me</h2>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <h2> Lewis Website</h2>
        <DropDownItem active={aboutMeLinks} />
      </IconContext.Provider>
    </>
  );
}
