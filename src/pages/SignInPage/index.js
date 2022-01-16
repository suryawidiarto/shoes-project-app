import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../redux/actions/UserActions";
import { popNotification, resetNotification } from "../../redux/actions/NotificationActions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import LockIcon from "@mui/icons-material/Lock";
import NotificationPop from "../../components/NotificationPop";
import "./SignInPage.scss";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Notification = useSelector((state) => state.Notification);
  const UserSign = useSelector((state) => state.UserSign);

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const signHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };

  useEffect(() => {
    if (UserSign.warn === "success") {
      dispatch(popNotification("success", "Login Successfull"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "USER_SIGNIN_WARN_RESET" });
        navigate("/app");
      }, 800);
    }
    if (UserSign.warn === "failed") {
      dispatch(popNotification("error", "Wrong Email or Password"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "USER_SIGNIN_RESET", payload: false });
      }, 1000);
    }
  }, [UserSign.warn, dispatch, navigate]);

  return (
    <div className="sign-container">
      <NotificationPop
        variantPop={Notification.variantPop}
        isPop={Notification.isPop}
        messagePop={Notification.messagePop}
      />
      <div className="sign-logo" onClick={() => navigate("/app")}>
        ShoesProject
      </div>
      <div className="sign-wrapper">
        <form className="sign-form" onSubmit={signHandler} autoComplete="off">
          <h1 className="sign-title">Sign in</h1>
          <Box sx={{ display: "flex", alignItems: "flex-end", mt: 2 }}>
            <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              label="Email"
              variant="standard"
              onChange={emailHandler}
              type="email"
              required
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end", mt: 1 }}>
            <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              label="Password"
              variant="standard"
              type="password"
              onChange={passwordHandler}
              required
            />
          </Box>
          <button className="sign-button" type="submit">
            Login
          </button>
          <div className="sign-link">
            Doesn't have an account ?{" "}
            <Link className="register-link" to="/signup">
              Register
            </Link>{" "}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
