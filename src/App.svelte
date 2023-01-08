<script>
	// stores
	import { data, activePage, resetData, page, globe, filterObj, defaultFilters, isMobile } from './stores/global.js'

	// components
	import Globe from "./lib/globe/Globe.svelte";
	import Card from './lib/card/Card.svelte';
	import Filter from './lib/elements/Filter.svelte';
	import PageNavigation from './lib/elements/PageNavigation.svelte';
	import IntroSection from './lib/elements/IntroSection.svelte';
	import Header from './lib/elements/Header.svelte';

	// svelte libraries
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
  	
	// utils
	import { showGlobePoints, filterData } from './js/utils.js';
	import dataSource from "./data/data.json";

	// Waits for page load to add svelte transitions
	let ready = false;

	// Add "hide" class to page that is not active
	$: showIntroPage = $activePage == "intro" ? "" : "hide";
	$: showMainPage = $activePage == "main" ? "" : "hide";

	// How many cards to show on a single page
	let visibleData, idArray;
	$: cardsPerPage = 9;
	
	// Only show active cards
	$: {
		// Get the indices of the first and last cards to show
		const minIndex = ($page * cardsPerPage) + 0;
		const maxIndex = ($page * cardsPerPage) + (cardsPerPage - 1);
		const filtered = $data.filter((value, index) => {
			if (index >= minIndex && index <= maxIndex) {
				return value;
			}
		});
		// Get IDs of visible cards, to show them on the globe too
		idArray = $activePage == "intro" ? null : filtered.map(v => v.feature_id);
		$globe == undefined ? null : showGlobePoints(idArray, $globe);
		// Update the cards visible on the page
		visibleData = filtered;
	}

	$: globeMargin = $activePage == "intro" ? "148px 55px" : "0% 0%";

	onMount(async () => {
		resetData();
		ready = true;
	})
</script>

<main>
{#if ready == true}
	<!-- HEADER -->
	<div class='header-wrapper {showMainPage}'>
		<Header />
	</div>

	<!-- INTRO PAGE -->
	<div class='intro-mode {showIntroPage}'>
		<IntroSection />
		<!-- <BarChart /> -->
	</div>

	<!-- CARDS PAGE -->
	<div class='main-mode content-grid {showMainPage}'>
		<!-- Globe and filters sidebar -->
		<div class='sidebar'>
			<!-- Globe for intro -->
			<div class='globe-wrapper' style='margin: {globeMargin};' aria-hidden="true" focusable="false" >
				<Globe targetNode="cards-globe" />
			</div>
			<!-- Filters -->
			<div class='filter-section'>
				<div class='globe-spacer'></div>
				<div>
					<p>Showing {$data.length} {$data.length == 1 ? "feature" : "features"}</p>
				</div>

				{#if $data.length == dataSource.length}
					<div>
						<button class='reset-button' on:click={e => filterData($filterObj, defaultFilters["type"], "type", $data, false)} on:keypress={e => filterData($filterObj, defaultFilters["type"], "type", $data, false)}>Hide all</button>
					</div>
				{:else}
					<div>
						<button class='reset-button' on:click={e => resetData()} on:keypress={e => resetData()}>Show all</button>
					</div>
				{/if}
				
				<div>
					{#each Object.keys($filterObj) as variable}
						<Filter {variable} />
					{/each}
				</div>
			</div>
		</div>

		<!-- Card section -->
		<div class='{showMainPage}'>
			<div class='page-buttons-wrapper'>
				<PageNavigation {cardsPerPage} />
			</div>
			<div class="card-wrapper">
				{#key $data}
					{#key $page}
						{#each visibleData as feature}
							<div in:fade={{ delay: 50 }}>
								<Card cardData={feature} />
							</div>
						{/each}
					{/key}
				{/key}
			</div>
		</div>

	</div>
{/if}
</main>

<style lang="scss">
	\:global {
		@import "scss/style.scss";
	}

	main {
		margin: auto;
		width: 90vw;
		height: 90vh;
		display: flex;
		justify-content: center;
	}

	.header-wrapper {
		position: sticky;
		top: 0;
		background-color: black;
		z-index: 200;
		display: grid;
		grid-template-columns: 1fr 3fr;
	}

	.intro-mode {
		margin: auto;
		opacity: 1;
        transition: 0.4s ease all;
	}

	.credit-line {
		text-align: center;
	}

	.title-card-wrapper {
		width: fit-content;
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 15px;
		margin: auto;
	}

	.main-mode {
		margin: auto;
		opacity: 0;
        transition: 0.4s ease all;
		width: fit-content;
		height: fit-content;
	}

	.content-grid {
		margin: auto;
		display: grid;
		grid-template-columns: 1fr 3fr;
	}

	.title-section {
		width: fit-content;
		height: fit-content;
		margin: 1rem auto;
	}

	.feature-count {
		margin: 1% 2%;
	}

	.globe-wrapper {
		z-index: 100;
		position: absolute;
		max-width: 300px;
		max-height: 300px;
		overflow: hidden;
		transition: opacity 2s;
	}

	.globe-spacer {
		margin: 275px 0px 0px 0px;
	}

  	.card-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
  		column-gap: 0px;
  		row-gap: 0px;
		height: fit-content;
		margin: auto;
	}

	.page-buttons-wrapper {
		width: fit-content;
		margin: auto;
	}

	.reset-button {
		padding: 5px;
	}
</style>