import React, { ChangeEvent } from "react";

import styled from "styled-components";
import {
  HEIGHT_BASE,
  INPUT_COLOR_BACKGROUND,
  INPUT_COLOR_BORDER,
  INPUT_COLOR_BORDER_SELECTED,
} from "../../constants/constants";

export const Input = styled.input`
  border-radius: 5px;
  border: 1px solid ${INPUT_COLOR_BORDER};
  background: ${INPUT_COLOR_BACKGROUND};
  font-family: Roboto;
  font-size: ${HEIGHT_BASE * 0.45}vh;
  font-style: normal;
  font-weight: 400;
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;
  min-height: ${HEIGHT_BASE}vh;

  &::-webkit-textfield-decoration-container {
  }
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  &:focus {
    outline: none !important;
    border: 1px solid ${INPUT_COLOR_BORDER_SELECTED} !important;
  }
`;

export interface AddressInputProps {
  id: string;
  value: string;
  onInput: (input: string) => void;
}

export default function AddressInput({
  id,
  value,
  onInput,
}: AddressInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    onInput(val);
  };

  return (
    <Input
      type="text"
      id={id}
      name="addressInput"
      onChange={handleChange}
      value={value}
    />
  );
}
