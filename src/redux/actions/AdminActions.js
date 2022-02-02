import Axios from "axios";

export const getAllProductAdmin = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().UserSign.data.token;
      await Axios.get(`${process.env.REACT_APP_SERVER_URL}/sp-api-products/admin/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => dispatch({ type: "ADMIN_GET_ALL_PRODUCT", payload: res.data }));
    } catch (err) {
      dispatch({ type: "ADMIN_PRODUCT_ERROR", payload: err });
    }
  };
};

export const getProductByIdAdmin = (productId) => {
  return async (dispatch) => {
    try {
      await Axios.get(
        `${process.env.REACT_APP_SERVER_URL}/sp-api-products/product/${productId}`
      ).then((res) => dispatch({ type: "ADMIN_GET_PRODUCT_BY_ID", payload: res.data }));
    } catch (err) {
      dispatch({ type: "ADMIN_PRODUCT_ERROR", payload: err });
    }
  };
};

export const postProductAdmin = (dataProduct) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().UserSign.data.token;
      const form = new FormData();
      form.append("name", dataProduct.productName);
      form.append("description", dataProduct.productDescription);
      form.append("price", dataProduct.productPrice);
      form.append("size35", dataProduct.productSize35);
      form.append("size36", dataProduct.productSize36);
      form.append("size37", dataProduct.productSize37);
      form.append("size38", dataProduct.productSize38);
      form.append("size39", dataProduct.productSize39);
      form.append("size40", dataProduct.productSize40);
      form.append("size41", dataProduct.productSize41);
      form.append("size42", dataProduct.productSize42);
      form.append("size43", dataProduct.productSize43);
      form.append("image", dataProduct.imgFile);

      await Axios.post(`${process.env.REACT_APP_SERVER_URL}/sp-api-products/add-product`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) =>
        dispatch({ type: "ADMIN_POST_PRODUCT", payload: res.data, warn: "success" })
      );
    } catch (err) {
      dispatch({ type: "ADMIN_PRODUCT_ERROR", payload: err, warn: "failed" });
    }
  };
};

export const editProductAdmin = (dataProduct) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().UserSign.data.token;
      const form = new FormData();
      form.append("name", dataProduct.productName);
      form.append("description", dataProduct.productDescription);
      form.append("price", dataProduct.productPrice);
      form.append("size35", dataProduct.productSize35);
      form.append("size36", dataProduct.productSize36);
      form.append("size37", dataProduct.productSize37);
      form.append("size38", dataProduct.productSize38);
      form.append("size39", dataProduct.productSize39);
      form.append("size40", dataProduct.productSize40);
      form.append("size41", dataProduct.productSize41);
      form.append("size42", dataProduct.productSize42);
      form.append("size43", dataProduct.productSize43);
      dataProduct.imgFile && form.append("image", dataProduct.imgFile);

      await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/sp-api-products/edit-product/${dataProduct.productId}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) =>
        dispatch({
          type: "ADMIN_EDIT_PRODUCT_BY_ID",
          payload: res.data.responseMONGODB,
          warn: "success",
        })
      );
    } catch (err) {
      dispatch({ type: "ADMIN_PRODUCT_ERROR", payload: err, warn: "failed" });
    }
  };
};

export const deleteProductAdmin = (productId) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().UserSign.data.token;
      await Axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/sp-api-products/delete-product/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ).then(() => dispatch({ type: "ADMIN_DELETE_PRODUCT", payload: productId, warn: "success" }));
    } catch (err) {
      dispatch({ type: "ADMIN_PRODUCT_ERROR", payload: err, warn: "failed" });
    }
  };
};

export const getAllOrderAdmin = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().UserSign.data.token;
      await Axios.get(`${process.env.REACT_APP_SERVER_URL}/sp-api-orders/admin/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => dispatch({ type: "ADMIN_GET_ALL_ORDER", payload: res.data }));
    } catch (err) {
      dispatch({ type: "ADMIN_ORDER_ERROR", payload: err });
    }
  };
};

export const getOrderByIdAdmin = (orderId) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().UserSign.data.token;
      await Axios.get(`${process.env.REACT_APP_SERVER_URL}/sp-api-orders/order/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => dispatch({ type: "ADMIN_GET_ORDER_BY_ID", payload: res.data }));
    } catch (err) {
      dispatch({ type: "ADMIN_ORDER_ERROR", payload: err });
    }
  };
};

export const deleteOrderAdmin = (orderId) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().UserSign.data.token;
      await Axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/sp-api-orders/delete-order/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(() => dispatch({ type: "ADMIN_DELETE_ORDER", payload: orderId, warn: "success" }));
    } catch (err) {
      dispatch({ type: "ADMIN_ORDER_ERROR", payload: err, warn: "failed" });
    }
  };
};
