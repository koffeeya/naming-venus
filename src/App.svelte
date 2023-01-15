<script>
	// stores
	import { data, activePage, resetData, filterObj, visibleData, globe, isMobile, setPercentages } from './stores/global.js';
	import { defaultFilters, getPercentages } from './js/utils.js';

	// components
	import Globe from "./lib/globe/Globe.svelte";
	import Filter from './lib/filter/Filter.svelte';
	import PageNavigation from './lib/elements/PageNavigation.svelte';
	import SectionIntro from './lib/elements/SectionIntro.svelte';
	import Header from './lib/elements/Header.svelte';
	import SectionCards from './lib/elements/SectionCards.svelte';

	// libraries
	import { onMount } from 'svelte';
	import { format } from 'd3'
  	
	// utils
	import { filterData, resetGlobe } from './js/utils.js';
	import dataSource from "./data/data.json";
	const formatValue = format(",");

	// Waits for page load to add svelte transitions
	let ready = false;

	// Add "hide" class to page that is not active
	$: showIntroPage = $activePage == "intro" ? "" : "hide";
	$: showMainPage = $activePage == "main" ? "" : "hide";
	$: globeMargin = $activePage == "intro" ? "148px 55px" : "-20px 35px";

	onMount(async () => {
		resetData();
		ready = true;
	})
</script>

<main>
{#if ready == true}
	<!-- INTRO PAGE -->
	<div class='intro-mode {showIntroPage}'>
		<SectionIntro />
	</div>

	<!-- CARDS PAGE -->
	<div class='main-mode {showMainPage}'><!-- HEADER -->
		<div class='header-wrapper {showMainPage}'>
			<Header />
			<PageNavigation />
		</div>

		<div class='content-grid'>
		<!-- Globe and filters sidebar -->
		<div class='sidebar'>
			<!-- Globe for intro -->
			{#if $isMobile == false}
				<button class='globe-reset' on:click={() => resetGlobe($globe)} title="Reset the globe's latitude and longitude" aria-hidden="true">Reset globe</button>
				<div class='globe-wrapper' style='margin: {globeMargin};' aria-hidden="true" focusable="false" >
					<Globe targetNode="cards-globe" />
				</div>
			{/if}
			<!-- Filters -->
			<div class='filter-section'>
				{#if $isMobile == false}
					<div class='globe-spacer'></div>
				{/if}
				
				<!-- Filter header -->
				<div class='filter-header'>
					<div class='filter-numbers'>
						<p class='feature-number'>{formatValue($data.length)} {$data.length == 1 ? "feature" : "features"}</p>
						<p class='visible-number'>{$visibleData.length} visible on globe</p>

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
				</div>
				<!-- Filters -->
				<div class='filter-wrapper'>
					{#each Object.keys($filterObj) as variable}
						<Filter {variable} />
					{/each}
				</div>
			</div>
		</div>

		<!-- Card section -->
		<div class='nav-cards {showMainPage}'>
			<SectionCards />
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
		width: 80vw;
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
		min-height: 90vh;
	}

	.nav-cards {
		margin: 15px auto auto auto;
	}

	.content-grid {
		margin: auto;
		display: grid;
		grid-template-columns: 1fr 3fr;
		column-gap: 10px;
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

	.globe-reset {
		position: absolute;
		z-index: 101;
		margin: 0px;
		background-color: transparent;
		color: white;
		opacity: 80%
	}

	.globe-reset:hover {
		opacity: 100%;
	}

	.globe-spacer {
		margin: 250px 0px 0px 0px;
	}

	.page-buttons-wrapper {
		width: fit-content;
		margin: auto;
	}

	.feature-number {
		font-size: 1.3rem;
		font-weight: 600;
	}

	.visible-number {
		font-size: 0.9rem;
		color: gray;
	}

	.reset-button {
		padding: 5px;
		float: right;
	}

	.filter-section {
		margin: 1.2rem 1.2rem 2rem 0rem;

	}

	.filter-header {
		display: grid;
		grid-template-columns: 4fr 1fr;
	}

	@media (max-width: 1400px) {
        .content-grid {
			margin: auto;
			display: grid;
			grid-template-columns: 1fr 2fr;
		}
    }

	@media (max-width: 800px) {
        .content-grid {
			margin: auto;
			display: grid;
			grid-template-columns: 1fr 1fr;
		}

		.header-wrapper {
			grid-template-columns: 1fr;
			margin: auto;
			text-align: center;
		}
    }


    @media (max-width: 700px) {
        .content-grid {
			margin: auto;
			display: grid;
			grid-template-columns: 1fr;
		}

		.header-wrapper {
			grid-template-columns: 1fr;
			margin: auto;
			text-align: center;
		}
    }
</style>