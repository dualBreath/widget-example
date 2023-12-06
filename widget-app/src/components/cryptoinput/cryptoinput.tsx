import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Container,
  CryptoItem,
  CryptoItemImage,
  CryptoItemImagePreview,
  CryptoItemPreview,
  CryptoItemPreviewName,
  CryptoItemPreviewTicker,
  DropdownArrow,
  DropdownCross,
  DropdownWrapper,
  Input,
  Items,
  ItemsWrapper,
  PreviewText,
} from "./cryptoinput.style";
import Arrow from "../../assets/arrow.svg";
import Cross from "../../assets/cross.svg";
import {
  INPUT_COLOR_BORDER,
  INPUT_COLOR_BORDER_SELECTED,
} from "../../constants/constants";
import { Currency } from "../../data/datatypes";

export interface CryptoInputProps {
  id: string;
  isVertical: boolean;
  currencies: Currency[];
  onSelected: (selection: string) => void;
  value: string;
  onInput: (value: string) => void;
  preview: PreviewElement | undefined;
  setPreview: (element: PreviewElement) => void;
  disabled?: true;
}

export type Empty = "";
export type Error = "-";

export type PreviewElement = JSX.Element;
type DropdownElement = JSX.Element;

function getPreviewTicker(ticker: string) {
  const previewTicker = ticker.toUpperCase();
  return previewTicker.length > 3
    ? `${previewTicker.slice(0, 3)}...`
    : `${previewTicker}   `;
}

export function createDataElement(
  currency: Currency,
  id: string,
  setPreview: (element: PreviewElement) => void,
  closeDropdown: () => void,
  onSelected: (selection: string) => void
): DropdownElement {
  const previewTicker = getPreviewTicker(currency.ticker);

  return (
    <CryptoItem
      key={id}
      onClick={() => {
        setPreview(
          <>
            <CryptoItemImagePreview src={currency.image} />
            <PreviewText>{previewTicker}</PreviewText>
          </>
        );
        onSelected(currency.ticker);
        closeDropdown();
      }}
    >
      <CryptoItemImage src={currency.image} />
      <CryptoItemPreviewTicker>
        {currency.ticker.toUpperCase()}
      </CryptoItemPreviewTicker>
      <CryptoItemPreviewName>{currency.name}</CryptoItemPreviewName>
    </CryptoItem>
  );
}

export default function CryptoInput({
  id,
  isVertical,
  currencies,
  onSelected,
  value,
  onInput,
  preview,
  setPreview,
  disabled,
}: CryptoInputProps) {
  const [dataListName, setDataListName] = useState<string>("");
  const [dropdownItems, setDropdownItems] = useState<DropdownElement[]>();

  const dropdownId = `custom-crypto-input-dropdown-${id}`;
  const inputContainerId = `custom-crypto-input-container-${id}`;
  const inputId = `custom-crypto-input-${id}`;

  const ref = useRef<HTMLDivElement>(null);

  function resizeDropdown() {
    const input = document.getElementById(inputContainerId);
    const dropdown = document.getElementById(dropdownId);
    if (input && dropdown) {
      dropdown.setAttribute("style", `width: ${input.offsetWidth}px`);
    }
  }

  function openDropdown() {
    const input = document.getElementById(inputId);
    if (input) {
      input.style.setProperty("border-bottom-right-radius", "0px");
      input.style.setProperty("border-bottom-left-radius", "0px");
      input.style.setProperty(
        "border",
        `1px solid ${INPUT_COLOR_BORDER_SELECTED}`
      );
      input.style.setProperty("border-bottom-color", `${INPUT_COLOR_BORDER}`);
    }
    setDataListName("defaultNumbers");
  }

  function closeDropdown() {
    const input = document.getElementById(inputId);
    if (input) {
      input.style.setProperty("border-bottom-right-radius", "5px");
      input.style.setProperty("border-bottom-left-radius", "5px");
      input.style.setProperty("border", `1px solid ${INPUT_COLOR_BORDER}`);
    }
    setDataListName("");
  }

  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (ref.current && !ref.current.contains(event.target) && dataListName) {
        closeDropdown();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dataListName]);

  useEffect(() => {
    resizeDropdown();
    window.addEventListener("resize", resizeDropdown);
    return () => {
      window.removeEventListener("resize", resizeDropdown);
    };
  }, []);

  useEffect(() => {
    if (!preview && currencies.length > 0) {
      const previewTicker = getPreviewTicker(currencies[0].ticker);
      setPreview(
        <>
          <CryptoItemImagePreview src={currencies[0].image} />
          <PreviewText>{previewTicker}</PreviewText>
        </>
      );
      onSelected(currencies[0].ticker);
    }
    setDropdownItems(
      currencies.map((currency, index) => {
        return createDataElement(
          currency,
          `dropdown-item-${index}`,
          setPreview,
          closeDropdown,
          onSelected
        );
      })
    );
  }, [currencies]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onInput(event.target.value);
  };

  return (
    <div ref={ref}>
      <Container id={inputContainerId}>
        <Input
          type="text"
          role="combobox"
          list={dataListName}
          id={inputId}
          name="defaultNumbers"
          value={value}
          onChange={handleChange}
          disabled={!!disabled}
        />
        <CryptoItemPreview $right={isVertical ? "5vmin" : "2vmin"}>
          {preview || " "}
        </CryptoItemPreview>
        {dataListName ? (
          <DropdownCross src={Cross} onClick={closeDropdown} />
        ) : (
          <DropdownArrow src={Arrow} onClick={openDropdown} />
        )}
      </Container>
      <DropdownWrapper className={dataListName ? "active" : ""}>
        <ItemsWrapper id={dropdownId} className={dataListName ? "active" : ""}>
          <Items id="currencies">{dropdownItems}</Items>
        </ItemsWrapper>
      </DropdownWrapper>
    </div>
  );
}
