export const addShippingDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_SHIPPING_DATA":
      return { data: action.payload.shippingData, warn: action.warn };
    case "RESET_SHIPPING_WARN":
      return { ...state, warn: "" };
    case "ERROR_SHIPPING_DATA":
      return { error: action.payload, warn: action.warn };
    default:
      return state;
  }
};

export const addOrderDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_ORDER_DATA":
      return {
        orderId: action.payload.orderId,
        warn: action.warn,
      };
    case "RESET_ORDER_WARN":
      return { ...state, warn: "" };
    case "ERROR_ORDER_DATA":
      return { error: action.payload.error, warn: action.warn };
    default:
      return state;
  }
};

export const getOrderDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ORDER_DATA_BY_USER_ID":
      return { data: action.payload };
    case "ERROR_ORDER_DATA_BY_USER_ID":
      return { error: action.payload };
    default:
      return state;
  }
};

export const orderDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ORDER_DATA_BY_ORDER_ID":
      return { data: action.payload };
    case "MAKE_PAYMENT_SUCCESS":
      return { data: action.payload, warn: action.warn };
    case "CONFIRM_DELIVERED_SUCCESS":
      return { data: action.payload, warn: action.warn };
    case "RESET_WARN_ORDER_DETAIL":
      return { ...state, warn: "" };
    case "ERROR_ORDER_DETAIL":
      return { error: action.payload, warn: action.warn };
    default:
      return state;
  }
};
