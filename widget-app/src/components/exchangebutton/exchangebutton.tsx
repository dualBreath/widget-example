import React from "react";
import { Button } from "../button/button";

export interface ExchangeButtonProps {
  onExchanged: () => void;
  disabled: boolean;
}

export default function ExchangeButton({
  onExchanged,
  disabled,
}: ExchangeButtonProps) {
  return (
    <Button id={"exchangeButton"} onClick={onExchanged} disabled={disabled}>
      EXCHANGE
    </Button>
  );
}
