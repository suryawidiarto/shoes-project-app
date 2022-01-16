import Axios from "axios";

export const getCartItem = () => {
  return async (dispatch, getState) => {
    try {
      const userData = getState().UserSign.data;
      await Axios.get("http://localhost:2000/sp-api-users/cart", {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      }).then((res) => dispatch({ type: "CART_GET_ITEM", payload: res.data }));

      localStorage.setItem("Cart", JSON.stringify(getState().Cart.items));
    } catch (error) {
      dispatch({ type: "CART_ERROR", payload: error });
    }
  };
};

export const addToCart = (sizeProduct, qtyProduct) => {
  return async (dispatch, getState) => {
    try {
      const dataProduct = getState().ProductById.data;
      dispatch({
        type: "CART_ADD_ITEM",
        payload: {
          productId: dataProduct._id,
          productSize: sizeProduct,
          productQty: qtyProduct,
          productName: dataProduct.name,
          productPrice: dataProduct.price,
          productImage: dataProduct.image[0],
          productDescription: dataProduct.description,
        },
      });
      const cartItems = getState().Cart.items;
      const userData = getState().UserSign.data;
      await Axios.post(
        "http://localhost:2000/sp-api-users/item-cart",
        {
          cartItems: cartItems,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      localStorage.setItem("Cart", JSON.stringify(getState().Cart.items));
    } catch (err) {
      dispatch({ type: "CART_ERROR", payload: err, warn: "failed" });
    }
  };
};

export const deleteItemCart = (itemIndex) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "CART_DELETE_ITEM", payload: itemIndex, warn: "success" });
      const cartItems = getState().Cart.items;
      const userData = getState().UserSign.data;
      await Axios.post(
        "http://localhost:2000/sp-api-users/item-cart",
        {
          cartItems: cartItems,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      localStorage.setItem("Cart", JSON.stringify(getState().Cart.items));
    } catch (err) {
      dispatch({ type: "CART_ERROR", payload: err, warn: "failed" });
    }
  };
};

export const resetItemCart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "CART_RESET" });
      const userData = getState().UserSign.data;
      await Axios.post(
        "http://localhost:2000/sp-api-users/item-cart",
        {
          cartItems: [],
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      localStorage.removeItem("Cart");
    } catch (error) {
      dispatch({ type: "CART_ERROR", payload: error, warn: "failed" });
    }
  };
};
