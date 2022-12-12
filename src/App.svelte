<script>
	import { data } from './stores/global.js'
	import dataSource from './data/data.json'
	import TitleCard from './lib/layout/TitleCard.svelte';
	import BorderCard from './lib/layout/BorderCard.svelte';
	import Globe from "./lib/globe/Globe.svelte";
	import Card from './lib/card/Card.svelte';
	import RadarChart from './lib/chart/RadarChart.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	let visible = false;

	/* const initialFilter = [
		{
			id: "year",
			value: [1998, 1999, 2000, 2001]
		},
	] */

	function filterData(filterObj) {
		const currentData = dataSource;
		if (filterObj == undefined || filterObj[0].value.length == 0) {
			$data = dataSource;
		} else {
			const filtered = currentData.filter(item => {
				return filterObj.every(filter => {
					return filter.value.includes(item[filter.id])
				})
			})
			$data = filtered;
			console.log("new data", $data);
		}
	}

	onMount(async () => {
        filterData();
		visible = true;
	});
	
</script>

<main>
	<div class='content'>
		<div class='title-section'>
			<TitleCard />
			{#if visible}
			<div class='globe-wrapper'>
				<Globe />
			</div>
			{/if}
			<!-- <div class='intro'>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
			</div> -->
		</div>
		<div class='chart-section'>
			<!-- <BorderCard /> -->
			<div class='chart-wrapper'>
				<RadarChart category={"type"} chartTitle="Type" />
				<RadarChart category={"continent"} chartTitle="Continent" />
			</div>
		</div>
		<div class="card-wrapper">
			{#each $data as feature}
			  <Card cardData={feature} />
			{/each}
		</div>
	</div>
</main>

<style lang="scss">
	\:global {
		@import "scss/style.scss";
	}

	main {
		max-width: 80%;
		margin: auto;
	}

	.intro {
		font-family: var(--gentium);
	}

	.content {
		display: grid;
		grid-template-columns: 1fr 1fr 15fr;
		column-gap: 1%;
	}

	.title-section, .chart-section {
		position: relative;
		margin: auto;
	}

	.globe-wrapper {
		margin: auto;
		width: 250px;
		height: 250px;
		position: absolute;
		top: 24%;
		left: 17%;
	}

	.chart-wrapper {
		margin: auto;
		width: fit-content;
		display: grid;
		grid-template-rows: 1fr 1fr;
		padding: 10px;
		background-color: var(--card-bg-color);
	}

	.card-wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(230px, 1fr) );
  		column-gap: 12px;
  		row-gap: 12px;
		height: 80vh;
		overflow: auto;
	}

	
	/* @media (min-width: 640px) {
		.content {
			display: grid;
			grid-template-columns: 1fr;
		}
	} */
</style>