export const popNotification = (variant, message) => {
  return (dispatch) => {
    try {
      dispatch({
        type: "POP_NOTIFICATION",
        payload: { isPop: true, messagePop: message, variantPop: variant },
      });
    } catch (err) {
      dispatch({ type: "ERROR_NOTIFICATION", payload: err });
    }
  };
};

export const resetNotification = () => {
  return (dispatch) => {
    try {
      dispatch({ type: "RESET_NOTIFICATION" });
    } catch (err) {
      dispatch({ type: "ERROR_NOTIFICATION", payload: err });
    }
  };
};
