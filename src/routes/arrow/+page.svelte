<script lang="ts">
	import type { EChartsOption } from 'echarts';

	import { tableFromJSON } from 'apache-arrow';

	import { Tile } from 'tilez';

	import EChartsTile from '$lib/components/EChartsTile.svelte';

	const data = tableFromJSON([
		{ a: 'A', b: 28 },
		{ a: 'B', b: 55 },
		{ a: 'C', b: 43 },
		{ a: 'D', b: 91 },
		{ a: 'E', b: 81 },
		{ a: 'F', b: 53 },
		{ a: 'G', b: 19 },
		{ a: 'H', b: 87 },
		{ a: 'I', b: 52 },
	]);

	const option: EChartsOption = {
		xAxis: {
			type: 'category',
			axisTick: {
				alignWithLabel: true,
			},
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				type: 'bar',
				barWidth: '80%',
				encode: {
					x: 'a',
					y: 'b',
				},
			},
		],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
			},
		},
	};
</script>

<Tile type="svg" width="400px" height="300px">
	<EChartsTile {option} {data} />
</Tile>
