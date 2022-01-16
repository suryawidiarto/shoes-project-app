import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { getOrderByIdAdmin } from "../../redux/actions/AdminActions";
import "./AdminDataOrderDetail.scss";

const AdminDataOrderDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const UserSign = useSelector((state) => state.UserSign);
  const AdminDataOrder = useSelector((state) => state.AdminDataOrder);
  const { dataById } = AdminDataOrder;

  useEffect(() => {
    if (!UserSign.isLogin) {
      navigate("/app", { replace: true });
    }

    dispatch(getOrderByIdAdmin(orderId));
  }, [UserSign.isLogin, dispatch, navigate, orderId]);

  const backHandler = () => {
    navigate("/app/admin/data-order");
  };

  return !dataById ? (
    <Loading />
  ) : (
    <div className="order-detail-container">
      <div className="order-detail-wrapper">
        <div className="edit-product-back-button" onClick={backHandler}>
          <ArrowBackIcon className="icon-back" />
        </div>
        <div className="order-detail-description">
          <div className="order-detail-address">
            <h3 className="order-detail-title">Shipping Detail</h3>
            <label htmlFor="order-detail-name" className="label">
              Name :{" "}
            </label>
            <p className="order-detail-name" id="order-detail-name">
              {dataById.shippingAddress.name}
            </p>
            <label htmlFor="order-detail-address" className="label">
              Address :{" "}
            </label>
            <p className="order-detail-address" id="order-detail-address">
              {dataById.shippingAddress.address}, {dataById.shippingAddress.sub_district},{" "}
              {dataById.shippingAddress.district}, {dataById.shippingAddress.province},{" "}
              {dataById.shippingAddress.postal_code}
            </p>
            <label htmlFor="order-detail-payment" className="label">
              Payment Method :{" "}
            </label>
            <p className="order-detail-payment" id="order-detail-payment">
              {dataById.paymentMethod}
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
                  {dataById.orderedItems &&
                    dataById.orderedItems.map((item, index) => (
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
            <h4>${dataById.orderPrice.product_price}</h4>
            <p className="details-product-shipment">Shipping Price</p>
            <h4>${dataById.orderPrice.shipping_price}</h4>
            <p className="details-product-total">Total Price</p>
            <h4>${dataById.orderPrice.total_price}</h4>
          </div>
          <div className="details-payment">
            <p className="details-order-payment">Payment Status</p>
            {dataById.paymentStatus.isPaid ? (
              <>
                <h4 className="payment-paid">Paid</h4>
                <h4 className="payment-paidAt">{dataById.paymentStatus.paidAt.substring(0, 10)}</h4>
              </>
            ) : (
              <h4 className="payment-unpaid">Not Paid</h4>
            )}
          </div>
          <div className="details-shipment">
            <p className="details-order-shipment">Delivered Status</p>
            {dataById.deliveredStatus.isDelivered ? (
              <>
                <h4 className="order-delivered">Delivered</h4>
                <h4 className="order-deliveredAt">
                  {dataById.deliveredStatus.deliveredAt.substring(0, 10)}
                </h4>
              </>
            ) : (
              <h4 className="payment-undelivered">Not Delivered</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDataOrderDetail;
