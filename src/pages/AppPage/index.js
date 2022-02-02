import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartItem } from "../../redux/actions/CartActions";
import { checkToken, signOut } from "../../redux/actions/UserActions";
import { popNotification, resetNotification } from "../../redux/actions/NotificationActions";
import Footer from "../../components/Footer";
import MainNavigation from "../../components/MainNavigation";
import NotificationPop from "../../components/NotificationPop";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const AppPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserSign = useSelector((state) => state.UserSign);
  const CheckToken = useSelector((state) => state.CheckToken);
  const Notification = useSelector((state) => state.Notification);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (UserSign.data.token) {
      if (UserSign.isLogin && CheckToken.tokenExp === "initial") {
        dispatch(checkToken(UserSign.data.token));
      }
      if (UserSign.isLogin && CheckToken.tokenExp === "expired") {
        setAlert(true);
        dispatch(signOut());
        dispatch({ type: "USER_DATA_RESET" });
        dispatch(popNotification("error", "Account Session Expired, Please Re-Login"));
        setTimeout(() => {
          dispatch(resetNotification());
        }, 3000);
      }
      if (UserSign.isLogin && CheckToken.tokenExp === "valid") {
        dispatch(getCartItem());
      }
    }
  }, [CheckToken.tokenExp, UserSign.data.token, UserSign.isLogin, dispatch, navigate]);

  const closeHandler = () => {
    setAlert(false);
  };

  return (
    <div>
      <Dialog
        open={alert}
        onClose={closeHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Account Session Has Expired</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Yout Account Session Has Expired Please <strong>Re-Login</strong> In Order To Access All
            The Feature's
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <MainNavigation />
      <NotificationPop
        variantPop={Notification.variantPop}
        isPop={Notification.isPop}
        messagePop={Notification.messagePop}
      />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppPage;
