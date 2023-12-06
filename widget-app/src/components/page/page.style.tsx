import styled from "styled-components";
import {
  FONT_SIZE_LABEL,
  FONT_SIZE_PARAGRAPH,
  FONT_SIZE_TITLE,
  HEIGHT_BASE,
  TEXT_COLOR_ERROR,
} from "../../constants/constants";

export const Title = styled.div`
  font-size: ${FONT_SIZE_TITLE};
  font-style: normal;
  font-weight: 300;
  line-height: 120%;
  margin-bottom: 1vh;
`;

export const Paragraph = styled.div`
  font-size: ${FONT_SIZE_PARAGRAPH};
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  margin-bottom: 5vh;
`;

export const Label = styled.label`
  font-size: ${FONT_SIZE_LABEL};
  font-style: normal;
  font-weight: 400;
  line-height: 143%;
  margin-top:;
`;

export const Image = styled.img`
  transform: rotate(90deg);
  margin-top: 0.4vh;
  margin-bottom: 0.4vh;
`;

export const GridColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(39, 1fr);
  grid-gap: 0.1em;
  margin-bottom: 1.5vh;
`;

export const GrigRows = styled.div`
  display: grid;
  grid-template-rows: repeat(8, auto);
`;

export const GridHeader = styled.div`
  grid-row: 1 / 1;
`;

export const GridSubtitle = styled.div`
  grid-row: 2 / 2;
`;

export const GridFrom = styled.div`
  grid-row: 3 / 3;
`;

export const GridSwap = styled.div`
  grid-row: 4 / 4;
  display: grid;
  justify-content: end;
`;

export const GridTo = styled.div`
  grid-row: 5 / 5;
  margin-bottom: 2vh;
`;

export const GridExchangeAddress = styled.div`
  grid-row: 6 / 6;
  margin-bottom: 1vh;
`;

export const GridExchange = styled.div`
  grid-row: 7 / 7;
`;

export const GridError = styled.div`
  grid-row: 8 / 8;
  display: grid;
  justify-items: center;
`;

export const GridExchangeFrom = styled.div`
  grid-column: 1 / 19;
`;

export const GridExchangeTo = styled.div`
  grid-column: 22 / 40;
`;

export const GridExchangeSwap = styled.div`
  grid-column: 20 / 20;
  margin-left: 0.1vw;
  margin-top: ${HEIGHT_BASE * 0.2}vh; // to 0.5
`;

export const GridAddress = styled.div`
  display: grid;
  grid-template-columns: repeat(40, 1fr);
`;

export const GridAddressError = styled.div`
  grid-column: 33 / 41;
  display: grid;
  justify-items: center;
`;

export const GridAddressInput = styled.div`
  grid-column: 1 / 30;
`;

export const GridAddressButton = styled.div`
  grid-column: 33 / 41;
`;

export const VerticalPage = styled.div`
  padding: 1vmin 3vw 11vmin 3vw;
`;

export const HorizontalPage = styled.div`
  padding: 8vmin 11vmin 11vmin 11vmin;
`;

export const Error = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 1.1vh;
  color: ${TEXT_COLOR_ERROR};
`;
