import React, { useEffect, useState } from "react";
import {
  DropdownList,
  DropdownMenu,
  LoginButton,
  SideCartIcon,
  DropdownListAdmin,
  DropdownMenuAdmin,
} from "./MainNavigationElements";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/actions/UserActions";
import { popNotification, resetNotification } from "../../redux/actions/NotificationActions";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Badge from "@mui/material/Badge";
import CartIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./MainNavigation.scss";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdmin, setIsOpenAdmin] = useState(false);

  const Cart = useSelector((state) => state.Cart);
  const UserSign = useSelector((state) => state.UserSign);
  const { isLogin, isAdmin } = UserSign;

  const logoutHandler = () => {
    dispatch(signOut());
  };

  const clickHandle = () => {
    setIsOpen(!isOpen);
  };

  const clickHandleAdmin = () => {
    setIsOpenAdmin(!isOpenAdmin);
  };

  useEffect(() => {
    if (UserSign.warn === "success") {
      dispatch(popNotification("success", "LogOut Successfull"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "USER_SIGNIN_WARN_RESET" });
      }, 1500);
    }

    if (UserSign.warn === "failed") {
      dispatch(popNotification("error", "LogOut Failed"));
      setTimeout(() => {
        dispatch(resetNotification());
        dispatch({ type: "USER_SIGNIN_WARN_RESET" });
      }, 1500);
    }
  }, [UserSign.warn, dispatch]);

  return (
    <nav className="main-nav-container">
      <div className="main-nav-title-wrapper">
        <div className="main-nav-logo" onClick={() => navigate("/app")}>
          ShoesProject
        </div>
        <div className="main-nav-logo2" onClick={() => navigate("/app")}>
          S.P.
        </div>
        <DropdownMenuAdmin onClick={clickHandleAdmin} $isAdmin={isAdmin}>
          <div className="main-admin-nav-logo">Admin Menu</div>
          <div className="main-admin-nav-logo2">Adm</div>
          <DropdownListAdmin $isOpen={isOpenAdmin}>
            <Paper>
              <MenuList>
                <MenuItem className="menu-list" onClick={() => navigate("admin/data-product")}>
                  Data Product
                </MenuItem>
                <MenuItem className="menu-list" onClick={() => navigate("admin/data-order")}>
                  Data Order
                </MenuItem>
              </MenuList>
            </Paper>
          </DropdownListAdmin>
        </DropdownMenuAdmin>
      </div>

      <SideCartIcon $isLogin={isLogin} onClick={() => navigate("cart")}>
        <Badge badgeContent={Cart.items.length} color="error">
          <CartIcon />
        </Badge>
      </SideCartIcon>
      <LoginButton $isLogin={isLogin}>
        <Link className="nav-btn-link" to="/signin">
          Login
        </Link>
      </LoginButton>
      <DropdownMenu onClick={clickHandle} $isLogin={isLogin}>
        <Avatar className="main-nav-avatar">S</Avatar>
        <DropdownList $isOpen={isOpen}>
          <Paper>
            <MenuList>
              <MenuItem className="menu-list" onClick={() => navigate("profile")}>
                Profile
              </MenuItem>
              <MenuItem className="menu-list" onClick={() => navigate("cart")}>
                Cart
              </MenuItem>
              <MenuItem className="menu-list" onClick={() => navigate("orderhistory")}>
                Order History
              </MenuItem>
              <MenuItem className="menu-list" onClick={logoutHandler}>
                Logout
              </MenuItem>
            </MenuList>
          </Paper>
        </DropdownList>
      </DropdownMenu>
    </nav>
  );
};

export default MainNavigation;
