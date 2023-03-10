<script lang="ts">
	import type { EChartsOption } from 'echarts';

	import { getTileContext } from 'tilez';

	import EChartsTileHTML from './EChartsTileHTML.svelte';
	import EChartsTileSVG from './EChartsTileSVG.svelte';

	const { specs } = getTileContext();

	export let option: EChartsOption;

	const typeMapping = {
		html: EChartsTileHTML,
		svg: EChartsTileSVG,
	};

	function componentFor(type: string) {
		if (!Object.keys(typeMapping).includes(type))
			throw new Error(`There is no ECharts tile available for type '${type}'!`);

		return typeMapping[type as 'html' | 'svg'];
	}
</script>

{#if $specs}
	<svelte:component this={componentFor($specs.type)} {option} />
{/if}
