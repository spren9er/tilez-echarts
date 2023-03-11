import type { EChartsData, EChartsInitOpts } from './eChartsTypes';

import { type EChartsOption, init } from 'echarts';

import { EChartsBaseChart } from './eChartsBaseChart';

export class EChartsSVGChart extends EChartsBaseChart {
  public constructor(
    option: EChartsOption,
    initOptions: EChartsInitOpts,
    data?: EChartsData,
    theme?: string,
  ) {
    super(null, option, initOptions, data, theme);
  }

  public init(
    element: HTMLElement | null,
    initOptions: EChartsInitOpts,
    theme?: string,
  ) {
    return init(element as HTMLElement, theme, initOptions);
  }

  public render() {
    return this.chart.renderToSVGString();
  }
}
