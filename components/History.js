import { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../theme/theme";
import { formatDate } from "../utils/date";
import mixins from "../theme/mixins";
import { FaReceipt, FaRedo } from "react-icons/fa";

const { flex, justifyBetween, alignCenter } = mixins;
const { colors } = theme;

const Wrapper = styled.div`
  background-color: white;
  min-width: 400px;
  padding: 1rem 2rem;
`;

const Title = styled.div`
  ${flex};
  ${alignCenter};
  margin-bottom: 2rem;
`;

const TitleText = styled.h2`
  font-weight: normal;
  color: ${colors.darkGray};
  justify-self: center;
`;

const Redo = styled.button`
  background-color: transparent;
  border: 0;
  justify-self: flex-end;
  margin-left: auto;
  cursor: pointer;
  ${flex};
  ${alignCenter};

  &:hover svg {
    transform: scale(1.1);
  }

  svg {
    fill: ${colors.gray};
    transition: all 0.2s ease-in-out;
  }
`;

const Payment = styled.div`
  ${flex};
  ${justifyBetween};
  margin: 0.7rem 0;

  button {
    background-color: transparent;
    border: 0;
    cursor: pointer;

    &:hover svg {
      fill: ${colors.gray};
    }
  }

  svg {
    fill: ${colors.lightestGray};
    height: 20px;
    width: 20px;
  }
  .amount {
    font-weight: bold;
  }
`;

export default function History({ onReceipt }) {
  const [payments, setPayments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function getPayments() {
      setIsLoading(true);
      const response = await fetch("/api/payments");

      const data = await response.json();
      setPayments(data);
      setIsLoading(false);
    }

    getPayments();
  }, [reload]);

  return (
    <Wrapper>
      <Title>
        <TitleText>History</TitleText>
        <Redo onClick={() => setReload((prev) => !prev)}>
          <FaRedo />
        </Redo>
      </Title>
      {isLoading
        ? "Loading..."
        : payments.map((payment) => (
            <Payment key={payment.id}>
              <span>{formatDate(new Date(payment.created * 1000))}</span>
              <span className="amount">{`$ ${payment.amount} MXN`}</span>
              <button onClick={() => onReceipt(payment)}>
                <FaReceipt />
              </button>
            </Payment>
          ))}
    </Wrapper>
  );
}
