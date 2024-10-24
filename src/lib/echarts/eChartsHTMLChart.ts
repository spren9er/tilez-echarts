import type { EChartsInitOpts } from './eChartsTypes';

import { init } from 'echarts/core';

import { EChartsBaseChart } from './eChartsBaseChart';

export class EChartsHTMLChart extends EChartsBaseChart {
  // @ts-expect-error
  public init(
    element: HTMLElement | null,
    initOptions: EChartsInitOpts,
    theme?: string,
  ) {
    return init(element as HTMLElement, theme, initOptions);
  }

  public resize(width: number, height: number) {
    this.chart?.resize({ width, height });
  }
}
