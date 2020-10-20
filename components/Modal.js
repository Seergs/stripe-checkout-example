import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import mixins from "../theme/mixins";
import theme from "../theme/theme";
const { colors } = theme;

const { flex, flexColumn } = mixins;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  width: 400px;
  height: 600px;
  margin: 1rem auto;
  padding: 1rem;
  background-color: white;
  font-family: "Consolas";
  ${flex};
  ${flexColumn};
  border-radius: 4px;
`;

const CloseButton = styled.button`
  display: block;
  align-self: flex-end;
  background: transparent;
  border: 0;
  cursor: pointer;

  svg {
    height: 20px;
    width: 20px;
    fill: ${colors.iconFill};
    transition: all 0.1s ease-in-out;
  }
  &:hover {
    svg {
      fill: black;
    }
  }
`;

export default function Modal({ isOpen, onClose, children }) {
  if (isOpen)
    return (
      <AnimatePresence>
        <Overlay>
          <Content>
            <CloseButton onClick={onClose}>
              <FaTimes />
            </CloseButton>
            {children}
          </Content>
        </Overlay>
      </AnimatePresence>
    );

  return null;
}
