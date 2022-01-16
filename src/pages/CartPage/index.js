import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";
import "./CartPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemCart } from "../../redux/actions/CartActions";
import { popNotification, resetNotification } from "../../redux/actions/NotificationActions";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserSign = useSelector((state) => state.UserSign);
  const Cart = useSelector((state) => state.Cart);
  const { items } = Cart;

  const deleteHandler = (index) => {
    dispatch(deleteItemCart(index));
  };

  useEffect(() => {
    if (!UserSign.isLogin) {
      navigate("/app", { replace: true });
    }

    if (Cart.warn === "success") {
      dispatch(popNotification("success", "Delete Item Successfull"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "CART_RESET_WARN" });
      }, 1500);
    }

    if (Cart.warn === "failed") {
      dispatch(popNotification("error", "Delete Item Failed"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "CART_RESET_WARN" });
      }, 1500);
    }
  }, [Cart.warn, UserSign.isLogin, dispatch, navigate]);

  return (
    <div className="cart-container">
      <div className="content-container">
        <TableContainer component={Paper} className="table-container">
          <Table stickyHeader className="cart-table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">Product Name</TableCell>
                <TableCell align="center">Size</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell colSpan={2} align="center">
                  Detail
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!items[0] ? (
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    Cart Empty
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="center" key={index}>
                      <img
                        className="cart-image"
                        alt="cart-img"
                        src={`https://shoes-project-server.herokuapp.com/sp-api-products/product-img/${item.productImage}`}
                      />
                    </TableCell>
                    <TableCell align="center">{item.productName}</TableCell>
                    <TableCell align="center">{item.productSize}</TableCell>
                    <TableCell align="center">{item.productQty}</TableCell>
                    <TableCell align="center">${item.productPrice}</TableCell>
                    <TableCell align="center">
                      <Link to={`/app/product/${item.productId}`} className="see-product">
                        See Product
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <div className="delete-product" onClick={() => deleteHandler(index)}>
                        Delete
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {items[0] && (
          <div
            className="checkout-container"
            onClick={() => {
              navigate("/app/shipping");
            }}
          >
            Checkout !
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
