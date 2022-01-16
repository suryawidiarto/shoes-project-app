import React from "react";
import "./InfoSection2.scss";

const InfoSection2 = (props) => {
  return (
    <div className="info2-container" style={{ backgroundColor: `${props.HexColor}` }} id={props.Id}>
      <div className="info2-wrapper">
        <div className="info2-col1">
          {props.Maps ? (
            <iframe
              className="col1-maps"
              title="maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26030.395396954013!2d138.70985379914703!3d35.360623737281166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6019629a42fdc899%3A0xa6a1fcc916f3a4df!2sMount%20Fuji!5e0!3m2!1sen!2sid!4v1642323540825!5m2!1sen!2sid"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          ) : (
            <img className="col1-img" alt="img" src={props.Img} />
          )}
        </div>
        <div className="info2-col2">
          <div className="col2-title">{props.Title}</div>
          <div className="col2-headline">{props.Headline}</div>
          <div className="col2-description">{props.Description}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection2;
