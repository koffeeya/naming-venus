<script>
    import { page, data, pageTheme } from "../../stores/global";
    import { getThemeColor } from "../../js/utils";
    import { format } from 'd3'
    export let cardsPerPage;

    const formatValue = format(",");
    
    $: themeColor = getThemeColor($pageTheme, 100, false)
	$: numberOfPages = Math.ceil($data.length / cardsPerPage);
	let pageArray = []
    // Dynamically show pagination buttons
	$: {
		if (numberOfPages >= 10) {
			const minValues = [0, 1, 2, 3]; // first 4 pages
			const maxValues = minValues.map(v => numberOfPages - v - 1).sort(); // last 4 pages

			// format the navigation bar
			if (minValues.includes($page) || maxValues.includes($page)) {
				pageArray = [minValues, "...", maxValues].flat();
			} else if ($page == Math.max(...minValues) + 1 ) {
				pageArray = [minValues, $page, "...", maxValues].flat();
			} else if ( $page == Math.min(...maxValues) - 1 ) {
				pageArray = [minValues, "...", $page, maxValues].flat();
			} else {
				pageArray = [minValues, "...", $page, "...", maxValues].flat();
			}
		} else {
			pageArray = [...Array(numberOfPages).keys()]
		}
	}
</script>

<div style='--theme-color:{themeColor};'>
    <div class='feature-count'>Showing {formatValue($data.length)} features</div>
    <div class='nav-buttons'>
        <button class='nav-arrow' aria-expanded="false" id="previous-button" title='Go to the previous page' disabled='{ $page <= 0 }' on:click={e => page.set($page - 1)}>&larr;</button>
        <div class='page-button-group'>
            {#each pageArray as pageNumber}
                {#if pageNumber == "..."}
                    <div>...</div>
                {:else}
                    <button id='page-button-{pageNumber}' class={pageNumber == $page ? 'page-button active-page-button' : 'page-button'} on:click={e => page.set(parseInt(e.target.value))} value={pageNumber} title='Go to page {pageNumber + 1}' style='margin: 2px;'>{ pageNumber + 1 }</button>
                {/if}
            {/each}
        </div>
        <button class='nav-arrow' aria-expanded="false" id="next-button" title='Go to the next page' disabled='{ $page + 1 > numberOfPages - 1 }' on:click={page.set($page + 1)}>&rarr;</button>
    </div>
</div>




<style lang="scss">
    .nav-buttons {
        display: flex;
    }

    .nav-arrow {
        padding: 0% 1%;
        background-color: transparent;
        color: white;
        font-size: 16px;
        font-weight: 900;
        margin: auto;
    }

    .nav-arrow:disabled {
        color: gray;
    }

    .nav-arrow:hover {
        color: var(--theme-color);
    }

    .nav-arrow:disabled:hover {
        color: gray;
        cursor: default;
    }

    .page-button-group {
        display: flex;
		margin: auto;
        padding: 0% 1%;
    }
    
	.page-button {
		padding: 2px;
		min-width: 2rem;
		margin: 2px;
        border-radius: 5px;
        background-color: #353535;
        color: white;
	}

    .page-button:hover {
        background-color: white;
        color: black;
    }

	.active-page-button {
		background-color: var(--theme-color);
		color: black;
        transition: 0.3s ease all;
	}

    .active-page-button:hover {
        background-color: var(--theme-color);
		color: black;
    }

</style>