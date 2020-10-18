import styled from "styled-components";
import theme from "../theme/theme";
import Input from "./Input";
import mixins from "../theme/mixins";
import { FaEnvelope, FaUser, FaDollarSign } from "react-icons/fa";

const { colors } = theme;
const { flex, flexRow } = mixins;

const FormWrapper = styled.form``;

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
`;

const Row = styled.div`
  ${flex};
  ${flexRow};
  gap: 1rem;
`;

export default function Form() {
  return (
    <FormWrapper>
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
      <Input type="amount">
        <Input.Label>Cantidad</Input.Label>
        <Input.Field placeholder="0.0 MXN" icon={<FaDollarSign />} />
      </Input>
      <Button>Complete payment</Button>
    </FormWrapper>
  );
}
