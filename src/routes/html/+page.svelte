<script lang="ts">
  import type { PageData } from './$types';

  import { onMount, setContext } from 'svelte';
  import { type Writable, writable } from 'svelte/store';

  import { tableFromJSON } from 'apache-arrow';

  import { Tile, HTile, VTile } from 'tilez';

  import type { EChartsOption } from 'echarts';

  import { EChartsHTMLConfig } from '$lib/echarts/eChartsHTMLConfig';
  import EChartsTile from '$lib/components/EChartsTile.svelte';

  import {
    DatasetComponent,
    GridComponent,
    LegendComponent,
    TooltipComponent,
  } from 'echarts/components';
  import { BarChart, LineChart, ScatterChart } from 'echarts/charts';

  const echarts: Writable<EChartsHTMLConfig | null> = writable(null);
  setContext('echarts', echarts);

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  const barOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        barWidth: '80%',
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
  };

  const areaOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        label: {
          show: true,
          position: 'top',
        },
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };

  const scatterData = tableFromJSON([
    { x: 10.0, y: 8.04 },
    { x: 8.07, y: 6.95 },
    { x: 13.0, y: 7.58 },
    { x: 9.05, y: 8.81 },
    { x: 11.0, y: 8.33 },
    { x: 14.0, y: 7.66 },
    { x: 13.4, y: 6.81 },
    { x: 10.0, y: 6.33 },
    { x: 14.0, y: 8.96 },
    { x: 12.5, y: 6.82 },
    { x: 9.15, y: 7.2 },
    { x: 11.5, y: 7.2 },
    { x: 3.03, y: 4.23 },
    { x: 12.2, y: 7.83 },
    { x: 2.02, y: 4.47 },
    { x: 1.05, y: 3.33 },
    { x: 4.05, y: 4.96 },
    { x: 6.03, y: 7.24 },
    { x: 12.0, y: 6.26 },
    { x: 12.0, y: 8.84 },
    { x: 7.08, y: 5.82 },
    { x: 5.02, y: 5.68 },
  ]);

  const scatterOption: EChartsOption = {
    xAxis: {},
    yAxis: {},
    series: [
      {
        symbolSize: 20,
        type: 'scatter',
        encode: {
          x: 'x',
          y: 'y',
        },
      },
    ],
  };

  onMount(() => {
    echarts.set(
      new EChartsHTMLConfig(data.theme, { renderer: 'canvas' }, [
        BarChart,
        LineChart,
        ScatterChart,
        DatasetComponent,
        GridComponent,
        LegendComponent,
        TooltipComponent,
      ]),
    );
  });
</script>

<div style:width="100%" style:height="100vh">
  <HTile type="html" innerPadding="30px" outerPadding="15px">
    <VTile>
      <Tile>
        <EChartsTile option={barOption} />
      </Tile>
      <Tile>
        <EChartsTile option={scatterOption} data={scatterData} />
      </Tile>
    </VTile>
    <VTile>
      <Tile height="50%" vAlign="center">
        <EChartsTile option={areaOption} />
      </Tile>
    </VTile>
  </HTile>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #fef8ef;
  }
</style>
