import React, { useContext, useEffect, useState } from "react";
import Swap from "../../assets/swap.svg";

import {
  Label,
  Paragraph,
  Error,
  Title,
  Image,
  GridColumns,
  GridExchangeFrom,
  GridExchangeSwap,
  GridExchangeTo,
  GridAddress,
  GridAddressInput,
  GridAddressButton,
  GrigRows,
  GridHeader,
  GridSubtitle,
  GridFrom,
  GridSwap,
  GridTo,
  GridExchange,
  GridExchangeAddress,
  HorizontalPage,
  VerticalPage,
  GridAddressError,
  GridError,
} from "./page.style";
import { StatisticsContext } from "../container/container";
import CryptoInput, { PreviewElement } from "../cryptoinput/cryptoinput";
import ExchangeButton from "../exchangebutton/exchangebutton";
import AddressInput from "../addressinput/addressinput";
import { ORIENTATION_THRESHOLD } from "../../constants/constants";
import { Currency } from "../../data/datatypes";
import { DataManager } from "../../data/datamanager";
import { isFloat } from "../../util/numberutil";
import {
  ESTIMATED_VALUE_LOADING_ERROR_ID,
  ESTIMATED_VALUE_LOADING_ERROR_MESSAGE,
  INVALID_ADDRESS_VALUE_ERROR_ID,
  INVALID_ADDRESS_VALUE_ERROR_MESSAGE,
  INVALID_VALUE_ERROR_ID,
  INVALID_VALUE_ERROR_MESSAGE,
  MIN_VALUE_LOADING_ERROR_ID,
  MIN_VALUE_LOADING_ERROR_MESSAGE,
  VALUE_LOWER_THAN_MIN_ERROR_ID,
  VALUE_LOWER_THAN_MIN_ERROR_MESSAGE,
} from "../../constants/errors";

export interface ExchangePageProps {
  parentID: string;
  currencies: Currency[];
}

