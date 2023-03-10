<script lang="ts">
	import type { PageData } from './$types';

	import { onMount, setContext } from 'svelte';
	import { type Writable, writable } from 'svelte/store';

	import { Tile, HTile, VTile } from 'tilez';

	import type { EChartsOption } from 'echarts';

	import { EChartsSVGConfig } from '$lib/echarts/eChartsSVGConfig';
	import EChartsTile from '$lib/components/EChartsTile.svelte';

	const echarts: Writable<EChartsSVGConfig | null> = writable(null);
	setContext('echarts', echarts);

	export let data: PageData;

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

	const scatterOption: EChartsOption = {
		xAxis: {},
		yAxis: {},
		series: [
			{
				symbolSize: 20,
				data: [
					[10.0, 8.04],
					[8.07, 6.95],
					[13.0, 7.58],
					[9.05, 8.81],
					[11.0, 8.33],
					[14.0, 7.66],
					[13.4, 6.81],
					[10.0, 6.33],
					[14.0, 8.96],
					[12.5, 6.82],
					[9.15, 7.2],
					[11.5, 7.2],
					[3.03, 4.23],
					[12.2, 7.83],
					[2.02, 4.47],
					[1.05, 3.33],
					[4.05, 4.96],
					[6.03, 7.24],
					[12.0, 6.26],
					[12.0, 8.84],
					[7.08, 5.82],
					[5.02, 5.68],
				],
				type: 'scatter',
			},
		],
	};

	onMount(() => {
		echarts.set(new EChartsSVGConfig(data.theme));
	});
</script>

<div style:width="100%" style:height="100vh">
	<HTile type="svg" innerPadding="30px" outerPadding="15px">
		<VTile>
			<Tile>
				<EChartsTile option={barOption} />
			</Tile>
			<Tile>
				<EChartsTile option={scatterOption} />
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
