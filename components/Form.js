import { useReducer, useEffect } from "react";
import styled from "styled-components";
import theme from "../theme/theme";
import Input from "./Input";
import mixins from "../theme/mixins";
import { FaEnvelope, FaUser, FaDollarSign } from "react-icons/fa";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";

const { colors } = theme;
const { flex, flexRow } = mixins;

const FormWrapper = styled.form`
  .StripeElement {
    background-color: white;
    height: 40px;
    padding: 12px;
    border-radius: 4px;
    width: 500px;
    margin: 10px 0 1rem 0;
  }
`;

const Title = styled.div`
  margin: 2rem 0 1.5rem 0;
  font-weight: 600;
  color: ${colors.lightGray};
`;

const Button = styled.button`
  background-color: ${colors.gray};
  border: 0;
  color: ${colors.lightestGray};
  width: 180px;
  height: 40px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
`;

const Row = styled.div`
  ${flex};
  ${flexRow};
  gap: 1rem;
`;

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
  clientSecret: null,
};

export default function Form() {
  const [{ status, error, clientSecret }, dispatch] = useReducer(
    paymentReducer,
    initialState
  );
  const stripe = useStripe();
  const elements = useElements();

  console.log({ status, error });

  useEffect(() => {
    async function createPaymentIntent() {
      try {
        dispatch({ type: "loadingIntent" });
        const result = await fetch("/api/payment", {
          method: "POST",
        });

        const data = await result.json();

        dispatch({ type: "intentSuccess", payload: data.clientSecret });
      } catch (e) {
        dispatch({ type: "intentError", payload: e.message });
      }
    }

    createPaymentIntent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "processing" });

    const payload = await stripe.confirmCardPayment(clientSecret, {
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

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Title>Llena la siguiente información</Title>
      <Row>
        <Input type="email">
          <Input.Label>Correo electrónico</Input.Label>
          <Input.Field
            placeholder="example@example.com"
            icon={<FaEnvelope />}
          />
        </Input>
        <Input type="name">
          <Input.Label>Nombre</Input.Label>
          <Input.Field placeholder="Jane Doe" icon={<FaUser />} />
        </Input>
      </Row>
      <Input.Label>Tarjeta</Input.Label>
      <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
      <Input type="amount">
        <Input.Label>Cantidad</Input.Label>
        <Input.Field placeholder="0.0 MXN" icon={<FaDollarSign />} />
      </Input>
      <Button>Complete payment</Button>
    </FormWrapper>
  );
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontFamily: '"Asap", sans-serif',
      "::placeholder": {
        color: colors.lightestGray,
      },
    },
  },
};
