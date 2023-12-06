import styled from "styled-components";
import { BACKGROUND_COLOR_DEFAULT } from "../../constants/constants";

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
  outline: 0;
  width: 80%;
  height: 45%;
`;

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 500;
`;

export const StyledModal = styled.div`
  z-index: 100;
  background: ${BACKGROUND_COLOR_DEFAULT};
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 280px;
  min-height: 310px;
`;

export const Close = styled.img`
  align-self: flex-end;
`;

export const Content = styled.div`
  overflow: hidden;
  cursor: default;
  font-family: Roboto;
`;
