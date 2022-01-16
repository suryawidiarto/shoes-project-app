export const notificationReducer = (state = { isPop: false }, action) => {
  switch (action.type) {
    case "POP_NOTIFICATION":
      return {
        isPop: action.payload.isPop,
        messagePop: action.payload.messagePop,
        variantPop: action.payload.variantPop,
      };
    case "RESET_NOTIFICATION":
      return { isPop: false };
    case "ERROR_NOTIFICATION":
      return { error: action.payload };
    default:
      return state;
  }
};
