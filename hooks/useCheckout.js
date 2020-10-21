import { useReducer } from "react";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { formatDate, formatTime } from "../utils/date";

function paymentReducer(state, action) {
  switch (action.type) {
    case "processing":
      return {
        ...state,
        status: "loadingPayment",
        error: null,
        payment: null,
      };
    case "error":
      return {
        ...state,
        status: "paymentRejected",
        error: action.payload,
        payment: null,
      };

    case "success":
      return {
        ...state,
        status: "paymentResolved",
        error: null,
        payment: action.payload,
      };
    default:
      throw new Error(`Unhandled case for payment`);
  }
}

const initialState = {
  status: "idle",
  error: null,
  payment: null,
};

const useCheckout = () => {
  const [state, dispatch] = useReducer(paymentReducer, initialState);
  const isPaymentSuccess =
    state.status === "paymentResolved" && state.payment !== null;
  const isPaymentError =
    state.status === "paymentRejected" && state.error !== null;
  const isLoading = state.status === "loadingPayment";

  const stripe = useStripe();
  const elements = useElements();

  async function createPaymentIntent(paymentData) {
    try {
      const result = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const data = await result.json();

      return data.clientSecret;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  const createPayment = async (data) => {
    dispatch({ type: "processing" });

    const clientSecret = await createPaymentIntent(data);
    if (!clientSecret) {
      dispatch({
        type: "error",
        payload: "Algo salió mal, intenta de nuevo más tarde",
      });

      return;
    }

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: data.name,
          email: data.email,
        },
      },
    });

    if (payload.error) {
      dispatch({ type: "error", payload: payload.error.message });
    } else {
      dispatch({
        type: "success",
        payload: {
          id: payload.paymentIntent.id,
          date: formatDate(Date(payload.paymentIntent.created)),
          time: formatTime(Date(payload.paymentIntent.created)),
        },
      });
    }
  };

  return {
    ...state,
    dispatch,
    createPayment,
    isPaymentSuccess,
    isPaymentError,
    isLoading,
  };
};

export default useCheckout;
