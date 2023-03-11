<script lang="ts">
	import { getContext, hasContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import type { EChartsData } from '$lib/echarts/eChartsTypes';

	import { getTileContext } from 'tilez';

	import type { EChartsOption } from 'echarts';
	import type { EChartsHTMLConfig } from '$lib/echarts/eChartsHTMLConfig';
	import type { EChartsHTMLChart } from '$lib/echarts/eChartsHTMLChart';

	export let option: EChartsOption;
	export let data: EChartsData | undefined = undefined;

	if (!hasContext('echarts'))
		throw new Error(
			"ECharts tile requires a 'echarts' context containing an ECharts HTML Config!",
		);

	const echarts: Writable<EChartsHTMLConfig> = getContext('echarts');

	let init = true;
	let chart: EChartsHTMLChart;

	const { specs, element } = getTileContext();

	$: if ($element && $echarts) {
		chart = $echarts.build(
			$element as HTMLElement,
			option as EChartsOption,
			data,
		);
	}

	$: if (chart && $specs) {
		if (!init) chart.resize($specs.width, $specs.height);

		init = false;
	}
</script>
