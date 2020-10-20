import styled, { css } from "styled-components";
import mixins from "../theme/mixins";
import Barcode from "react-barcode";

const { flex, justifyBetween, alignCenter } = mixins;

const Wrapper = styled.div`
  font-family: "IBM Plex Mono", monospace;

  svg {
    width: 100%;
  }
`;

const TextCenter = styled.span`
  font-family: inherit;
  font-size: 0.8rem;
  text-align: center;
  display: block;
`;

const Link = styled.a`
  font-family: inherit;
  font-size: 0.8rem;
  text-align: center;
  display: block;
  text-decoration: none;
  color: black;
`;

const Container = styled.div`
  ${flex};
  ${justifyBetween};
  ${alignCenter};
  font-family: inherit;
  margin: 0.5rem 0;
  padding: 10px 0;

  ${(props) =>
    props.dashed
      ? css`
          border-top: 1px dashed black;
          border-bottom: 1px dashed black;
        `
      : css`
          padding: 10px;
        `}
`;

const Text = styled.span`
  font-family: inherit;
  font-size: 0.8rem;

  ${(props) =>
    props.bold &&
    css`
      font-weight: bold;
    `}
`;

const Total = styled.span`
  font-family: inherit;
  font-weight: bold;
`;

const Divider = styled.div`
  width: 100%;
  border: 1px dashed black;
`;

export default function Receipt({
  id,
  description,
  amount,
  email,
  name,
  date,
  time,
}) {
  return (
    <Wrapper>
      <TextCenter>Stripe Checkout Example</TextCenter>
      <Link href="mailto: s.suarerez@gmail.com">s.suarerez@gmail.com</Link>
      <TextCenter>Argentina #171</TextCenter>
      <TextCenter>Chilchota, Michoacán</TextCenter>
      <TextCenter>Tel. 355-511-5455</TextCenter>
      <Container dashed>
        <Text>Fecha: {date}</Text>
        <Text>Hora: {time}</Text>
      </Container>
      <Container>
        <Text>{description}</Text>
        <Text>{amount}.00</Text>
      </Container>
      <Container>
        <Total>Total</Total>
        <Text>{amount}.00 MXN</Text>
      </Container>
      <Divider />
      <Container>
        <Text bold>INFORMACIÓN DEL CLIENTE</Text>
      </Container>
      <Container>
        <Link href={`mailto:${email}`}>Correo electrónico: {email}</Link>
      </Container>
      <Container>
        <Text>Nombre: {name}</Text>
      </Container>
      <Barcode value={id} />
    </Wrapper>
  );
}
