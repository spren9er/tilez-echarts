import type { EChartsOption } from 'echarts';
import type { EChartsInitOpts, Extensions, ThemeOption } from './eChartsTypes';

import { use } from 'echarts/core';
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';

import { EChartsBaseConfig } from './eChartsBaseConfig';
import { EChartsHTMLChart } from './eChartsHTMLChart';

export class EChartsHTMLConfig extends EChartsBaseConfig {
  constructor(
    theme?: ThemeOption,
    initOptions?: EChartsInitOpts,
    components?: Extensions,
  ) {
    super(theme, initOptions);

    this.addComponents(components);
  }

  public build(
    element: HTMLElement | HTMLCanvasElement | null,
    option: EChartsOption,
  ) {
    return new EChartsHTMLChart(
      element as HTMLElement,
      option,
      this.initOptions,
      this.theme,
    );
  }

  private addComponents(components?: Extensions) {
    const renderer =
      this.initOptions.renderer === 'canvas' ? CanvasRenderer : SVGRenderer;

    const comps = components
      ? Array.isArray(components)
        ? components
        : [components]
      : [];

    use([...comps, renderer]);
  }
}
