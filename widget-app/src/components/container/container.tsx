import ReactDOM from "react-dom";
import ButtonOpenWidgetExchange from "../../init/init";
import { createContext } from "react";
import { Statistics } from "../../statistics/statistics";

export const StatisticsContext = createContext<Statistics | null>(null);

export default class WidgetContainer {
  /**
   * DOM element to mount widget
   */
  protected containerElement: HTMLElement | null;
  protected statistics: Statistics;

  public constructor(statistics: Statistics, containerId: string) {
    this.containerElement = document.getElementById(containerId);
    this.statistics = statistics;
    if (!this.containerElement) {
      alert("Warning: Exchange Widget cannot be mounted");
    }
  }

  public init(): WidgetContainer {
    if (this.containerElement) {
      ReactDOM.render(
        <StatisticsContext.Provider value={this.statistics}>
          <ButtonOpenWidgetExchange />
        </StatisticsContext.Provider>,
        this.containerElement
      );
    }
    return this;
  }
}
