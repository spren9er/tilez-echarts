<script lang="ts">
  import { getContext, hasContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  import type { EChartsData } from '$lib/echarts/eChartsTypes';

  import { getTileContext } from 'tilez';

  import type { EChartsOption } from 'echarts';

  import { EChartsSVGConfig } from '$lib/echarts/eChartsSVGConfig';

  interface Props {
    option: EChartsOption;
    data?: EChartsData | undefined;
  }

  let { option, data = undefined }: Props = $props();

  let echarts: EChartsSVGConfig | undefined = $state();

  if (hasContext('echarts')) {
    const store: Writable<EChartsSVGConfig> = getContext('echarts');
    store.subscribe((Config: EChartsSVGConfig) => (echarts = Config));
  } else {
    echarts = new EChartsSVGConfig();
  }

  const { specs } = getTileContext();

  let svg = $derived.by(() => {
    if (echarts && $specs) {
      const { width, height } = $specs;
      const chart = echarts.build(option, width, height, data);
      return chart.render();
    }
  });
</script>

{#if svg}
  {@html svg}
{/if}
