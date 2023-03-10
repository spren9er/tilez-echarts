<script lang="ts">
	import type { Writable } from 'svelte/store';

	import { getContext, hasContext } from 'svelte';

	import { getTileContext } from 'tilez';

	import type { EChartsOption } from 'echarts';
	import type { EChartsHTMLConfig } from '$lib/echarts/eChartsHTMLConfig';
	import type { EChartsHTMLChart } from '$lib/echarts/eChartsHTMLChart';

	export let option: EChartsOption;

	if (!hasContext('echarts'))
		throw new Error(
			"ECharts tile requires a 'echarts' context containing an ECharts HTML Config!",
		);

	const echarts: Writable<EChartsHTMLConfig> = getContext('echarts');

	let init = true;
	let chart: EChartsHTMLChart;

	const { specs, element } = getTileContext();

	$: if ($element && $echarts) {
		chart = $echarts.build($element as HTMLElement, option as EChartsOption);
	}

	$: if (chart && $specs) {
		if (!init) chart.resize($specs.width, $specs.height);

		init = false;
	}
</script>
