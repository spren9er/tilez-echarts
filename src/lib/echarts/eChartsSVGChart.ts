import type { EChartsInitOpts } from './eChartsTypes';

import { type EChartsOption, init } from 'echarts';

import { EChartsBaseChart } from './eChartsBaseChart';

export class EChartsSVGChart extends EChartsBaseChart {
  public constructor(
    option: EChartsOption,
    initOptions: EChartsInitOpts,
    theme?: string,
  ) {
    super(null, option, initOptions, theme);
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
