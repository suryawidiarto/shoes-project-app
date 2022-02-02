import Axios from "axios";

export const getAllProduct = (currentPage) => {
  return async (dispatch) => {
    try {
      await Axios.get(
        `${process.env.REACT_APP_SERVER_URL}/sp-api-products/user/?page=${currentPage}`
      ).then((res) =>
        dispatch({ type: "GET_ALL_PRODUCT_SUCCESS", payload: res.data, statePage: currentPage })
      );
    } catch (err) {
      dispatch({ type: "GET_ALL_PRODUCT_FAILED", payload: err });
    }
  };
};

export const getProductById = (id) => {
  return async (dispatch) => {
    try {
      await Axios.get(`${process.env.REACT_APP_SERVER_URL}/sp-api-products/product/${id}`).then(
        (res) => dispatch({ type: "GET_PRODUCT_BY_ID_SUCCESS", payload: res.data })
      );
    } catch (err) {
      dispatch({ type: "GET_PRODUCT_BY_ID_FAILED", payload: err });
    }
  };
};
