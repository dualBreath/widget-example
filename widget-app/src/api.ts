import WidgetContainer from "./components/container/container";
import { Statistics } from "./statistics/statistics";

export class Api {
  private statistics: Statistics;

  constructor() {
    this.statistics = new Statistics();
  }

  public widgetButton(containerId: string): WidgetContainer {
    return new WidgetContainer(this.statistics, containerId).init();
  }

  public getLastExchanges() {
    return this.statistics.getLastExchanges();
  }

  public printLastExchanges(amount = 10) {
    return this.statistics.printLastExchanges(amount);
  }

  public runInitCallbacks(): void {
    let widgetExchangeApiInitCallbacks = (window as any)
      .widgetExchangeApiInitCallbacks;
    if (
      widgetExchangeApiInitCallbacks &&
      widgetExchangeApiInitCallbacks.length
    ) {
      setTimeout(function () {
        let callback;
        while ((callback = widgetExchangeApiInitCallbacks.shift())) {
          try {
            callback();
          } catch (e) {
            console.error(e);
          }
        }
      }, 0);
    }
  }
}

/**
 * Initialization Api
 */
if (typeof (window as any)["widgetExchangeApi"] === "undefined") {
  (window as any).widgetExchangeApi = new Api();
  (window as any).widgetExchangeApi.runInitCallbacks();
}
