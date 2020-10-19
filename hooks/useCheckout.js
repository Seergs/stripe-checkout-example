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
  error: null,
};

const useCheckout = () => {
  const [state, dispatch] = useReducer(paymentReducer, initialState);
  const isPaymentSuccess = state.status === "paymentResolved";
  const isPaymentError =
    state.status === "paymentRejected" ||
    state.status === "intentRejected" ||
    state.status === "inputRejected";
  const isLoading =
    state.status === "loadingIntent" || state.status === "loadingPayment";

  const stripe = useStripe();
  const elements = useElements();

  const validateData = ({ name, email, amount, description }) => {
    if (!email.trim().length) {
      return "El email no puede estar vacío";
    }

    if (!name.trim().length) {
      return "El nombre no puede esta vacío";
    }

    if (isNaN(amount) || amount < 10)
      return "La cantidad mínima a pagar son $10 MXN";

    if (!description.trim().length) {
      return "La descripción no puede estar vacía";
    }
    return null;
  };

  async function createPaymentIntent(paymentData) {
    try {
      dispatch({ type: "loadingIntent" });
      const result = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const data = await result.json();

      return data.clientSecret;
    } catch (e) {
      return null;
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
    const clientSecret = await createPaymentIntent(data);
    if (!clientSecret) {
      dispatch({
        type: "intentError",
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
      dispatch({ type: "paymentError", payload: payload.error.message });
    } else {
      dispatch({ type: "paymentSuccess" });
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
