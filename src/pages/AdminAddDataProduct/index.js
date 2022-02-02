import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postProductAdmin } from "../../redux/actions/AdminActions";
import { popNotification, resetNotification } from "../../redux/actions/NotificationActions";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import "./AdminAddDataProduct.scss";

const AdminAddDataProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const [imgPreview, setImgPreview] = useState();
  const [imgFile, setImgFile] = useState();

  const addProductHandler = (e) => {
    e.preventDefault();
    dispatch(
      postProductAdmin({
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

    if (!imgFile) {
      setImgPreview(undefined);
      return;
    }
    const imgObjectUrl = URL.createObjectURL(imgFile);
    setImgPreview(imgObjectUrl);

    if (AdminDataProduct.warn === "success") {
      dispatch(popNotification("success", "Add Product Successfull"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "ADMIN_WARN_PRODUCT_RESET" });
      }, 1500);
    }

    if (AdminDataProduct.warn === "failed") {
      dispatch(popNotification("error", "Add Product Failed"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "ADMIN_WARN_PRODUCT_RESET" });
      }, 1500);
    }

    return () => URL.revokeObjectURL(imgObjectUrl);
  }, [AdminDataProduct.warn, UserSign.isLogin, dispatch, imgFile, navigate]);

  return (
    <div className="add-product-container">
      <div className="add-product-container2">
        <div className="add-product-back-button" onClick={backHandler}>
          <ArrowBackIcon className="icon-back" />
        </div>
        <form className="add-product-wrapper" autoComplete="off" onSubmit={addProductHandler}>
          <div className="add-product-title">Add Product</div>
          <div className="data-product-container">
            <TextField
              sx={{ mt: 1 }}
              label="Product Name"
              variant="standard"
              multiline
              fullWidth
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
              type="number"
              value={productSize43}
              onChange={(e) => {
                setProductSize43(e.target.value);
              }}
            />
            <div className="add-product-upload-container">
              {imgPreview && <img className="upload-img" alt="img-preview" src={imgPreview} />}
            </div>
            <label className="label-product-image" htmlFor="upload-input">
              Product Image
            </label>
            <input
              id="upload-input"
              className="upload-input"
              accept="image/*"
              type="file"
              onChange={uploadImgHandler}
              required
            />
          </div>
          <button typeof="submit" className="add-product-button">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddDataProduct;
