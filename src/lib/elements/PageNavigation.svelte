<script>
    import { page, data, pageTheme, cardsPerPage } from "../../stores/global";
    import { getThemeColor } from "../../js/utils";
    
    $: themeColor = getThemeColor($pageTheme, 100, false)
	$: numberOfPages = Math.ceil($data.length / $cardsPerPage);
	let pageArray = []
    // Dynamically show pagination buttons
	$: {
		if (numberOfPages >= 8) {
			const firstPages = [0, 1, 2];
			const lastPages = firstPages.map(v => numberOfPages - v - 1).sort((a, b) => a - b);

			// format the navigation bar
			if (firstPages.includes($page) || lastPages.includes($page)) {
				pageArray = [firstPages, "...", lastPages].flat();
			} else if ($page == Math.max(...firstPages) + 1 ) {
				pageArray = [firstPages, $page, "...", lastPages].flat();
			} else if ( $page == Math.min(...lastPages) - 1 ) {
				pageArray = [firstPages, "...", $page, lastPages].flat();
			} else {
				pageArray = [firstPages, "...", $page, "...", lastPages].flat();
			}
		} else {
			pageArray = [...Array(numberOfPages).keys()]
		}
	}
</script>

<div class='navbar' style='--theme-color:{themeColor};'>
    <!-- <div class='feature-count'>Showing {formatValue($data.length)} features</div> -->
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
    .navbar {
        margin: 0rem;
        background-color: black;
        padding: 5px;
    }

    .nav-buttons {
        display: flex;
        margin: auto;
        align-items: center;
        justify-content: center;
    }

    .nav-arrow {
        padding: 0rem;
        background-color: transparent;
        color: white;
        font-size: 2rem;
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
        padding: 0% 1%;
        width: 300px;
        align-items: center;
        justify-content: center;
        margin: auto;
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