import { useReducer } from "react";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";

function paymentReducer(state, action) {
  switch (action.type) {
    case "loadingIntent":
      return {
        ...state,
        status: "loadingIntent",
        error: null,
      };
    case "intentSuccess":
      return {
        ...state,
        status: "intentResolved",
        error: null,
        clientSecret: action.payload,
      };
    case "intentError":
      return {
        ...state,
        status: "intentRejected",
        error: action.payload,
      };
    case "inputError":
      return {
        ...state,
        status: "inputRejected",
        error: action.payload,
      };
    case "processing":
      return {
        ...state,
        status: "loadingPayment",
        error: null,
      };
    case "paymentError":
      return {
        ...state,
        status: "paymentRejected",
        error: action.payload,
      };

    case "paymentSuccess":
      return {
        ...state,
        status: "paymentResolved",
        error: null,
      };
    default:
      throw new Error(`Unhandled case for payment`);
  }
}

const initialState = {
  status: "idle",
  errors: null,
  clientSecret: null,
};

const useCheckout = () => {
  const [state, dispatch] = useReducer(paymentReducer, initialState);

  const stripe = useStripe();
  const elements = useElements();

  const validateData = ({ name, email, amount }) => {
    if (!name.trim().lenght) {
      return "El nombre no puede esta vacío";
    }

    if (!email.trim().lenght) {
      return "El email no puede estar vacío";
    }

    if (isNaN(amount) || amount < 0)
      return "La cantidad no es un número mayor que 0";

    return null;
  };

  async function createPaymentIntent() {
    try {
      dispatch({ type: "loadingIntent" });
      const result = await fetch("/api/payment", {
        method: "POST",
      });

      const data = await result.json();

      dispatch({ type: "intentSuccess", payload: data.clientSecret });
    } catch (e) {
      dispatch({
        type: "intentError",
        payload: "Algo salió mal, intenta de nuevo más tarde",
      });
    }
  }

  const createPayment = async ({ e, data }) => {
    e.preventDefault();
    dispatch({ type: "processing" });

    const inputError = validateData(data);

    if (inputError) {
      dispatch({ type: "inputError", payload: inputError });
      return;
    }

    const payload = await stripe.confirmCardPayment(state.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      dispatch({ type: "paymentError", payload: payload.error.message });
    } else {
      dispatch({ type: "paymentSuccess" });
    }
  };

  return { ...state, dispatch, createPaymentIntent, createPayment };
};

export default useCheckout;
