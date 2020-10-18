import theme from "../theme/theme";
import styled from "styled-components";

const { colors } = theme;

const Title = styled.h1`
  color: ${colors.darkGray};
  font-size: 2.5rem;
`;

export default function Home() {
  return (
    <div>
      <Title>Checkout</Title>
    </div>
  );
}
