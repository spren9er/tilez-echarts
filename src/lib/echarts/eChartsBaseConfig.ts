import type { EChartsInitOpts, ThemeOption } from './eChartsTypes';

import { registerTheme } from 'echarts';

export abstract class EChartsBaseConfig {
  protected THEME_NAME = 'custom_theme';

  protected initOptions: EChartsInitOpts = { renderer: 'canvas' };
  protected theme?: string;

  public constructor(theme?: ThemeOption, initOptions?: EChartsInitOpts) {
    if (theme) {
      registerTheme(this.THEME_NAME, theme);
      this.theme = this.THEME_NAME;
    }

    if (initOptions) this.initOptions = initOptions;
  }
}
