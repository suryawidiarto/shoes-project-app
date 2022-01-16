export const userCheckTokenReducer = (state = { tokenExp: "initial" }, action) => {
  switch (action.type) {
    case "TOKEN_VALID":
      return { tokenExp: "valid" };
    case "TOKEN_INVALID":
      return { tokenExp: "expired" };
    case "TOKEN_RESET":
      return { tokenExp: "initial" };
    default:
      return state;
  }
};

export const userSignUpReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_SIGNUP_SUCCESS":
      return { warn: action.warn, data: action.payload.data };
    case "USER_SIGNUP_FAILED":
      return { warn: action.warn, error: action.payload };
    case "USER_SIGNUP_RESET":
      return {};
    default:
      return state;
  }
};

export const userSignInReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_SIGNIN_SUCCESS":
      return {
        data: { id: action.payload.id, token: action.payload.token },
        isLogin: action.isLogin,
        isAdmin: action.isAdmin,
        warn: action.warn,
      };
    case "USER_SIGNIN_ERROR":
      return { error: action.payload, warn: action.warn };
    case "USER_SIGNIN_RESET":
      return { isLogin: action.payload, data: { token: undefined }, warn: action.warn };
    case "USER_SIGNIN_WARN_RESET":
      return {
        ...state,
        warn: "",
      };
    default:
      return state;
  }
};

export const userDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_GETDATA_SUCCESS":
      return { data: action.payload, warn: action.warn };
    case "USER_GETDATA_FAILED":
      return { error: action.payload, warn: action.warn };
    case "USER_UPDATE_DATA_SUCCESS":
      return { data: action.payload, warn: action.warn };
    case "USER_UPDATE_DATA_FAILED":
      return { error: action.payload, warn: action.warn };
    case "WARN_RESET":
      return {
        ...state,
        warn: "",
      };
    case "USER_DATA_RESET":
      return {};
    default:
      return state;
  }
};
