import React from "react";
import styled from "styled-components";
import theme from "../theme/theme";
import mixins from "../theme/mixins";
const { colors } = theme;
const { flex, flexColumn, flexRow, alignCenter } = mixins;

const Container = styled.div`
  ${flex};
  ${flexColumn};
  margin-bottom: 1rem;
  width: ${({ type }) =>
    type === "email" ? "400px" : type === "name" ? "200px" : "150px"};
`;

const InputContainer = styled.div`
  background-color: white;
  ${flex};
  ${flexRow};
  ${alignCenter};
  padding: 0 14px;
  box-shadow: 0px 1px 3px 0px rgba(230, 235, 241, 0.25);

  svg {
    fill: black;
    filter: opacity(0.2);
    margin-right: 10px;
  }
`;

const Label = styled.label`
  color: ${colors.darkGray};
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const Field = styled.input`
  height: 40px;
  border: 0;
  border-radius: 4px;
  width: 100%;
  font-size: 15px;
  &::placeholder {
    color: ${colors.lightestGray};
  }
`;

const Error = styled.span``;

export default function Input({ children, type }) {
  return (
    <Container type={type}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { type })
      )}
    </Container>
  );
}

Input.Label = function ({ children }) {
  return <Label>{children}</Label>;
};

Input.Field = function ({ placeholder, icon, type, value, handleChange }) {
  return (
    <InputContainer>
      {icon}
      <Field
        placeholder={placeholder}
        name={type}
        type={type === "email" ? "email" : type === "name" ? "text" : "number"}
        min={type === "amount" ? "0" : null}
        value={value}
        onChange={handleChange}
      />
    </InputContainer>
  );
};

Input.Error = function ({ children }) {
  return <Error>{children}</Error>;
};
