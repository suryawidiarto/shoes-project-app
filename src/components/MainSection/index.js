import React from "react";
import { Link } from "react-router-dom";
import { BG_Landing } from "../../images";
import "./MainSection.scss";

const MainSection = () => {
  return (
    <div className="main-container" style={{ backgroundImage: `url(${BG_Landing})` }} id="main">
      <div className="main-wrapper">
        <div className="main-headline">
          <h1>ShoesProject X</h1>
        </div>
        <div className="main-description">
          <p>
            Sit elit nisi amet fugiat consectetur laboris incididunt cillum. Anim sit anim velit eu
            consequat in. Duis officia anim ullamco aliqua deserunt tempor. Ullamco proident officia
            incididunt duis magna tempor velit pariatur ullamco esse.
          </p>
        </div>
        <div className="main-button">
          <Link to="/app" className="main-btn-link">
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
