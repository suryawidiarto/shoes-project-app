import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editProductAdmin, getProductByIdAdmin } from "../../redux/actions/AdminActions";
import { popNotification, resetNotification } from "../../redux/actions/NotificationActions";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import "./AdminEditDataProduct.scss";

const AdminEditDataProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const UserSign = useSelector((state) => state.UserSign);
  const AdminDataProduct = useSelector((state) => state.AdminDataProduct);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productSize35, setProductSize35] = useState("");
  const [productSize36, setProductSize36] = useState("");
  const [productSize37, setProductSize37] = useState("");
  const [productSize38, setProductSize38] = useState("");
  const [productSize39, setProductSize39] = useState("");
  const [productSize40, setProductSize40] = useState("");
  const [productSize41, setProductSize41] = useState("");
  const [productSize42, setProductSize42] = useState("");
  const [productSize43, setProductSize43] = useState("");
  const [imgDB, setImgDB] = useState();
  const [imgPreview, setImgPreview] = useState();
  const [imgFile, setImgFile] = useState();

  const editProductHandler = (e) => {
    e.preventDefault();
    dispatch(
      editProductAdmin({
        productId,
        productName,
        productPrice,
        productDescription,
        productSize35,
        productSize36,
        productSize37,
        productSize38,
        productSize39,
        productSize40,
        productSize41,
        productSize42,
        productSize43,
        imgFile,
      })
    );
  };

  const uploadImgHandler = (e) => {
    setImgFile(e.target.files[0]);
  };

  const backHandler = () => {
    navigate("/app/admin/data-product");
  };

  useEffect(() => {
    if (!UserSign.isLogin) {
      navigate("/app", { replace: true });
    }

    if (AdminDataProduct.warn === "success") {
      dispatch(popNotification("success", "Edit Product Successfull"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "ADMIN_WARN_PRODUCT_RESET" });
      }, 1500);
    }

    if (AdminDataProduct.warn === "failed") {
      dispatch(popNotification("error", "Edit Product Failed"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "ADMIN_WARN_PRODUCT_RESET" });
      }, 1500);
    }

    if (!AdminDataProduct.dataById) {
      dispatch(getProductByIdAdmin(productId));
    } else {
      const { dataById } = AdminDataProduct;
      setProductName(dataById.name);
      setProductPrice(dataById.price);
      setProductDescription(dataById.description);
      setProductSize35(dataById.stock[0].inStock);
      setProductSize36(dataById.stock[1].inStock);
      setProductSize37(dataById.stock[2].inStock);
      setProductSize38(dataById.stock[3].inStock);
      setProductSize39(dataById.stock[4].inStock);
      setProductSize40(dataById.stock[5].inStock);
      setProductSize41(dataById.stock[6].inStock);
      setProductSize42(dataById.stock[7].inStock);
      setProductSize43(dataById.stock[8].inStock);
      setImgDB(dataById.image[0]);
    }
    if (!imgFile) {
      setImgPreview(undefined);
      return;
    }
    const imgObjectUrl = URL.createObjectURL(imgFile);
    setImgPreview(imgObjectUrl);

    return () => URL.revokeObjectURL(imgObjectUrl);
  }, [AdminDataProduct, UserSign.isLogin, dispatch, imgFile, navigate, productId]);

  return (
    <div className="edit-product-container">
      <div className="edit-product-container2">
        <div className="edit-product-back-button" onClick={backHandler}>
          <ArrowBackIcon className="icon-back" />
        </div>
        <form className="edit-product-wrapper" autoComplete="off" onSubmit={editProductHandler}>
          <div className="edit-product-title">Edit Product</div>
          <div className="edit-data-product-container">
            <TextField
              sx={{ mt: 1 }}
              label="Product Name"
              variant="standard"
              multiline
              fullWidth
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
            <TextField
              sx={{ mt: 1 }}
              label="Product Price"
              variant="standard"
              fullWidth
              type="number"
              value={productPrice}
              onChange={(e) => {
                setProductPrice(e.target.value);
              }}
            />
            <TextField
              sx={{ mt: 1 }}
              label="Product Description"
              variant="standard"
              fullWidth
              multiline
              value={productDescription}
              onChange={(e) => {
                setProductDescription(e.target.value);
              }}
            />
            <TextField
              sx={{ mt: 1 }}
              label="Stock Size 35"
              variant="standard"
              fullWidth
              type="number"
              value={productSize35}
              onChange={(e) => {
                setProductSize35(e.target.value);
              }}
            />
            <TextField
              sx={{ mt: 1 }}
              label="Stock Size 36"
              variant="standard"
              fullWidth
              type="number"
              value={productSize36}
              onChange={(e) => {
                setProductSize36(e.target.value);
              }}
            />
            <TextField
              sx={{ mt: 1 }}
              label="Stock Size 37"
              variant="standard"
              fullWidth
              type="number"
              value={productSize37}
              onChange={(e) => {
                setProductSize37(e.target.value);
              }}
            />
            <TextField
              sx={{ mt: 1 }}
              label="Stock Size 38"
              variant="standard"
              fullWidth
              type="number"
              value={productSize38}
              onChange={(e) => {
                setProductSize38(e.target.value);
              }}
            />
            <TextField
              sx={{ mt: 1 }}
              label="Stock Size 39"
              variant="standard"
              fullWidth
              type="number"
              value={productSize39}
              onChange={(e) => {
                setProductSize39(e.target.value);
              }}
            />
            <TextField
              sx={{ mt: 1 }}
              label="Stock Size 40"
              variant="standard"
              fullWidth
              type="number"
              value={productSize40}
              onChange={(e) => {
                setProductSize40(e.target.value);
              }}
            />
            <TextField
              sx={{ mt: 1 }}
              label="Stock Size 41"
              variant="standard"
              fullWidth
              type="number"
              value={productSize41}
              onChange={(e) => {
                setProductSize41(e.target.value);
              }}
            />
            <TextField
              sx={{ mt: 1 }}
              label="Stock Size 42"
              variant="standard"
              fullWidth
              type="number"
              value={productSize42}
              onChange={(e) => {
                setProductSize42(e.target.value);
              }}
            />
            <TextField
              sx={{ mt: 1 }}
              label="Stock Size 43"
              variant="standard"
              fullWidth
              type="number"
              value={productSize43}
              onChange={(e) => {
                setProductSize43(e.target.value);
              }}
            />
            <div className="edit-product-upload-container">
              {imgDB && !imgFile && !imgPreview ? (
                <img
                  className="edit-upload-img"
                  alt="img-preview"
                  src={`${process.env.REACT_APP_SERVER_URL}/sp-api-products/product-img/${imgDB}`}
                />
              ) : imgFile && imgPreview ? (
                <img className="edit-upload-img" alt="img-preview" src={imgPreview} />
              ) : (
                <></>
              )}
            </div>
            <label className="edit-label-product-image" htmlFor="upload-input">
              Product Image
            </label>
            <input
              id="upload-input"
              className="edit-upload-input"
              accept="image/*"
              type="file"
              onChange={uploadImgHandler}
            />
          </div>
          <button typeof="submit" className="edit-product-button">
            Edit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditDataProduct;
