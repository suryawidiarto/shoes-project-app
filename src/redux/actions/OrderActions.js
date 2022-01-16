import Axios from "axios";

export const addShippingData = (shippingData) => {
  return (dispatch, getState) => {
    try {
      const userId = getState().UserData.data._id;
      const cart = getState().Cart.items;
      dispatch({
        type: "ADD_SHIPPING_DATA",
        payload: {
          shippingData: {
            userId: userId,
            name: shippingData.name,
            address: shippingData.address,
            province: shippingData.province,
            district: shippingData.district,
            sub_district: shippingData.subDistrict,
            postal_code: shippingData.postalCode,
            payment_method: shippingData.paymentMethod,
            cart: cart,
          },
        },
        warn: "success",
      });
      localStorage.setItem("ShippingData", JSON.stringify(getState().ShippingData.data));
    } catch (error) {
      dispatch({ type: "ERROR_SHIPPING_DATA", payload: error, warn: "failed" });
    }
  };
};

export const createOrder = (orderData) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().UserSign.data.token;
      await Axios.post(
        `https://shoes-project-server.herokuapp.com/sp-api-orders/add-order`,
        {
          userId: orderData.userId,
          orderedItems: orderData.cart,
          shippingAddress: {
            name: orderData.name,
            address: orderData.address,
            district: orderData.district,
            sub_district: orderData.sub_district,
            province: orderData.province,
            postal_code: orderData.postal_code,
          },
          orderPrice: orderData.shippingDetailPrice,
          paymentMethod: orderData.payment_method,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          dispatch({ type: "ADD_ORDER_DATA", payload: { orderId: res.data._id }, warn: "success" });
          localStorage.removeItem("ShippingData");
        })
        .catch((err) =>
          dispatch({
            type: "ERROR_ORDER_DATA",
            payload: {
              error: err,
            },
            warn: "failed",
          })
        );
    } catch (error) {
      dispatch({
        type: "ERROR_ORDER_DATA",
        payload: {
          error: error,
        },
        warn: "failed",
      });
    }
  };
};

export const getOrderByIdUser = () => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().UserSign.data.id;
      const token = getState().UserSign.data.token;
      await Axios.post(
        `https://shoes-project-server.herokuapp.com/sp-api-orders/ordered`,
        {
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => dispatch({ type: "GET_ORDER_DATA_BY_USER_ID", payload: res.data }))
        .catch((err) => dispatch({ type: "ERROR_ORDER_DATA_BY_USER_ID", payload: err }));
    } catch (error) {
      dispatch({ type: "ERROR_ORDER_DATA_BY_USER_ID", payload: error });
    }
  };
};

export const getOrderByOrderId = (orderId) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().UserSign.data.token;
      await Axios.get(`https://shoes-project-server.herokuapp.com/sp-api-orders/order/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => dispatch({ type: "GET_ORDER_DATA_BY_ORDER_ID", payload: res.data }))
        .catch((err) => dispatch({ type: "ERROR_ORDER_DETAIL", payload: err }));
    } catch (error) {
      dispatch({ type: "ERROR_ORDER_DETAIL", payload: error });
    }
  };
};

export const makePayment = (orderId) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().UserSign.data.token;
      await Axios.post(
        `https://shoes-project-server.herokuapp.com/sp-api-orders/payment`,
        {
          orderId: orderId,
          isPaid: true,
          paidAt: Date.now(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) =>
          dispatch({ type: "MAKE_PAYMENT_SUCCESS", payload: res.data, warn: "success" })
        )
        .catch((err) => dispatch({ type: "ERROR_ORDER_DETAIL", payload: err, warn: "failed" }));
    } catch (error) {
      dispatch({ type: "ERROR_ORDER_DETAIL", payload: error, warn: "failed" });
    }
  };
};

export const confirmDelivered = (orderId) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().UserSign.data.token;
      await Axios.post(
        `https://shoes-project-server.herokuapp.com/sp-api-orders/delivered`,
        {
          orderId: orderId,
          isDelivered: true,
          deliveredAt: Date.now(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((res) =>
          dispatch({ type: "CONFIRM_DELIVERED_SUCCESS", payload: res.data, warn: "success" })
        )
        .catch((err) => dispatch({ type: "ERROR_ORDER_DETAIL", payload: err, warn: "failed" }));
    } catch (error) {
      dispatch({ type: "ERROR_ORDER_DETAIL", payload: error, warn: "failed" });
    }
  };
};
