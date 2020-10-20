import { useState } from "react";
import theme from "../theme/theme";
import styled from "styled-components";
import Form from "../components/Form";
import cogoToast from "cogo-toast";
import useModal from "../hooks/useModal";
import Modal from "../components/Modal";
import Receipt from "../components/Receipt";

const { colors } = theme;

const Title = styled.h1`
  color: ${colors.darkGray};
  font-size: 2.5rem;
`;

export default function Home() {
  const [isOpen, setIsOpen] = useModal();
  const [modalData, setModalData] = useState(null);

  const onPaymentSuccess = ({ payment, values }) => {
    cogoToast.success("Pago realizado con éxito");
    setModalData({ ...values, ...payment });
    setIsOpen(true);
  };

  return (
    <div>
      <Title>Checkout</Title>
      <Form onPaymentSuccess={onPaymentSuccess} />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {modalData ? (
          <Receipt
            description={modalData.description}
            amount={modalData.amount}
            email={modalData.email}
            name={modalData.name}
            id={modalData.id}
            date={modalData.date}
            time={modalData.time}
          />
        ) : null}
      </Modal>
    </div>
  );
}
