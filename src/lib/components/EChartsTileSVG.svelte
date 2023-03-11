<script lang="ts">
	import { getContext, hasContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import type { EChartsData } from '$lib/echarts/eChartsTypes';

	import { getTileContext } from 'tilez';

	import type { EChartsOption } from 'echarts';

	import type { EChartsSVGChart } from '$lib/echarts/eChartsSVGChart';
	import { EChartsSVGConfig } from '$lib/echarts/eChartsSVGConfig';

	export let option: EChartsOption;
	export let data: EChartsData | undefined = undefined;

	let echarts: EChartsSVGConfig;

	if (hasContext('echarts')) {
		const store: Writable<EChartsSVGConfig> = getContext('echarts');
		store.subscribe((Config: EChartsSVGConfig) => (echarts = Config));
	} else {
		echarts = new EChartsSVGConfig();
	}

	let chart: EChartsSVGChart;
	let svg: string;

	const { specs } = getTileContext();

	$: if (echarts && $specs) {
		chart = echarts.build(option, $specs.width, $specs.height, data);
		svg = chart.render();
	}
</script>

{#if svg}
	{@html svg}
{/if}
