<script>
    import { data, filterObj } from "../../stores/global";
    import dataSource from "../../data/data.json";
    import { filterData } from "../../js/utils";

    export let variable;
    const allValues = [...new Set(dataSource.map(d => d[variable]))].sort();
    let share = {};
    $: {
        const tempObj = {}
        allValues.map(value => {
            const filtered = $data.filter((d) => d[variable] == value).length;
            const total = $data.length;
            const percent = total == 0 ? 0 : (filtered / total) * 100;
            tempObj[value] = percent;
        })
        const keys = Object.keys(tempObj)
        const sorted = keys.sort(function(a, b) { return tempObj[a] - tempObj[b] })
        sorted.map(v => {
            share[v] = tempObj[v]
        })
    }

    function highlightBar(value) {
        const bar = document.querySelector(`#bar-${variable}-${value.toLowerCase().replace(" ","")}`)
        bar.style.backgroundColor = "red";
    }

    function removeHighlightBar(value) {
        const bar = document.querySelector(`#bar-${variable}-${value.toLowerCase().replace(" ","")}`)
        bar.style.backgroundColor = "white";
    }
</script>

{#if allValues.length < 25}
<div class='filter-group'>
    <div class='filter-header'>
        <p>Filter <b>{variable}</b> &nbsp;({$filterObj[variable].length} active)</p>
    </div>
    <div class='bar-container'>
        {#each allValues as value}
            {#if share[value] > 0}
                <div class='value-bar' id='bar-{variable}-{value.toLowerCase().replace(" ","")}' style='min-width: {share[value]}%; opacity: {share[value] + 20}%'></div>
            {/if}
        {/each}
    </div>
    <div class='filter-buttons'>
        {#each allValues as value}
            {#if $filterObj[variable].includes(value)}
                <button 
                    title={`Click to filter out "${value.toLowerCase()}"`} 
                    id='filter-{variable}-{value.toLowerCase().replace(" ","")}-active'
                    class={`active-filter filter-item`}
                    on:click={filterData($filterObj, [value], variable, $data, false)}
                    on:mouseover={() => highlightBar(value)}
                    on:mouseleave={() => removeHighlightBar(value)}
                    >
                {value}
                </button>
            {:else}
                <button 
                    title={`Click to show "${value.toLowerCase()}"`}
                    id='filter-{variable}-{value.toLowerCase().replace(" ","")}-inactive' 
                    class="inactive-filter filter-item"
                    on:click={filterData($filterObj, [value], variable, $data, true)}>
                {value}
                </button>
            {/if}
        {/each}
    </div>
</div>
{:else}
<div class='filter-group'>
    <div class='filter-header'>
        <p>Filter <b>{variable}</b> &nbsp;({$filterObj[variable].length} active)</p>
    </div>
    <div class='filter-dropdowns'>
        <select multiple >
            {#each $filterObj[variable] as value}
                <option {value} on:click={filterData($filterObj, [value], variable, $data, false)}>
                    { value }
                </option>
            {/each}
        </select>
    </div>
</div>
{/if}

<style lang="scss">
    .filter-group {
        margin: 3% 0%;
    }

    .bar-container {
        display: flex;
        max-width: 100px;
        margin: 2% 0%;
    }

    .value-bar {
        transition: 0.2s ease-in-out all;
        height: 10px;
        margin: 0px;
        background-color: white;
    }

    .active-filter-buttons {
        display: flex;
        flex-wrap: wrap;
    }

    .active-filter {
        background-color: white;
        color: black;
        opacity: 80%;
        transition: 0.2s ease-in-out all;
    }

    .active-filter:hover {
        opacity: 100%;
    }

    .inactive-filter {
        background-color: #292929;
        color: rgb(146, 146, 146);
        opacity: 80%;
        transition: 0.2s ease-in-out all;
    }

    .inactive-filter:hover {
        opacity: 100%;
    }

    .filter-item {
        width: fit-content;
        padding: 2px 4px;
        border-radius: 3px;
        margin: 2.5px 5px 2.5px 0px;
        transition: 0.2s ease-in-out all;
    }
</style>