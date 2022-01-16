import React, { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import { makePayment } from "../../redux/actions/OrderActions";

const PaypalCheckoutButton = () => {
  const dispatchR = useDispatch();
  const OrderDetail = useSelector((state) => state.OrderDetail);
  const { _id, orderPrice, orderedItems } = OrderDetail.data;

  const client_id = process.env.REACT_APP_CLIENT_ID;
  const amount = orderPrice.total_price;
  const currency = "USD";
  const style = { layout: "horizontal", color: "blue", tagline: false, label: "pay" };

  const checkoutHandler = () => {
    dispatchR(makePayment(_id, orderedItems));
  };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: `Order Id: ${_id}`,
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            actions.order.capture().then(() => {
              checkoutHandler();
            });
          }}
        />
      </>
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <PayPalScriptProvider
        options={{
          "client-id": client_id,
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper currency={currency} showSpinner={true} />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaypalCheckoutButton;
