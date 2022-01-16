import Axios from "axios";

export const checkToken = (token) => {
  return async (dispatch) => {
    try {
      await Axios.get(`https://shoes-project-server.herokuapp.com/sp-api-users/check-token`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => dispatch({ type: "TOKEN_VALID", payload: res.data }))
        .catch((err) => dispatch({ type: "TOKEN_INVALID", payload: err }));
    } catch (err) {
      dispatch({ type: "TOKEN_INVALID", payload: err });
    }
  };
};

export const signUp = (name, email, password) => {
  return async (dispatch) => {
    try {
      await Axios.post("https://shoes-project-server.herokuapp.com/sp-api-users/add-user", {
        name,
        email,
        password,
      })
        .then((res) =>
          dispatch({
            type: "USER_SIGNUP_SUCCESS",
            payload: { isSignUpSuccess: true, data: res.data },
            warn: "success",
          })
        )
        .catch((err) => dispatch({ type: "USER_SIGNUP_FAILED", payload: err, warn: "failed" }));
    } catch (error) {
      dispatch({ type: "USER_SIGNUP_FAILED", payload: error, warn: "failed" });
    }
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      await Axios.post("https://shoes-project-server.herokuapp.com/sp-api-users/signin", {
        email,
        password,
      })
        .then((res) => {
          dispatch({
            type: "USER_SIGNIN_SUCCESS",
            payload: { id: res.data._id, token: res.data.token },
            isLogin: true,
            isAdmin: res.data.isAdmin,
            warn: "success",
          });
          localStorage.setItem("IsLogin", JSON.stringify(true));
          localStorage.setItem("IsAdmin", JSON.stringify(res.data.isAdmin));
          localStorage.setItem("Token", JSON.stringify(res.data.token));
          localStorage.setItem("UserId", JSON.stringify(res.data._id));
        })
        .catch((err) => dispatch({ type: "USER_SIGNIN_ERROR", payload: err, warn: "failed" }));
    } catch (error) {
      dispatch({ type: "USER_SIGNIN_ERROR", payload: error, warn: "failed" });
    }
  };
};

export const signOut = () => {
  return (dispatch) => {
    try {
      dispatch({
        type: "USER_SIGNIN_RESET",
        payload: false,
        warn: "success",
      });
      dispatch({ type: "USER_DATA_RESET" });
      dispatch({ type: "TOKEN_RESET" });
      localStorage.removeItem("IsLogin");
      localStorage.removeItem("IsAdmin");
      localStorage.removeItem("Token");
      localStorage.removeItem("UserId");
    } catch (error) {
      dispatch({
        type: "USER_SIGNIN_ERROR",
        payload: error,
        warn: "failed",
      });
    }
  };
};

export const getUser = () => {
  return async (dispatch, getState) => {
    try {
      const userData = getState().UserSign.data;
      await Axios.get(`https://shoes-project-server.herokuapp.com/sp-api-users/profile`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
        .then((res) => {
          dispatch({ type: "USER_GETDATA_SUCCESS", payload: res.data });
        })
        .catch((err) => dispatch({ type: "USER_GETDATA_FAILED", payload: err }));
    } catch (error) {
      dispatch({ type: "USER_GETDATA_FAILED", payload: error });
    }
  };
};

export const updateUser = (userData) => {
  return async (dispatch, getState) => {
    try {
      const userToken = getState().UserSign.data.token;
      await Axios.post(
        "https://shoes-project-server.herokuapp.com/sp-api-users/update-profile",
        {
          ...userData,
          password: userData.newPassword,
          sub_district: userData.subDistrict,
          postal_code: userData.postalCode,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
        .then((res) => {
          dispatch({ type: "USER_UPDATE_DATA_SUCCESS", payload: res.data, warn: "success" });
          localStorage.setItem("Token", JSON.stringify(res.data.token));
          dispatch({ type: "WARN_RESET" });
        })
        .catch((err) =>
          dispatch({ type: "USER_UPDATE_DATA_FAILED", payload: err, warn: "failed" })
        );
    } catch (error) {
      dispatch({ type: "USER_UPDATE_DATA_FAILED", payload: error });
    }
  };
};
