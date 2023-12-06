import React from "react";
import styled from "styled-components";
import {
  BACKGROUND_COLOR_DEFAULT,
  BUTTON_COLOR_DEFAULT,
  BUTTON_COLOR_HOVER,
  HEIGHT_BASE,
} from "../../constants/constants";

export const Button = styled.button`
  background-color: ${BUTTON_COLOR_DEFAULT};
  font-family: Roboto;
  font-size: ${HEIGHT_BASE * 0.45}vh;
  color: ${BACKGROUND_COLOR_DEFAULT};
  cursor: pointer;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-weight: 700;
  min-height: ${HEIGHT_BASE}vh;
  height: 100%;

  &:hover {
    background-color: ${BUTTON_COLOR_HOVER};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
    &:hover {
      background-color: ${BUTTON_COLOR_DEFAULT};
    }
  }
`;
