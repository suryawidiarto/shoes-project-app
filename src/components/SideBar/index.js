import React from "react";
import { Link as LinkS } from "react-scroll";
import { Link as LinkR } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

import "./SideBar.scss";
import { SidebarContainer } from "./SideBarElements";

const SideBar = ({ isOpen, toggleSideBar }) => {
  return (
    <SidebarContainer isOpen={isOpen}>
      <CloseIcon className="sidebar-icon" onClick={toggleSideBar} />
      <div className="sidebar-menu">
        <div className="sidebar-item">
          <LinkS
            to="main"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-70}
            className="sidebar-link"
            onClick={toggleSideBar}
          >
            Back To Top
          </LinkS>
        </div>
        <div className="sidebar-item">
          <LinkS
            to="collection"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-70}
            className="sidebar-link"
            onClick={toggleSideBar}
          >
            Collection
          </LinkS>
        </div>
        <div className="sidebar-item">
          <LinkS
            to="feature"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-70}
            className="sidebar-link"
            onClick={toggleSideBar}
          >
            Features
          </LinkS>
        </div>
        <div className="sidebar-item">
          <LinkS
            to="findus"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-70}
            className="sidebar-link"
            onClick={toggleSideBar}
          >
            Find Us
          </LinkS>
        </div>
        <div className="sidebar-button">
          <LinkR to="/app" className="sidebar-btn-link">
            Shop Now !
          </LinkR>
        </div>
      </div>
    </SidebarContainer>
  );
};

export default SideBar;
