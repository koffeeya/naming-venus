<script>
    import { data, filterObj, isMobile } from "../../stores/global";
    import dataSource from "../../data/data.json";
    import { filterData, parseValue } from "../../js/utils";
    import FilterButton from "./FilterButton.svelte";

    export let variable;
    let open = $isMobile == true ? false : true;
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

    function getBgColor(variable, value) {
        let colorMap;

        if (variable == "type") {
            colorMap = {
                "Default": "#6b6b6b",
                "Goddess": "#D7A954",
                "Heroine": "#8AB67B",
                "First Name": "#6CB4CC",
                "Famous Woman": "#C97889",
                "Other": "#9B9B9B",
            };
            return colorMap[value];
        } else {
            return "white";
        }
    }
</script>


<div class='filter-group'>

<!-- Header -->
<div class='filter-header'>
    {#if $isMobile == true}
        <button on:click={() => {open = !open}} title="Click to {open == true ? 'close' : 'open'} the {variable} filter">
            <div>
                <p>Filter <b>{variable}</b> &nbsp;<span class='filter-visible-number'>({$filterObj[variable].length} active)</span></p>
            </div>
            <p class='open-close-btn'>{@html open == true ? "&#9650;" : "&#9660;" }</p>
        </button>
    {:else}
        <p>Filter <b>{variable}</b> &nbsp;({$filterObj[variable].length} active)</p>
    {/if}
</div>

<!-- Bars -->
{#if allValues.length < 25}
    <div class='bar-container'>
        {#each allValues as value}
            {#if share[value] > 0}
                <div class='value-bar' id='bar-{variable}-{parseValue(value)}' style='min-width: {share[value]}%; background-color: {getBgColor(variable, value)}'></div>
            {/if}
        {/each}
    </div>
{/if}

{#if open == true}
    {#if allValues.length < 25}
        <!-- Buttons -->
        <div class='filter-buttons'>
            {#each allValues as value}
                {#if $filterObj[variable].includes(value)}
                    <FilterButton {variable} {value} activeStatus={true} />
                {:else}
                    <FilterButton {variable} {value} activeStatus={false} />
                {/if}
            {/each}
        </div>
    {:else}
        <!-- Dropdown -->
        <div class='filter-dropdowns'>
            <select multiple >
                {#each $filterObj[variable] as value}
                    <option {value} on:click={filterData($filterObj, [value], variable, $data, false)}>
                        { value }
                    </option>
                {/each}
            </select>
        </div>
    {/if}
{/if}

</div>



<style lang="scss">
    .filter-group {
        margin: 0.3rem 0rem;
        width: 100%;
    }

    .filter-header>button {
        background-color: #000;
        color: white;
        text-align: left;
        padding: 0px;
        margin: 0px;
        width: 100%;
        display: grid;
        grid-template-columns: 3fr 1fr;
    }

    .filter-visible-number {
        font-size: 0.9rem;
        color: gray;
    }

    .open-close-btn {
        background-color: transparent;
        color: white;
        font-size: 12px;
        float: right;
        text-align: right;
        margin: 0.5rem 0rem 0rem;
    }

    .bar-container {
        display: flex;
        width: 100%;
        margin: 0.4rem 0rem;
    }

    .value-bar {
        transition: 0.2s ease-in-out all;
        height: 0.7rem;
        margin: 0px;
        opacity: 80%;
        -webkit-box-shadow:inset 0px 0px 0px 0.5px #000;
        -moz-box-shadow:inset 0px 0px 0px 0.5px #000;
        box-shadow:inset 0px 0px 0px 0.5px #000;
    }

    .active-filter-buttons {
        display: flex;
        flex-wrap: wrap;
    }
</style>