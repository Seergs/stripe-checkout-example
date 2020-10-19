import { useEffect } from "react";
import styled from "styled-components";
import theme from "../theme/theme";
import Input from "./Input";
import mixins from "../theme/mixins";
import { FaEnvelope, FaUser, FaDollarSign } from "react-icons/fa";
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

export default function Form() {
  const { createPaymentIntent, status, createPayment, error } = useCheckout();
  const { values, handleChange } = useFormValues({
    name: "",
    email: "",
    amount: 0,
  });

  console.log(values);

  useEffect(() => {
    createPaymentIntent();
  }, []);

  useEffect(() => {
    if (error) cogoToast.error(error);
  }, [error]);

  return (
    <FormWrapper onSubmit={createPayment}>
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
