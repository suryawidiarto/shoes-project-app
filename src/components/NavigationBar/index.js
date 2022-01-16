import React from "react";
import { Link as LinkS } from "react-scroll";
import { Link as LinkR } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import "./NavigationBar.scss";

const NavigationBar = ({ toggleSideBar }) => {
  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <LinkS to="main" smooth={true} duration={500} spy={true} exact="true" offset={-70}>
          ShoesProject
        </LinkS>
      </div>
      <div className="nav-menu">
        <div className="nav-item">
          <LinkS
            to="feature"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-70}
            className="nav-link"
          >
            Features
          </LinkS>
        </div>
        <div className="nav-item">
          <LinkS
            to="collection"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-70}
            className="nav-link"
          >
            Collection
          </LinkS>
        </div>
        <div className="nav-item">
          <LinkS
            to="findus"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-70}
            className="nav-link"
          >
            Our Store
          </LinkS>
        </div>
      </div>
      <div className="nav-button">
        <LinkR to="/app" className="nav-btn-link">
          Shop Now
        </LinkR>
      </div>

      <div className="nav-sidebar" onClick={toggleSideBar}>
        <MenuIcon />
      </div>
    </nav>
  );
};

export default NavigationBar;
