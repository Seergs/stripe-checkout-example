import { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../theme/theme";
import { formatToHuman, formatDate } from "../utils/date";
import mixins from "../theme/mixins";
import { FaReceipt } from "react-icons/fa";

const { flex, justifyBetween } = mixins;
const { colors } = theme;

const Wrapper = styled.div`
  background-color: white;
  width: 300px;
  padding: 1rem 2rem;
`;

const Title = styled.h2`
  font-weight: normal;
  color: ${colors.darkGray};
  text-align: center;
  margin-bottom: 2rem;
`;

const Payment = styled.div`
  ${flex};
  ${justifyBetween};
  margin: 0.7rem 0;

  button {
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }

  svg {
    fill: ${colors.lightGray};
    height: 20px;
    width: 20px;
  }
  .amount {
    font-weight: bold;
  }
`;

export default function History() {
  const [payments, setPayments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPayments() {
      setIsLoading(true);
      const response = await fetch("/api/payments");

      const data = await response.json();
      setPayments(data);
      setIsLoading(false);
    }

    getPayments();
  }, []);

  return (
    <Wrapper>
      <Title>History</Title>
      {isLoading
        ? "Loading..."
        : payments.map((payment) => (
            <Payment key={payment.id}>
              <span>{formatDate(Date(payment.date))}</span>
              <span className="amount">{`$ ${payment.amount} MXN`}</span>
              <button>
                <FaReceipt />
              </button>
            </Payment>
          ))}
    </Wrapper>
  );
}
