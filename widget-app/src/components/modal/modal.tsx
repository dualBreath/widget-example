import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";

import { Wrapper, StyledModal, Close, Content, Backdrop } from "./modal.style";
import Cross from "../../assets/cross.svg";

export interface ModalProps {
  isShown: boolean;
  modalContent: JSX.Element;
  onClose: () => void;
  id: string;
}

export const Modal: FunctionComponent<ModalProps> = ({
  isShown,
  modalContent,
  onClose,
  id,
}) => {
  const modal = (
    <React.Fragment>
      <Backdrop />
      <Wrapper>
        <StyledModal id={id}>
          <Close src={Cross} onClick={onClose} />
          <Content>{modalContent}</Content>
        </StyledModal>
      </Wrapper>
    </React.Fragment>
  );

  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
