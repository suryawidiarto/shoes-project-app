export const addToCartReducers = (state = { items: [] }, action) => {
  switch (action.type) {
    case "CART_GET_ITEM":
      return { items: action.payload };
    case "CART_ADD_ITEM":
      const item = action.payload;
      const check = state.items.findIndex(
        (e) => e.productId === item.productId && e.productSize === item.productSize
      );
      if (check !== -1) {
        return {
          ...state,
          warn: "error",
          items: state.items.map((e, i) => (i === check ? item : e)),
        };
      } else {
        return {
          ...state,
          warn: "success",
          items: [...state.items, item],
        };
      }
    case "CART_DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((x, index) => index !== action.payload),
        warn: action.warn,
      };
    case "CART_ERROR":
      return { ...state, error: action.payload, warn: action.warn };
    case "CART_RESET_WARN":
      return { ...state, warn: "" };
    case "CART_RESET":
      return { items: [] };
    default:
      return state;
  }
};
