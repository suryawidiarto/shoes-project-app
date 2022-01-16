import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpPage.scss";
import { signUp } from "../../redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import NotificationPop from "../../components/NotificationPop";
import { popNotification, resetNotification } from "../../redux/actions/NotificationActions";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const UserSignUp = useSelector((state) => state.UserSignUp);
  const Notification = useSelector((state) => state.Notification);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = (e) => {
    e.preventDefault();
    if (password.length >= 8) {
      dispatch(signUp(name, email, password));
    } else {
      dispatch(popNotification("warning", "Password at least 8 character long"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "USER_SIGNUP_RESET" });
      }, 2000);
    }
  };

  useEffect(() => {
    if (UserSignUp.warn === "success") {
      dispatch(popNotification("success", "Register Successfull"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "USER_SIGNUP_RESET" });
        navigate("/signin");
      }, 1000);
    }
    if (UserSignUp.warn === "failed") {
      dispatch(popNotification("error", "Email Has Been Used"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "USER_SIGNUP_RESET" });
      }, 2000);
    }
  }, [UserSignUp.warn, dispatch, navigate]);

  return (
    <div className="signup-container">
      <NotificationPop
        variantPop={Notification.variantPop}
        isPop={Notification.isPop}
        messagePop={Notification.messagePop}
      />
      <div className="signup-logo" onClick={() => navigate("/app")}>
        ShoesProject
      </div>
      <div className="signup-wrapper">
        <form className="signup-form" onSubmit={registerHandler} autoComplete="off">
          <h1 className="signup-title">Sign up</h1>
          <Box sx={{ display: "flex", alignItems: "flex-end", mt: 2 }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              label="Name"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end", mt: 1 }}>
            <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              label="Email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end", mt: 1 }}>
            <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              label="Password"
              variant="standard"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <button className="signup-button" type="submit">
            Register
          </button>

          <div className="signup-link">
            Already have an account ?{" "}
            <Link className="register-link" to="/signin">
              Login
            </Link>{" "}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
