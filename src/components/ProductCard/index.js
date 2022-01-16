import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.scss";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const cardHandler = () => {
    navigate(`product/${props.ProductId}`);
  };
  return (
    <div className="home-card" onClick={cardHandler}>
      <div className="card-head">
        <img alt="img" className="card-img" src={props.Img} />
      </div>
      <div className="card-body">
        <div className="card-title">{props.Title}</div>
        <div className="card-price">${props.Price}</div>
        <div className="card-description">{props.Description}</div>
      </div>
    </div>
  );
};

export default ProductCard;
