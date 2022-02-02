import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../redux/actions/OrderActions";
import { resetItemCart } from "../../redux/actions/CartActions";
import { popNotification, resetNotification } from "../../redux/actions/NotificationActions";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Loading from "../../components/Loading";
import "./ShippingDetail.scss";

const ShippingDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [wait, setWait] = useState(false);
  const UserSign = useSelector((state) => state.UserSign);
  const ShippingData = useSelector((state) => state.ShippingData);
  const Order = useSelector((state) => state.Order);
  const {
    userId,
    name,
    address,
    province,
    district,
    sub_district,
    postal_code,
    payment_method,
    cart,
  } = ShippingData.data;

  const calcPrice = () => {
    const cartPrice = cart.map((item) => item.productPrice);
    const product_price = cartPrice.reduce((pre, curr) => pre + curr);
    const shipping_price = cartPrice.length * 1;
    const total_price = product_price + shipping_price;
    return { product_price, shipping_price, total_price };
  };

  const shippingDetailPrice = calcPrice();

  const orderHandler = () => {
    dispatch(
      createOrder({
        userId,
        name,
        address,
        province,
        district,
        sub_district,
        postal_code,
        payment_method,
        cart,
        shippingDetailPrice,
      })
    );
    setWait(true);
  };

  useEffect(() => {
    if (!UserSign.isLogin) {
      navigate("/app", { replace: true });
    }

    if (Order.warn === "success" && Order.orderId) {
      dispatch(popNotification("success", "Create Order Successfull"));
      setWait(false);
      dispatch(resetItemCart());
      setTimeout(() => {
        dispatch(resetNotification());
        navigate(`/app/order/${Order.orderId}`, { replace: true });
        dispatch({ type: "RESET_ORDER_WARN" });
      }, 1500);
    }

    if (Order.warn === "failed") {
      dispatch(popNotification("error", "Add Shipping Data Failed"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "RESET_ORDER_WARN" });
      }, 1500);
    }
  }, [Order.orderId, Order.warn, UserSign.isLogin, dispatch, navigate]);

  return !ShippingData.data ? (
    <Loading />
  ) : (
    <div className="shipping-detail-container">
      <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={wait}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="shipping-detail-wrapper">
        <div className="shipping-detail-description">
          <div className="shipping-detail-address">
            <h3 className="shipping-title">Shipping Detail</h3>
            <label htmlFor="shipping-name" className="label">
              Name :{" "}
            </label>
            <p className="shipping-name" id="shipping-name">
              {name}
            </p>
            <label htmlFor="shipping-address" className="label">
              Address :{" "}
            </label>
            <p className="shipping-address" id="shipping-address">
              {address}, {sub_district}, {district}, {province}, {postal_code}
            </p>
            <label htmlFor="shipping-payment" className="label">
              Payment Method :{" "}
            </label>
            <p className="shipping-payment" id="shipping-payment">
              {payment_method}
            </p>
          </div>
          <div className="shipping-product">
            <h3 className="product-title">Products</h3>
            <TableContainer className="shipping-table-container" component={Paper} elevation={3}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center">Product Name</TableCell>
                    <TableCell align="center">Size</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart &&
                    cart.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell align="center" key={index}>
                          <img
                            className="shipping-image"
                            alt="shipping-img"
                            src={`${process.env.REACT_APP_SERVER_URL}/sp-api-products/product-img/${item.productImage}`}
                          />
                        </TableCell>
                        <TableCell align="center">{item.productName}</TableCell>
                        <TableCell align="center">{item.productSize}</TableCell>
                        <TableCell align="center">{item.productQty}</TableCell>
                        <TableCell align="center">${item.productPrice}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="shipping-detail-pricing">
          <div className="shipping-pricing">
            <p className="detail-product-price">Product Price</p>
            <h4>${shippingDetailPrice.product_price}</h4>
            <p className="detail-product-shipment">Shipping Price</p>
            <h4>${shippingDetailPrice.shipping_price}</h4>
            <p className="detail-product-total">Total Price</p>
            <h4>${shippingDetailPrice.total_price}</h4>
          </div>
          <div className="shipping-order-button" onClick={orderHandler}>
            Order
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetail;
