import theme from "../theme/theme";
import styled from "styled-components";
import Form from "../components/Form";
import History from "../components/History";
import mixins from "../theme/mixins";
import useModal from "../hooks/useModal";
import Modal from "../components/Modal";
import Success from "../components/Success";
import Receipt from "../components/Receipt";
import { formatDate, formatTime } from "../utils/date";

const { flex, justifyBetween } = mixins;

const { colors } = theme;

const Container = styled.div`
  ${flex};
  ${justifyBetween};
`;

const Title = styled.h1`
  color: ${colors.darkGray};
  font-size: 2.5rem;
`;

export default function Home() {
  const { openModal, setOpenModal, data, setData } = useModal();

  function onPaymentSuccess() {
    setOpenModal("success");
  }

  function onReceipt(values) {
    setOpenModal("receipt");
    setData(values);
  }

  return (
    <>
      <Title>Checkout</Title>
      <Container>
        <Form onPaymentSuccess={onPaymentSuccess} />
        <History onReceipt={onReceipt} />
      </Container>
      <Modal
        isOpen={openModal !== null}
        onClose={() => setOpenModal(null)}
        width="400px"
        height={openModal === "success" ? "400px" : "600px"}
      >
        {openModal === "success" ? (
          <Success />
        ) : data ? (
          <Receipt
            amount={data.amount}
            date={formatDate(new Date(data.created * 1000))}
            description={data.description}
            email={data.email}
            id={data.id}
            name={data.name}
            time={formatTime(new Date(data.created * 1000))}
          />
        ) : null}
      </Modal>
    </>
  );
}
