import axios from "axios";
import {
  Currency,
  ExchangeEstimation,
  MinimalExchangeAmount,
} from "./datatypes";

const apiKey =
  "c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd";

export class DataManager {
  private currencies: Currency[];

  constructor() {
    this.currencies = [];
  }

  static async GetExchangeEstimation(amount: number, from: string, to: string) {
    try {
      const { data, status } = await axios.get<ExchangeEstimation>(
        `https://api.changenow.io/v1/exchange-amount/${amount}/${from}_${to}/?api_key=${apiKey}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log(JSON.stringify(data, null, 4));
      console.log("response status is: ", status);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return null;
      } else {
        console.log("unexpected error: ", error);
        return null;
      }
    }
  }

  static async GetMinimalExchangeAmount(from: string, to: string) {
    try {
      const { data, status } = await axios.get<MinimalExchangeAmount>(
        `https://api.changenow.io/v1/min-amount/${from}_${to}?api_key=${apiKey}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log(JSON.stringify(data, null, 4));
      console.log("response status is: ", status);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return null;
      } else {
        console.log("unexpected error: ", error);
        return null;
      }
    }
  }

  async loadCurrencies() {
    if (this.currencies.length !== 0) {
      return this.currencies;
    }

    try {
      const { data, status } = await axios.get<Currency[]>(
        "https://api.changenow.io/v1/currencies?active=true&fixedRate=true",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log(JSON.stringify(data, null, 4));
      console.log("response status is: ", status);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return [];
      } else {
        console.log("unexpected error: ", error);
        return [];
      }
    }
  }
}
