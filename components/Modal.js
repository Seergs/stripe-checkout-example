import {useRef} from 'react'
import styled , {css} from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import mixins from "../theme/mixins";
import theme from "../theme/theme";
import useClickOutside from '../hooks/useClickOutside'

const { colors } = theme;

const { flex, flexColumn } = mixins;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Content = styled(motion.div)`
  ${props => css`
    width: ${props.$width};
    height: ${props.height};
    margin: 1rem auto;
    padding: 1rem;
    background-color: white;
    font-family: "Consolas";
    ${flex};
    ${flexColumn};
    border-radius: 4px;

  `}
`;

const CloseButton = styled.button`
  display: block;
  align-self: flex-end;
  background: transparent;
  border: 0;
  cursor: pointer;

  &:focus {
    outline: 2px solid ${colors.outline};
  }

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

export default function Modal({ isOpen, onClose, children, width, height }) {
  const ref = useRef()
  useClickOutside(ref, onClose)
    return (
      <AnimatePresence>
      {
	isOpen && (
	  <Overlay variants={overlayVariants} initial="closed" animate="open" exit="exit">
	    <Content variants={contentVariants} ref={ref} $width={width} $height={height}>
	      <CloseButton onClick={onClose}>
		<FaTimes />
	      </CloseButton>
	      {children}
	    </Content>
	  </Overlay>
	)
      }
      </AnimatePresence>
    );

}

const overlayVariants = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity:1
  },
  exit: {
    opacity: 0
  }
}

const contentVariants = {
  closed: {
    opacity:0,
    scale: .8
  },
  open: {
    opacity:1,
    scale: 1,
    transition: {
      duration: 0.3,
    }
  },
  exit: {
    opacity:0
  }
}
