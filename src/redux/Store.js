import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import { adminDataOrderReducers, adminDataProductReducers } from "./reducers/AdminReducers";
import { addToCartReducers } from "./reducers/CartReducers";
import { notificationReducer } from "./reducers/NotificationReducers";
import {
  addOrderDataReducer,
  addShippingDataReducer,
  getOrderDataReducer,
  orderDetailReducer,
} from "./reducers/OrderReducers";
import { getAllProductReducers, getProductByIdReducers } from "./reducers/ProductReducers";
import {
  userCheckTokenReducer,
  userDataReducer,
  userSignInReducer,
  userSignUpReducer,
} from "./reducers/UserReducers";

const InitialState = {
  UserSign: {
    isLogin: localStorage.getItem("IsLogin") ? JSON.parse(localStorage.getItem("IsLogin")) : false,
    isAdmin: localStorage.getItem("IsAdmin") ? JSON.parse(localStorage.getItem("IsAdmin")) : false,
    data: {
      id: localStorage.getItem("UserId") ? JSON.parse(localStorage.getItem("UserId")) : null,
      token: localStorage.getItem("Token") ? JSON.parse(localStorage.getItem("Token")) : undefined,
    },
  },
  Cart: { items: localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")) : [] },
  ShippingData: {
    data: localStorage.getItem("ShippingData")
      ? JSON.parse(localStorage.getItem("ShippingData"))
      : {},
  },
};

const Reducer = combineReducers({
  CheckToken: userCheckTokenReducer,
  UserSign: userSignInReducer,
  UserData: userDataReducer,
  UserSignUp: userSignUpReducer,
  ProductAll: getAllProductReducers,
  ProductById: getProductByIdReducers,
  Cart: addToCartReducers,
  Notification: notificationReducer,
  ShippingData: addShippingDataReducer,
  Order: addOrderDataReducer,
  Ordered: getOrderDataReducer,
  OrderDetail: orderDetailReducer,
  AdminDataProduct: adminDataProductReducers,
  AdminDataOrder: adminDataOrderReducers,
});

const ComposeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(Reducer, InitialState, ComposeEnhancer(applyMiddleware(thunk)));

export default Store;
