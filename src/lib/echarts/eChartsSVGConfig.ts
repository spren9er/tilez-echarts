import type { Table } from 'apache-arrow';
import type { EChartsOption } from 'echarts';
import type { EChartsInitOpts, ThemeOption } from './eChartsTypes';

import { EChartsBaseConfig } from './eChartsBaseConfig';
import { EChartsSVGChart } from './eChartsSVGChart';

export class EChartsSVGConfig extends EChartsBaseConfig {
  public constructor(theme?: ThemeOption, initOptions?: EChartsInitOpts) {
    super(theme, initOptions);

    this.initOptions.renderer = 'svg';
    this.initOptions.ssr = true;
  }

  public build(
    option: EChartsOption,
    width: number,
    height: number,
    data?: Table | Table[],
  ) {
    return new EChartsSVGChart(
      option,
      { ...this.initOptions, width, height },
      data,
      this.theme,
    );
  }
}
