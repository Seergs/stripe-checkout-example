import theme from "../theme/theme";
import styled from "styled-components";
import Form from "../components/Form";
import History from "../components/History";
import mixins from "../theme/mixins";

const { flex } = mixins;

const { colors } = theme;

const Container = styled.div`
  ${flex};
  column-gap: 2rem;
`;

const Title = styled.h1`
  color: ${colors.darkGray};
  font-size: 2.5rem;
`;

export default function Home() {
  return (
    <>
      <Title>Checkout</Title>
      <Container>
        <Form />
        <History />
      </Container>
    </>
  );
}
