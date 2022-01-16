import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../redux/actions/UserActions";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import "./ProfilePage.scss";
import { popNotification, resetNotification } from "../../redux/actions/NotificationActions";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const UserSign = useSelector((state) => state.UserSign);
  const UserData = useSelector((state) => state.UserData);
  const { data } = UserData;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const updateProfileHandler = (e) => {
    e.preventDefault();
    if (newPassword !== "" && newPassword.length < 8) {
      dispatch(popNotification("warning", "New Password At Least 8 Character Long"));
      setTimeout(() => {
        dispatch(resetNotification());
      }, 2500);
    } else {
      dispatch(
        updateUser({
          name,
          email,
          newPassword,
          address,
          province,
          district,
          subDistrict,
          postalCode,
        })
      );
    }
  };

  useEffect(() => {
    if (!UserSign.isLogin) {
      navigate("/app", { replace: true });
    }

    if (!data) {
      dispatch(getUser());
    } else {
      setName(data.name);
      setEmail(data.email);
      setAddress(data.address);
      setProvince(data.province);
      setDistrict(data.district);
      setSubDistrict(data.sub_district);
      setPostalCode(data.postal_code);
    }

    if (UserData.warn === "success") {
      dispatch(popNotification("success", "Save Changes Successfull"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "WARN_RESET" });
      }, 1500);
    }

    if (UserData.warn === "failed") {
      dispatch(popNotification("error", "Save Changes Failed"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "WARN_RESET" });
      }, 1500);
    }
  }, [UserData.warn, UserSign.isLogin, data, dispatch, navigate]);

  return !data ? (
    <Loading />
  ) : (
    <div className="profile-container">
      <form className="profile-wrapper" onSubmit={updateProfileHandler} autoComplete="off">
        <div className="profile-account">Account</div>
        <div className="account-container">
          <TextField
            sx={{ mt: 1 }}
            label="Name"
            variant="standard"
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            sx={{ mt: 1 }}
            label="Email"
            variant="standard"
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            sx={{ mt: 1 }}
            label="New Password"
            variant="standard"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </div>

        <div className="profile-shipping">Shipping</div>
        <div className="shipping-container">
          <TextField
            sx={{ mt: 1 }}
            label="Address"
            variant="standard"
            multiline
            fullWidth
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <TextField
            sx={{ mt: 1 }}
            label="Province"
            variant="standard"
            fullWidth
            value={province}
            onChange={(e) => {
              setProvince(e.target.value);
            }}
          />
          <TextField
            sx={{ mt: 1 }}
            label="District"
            variant="standard"
            fullWidth
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
            }}
          />
          <TextField
            sx={{ mt: 1 }}
            label="Sub District"
            variant="standard"
            fullWidth
            value={subDistrict}
            onChange={(e) => {
              setSubDistrict(e.target.value);
            }}
          />
          <TextField
            sx={{ mt: 1 }}
            label="Postal Code"
            variant="standard"
            fullWidth
            value={postalCode}
            type="number"
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}
          />
        </div>
        <button className="profile-button" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
