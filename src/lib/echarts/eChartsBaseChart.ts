import type { ECharts, EChartsOption } from 'echarts';
import type { EChartsData, EChartsInitOpts } from './eChartsTypes';

import { DataToJSON } from '$lib/utils/dataToJSON';

export abstract class EChartsBaseChart {
  protected chart: ECharts;
  protected option: EChartsOption;

  constructor(
    element: HTMLElement | null,
    option: EChartsOption,
    initOptions: EChartsInitOpts,
    data?: EChartsData,
    theme?: string,
  ) {
    this.option = option;

    this.chart = this.init(element, initOptions, theme);
    this.chart.setOption(this.mergeData(option, data));
  }

  public updateData(data: EChartsData) {
    this.chart.setOption(this.mergeData(this.option, data));
  }

  public setOption(option: EChartsOption) {
    this.chart.setOption(option);
  }

  protected abstract init(
    element: HTMLElement | null,
    initOptions: EChartsInitOpts,
    theme?: string,
  ): ECharts;

  private mergeData(option: EChartsOption, data?: EChartsData): EChartsOption {
    if (!data) return option;

    const dataset = new DataToJSON(data).call();

    // @ts-ignore
    return { ...option, dataset };
  }
}
