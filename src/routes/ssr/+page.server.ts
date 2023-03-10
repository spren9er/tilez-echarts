import type { PageServerLoad } from './$types';

import type { EChartsOption } from 'echarts';

import { EChartsSVGConfig } from '$lib/echarts/eChartsSVGConfig';

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch('/theme.json');
  const theme = await response.json();

  const option: EChartsOption = {
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
  };

  const chart = new EChartsSVGConfig(theme);
  const svg = chart.build(option, 400, 300).render();

  return { svg };
};
