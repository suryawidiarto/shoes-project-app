import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./OrderDetailPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { confirmDelivered, getOrderByOrderId } from "../../redux/actions/OrderActions";
import { popNotification, resetNotification } from "../../redux/actions/NotificationActions";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import PaypalCheckoutButton from "../../components/PaypalCheckoutButton";

const OrderDetailPage = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const navigate = useNavigate();
  const UserSign = useSelector((state) => state.UserSign);
  const OrderDetail = useSelector((state) => state.OrderDetail);
  const { data } = OrderDetail;

  const confirmDeliverHandler = () => {
    dispatch(confirmDelivered(orderId));
  };

  useEffect(() => {
    if (!UserSign.isLogin) {
      navigate("/app", { replace: true });
    }

    if (!data || data._id !== orderId) {
      dispatch(getOrderByOrderId(orderId));
    }

    if (data) {
      if (OrderDetail.warn === "success" && data.deliveredStatus.isDelivered) {
        dispatch(popNotification("success", "Confirm Deliver Successfull"));
        setTimeout(() => {
          dispatch(resetNotification());
          dispatch({ type: "RESET_WARN_ORDER_DETAIL" });
        }, 1500);
      }

      if (OrderDetail.warn === "success" && !data.deliveredStatus.isDelivered) {
        dispatch(popNotification("success", "Payment Successfull"));
        setTimeout(() => {
          dispatch(resetNotification());
          dispatch({ type: "RESET_WARN_ORDER_DETAIL" });
        }, 1500);
      }

      if (OrderDetail.warn === "failed") {
        dispatch(popNotification("error", "Error Occured"));
        setTimeout(() => {
          dispatch(resetNotification());
          dispatch({ type: "RESET_WARN_ORDER_DETAIL" });
        }, 1500);
      }
    }
  }, [OrderDetail.warn, UserSign.isLogin, data, dispatch, navigate, orderId]);

  return !data ? (
    <Loading />
  ) : (
    <div className="order-detail-container">
      <div className="order-detail-wrapper">
        <div className="order-detail-description">
          <div className="order-detail-address">
            <h3 className="order-detail-title">Shipping Detail</h3>
            <label htmlFor="order-detail-name" className="label">
              Name :{" "}
            </label>
            <p className="order-detail-name" id="order-detail-name">
              {data.shippingAddress.name}
            </p>
            <label htmlFor="order-detail-address" className="label">
              Address :{" "}
            </label>
            <p className="order-detail-address" id="order-detail-address">
              {data.shippingAddress.address}, {data.shippingAddress.sub_district},{" "}
              {data.shippingAddress.district}, {data.shippingAddress.province},{" "}
              {data.shippingAddress.postal_code}
            </p>
            <label htmlFor="order-detail-payment" className="label">
              Payment Method :{" "}
            </label>
            <p className="order-detail-payment" id="order-detail-payment">
              {data.paymentMethod}
            </p>
          </div>
          <div className="order-detail-product">
            <h3 className="order-detail-product-title">Products</h3>
            <TableContainer
              className="order-detail-table-container"
              component={Paper}
              elevation={3}
            >
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
                  {data.orderedItems &&
                    data.orderedItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell align="center" key={index}>
                          <img
                            className="order-detail-image"
                            alt="order-detail-img"
                            src={`http://localhost:2000/sp-api-products/product-img/${item.productImage}`}
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
        <div className="order-detail-pricing">
          <div className="details-pricing">
            <p className="details-product-price">Product Price</p>
            <h4>${data.orderPrice.product_price}</h4>
            <p className="details-product-shipment">Shipping Price</p>
            <h4>${data.orderPrice.shipping_price}</h4>
            <p className="details-product-total">Total Price</p>
            <h4>${data.orderPrice.total_price}</h4>
          </div>
          <div className="details-payment">
            <p className="details-order-payment">Payment Status</p>
            {data.paymentStatus.isPaid ? (
              <>
                <h4 className="payment-paid">Paid</h4>
                <h4 className="payment-paidAt">{data.paymentStatus.paidAt.substring(0, 10)}</h4>
              </>
            ) : (
              <h4 className="payment-unpaid">Not Paid</h4>
            )}
          </div>
          <div className="details-shipment">
            <p className="details-order-shipment">Delivered Status</p>
            {data.deliveredStatus.isDelivered ? (
              <>
                <h4 className="order-delivered">Delivered</h4>
                <h4 className="order-deliveredAt">
                  {data.deliveredStatus.deliveredAt.substring(0, 10)}
                </h4>
              </>
            ) : (
              <h4 className="payment-undelivered">Not Delivered</h4>
            )}
          </div>
          {!data.paymentStatus.isPaid && !data.deliveredStatus.isDelivered ? (
            <div className="order-detail-button">
              <PaypalCheckoutButton />
            </div>
          ) : (
            data.paymentStatus.isPaid &&
            !data.deliveredStatus.isDelivered && (
              <div className="order-detail-delivered-button" onClick={confirmDeliverHandler}>
                Confirm Delivered
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
