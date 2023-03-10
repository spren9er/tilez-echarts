import type { Table } from 'apache-arrow';
import type { ECharts, EChartsOption } from 'echarts';
import type { EChartsInitOpts } from './eChartsTypes';

import { ArrowDataToJSON } from '$lib/utils/arrowToJSON';

export abstract class EChartsBaseChart {
  protected chart: ECharts;

  constructor(
    element: HTMLElement | null,
    option: EChartsOption,
    initOptions: EChartsInitOpts,
    data?: Table | Table[],
    theme?: string,
  ) {
    this.chart = this.init(element, initOptions, theme);
    this.chart.setOption(this.mergeOption(option, data));
  }

  public setOption(option: EChartsOption) {
    this.chart.setOption(option);
  }

  protected abstract init(
    element: HTMLElement | null,
    initOptions: EChartsInitOpts,
    theme?: string,
  ): ECharts;

  private mergeOption(
    option: EChartsOption,
    data?: Table | Table[],
  ): EChartsOption {
    if (!data) return option;

    const dataset = new ArrowDataToJSON(data).call();

    // @ts-ignore
    return { ...option, dataset };
  }
}
