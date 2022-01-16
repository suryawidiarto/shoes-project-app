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
import { deleteProductAdmin, getAllProductAdmin } from "../../redux/actions/AdminActions";
import Loading from "../../components/Loading";
import "./AdminDataProduct.scss";

const AdminDataProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserSign = useSelector((state) => state.UserSign);
  const AdminDataProduct = useSelector((state) => state.AdminDataProduct);
  const { dataAll } = AdminDataProduct;

  const deleteHandler = (productId) => {
    dispatch(deleteProductAdmin(productId));
  };

  const addProductHandler = () => {
    navigate("add-product");
  };

  useEffect(() => {
    if (!UserSign.isLogin) {
      navigate("/app", { replace: true });
    }

    dispatch(getAllProductAdmin());

    if (AdminDataProduct.warn === "success") {
      dispatch(popNotification("success", "Delete Product Successfull"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "ADMIN_WARN_PRODUCT_RESET" });
      }, 1500);
    }

    if (AdminDataProduct.warn === "failed") {
      dispatch(popNotification("error", "Delete Product Failed"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "ADMIN_WARN_PRODUCT_RESET" });
      }, 1500);
    }
  }, [AdminDataProduct.warn, UserSign.isLogin, dispatch, navigate]);

  return !dataAll ? (
    <Loading />
  ) : (
    <div className="admin-product-container">
      <div className="admin-product-content-container">
        <div className="admin-product-add-product" onClick={addProductHandler}>
          Add Product
        </div>
        <TableContainer component={Paper} className="admin-product-table-container">
          <Table stickyHeader className="admin-product-table">
            <TableHead>
              <TableRow>
                <TableCell align="center">No</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">Product Name</TableCell>
                <TableCell align="center">Product Description</TableCell>
                <TableCell align="center">Total Stock</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell colSpan={3} align="center">
                  Detail
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!dataAll[0] ? (
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    Cart Empty
                  </TableCell>
                </TableRow>
              ) : (
                dataAll.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                      <img
                        className="admin-product-image"
                        alt="admin-product-img"
                        src={`https://shoes-project-server.herokuapp.com/sp-api-products/product-img/${item.image[0]}`}
                      />
                    </TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="left" className="description">
                      {item.description}
                    </TableCell>
                    <TableCell align="center">
                      {item.stock.map((e) => e.inStock).reduce((a, b) => a + b)}
                    </TableCell>
                    <TableCell align="center">${item.price}</TableCell>
                    <TableCell align="center">
                      <Link to={`/app/product/${item._id}`} className="admin-product-see-product">
                        See Product
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`edit-product/${item._id}`} className="admin-product-edit-product">
                        Edit Product
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <div
                        className="admin-product-delete-product"
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

export default AdminDataProduct;
