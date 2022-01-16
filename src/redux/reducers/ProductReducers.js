export const getAllProductReducers = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCT_SUCCESS":
      return { data: action.payload, statePage: action.statePage };
    case "GET_ALL_PRODUCT_FAILED":
      return { error: action.payload };
    default:
      return state;
  }
};

export const getProductByIdReducers = (state = {}, action) => {
  switch (action.type) {
    case "GET_PRODUCT_BY_ID_SUCCESS":
      return { loading: false, data: action.payload };
    case "GET_PRODUCT_BY_ID_FAILED":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
