import React from "react";
import { AlertBox } from "./NotificationPopElements";

const NotificationPop = (props) => {
  return (
    <AlertBox variant="filled" severity={props.variantPop} $isPop={props.isPop}>
      {props.messagePop}
    </AlertBox>
  );
};

export default NotificationPop;
