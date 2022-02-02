import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByIdUser } from "../../redux/actions/OrderActions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Loading from "../../components/Loading";
import "./OrderHistoryPage.scss";

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserSign = useSelector((state) => state.UserSign);
  const Ordered = useSelector((state) => state.Ordered);
  const { data } = Ordered;

  useEffect(() => {
    if (!UserSign.isLogin) {
      navigate("/app", { replace: true });
    }
    dispatch(getOrderByIdUser());
  }, [UserSign.isLogin, dispatch, navigate]);

  return !data ? (
    <Loading />
  ) : (
    <div className="order-history-container">
      <div className="order-history-content-container">
        <TableContainer component={Paper} className="order-history-table-container">
          <Table stickyHeader className="order-history-table">
            <TableHead>
              <TableRow>
                <TableCell align="center">No.</TableCell>
                <TableCell align="center">Order Id</TableCell>
                <TableCell align="center">Paid</TableCell>
                <TableCell align="center">Delivered</TableCell>
                <TableCell align="center">Total Price</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!data[0] ? (
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    Order Empty
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{item._id}</TableCell>
                    <TableCell align="center">
                      {item.paymentStatus.isPaid ? "Paid" : "Not Paid"}
                    </TableCell>
                    <TableCell align="center">
                      {item.deliveredStatus.isDelivered ? "Delivered" : "Not Delivered"}
                    </TableCell>
                    <TableCell align="center">${item.orderPrice.total_price}</TableCell>
                    <TableCell align="center">
                      <Link to={`/app/order/${item._id}`} className="order-history-link">
                        Detail
                      </Link>
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

export default OrderHistoryPage;
