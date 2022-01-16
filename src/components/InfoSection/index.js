import React from "react";
import "./InfoSection.scss";

const InfoSection = (props) => {
  return (
    <div className="info-container" style={{ backgroundColor: `${props.HexColor}` }} id={props.Id}>
      <div className="info-wrapper">
        <div className="info-col1">
          <img className="col1-img" alt="img" src={props.Img} />
        </div>
        <div className="info-col2">
          <div className="col2-title">{props.Title}</div>
          <div className="col2-headline">{props.Headline}</div>
          <div className="col2-description">{props.Description}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
