<script>
	import { data, activePage, activeFilter, setActivePage, filterData, resetData, page } from './stores/global.js'
	import dataSource from "./data/data.json";
	import TitleCard from './lib/svg/TitleCard.svelte';
	import Globe from "./lib/globe/Globe.svelte";
	import Card from './lib/card/Card.svelte';
	import TitleSvg from './lib/svg/TitleSvg.svelte';
	import { onMount } from 'svelte';
	import { fade, crossfade } from 'svelte/transition';
	import { cubicOut, quintOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
  	import FilterGroup from './lib/elements/FilterGroup.svelte';
  import { max } from 'd3';
	
	const testFilter = [
		{
			id: "type",
			value: ["Famous Woman", "Goddess", "Heroine", "First Name", "Other"]
		},
		{
			id: "feature",
			value: ["Crater", "Tholus", "Vallis", "Planitia"]
		},
		{
			id: "origin",
			value: ["Japan", "United States"]
		}
	]

	let ready = false;

	onMount(async () => {
		filterData();
		ready = true;
	});

	$: introStatus = $activePage == "intro" ? "" : "hide";
	$: contentStatus = $activePage == "main" ? "" : "hide";
	$: globeMargin = $activePage == "intro" ? "-475px 40px" : "0px 0px";
	$: cardsPerPage = 6;
	$: numberOfPages = Math.ceil($data.length / cardsPerPage);
	let pageArray = []
	$: {
		// Dynamically adjust pagination buttons
		let output;
		// If there are more than 10 pages, show truncated pagination (with ellipses)
		if (numberOfPages >= 10) {
			const minValues = [0, 1, 2, 3];
			const maxValues = minValues.map(v => numberOfPages - v - 1).sort();

			// If the active page is among the first or last 4, hide middle values with "..."
			if (minValues.includes($page) || maxValues.includes($page)) {
				output = [minValues, "...", maxValues].flat();
				pageArray = output;
			// If the active page is 5th, show it immediately after the minValues
			} else if ($page == Math.max(...minValues) + 1 ) {
				output = [minValues, $page, "...", maxValues].flat();
				pageArray = output;
			// If the active page is just below the max, show it immediately before the maxValues
			} else if ( $page == Math.min(...maxValues) - 1 ) {
				output = [minValues, "...", $page, maxValues].flat();
				pageArray = output;
			// If the active page is somewhere in the middle, show it surrounded by "..."
			} else {
				output = [minValues, "...", $page, "...", maxValues].flat();
				pageArray = output;
			}
		// If there are fewer than 10 pages, just show them all
		} else {
			output = [...Array(numberOfPages).keys()]
			pageArray = output;
		}
	}

	const globeOpacity = tweened(100, {
		duration: 50,
		easing: cubicOut,
		delay: 0
	})

	function handlePageChange(newPage) {
		globeOpacity.set(0)
		setActivePage(newPage)
		globeOpacity.set(100)
	}

	// Only show active cards
	function visibleData(data, page) {
		const minIndex = (page * cardsPerPage) + 0;
		const maxIndex = (page * cardsPerPage) + (cardsPerPage - 1);
		const filtered = data.filter((value, index) => {
			if (index <= maxIndex && index >= minIndex) {
				return value;
			}
		})
		return filtered;
	}

	/* 
	Add real filters
	Search bar
	Bar charts
	Modal
	Mobile responsiveness
	Figure out how to dynamically filter the globe's data
	*/

</script>

<main>
{#if ready == true}
	<div class='header {contentStatus}' in:fade={{ delay: 500 }}>
		<h1 class='sr-only'>Naming Venus: a data visualization project by Kavya Beheraj</h1>
		<button aria-expanded="false" id='title-button' on:click={e => handlePageChange("intro")} on:keypress={e => handlePageChange("intro")} >
			<TitleSvg borderColor="black" textColor="white" starColor="#c97889" />
		</button>
	</div>

	<div class='content {$activePage}-mode' in:fade={{ delay: 500 }}>
		<div class='left-content'>
			<div>
				<div class='{introStatus}' aria-hidden="true" focusable="false">
					<TitleCard width={350} height={600} />
				</div>
				<div class='globe-wrapper' style='margin: {globeMargin}; opacity: {globeOpacity}%' aria-hidden="true" focusable="false" in:fade={{ delay: 1200 }} >
					<Globe />
				</div>
			</div>
			<div class='{contentStatus}'>
				<div class='globe-spacer'></div>
				<div>
					<button class='filter-button' on:click={e => filterData(testFilter)} on:keypress={e => filterData(testFilter)}>Test filter</button>
					<button class='reset-button' on:click={e => resetData(testFilter)} on:keypress={e => resetData(testFilter)}>Reset filter</button>
				</div>
				<div>
					<FilterGroup />
				</div>
			</div>
		</div>
		<div class='right-content'>
			<div>
				<div class='intro-text {introStatus}'>
					<h2 class='sr-only'>Introduction</h2>
					<p>Venus, the morning star, Earth's twin, has been inspiring humanity for thousands of years. Beneath its swirling superhot atmosphere, nearly every discovered surface feature — every mountain, valley, and crater — has been named after a woman. Carved into Venus's alien landscape are stories of pioneering explorers, war godesses, mythical heroines, and more. This project aims to tell their stories.</p>

					<div>
						<button id='intro-button' on:click={e => handlePageChange("main")} on:keypress={e => handlePageChange("main")}>Explore the names</button>
						<div class='feature-count'>Showing {$data.length} features</div>
						<button class='filter-button' on:click={e => filterData(testFilter)} on:keypress={e => filterData(testFilter)}>Test filter</button>
						<button class='reset-button' on:click={e => resetData(testFilter)} on:keypress={e => resetData(testFilter)}>Reset filter</button>
					</div>
					<div>
						<FilterGroup />
					</div>
				</div>
			</div>

			<div class='page-buttons-wrapper {contentStatus}'>
				<div class='feature-count'>Showing {$data.length} features</div>
				<button disabled='{ $page <= 0 }' on:click={e => page.set($page - 1)}>Previous page</button>
				<div class='page-buttons'>
					{#each pageArray as pageNumber }
						{#if pageNumber == "..."}
							<div>...</div>
						{:else}
							<button id='page-button-{pageNumber}' class={pageNumber == $page ? 'page-button active-page-button' : 'page-button'} on:click={e => page.set(parseInt(e.target.value))} value={ pageNumber } style='margin: 2px;'>{ pageNumber + 1 }</button>
						{/if}
					{/each}
				</div>
				<button disabled='{ $page + 1 > numberOfPages - 1 }' on:click={e => page.set($page + 1)}>Next page</button>
			</div>

			<!-- in:fade={{ delay: 500 }}  -->
			<div class="card-wrapper {contentStatus}" >
				{#key $data}
					{#key $page}
						{#each visibleData($data, $page) as feature}
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
	}

	.header {
		text-align: center;
		width: 100%;
	}

	.intro-mode {
		margin: auto;
		max-width: 35%;
		height: 90vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.main-mode {
		margin: auto;
		display: grid;
		grid-template-columns: 1fr 3fr;
		column-gap: 24px;
		max-width: 90%;
	}

	.intro-text {
		margin: auto auto auto 10%;
		min-width: 200px;
		color: white;
	}

	.intro-text>p {
		font-size: 16px;
		padding: auto auto 10% auto;
	}

	.title-section, .chart-section {
		margin: auto;
	}

	.globe-spacer {
		height: 300px;
	}

	.feature-count {
		margin: 1% 2%;
	}

	/* margin: 130px 36px; */
	.globe-wrapper {
		z-index: 100;
		position: absolute;
		max-width: 300px;
		max-height: 300px;
		overflow: hidden;
		transition: opacity 2s;
	}

  	.card-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
  		column-gap: 8px;
  		row-gap: 8px;
		height: 80vh;
		overflow: auto;
	}

	.page-buttons-wrapper {
		display: flex;
		max-width: 50%;
	}

	.page-button {
		padding: 2px;
		min-width: 18px;
		margin: 2px;
	}

	.active-page-button {
		background-color: var(--famous-woman-color);
		color: black;
	}

	.page-buttons {
		display: flex;
		margin: 0px auto;
	}

	

	#intro-button {
		display: inline-block;
		border: none;
		padding: 1rem 2rem;
		border-radius: 8px;
		margin: 0;
		text-decoration: none;
		background: #ffffffaa;
		color: var(--card-bg-color);
		font-family: var(--tragic-grotesk);
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		text-align: center;
		transition: background 250ms ease-in-out, transform 150ms ease;
		-webkit-appearance: none;
		-moz-appearance: none;
	}

	#title-button {
		background-color: transparent;
		margin: 0px;
		padding: 0px;
		border: none;
	}

	@media only screen 
	and (min-device-width: 320px) 
	and (max-device-width: 480px)
	and (-webkit-min-device-pixel-ratio: 2) {
		.card-wrapper {
			display: grid;
			grid-template-columns: 1fr;
			max-width: 100%;
			height: 98vh;
		}

	}

</style>