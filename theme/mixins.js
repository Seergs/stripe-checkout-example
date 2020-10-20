import { css } from "styled-components";

const mixins = {
  flex: css`
    display: flex;
  `,
  flexRow: css`
    flex-direction: row;
  `,
  flexColumn: css`
    flex-direction: column;
  `,
  alignCenter: css`
    align-items: center;
  `,
  justifyCenter: css`
    justify-content: center;
  `,
  justifyBetween: css`
    justify-content: space-between;
  `,
};

export default mixins;
