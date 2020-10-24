import { useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import { FaSearch } from "react-icons/fa";
import mixins from "../theme/mixins";
import theme from "../theme/theme";
import cogoToast from "cogo-toast";

const { flex } = mixins;
const { colors } = theme;

const Container = styled.div`
  ${flex};
  column-gap: 10px;
  margin: 1rem 0 1.5rem 0;
`;

const Button = styled.button`
  background-color: white;
  border: 0;
  font-weight: bold;
  color: ${colors.darkGray};
  cursor: pointer;
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.15);
  border-radius: 4px;
  transition: all 0.1s ease-in-out;

  &:hover {
    box-shadow: 0 2px 4px hsla(0, 0%, 0%, 0.2);
  }
`;

export default function Searchbar({ onReceipt }) {
  const [search, setSearch] = useState("");

  async function fetchTicket() {
    if (!search.trim().length) {
      cogoToast.error("Ingresa el Id del pago");
      return;
    }
    try {
      const response = await fetch(`/api/payments/${search}`, {
        method: "POST",
      });
      const payment = await response.json();
      onReceipt(payment);
    } catch (e) {
      cogoToast.error("No se encontró el pago con el id especificado");
    }
  }

  return (
    <Container>
      <Input.Field
        icon={<FaSearch />}
        placeholder="Id del pago"
        type="search"
        value={search}
        handleChange={(e) => setSearch(e.target.value)}
      />
      <Button onClick={fetchTicket}>Generar ticket</Button>
    </Container>
  );
}
