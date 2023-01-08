<script>
    // https://svelte.dev/examples/bar-chart
	import { scaleLinear, scaleOrdinal } from 'd3-scale';
    import timeData from "../../data/overTimeData.json";

    const xKey = "time";
    const yKey = "value";

	const xTicks = timeData.map(v => v[xKey]);
	const yTicks = [0, 200, 400, 600, 800];
	const padding = { top: 20, right: 15, bottom: 20, left: 25 };

    console.log(xTicks, yTicks);

	let width = 500;
	let height = 200;

	function formatMobile(tick) {
		return "'" + tick.toString().slice(-2);
	}

	$: xScale = scaleOrdinal()
		.domain(xTicks)
		.range([0, 100, 200, 300, 400, 500, 600, 700, 800]);

	$: yScale = scaleLinear()
		.domain([0, Math.max.apply(null, yTicks)])
		.range([height - padding.bottom, padding.top]);

	$: innerWidth = width - (padding.left + padding.right);
	$: barWidth = innerWidth / xTicks.length;
</script>

<h2>US birthrate by year</h2>

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	<svg class='bar-svg'>
		<!-- y axis -->
		<g class="axis y-axis">
			{#each yTicks as tick}
				<g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
					<line x2="100%"></line>
					<text y="-4">{tick} {tick === 20 ? ' per 1,000 population' : ''}</text>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g class="axis x-axis">
			{#each timeData as point, i}
				<g class="tick" transform="translate({xScale(i)},{height})">
					<text x="{barWidth/2}" y="-4">{width > 380 ? point.time : formatMobile(point.time)}</text>
				</g>
			{/each}
		</g>

		<g class='bars'>
			{#each timeData as point, i}
				<rect
					x="{xScale(i) + 2}"
					y="{yScale(point.value)}"
					width="{barWidth - 4}"
					height="{yScale(0) - yScale(point.value)}"
				></rect>
			{/each}
		</g>
	</svg>
</div>

<style lang="scss">
	.chart {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
	}

	.bar-svg {
		position: relative;
		width: 100%;
		height: 200px;
	}

	.tick {
		font-family: var(--tragic-grotesk);
		font-size: .725em;
		font-weight: 200;
	}

	.tick line {
		stroke: #e2e2e2;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #ccc;
		text-anchor: start;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	.bars rect {
		fill: #a11;
		stroke: none;
		opacity: 0.65;
	}
</style>
