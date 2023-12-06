export interface ExchangeInfo {
  from: string;
  fromAmount: number;
  to: string;
  toAmount: number;
  success: boolean;
}

export class Statistics {
  protected statistics: ExchangeInfo[];

  constructor() {
    this.statistics = [];
  }

  public addRecord(info: ExchangeInfo) {
    if (this.statistics.length > 500) {
      this.statistics.length = 0;
    }
    this.statistics.push(info);
  }

  public getLastExchanges() {
    return this.statistics;
  }

  public printLastExchanges(amount: number) {
    let result = "";
    let stepsCount = 0;
    for (
      let index = this.statistics.length - 1;
      index >= 0 && stepsCount < amount;
      index--
    ) {
      stepsCount++;
      result += this.infoToString(this.statistics[index]);
    }
    return result;
  }

  private infoToString(info: ExchangeInfo) {
    return `Exchange completed with result "${
      info.success ? "success" : "error"
    }". Exchange request from ${info.from}:${info.fromAmount} to ${info.to}:${
      info.toAmount
    }
`;
  }
}
