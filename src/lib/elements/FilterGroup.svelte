<script>
    import { activeFilter, filterData } from "../../stores/global";

    // Pass in an array of keys e.g. ["year", "type"] to clear that filter
	function clearFilter(filterKeyArr) {
		let output = [];
		$activeFilter.map(element => {
			if (!filterKeyArr.includes(element.id)) {
				output.push(element)
			}
		})
		console.log("Clearing all", filterKeyArr, output);
		filterData(output);
	}

	// Remove a single item from a filter, update the data source
	function clearFilterItem(filterId, filterItem) {
		let output = []
		$activeFilter.map(element => {
			if (element.id == filterId) {
				const newValues = element.value.filter(v => v != filterItem)
				// if there are no values left after removing the item, skip it
				if (newValues.length == 0) {
					return null
				} else {
					output.push({
						id: element.id,
						value: newValues,
					})
				}
			} else {
				// keep the other filters intact
				output.push(element)
			}
		})
		console.log("Clearing", filterItem, "from", filterId, output);
		filterData(output);
	}
</script>


<p>Active filters:</p>
{#each $activeFilter as filter}
    <div class='filter-group'>
        <div class='filter-title'>
            <p>Filter <b>{filter.id}</b> for</p>
        </div>
        <div class='active-filter-buttons'>
            {#each filter.value as filterItem, i}
                <button class='filter-item' on:click={clearFilterItem(filter.id, filterItem)} title={"Clear item from filter"}>{filterItem}</button>
            {/each}
            {#if filter.value.length > 0}
                <button class='clear-all-button' on:click={clearFilter([filter.id])} title={"Clear filter"}>X Clear All</button>
            {/if}
        </div>
    </div>
{/each}

<style lang="scss">
    .filter-group {
        margin: 3% 0%;
    }

    .active-filter-buttons {
        display: flex;
    }

    .filter-item {
        width: fit-content;
        padding: 2px 4px;
        border-radius: 3px;
        margin: 0px 5px 0px 0px;
        background-color: gray;
        color: white;
    }

    .filter-item:hover {
        background-color: white;
        color: black;
    }
</style>