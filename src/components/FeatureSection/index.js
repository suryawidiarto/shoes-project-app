import React from "react";
import { FT_L_Order, FT_L_Payment, FT_L_Quality, FT_L_Shipment } from "../../images";

import "./FeatureSection.scss";

const FeatureSection = (props) => {
  return (
    <div className="feature-container" id={props.Id}>
      <div className="feature-item-wrapper">
        <div className="feature-item">
          <img className="feature-img" alt="img-feat" src={FT_L_Payment} />
          <p className="feature-headline">Easy Payment</p>
          <p className="feature-description">
            Cupidatat officia qui quis nostrud eu laboris ex laborum consectetur eu non amet ea.
          </p>
        </div>

        <div className="feature-item">
          <img className="feature-img" alt="img-feat" src={FT_L_Quality} />
          <p className="feature-headline">Best Quality</p>
          <p className="feature-description">
            Cupidatat officia qui quis nostrud eu laboris ex laborum consectetur eu non amet ea.
          </p>
        </div>
        <div className="feature-item">
          <img className="feature-img" alt="img-feat" src={FT_L_Shipment} />
          <p className="feature-headline">Fast Shipment</p>
          <p className="feature-description">
            Cupidatat officia qui quis nostrud eu laboris ex laborum consectetur eu non amet ea.
          </p>
        </div>
        <div className="feature-item">
          <img className="feature-img" alt="img-feat" src={FT_L_Order} />
          <p className="feature-headline">Easy Order</p>
          <p className="feature-description">
            Cupidatat officia qui quis nostrud eu laboris ex laborum consectetur eu non amet ea.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
