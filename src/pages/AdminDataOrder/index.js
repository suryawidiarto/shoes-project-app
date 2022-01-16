import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { popNotification, resetNotification } from "../../redux/actions/NotificationActions";
import { deleteOrderAdmin, getAllOrderAdmin } from "../../redux/actions/AdminActions";
import Loading from "../../components/Loading";
import "./AdminDataOrder.scss";

const AdminDataOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserSign = useSelector((state) => state.UserSign);
  const AdminDataOrder = useSelector((state) => state.AdminDataOrder);
  const { dataAll } = AdminDataOrder;

  const deleteHandler = (orderId) => {
    dispatch(deleteOrderAdmin(orderId));
  };

  useEffect(() => {
    if (!UserSign.isLogin) {
      navigate("/app", { replace: true });
    }

    dispatch(getAllOrderAdmin());

    if (AdminDataOrder.warn === "success") {
      dispatch(popNotification("success", "Delete Successfull"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "ADMIN_WARN_ORDER_RESET" });
      }, 1500);
    }

    if (AdminDataOrder.warn === "failed") {
      dispatch(popNotification("error", "Delete Failed"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "ADMIN_WARN_ORDER_RESET" });
      }, 1500);
    }
  }, [AdminDataOrder.warn, UserSign.isLogin, dispatch, navigate]);

  return !dataAll ? (
    <Loading />
  ) : (
    <div className="admin-order-container">
      <div className="admin-order-content-container">
        <TableContainer component={Paper} className="admin-order-table-container">
          <Table stickyHeader className="admin-order-table">
            <TableHead>
              <TableRow>
                <TableCell align="center">No</TableCell>
                <TableCell align="center">Order Id</TableCell>
                <TableCell align="center">User Id</TableCell>
                <TableCell align="center">Order Price</TableCell>
                <TableCell align="center">Payment Status</TableCell>
                <TableCell align="center">Delivered Status</TableCell>
                <TableCell align="center">Order Date</TableCell>
                <TableCell align="center" colSpan="2">
                  Detail
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!dataAll[0] ? (
                <TableRow>
                  <TableCell colSpan="8" align="center">
                    User's Order Empty
                  </TableCell>
                </TableRow>
              ) : (
                dataAll.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center" className="admin-order-description">
                      {item._id}
                    </TableCell>
                    <TableCell align="center" className="admin-order-description">
                      {item.userId}
                    </TableCell>
                    <TableCell align="center">${item.orderPrice.total_price}</TableCell>
                    <TableCell align="center">
                      {item["paymentStatus"]["isPaid"] ? "Paid" : "Not Paid"}
                    </TableCell>
                    <TableCell align="center">
                      {item["deliveredStatus"]["isDelivered"] ? "Delivered" : "Not Delivered"}
                    </TableCell>
                    <TableCell align="center">{item.createdAt.substring(0, 10)}</TableCell>
                    <TableCell align="center">
                      <Link
                        to={`/app/admin/data-order/order-detail/${item._id}`}
                        className="admin-order-see-product"
                      >
                        Detail Order
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <div
                        className="admin-order-delete-product"
                        onClick={() => deleteHandler(item._id)}
                      >
                        Delete
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AdminDataOrder;
