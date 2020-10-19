import { useEffect } from "react";
import styled from "styled-components";
import theme from "../theme/theme";
import Input from "./Input";
import mixins from "../theme/mixins";
import { FaEnvelope, FaUser, FaDollarSign, FaReceipt } from "react-icons/fa";
import { CardElement } from "@stripe/react-stripe-js";
import useCheckout from "../hooks/useCheckout";
import useFormValues from "../hooks/useFormValues";
import cogoToast from "cogo-toast";

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

    &--focus {
      outline: 2px solid ${colors.outline};
    }
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

  &:hover {
    filter: brightness(1.1);
  }

  &:disabled {
    filter: opacity(0.5);
    cursor: not-allowed;
  }

  &:focus {
    outline: 2px solid ${colors.outline};
  }
`;

const Row = styled.div`
  ${flex};
  ${flexRow};
  gap: 1rem;
`;

export default function Form() {
  const {
    createPayment,
    error,
    isLoading,
    isPaymentSuccess,
    isPaymentError,
  } = useCheckout();
  const { values, handleChange } = useFormValues({
    name: "",
    email: "",
    amount: 10,
    description: "",
  });

  useEffect(() => {
    if (isPaymentError) cogoToast.error(error);
  }, [error, isPaymentError]);

  useEffect(() => {
    if (isPaymentSuccess) cogoToast.success("Cobro realizado con éxito");
  }, [isPaymentSuccess]);

  return (
    <FormWrapper onSubmit={(e) => createPayment({ e, data: values })}>
      <Title>Llena la siguiente información</Title>
      <Row>
        <Input type="email">
          <Input.Label>Correo electrónico</Input.Label>
          <Input.Field
            placeholder="example@example.com"
            icon={<FaEnvelope />}
            value={values.email}
            handleChange={handleChange}
          />
        </Input>
        <Input type="name">
          <Input.Label>Nombre</Input.Label>
          <Input.Field
            placeholder="Jane Doe"
            icon={<FaUser />}
            value={values.name}
            handleChange={handleChange}
          />
        </Input>
      </Row>
      <Input.Label>Tarjeta</Input.Label>
      <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
      <Input type="amount">
        <Input.Label>Cantidad</Input.Label>
        <Input.Field
          placeholder="0.0 MXN"
          icon={<FaDollarSign />}
          value={values.amount}
          handleChange={handleChange}
        />
      </Input>
      <Input type="description">
        <Input.Label>Descripción</Input.Label>
        <Input.Field
          placeholder="Descripción"
          icon={<FaReceipt />}
          value={values.description}
          handleChange={handleChange}
        />
      </Input>
      <Button disabled={isLoading}>
        {isLoading ? "Processing" : "Complete payment"}
      </Button>
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
