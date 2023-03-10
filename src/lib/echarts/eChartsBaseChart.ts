import type { ECharts, EChartsOption } from 'echarts';
import type { EChartsInitOpts } from './eChartsTypes';

export abstract class EChartsBaseChart {
  protected chart: ECharts;

  constructor(
    element: HTMLElement | null,
    option: EChartsOption,
    initOptions: EChartsInitOpts,
    theme?: string,
  ) {
    this.chart = this.init(element, initOptions, theme);
    this.chart.setOption(option);
  }

  protected abstract init(
    element: HTMLElement | null,
    initOptions: EChartsInitOpts,
    theme?: string,
  ): ECharts;
}