export default function ExchangePage({
  parentID,
  currencies,
}: ExchangePageProps) {
  const [isVertical, setVertical] = useState(false);
  const [selectionRight, setSelectionRight] = useState("");
  const [selectionLeft, setSelectionLeft] = useState("");
  const [minValue, setMinValue] = useState(0);
  const [value, setValue] = useState<string>("0");
  const [estimatedValue, setEstimatedValue] = useState<string>("0");
  const [isEnableExchange, setEnableExchange] = useState(false);

  const [previewRight, setPreviewRight] = useState<PreviewElement>();
  const [previewLeft, setPreviewLeft] = useState<PreviewElement>();

  const [addressValue, setAddressValue] = useState("");

  const [errors, setErrors] = useState(new Map<string, string>());
  const [error, setError] = useState("");

  const stats = useContext(StatisticsContext);

  function computeOrientation() {
    const exchangePage = document.getElementById(parentID);
    if (exchangePage && exchangePage.offsetWidth > ORIENTATION_THRESHOLD) {
      setVertical(false);
    } else {
      setVertical(true);
    }
  }

  useEffect(() => {
    computeOrientation();
    window.addEventListener("resize", computeOrientation);
    return () => {
      window.removeEventListener("resize", computeOrientation);
    };
  }, []);

  useEffect(() => {
    if (selectionLeft && selectionRight) {
      DataManager.GetMinimalExchangeAmount(selectionLeft, selectionRight).then(
        (data) => {
          if (data) {
            setMinValue(data.minAmount);
            setValue(data.minAmount.toString());
            errors.delete(MIN_VALUE_LOADING_ERROR_ID);
            setErrors(errors);
          } else {
            errors.set(
              MIN_VALUE_LOADING_ERROR_ID,
              MIN_VALUE_LOADING_ERROR_MESSAGE
            );
            setErrors(errors);
          }
        }
      );
    }
  }, [selectionRight, selectionLeft]);

  useEffect(() => {
    const val = parseFloat(value);
    if (isNaN(val) || !isFloat(value)) {
      errors.set(INVALID_VALUE_ERROR_ID, INVALID_VALUE_ERROR_MESSAGE);
      setErrors(errors);
      return;
    } else {
      errors.delete(INVALID_VALUE_ERROR_ID);
      setErrors(errors);
    }

    if (minValue !== 0) {
      if (val < minValue) {
        errors.set(
          VALUE_LOWER_THAN_MIN_ERROR_ID,
          VALUE_LOWER_THAN_MIN_ERROR_MESSAGE
        );
        setErrors(errors);
      } else {
        errors.delete(VALUE_LOWER_THAN_MIN_ERROR_ID);
        setErrors(errors);
      }
    }

    if (!!selectionLeft && !!selectionRight && !isNaN(val)) {
      DataManager.GetExchangeEstimation(
        val,
        selectionLeft,
        selectionRight
      ).then((data) => {
        if (data) {
          setEstimatedValue(data.estimatedAmount.toString());
          errors.delete(ESTIMATED_VALUE_LOADING_ERROR_ID);
          setErrors(errors);
        } else {
          setEstimatedValue("-");
          errors.set(
            ESTIMATED_VALUE_LOADING_ERROR_ID,
            ESTIMATED_VALUE_LOADING_ERROR_MESSAGE
          );
          setErrors(errors);
        }
      });
    }
  }, [value]);

  useEffect(() => {
    if (!addressValue) {
      errors.set(
        INVALID_ADDRESS_VALUE_ERROR_ID,
        INVALID_ADDRESS_VALUE_ERROR_MESSAGE
      );
      setErrors(errors);
    } else {
      errors.delete(INVALID_ADDRESS_VALUE_ERROR_ID);
      setErrors(errors);
    }
  }, [addressValue]);

  useEffect(() => {
    setEnableExchange(
      validate(addressValue, value, minValue, selectionLeft, selectionRight)
    );
    if (errors.size > 0) {
      const [firstValue] = errors.values();
      setError(firstValue);
    } else {
      setError("");
    }
  }, [
    addressValue,
    value,
    estimatedValue,
    minValue,
    selectionLeft,
    selectionRight,
  ]);

  const handleExchange = () => {
    const val = parseFloat(value);
    const estimated = parseFloat(estimatedValue);

    stats &&
      stats.addRecord({
        from: selectionLeft,
        to: selectionRight,
        fromAmount: val,
        toAmount: estimated,
        success: true,
      });
  };

  function validate(
    addressValue: string,
    value: string,
    minValue: number,
    selectionLeft: string,
    selectionRight: string
  ) {
    if (value === "" || value === "0" || !selectionLeft || !selectionRight) {
      return false;
    }

    const val = parseFloat(value);
    if (isNaN(val) || !isFloat(value)) {
      return false;
    }

    if (val < minValue) {
      return false;
    }

    if (!addressValue) {
      return false;
    }

    return true;
  }

  const inputID = "addressInputID";

  return isVertical ? (
    <VerticalPage>
      <GrigRows>
        <GridHeader>
          <Title>Crypto Exchange</Title>
        </GridHeader>
        <GridSubtitle>
          <Paragraph>Exchange fast and easy</Paragraph>
        </GridSubtitle>
        <GridFrom>
          <CryptoInput
            id={"0"}
            isVertical={isVertical}
            currencies={currencies}
            onSelected={setSelectionLeft}
            value={value}
            onInput={setValue}
            preview={previewLeft}
            setPreview={setPreviewLeft}
          />
        </GridFrom>
        <GridSwap>
          <Image src={Swap} />
        </GridSwap>
        <GridTo>
          <CryptoInput
            id={"1"}
            isVertical={isVertical}
            currencies={currencies}
            onSelected={setSelectionRight}
            onInput={setEstimatedValue}
            value={estimatedValue}
            preview={previewRight}
            setPreview={setPreviewRight}
            disabled={true}
          />
        </GridTo>
        <GridExchangeAddress>
          <Label htmlFor={inputID}>Your Ethereum address</Label>
          <AddressInput
            id={inputID}
            value={addressValue}
            onInput={setAddressValue}
          />
        </GridExchangeAddress>
        <GridExchange>
          <ExchangeButton
            onExchanged={handleExchange}
            disabled={!isEnableExchange}
          />
        </GridExchange>
        <GridError>
          <Error>{error ? error : ""}</Error>
        </GridError>
      </GrigRows>
    </VerticalPage>
  ) : (
    <HorizontalPage>
      <Title>Crypto Exchange</Title>
      <Paragraph>Exchange fast and easy</Paragraph>
      <GridColumns>
        <GridExchangeFrom>
          <CryptoInput
            id={"0"}
            isVertical={isVertical}
            currencies={currencies}
            onSelected={setSelectionLeft}
            onInput={setValue}
            value={value}
            preview={previewLeft}
            setPreview={setPreviewLeft}
          />
        </GridExchangeFrom>
        <GridExchangeSwap>
          <img src={Swap} />
        </GridExchangeSwap>
        <GridExchangeTo>
          <CryptoInput
            id={"1"}
            isVertical={isVertical}
            currencies={currencies}
            onSelected={setSelectionRight}
            onInput={setEstimatedValue}
            value={estimatedValue}
            preview={previewRight}
            setPreview={setPreviewRight}
            disabled={true}
          />
        </GridExchangeTo>
      </GridColumns>
      <Label htmlFor={inputID}>Your Ethereum address</Label>
      <GridAddress>
        <GridAddressInput>
          <AddressInput
            id={inputID}
            value={addressValue}
            onInput={setAddressValue}
          />
        </GridAddressInput>
        <GridAddressButton>
          <ExchangeButton
            onExchanged={handleExchange}
            disabled={!isEnableExchange}
          />
        </GridAddressButton>
      </GridAddress>
      <GridAddress>
        <GridAddressError>
          <Error>{error ? error : ""}</Error>
        </GridAddressError>
      </GridAddress>
    </HorizontalPage>
  );
}
