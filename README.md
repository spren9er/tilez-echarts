# ![Tilez-Logo](https://github.com/spren9er/tilez/blob/main/docs/images/tilez_logo.svg?raw=true) tilez - apache echarts

_Apache ECharts_ tile for usage with Svelte layout engine [**_tilez_**](https://github.com/spren9er/tilez).

## Installation

Install **_tilez-echarts_** as npm package via

```
npm install tilez-echarts
```

## Usage

You can use _Apache ECharts_ tile for tile types `'html'` and `'svg'`. Component **EChartsTile** has following props:

- **_options_** _Apache ECharts_ configuration
- **_data_** JSON | _Apache Arrow_ table | Array of JSON or _Apache Arrow_ tables [optional]

### HTML Tiles

For HTML tiles, there is a context necessary which specifies which components of _ECharts_ should be used (treeshaking support). Also, you can set up a _ECharts_ theme there.

```html
<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import { type Writable, writable } from 'svelte/store';

  import { Tile } from 'tilez';
  import { type ThemeOption, EChartsHTMLConfig, EChartsTile } from 'tilez-echarts';

  import type { EChartsOption } from 'echarts';
  import { GridComponent, TooltipComponent} from 'echarts/components';
  import { BarChart } from 'echarts/charts';

  // fetch `theme` in `+page.server.ts`
  export let data: {theme: ThemeOption};

  const option: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
      axisTick: {
        alignWithLabel: true
      },
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [28, 55, 43, 91, 81, 53, 19, 87, 52],
        type: 'bar',
        barWidth: '80%'
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    }
  };

  // set up theme and minimal set of components, so that they can be shared across all ECharts tiles
  const echarts: Writable<EChartsHTMLConfig | null> = writable(null);
  setContext('echarts', echarts);

  onMount(() => {
    echarts.set(
      new EChartsHTMLConfig(
        data.theme,
        { renderer: 'canvas' },
        [
          BarChart,
          GridComponent,
          TooltipComponent
        ]
      )
    );
  });
</script>

<Tile type="html" width="800px" height="600px">
  <EChartsTile {option} />
</Tile>
```

### SVG Tiles

For SVG tiles you can also use **EChartsSVGConfig** class for theme configuration. It is optional, as SVG tiles use global `echarts` package (no treeshaking).

```html
<script lang="ts">
  import { Tile } from 'tilez';
  import { EChartsTile } from 'tilez-echarts';

  import type { EChartsOption } from 'echarts';

  const option: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [28, 55, 43, 91, 81, 53, 19, 87, 52],
        type: 'bar',
        barWidth: '80%'
      }
    ]
  };
</script>

<Tile type="svg" width="800px" height="600px">
  <EChartsTile {option} />
</Tile>
```

## Support of Arrow Datasets

By default, you add inline data to `option` of **EChartsTile**.
However, you can also pass JSON or Apache Arrow table(s) to **EChartsTile** via `data` props.
Arrow table(s) will be converted to ECharts dataset(s), which will be added to `option` automatically.
See `arrow` route for an example.

## SSR

Underlying **EChartsSVGConfig** class can also be used for server side rendering without **_tilez_**, see `ssr` route in example app.
