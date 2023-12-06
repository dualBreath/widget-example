import styled from "styled-components";
import {
  HEIGHT_BASE,
  DROPDOWN_COLOR_ITEM_HOVER,
  FONT_SIZE_PARAGRAPH,
  INPUT_COLOR_BACKGROUND,
  INPUT_COLOR_BORDER,
  INPUT_COLOR_BORDER_SELECTED,
  TEXT_COLOR_DEFAULT,
  DROPDOWN_COLOR_ITEM_TEXT,
} from "../../constants/constants";

export const Input = styled.input`
  border-radius: 5px;
  border: 1px solid ${INPUT_COLOR_BORDER};
  background: ${INPUT_COLOR_BACKGROUND};
  padding-right: 10vw;
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

export const Container = styled.div`
  position: relative;
  min-width: 18vw;
`;

export const DropdownWrapper = styled.div`
  width: 100%;
  display: none;
  &.active {
    display: block;
  }
`;

export const DropdownArrow = styled.img`
  position: absolute;
  top: ${HEIGHT_BASE * 0.26}vh;
  right: 0.3vw;
  cursor: pointer;
`;

export const DropdownCross = styled.img`
  position: absolute;
  top: ${HEIGHT_BASE * 0.33}vh;
  right: 0.3vw;
  cursor: pointer;
`;

export const ItemsWrapper = styled.div`
  overflow-y: hidden;
  height: 25vmin;
  background: white;
  position: absolute;
  z-index: 999;
`;

export const Items = styled.div`
  overflow-y: auto;
  height: inherit;

  background: ${INPUT_COLOR_BACKGROUND};
  border: 1px solid ${INPUT_COLOR_BORDER_SELECTED};
  border-top: none;

  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`;

export const CryptoItem = styled.span`
  display: block;
  padding: 0.7vmin 1.4vmin 0.7vmin 1.4vmin;
  color: ${TEXT_COLOR_DEFAULT};
  font-family: Roboto;
  font-size: ${FONT_SIZE_PARAGRAPH};
  font-style: normal;
  font-weight: 400;
  &:hover {
    background: ${DROPDOWN_COLOR_ITEM_HOVER};
    cursor: pointer;
  }
`;

export const CryptoItemImage = styled.img`
  height: ${HEIGHT_BASE * 0.53}vh;
  vertical-align: bottom;
`;

export const CryptoItemImagePreview = styled.img`
  height: ${HEIGHT_BASE * 0.53}vh;
  vertical-align: bottom;
  padding-right: 5px;
  .loading {
    background: transparent url(path/to/loading.gif) no-repeat scroll center
      center;
  }
`;

interface CryptoItemPreviewProps {
  $right: string;
}
export const CryptoItemPreview = styled.div<CryptoItemPreviewProps>`
  position: absolute;
  top: ${HEIGHT_BASE * 0.27}vh;
  right: ${(props) => props.$right};
  cursor: default;
  font-size: ${HEIGHT_BASE * 0.43}vh;
  border-left: 1px solid ${INPUT_COLOR_BORDER};
  padding-left: 5px;
`;

export const CryptoItemPreviewTicker = styled.span`
  font-size: ${HEIGHT_BASE * 0.45}vh;
  padding-left: 1vmin;
`;

export const CryptoItemPreviewName = styled.span`
  font-size: ${HEIGHT_BASE * 0.45}vh;
  color: ${DROPDOWN_COLOR_ITEM_TEXT};
  padding-left: 1vmin;
`;

export const PreviewText = styled.span`
  white-space: pre;
`;
