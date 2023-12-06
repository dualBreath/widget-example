import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useModal } from "../components/modal/useModal";
import { Modal } from "../components/modal/modal";
import ExchangePage from "../components/page/exchangePage";
import {
  BUTTON_COLOR_DEFAULT,
  BUTTON_COLOR_HOVER,
} from "../constants/constants";
import { Currency } from "../data/datatypes";
import { DataManager } from "../data/datamanager";

const Button = styled.button`
  flex: auto;
  background-color: ${BUTTON_COLOR_DEFAULT};
  font-family: Roboto;
  font-size: calc(10px + 2vmin);
  color: white;
  cursor: pointer;
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

export default function ButtonOpenWidgetExchange() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const { isShown, toggle } = useModal();
  const dataManager = new DataManager();

  useEffect(() => {
    (async function () {
      await document.fonts.ready;
      if (document.fonts.check("12px Roboto")) {
        return;
      }

      const gApi = document.createElement("link");
      gApi.href = "https://fonts.googleapis.com";
      gApi.rel = "preconnect";

      const fApi = document.createElement("link");
      fApi.href = "https://fonts.gstatic.com";
      fApi.rel = "preconnect";
      fApi.setAttribute("crossorigin", "");

      const fontsLink = document.createElement("link");
      fontsLink.href =
        "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap";
      fontsLink.rel = "stylesheet";

      const head = document.getElementsByTagName("head")[0];
      head.appendChild(gApi);
      head.appendChild(fApi);
      head.appendChild(fontsLink);
    })();
  }, []);

  useEffect(() => {
    dataManager.loadCurrencies().then((data) => {
      setCurrencies(data);
    });
  }, []);

  const modalID = "modalID";

  return (
    <>
      <Button disabled={isShown} onClick={toggle}>
        Start Exchange Widget
      </Button>
      <Modal
        id={modalID}
        onClose={toggle}
        isShown={isShown}
        modalContent={
          <ExchangePage parentID={modalID} currencies={currencies} />
        }
      />
    </>
  );
}
