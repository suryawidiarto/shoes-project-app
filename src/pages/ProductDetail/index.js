import React, { useEffect, useState } from "react";
import ProductSize from "../../components/ProductSize";
import { useParams } from "react-router-dom";
import "./ProductDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../redux/actions/ProductActions";
import Loading from "../../components/Loading";
import { addToCart } from "../../redux/actions/CartActions";
import { popNotification, resetNotification } from "../../redux/actions/NotificationActions";
import ProductQty from "../../components/ProductQty";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const ProductById = useSelector((state) => state.ProductById);
  const UserSign = useSelector((state) => state.UserSign);
  const Cart = useSelector((state) => state.Cart);
  const { data } = ProductById;
  const [productSize, setProductSize] = useState("");
  const [productQty, setProductQty] = useState("");
  const [sizeQty, setSizeQty] = useState("");

  const sizeHandler = (sended) => {
    setProductSize(sended);
    setProductQty("");
  };

  const sizeQtyHandler = (indexSize) => {
    setSizeQty(data.stock[indexSize].inStock);
  };

  const qtyHandler = (sended) => {
    setProductQty(sended);
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    if (UserSign.isLogin) {
      dispatch(addToCart(productSize, productQty));
    } else {
      dispatch(popNotification("warning", "Please Login Before Adding Item to Cart"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "CART_RESET_WARN" });
      }, 2000);
    }
  };

  useEffect(() => {
    dispatch(getProductById(productId));
    if (Cart.warn === "success") {
      dispatch(popNotification("success", "Add Item To Cart Successfull"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "CART_RESET_WARN" });
      }, 1500);
    }

    if (Cart.warn === "failed") {
      dispatch(popNotification("error", "Add Item To Cart Failed"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "CART_RESET_WARN" });
      }, 1500);
    }

    if (Cart.warn === "error") {
      dispatch(popNotification("warning", "Item With Same Product and Size Will Get Overwritten"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "CART_RESET_WARN" });
      }, 1500);
    }
  }, [Cart.warn, dispatch, productId]);

  return !data ? (
    <Loading />
  ) : (
    <div className="product-container">
      <div className="detail-wrapper">
        <div className="detail-head">
          <img
            className="detail-img"
            alt="detail-img"
            src={data && `http://localhost:2000/sp-api-products/product-img/${data.image[0]}`}
          />
        </div>
        <form className="detail-form" onSubmit={addToCartHandler}>
          <div className="detail-title">{data ? data.name : ""}</div>
          <div className="detail-price">${data ? data.price : ""}</div>
          <div className="detail-description">{data ? data.description : ""}</div>
          <div className="detail-size-qty">
            <ProductSize
              className="detail-size-select"
              Size={data ? data.stock : ""}
              clickHandler={sizeHandler}
              sizeState={productSize}
              sizeQtyHandler={sizeQtyHandler}
            />
            <div className="detail-gap" />
            <ProductQty Qty={sizeQty} clickHandler={qtyHandler} qtyState={productQty} />
          </div>
          <button className="detail-button"> Add to Cart ! </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;
