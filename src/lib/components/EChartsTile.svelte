<script lang="ts">
  import type { EChartsData } from '$lib/echarts/eChartsTypes';
  import type { EChartsOption } from 'echarts';

  import { getTileContext } from 'tilez';

  import EChartsTileHTML from './EChartsTileHTML.svelte';
  import EChartsTileSVG from './EChartsTileSVG.svelte';

  const { specs } = getTileContext();

  interface Props {
    option: EChartsOption;
    data?: EChartsData | undefined;
  }

  let { option, data = undefined }: Props = $props();

  const typeMapping = {
    html: EChartsTileHTML,
    svg: EChartsTileSVG,
  };

  function componentFor(type: string) {
    if (!Object.keys(typeMapping).includes(type))
      throw new Error(`No ECharts tile available for type '${type}'!`);

    return typeMapping[type as 'html' | 'svg'];
  }
</script>

{#if $specs}
  {@const SvelteComponent = componentFor($specs.type)}
  <SvelteComponent {option} {data} />
{/if}
