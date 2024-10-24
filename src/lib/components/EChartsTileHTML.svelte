<script lang="ts">
  import { getContext, hasContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  import type { EChartsData } from '$lib/echarts/eChartsTypes';

  import { getTileContext } from 'tilez';

  import type { EChartsOption } from 'echarts';
  import type { EChartsHTMLConfig } from '$lib/echarts/eChartsHTMLConfig';
  import type { EChartsHTMLChart } from '$lib/echarts/eChartsHTMLChart';

  interface Props {
    option: EChartsOption;
    data?: EChartsData | undefined;
  }

  let { option, data = undefined }: Props = $props();

  if (!hasContext('echarts'))
    throw new Error(
      "ECharts tile requires a 'echarts' context containing an ECharts HTML Config!",
    );

  const echarts: Writable<EChartsHTMLConfig> = getContext('echarts');

  let chart: EChartsHTMLChart | undefined;

  const { specs, element } = getTileContext();

  $effect(() => {
    if ($element && $echarts) {
      if (chart && data) {
        chart.updateData(data);
      } else {
        chart = $echarts.build(
          $element as HTMLElement,
          option as EChartsOption,
          data,
        );
      }
    }
  });

  $effect(() => {
    if ($specs) {
      const { width, height } = $specs;

      if (chart) chart.resize(width, height);
    }
  });
</script>
