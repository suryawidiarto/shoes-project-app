import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-col1">
          <div className="f-col1-headline">About Us.</div>
          <div className="f=col1-description">
            Anim anim est ut est est cupidatat ad quis officia do officia amet. Do et culpa dolore
            esse et qui sint esse in laborum in qui magna. Et consequat esse minim nulla aliquip
            incididunt.
          </div>
        </div>
        <div className="footer-col2">
          <div className="f-col2-link">Contact</div>
          <div className="f-col2-link">Career</div>
          <div className="f-col2-link">Reseller</div>
          <div className="f-col2-link">Terms of Service</div>
        </div>
      </div>
      <div className="footer-col3">
        <div className="f-col3-title">ShoesProject</div>
        <div className="f-col3-copyright"> ShoesProject Ltd.</div>
        <div className="f-col3-icon">
          <InstagramIcon />
          <FacebookIcon />
          <TwitterIcon />
          <GitHubIcon />
        </div>
      </div>
    </div>
  );
};

export default Footer;
