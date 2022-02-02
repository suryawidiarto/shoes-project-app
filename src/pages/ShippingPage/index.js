import React, { useEffect, useState } from "react";
import { getUser, updateUser } from "../../redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addShippingData } from "../../redux/actions/OrderActions";
import { popNotification, resetNotification } from "../../redux/actions/NotificationActions";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import "./ShippingPage.scss";

const ShippingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ShippingData = useSelector((state) => state.ShippingData);
  const UserSign = useSelector((state) => state.UserSign);
  const UserData = useSelector((state) => state.UserData);
  const { data } = UserData;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const shippingInfoHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ name, address, province, district, subDistrict, postalCode }));
    dispatch(
      addShippingData({ name, address, province, district, subDistrict, postalCode, paymentMethod })
    );
  };

  useEffect(() => {
    if (!UserSign.isLogin) {
      navigate("/app", { replace: true });
    }

    if (!data) {
      dispatch(getUser());
    } else {
      setName(data.name);
      setAddress(data.address);
      setProvince(data.province);
      setDistrict(data.district);
      setSubDistrict(data.sub_district);
      setPostalCode(data.postal_code);
    }

    if (ShippingData.warn === "success") {
      dispatch(popNotification("success", "Add Shipping Data Successfull"));
      setTimeout(() => {
        dispatch(resetNotification());
        navigate("/app/shipping-detail", { replace: true });
        dispatch({ type: "RESET_SHIPPING_WARN" });
      }, 1500);
    }

    if (ShippingData.warn === "failed") {
      dispatch(popNotification("error", "Add Shipping Data Failed"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "RESET_SHIPPING_WARN" });
      }, 1500);
    }
  }, [dispatch, data, UserSign.isLogin, navigate, ShippingData.warn]);

  return (
    <div className="shipping-page-container">
      <form className="shipping-wrapper" onSubmit={shippingInfoHandler} autoComplete="off">
        <div className="shipping-address">
          <div className="address-title">Shipping</div>
          <div className="address-container">
            <TextField
              sx={{ mt: 1 }}
              id="standard-basic"
              label="Full Name"
              variant="standard"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              sx={{ mt: 1 }}
              id="standard-basic"
              label="Address"
              variant="standard"
              multiline
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <TextField
              sx={{ mt: 1 }}
              id="standard-basic"
              label="Province"
              variant="standard"
              fullWidth
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              required
            />
            <TextField
              sx={{ mt: 1 }}
              id="standard-basic"
              label="District"
              variant="standard"
              fullWidth
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            />
            <TextField
              sx={{ mt: 1 }}
              id="standard-basic"
              label="Sub District"
              variant="standard"
              fullWidth
              value={subDistrict}
              onChange={(e) => setSubDistrict(e.target.value)}
              required
            />
            <TextField
              sx={{ mt: 1 }}
              id="standard-basic"
              label="Postal Code"
              variant="standard"
              fullWidth
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              type="number"
              required
            />
          </div>
        </div>
        <div className="shipping-detail-wrapper">
          <div className="shipping-payment">
            <div className="payment-title">Payment Method</div>
            <RadioGroup aria-label="gender" defaultValue="female" name="radio-buttons-group">
              <FormControlLabel
                value="paypal"
                control={<Radio required />}
                label="Paypal"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <FormControlLabel
                value="stripe"
                control={<Radio />}
                label="Stripe"
                disabled
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <FormControlLabel
                value="creditcard"
                control={<Radio />}
                label="Credit Card"
                disabled
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </RadioGroup>
          </div>

          <button typeof="submit" className="shipping-button">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingPage;
