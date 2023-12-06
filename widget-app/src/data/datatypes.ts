export interface Currency {
  ticker: string;
  name: string;
  image: string;
  hasExternalId: boolean;
  isFiat: boolean;
  featured: boolean;
  isStable: boolean;
  supportsFixedRate: boolean;
}

export interface ExchangeEstimation {
  estimatedAmount: number;
  transactionSpeedForecast: string;
  warningMessage: string | null;
}

export interface MinimalExchangeAmount {
  minAmount: number;
}
