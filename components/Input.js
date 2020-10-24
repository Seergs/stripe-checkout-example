import React from "react";
import styled, { css } from "styled-components";
import theme from "../theme/theme";
import mixins from "../theme/mixins";
const { colors } = theme;
const { flex, flexColumn, flexRow, alignCenter } = mixins;

const Container = styled.div`
  ${flex};
  ${flexColumn};
  margin-bottom: 1rem;
  width: ${({ type }) =>
    type === "email"
      ? "400px"
      : type === "name"
      ? "300px"
      : type === "amount"
      ? "150px"
      : type === "description"
      ? "800px"
      : "100%"};
`;

const InputContainer = styled.div`
  background-color: white;
  ${flex};
  ${flexRow};
  ${alignCenter};
  padding: 0 14px;
  box-shadow: 0px 1px 3px 0px rgba(230, 235, 241, 0.25);
  border-radius: 4px;

  ${({ isSearchbar }) =>
    isSearchbar &&
    css`
      box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.15);
    `}

  svg {
    fill: black;
    filter: opacity(0.2);
    margin-right: 10px;
  }

  &:focus-within {
    outline: 2px solid ${colors.outline};
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
  width: 100%;
  font-size: 15px;
  &::placeholder {
    color: ${colors.lightestGray};
  }

  &:focus {
    outline: none;
  }
`;

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
    <InputContainer isSearchbar={type === "search"}>
      {icon}
      <Field
        placeholder={placeholder}
        name={type}
        type={
          type === "email"
            ? "email"
            : type === "name" || type === "description"
            ? "text"
            : type === "amount"
            ? "number"
            : "text"
        }
        min={type === "amount" ? "10" : null}
        value={value}
        onChange={handleChange}
      />
    </InputContainer>
  );
};
