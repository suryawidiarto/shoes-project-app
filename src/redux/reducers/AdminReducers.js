export const adminDataProductReducers = (state = {}, action) => {
  switch (action.type) {
    case "ADMIN_GET_ALL_PRODUCT":
      return { dataAll: action.payload };
    case "ADMIN_GET_PRODUCT_BY_ID":
      return { dataById: action.payload };
    case "ADMIN_EDIT_PRODUCT_BY_ID":
      return { dataById: action.payload, warn: action.warn };
    case "ADMIN_POST_PRODUCT":
      return { dataPost: action.payload, warn: action.warn };
    case "ADMIN_DELETE_PRODUCT":
      return {
        ...state,
        warn: action.warn,
        dataAll: state.dataAll.filter((x) => x._id !== action.payload),
      };
    case "ADMIN_WARN_PRODUCT_RESET":
      return {
        ...state,
        warn: "",
      };
    case "ADMIN_PRODUCT_ERROR":
      return { error: action.payload, warn: action.warn };
    default:
      return state;
  }
};

export const adminDataOrderReducers = (state = {}, action) => {
  switch (action.type) {
    case "ADMIN_GET_ALL_ORDER":
      return { dataAll: action.payload };
    case "ADMIN_GET_ORDER_BY_ID":
      return { dataById: action.payload };
    case "ADMIN_DELETE_ORDER":
      return {
        ...state,
        warn: action.warn,
        dataAll: state.dataAll.filter((x) => x._id !== action.payload),
      };
    case "ADMIN_WARN_ORDER_RESET":
      return {
        ...state,
        warn: "",
      };
    case "ADMIN_ORDER_ERROR":
      return { error: action.payload };
    default:
      return state;
  }
};
