import Modal from './Modal'
import styled from 'styled-components'
import theme from '../theme/theme'
import Checkmark from '../assets/checkmark.svg'
import mixins from '../theme/mixins'
const {colors} = theme
const {flex, flexColumn, alignCenter} = mixins;

const Wrapper =  styled.div`
  ${flex};
  ${flexColumn};
  ${alignCenter};

  svg {
    transform: scale(0.8);
  }
`

const Title = styled.div`
  color: ${colors.black};
  font-size: 1.3rem;
  font-weight:bold;
`

const Text = styled.p`
  font-size: 1.1rem;
`

export default function Success(){
  return (
    <Wrapper>
      <Title>Pago realizado con éxito</Title>
      <Checkmark />
      <Text>Gracias por su preferencia</Text>
    </Wrapper>
  )
}
