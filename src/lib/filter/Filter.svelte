<script>
    import { data, filterObj, isMobile, percentages, setPercentages } from "../../stores/global";
    import { defaultFilters, getPercentages } from "../../js/utils";
    import {writable} from 'svelte/store';
    import dataSource from "../../data/data.json";
    import FilterButton from "./FilterButton.svelte";
    import MiniBar from "./MiniBar.svelte";
    import { scaleLinear } from 'd3'

    export let variable;
    let open = $isMobile == true ? false : true;
    const allValues = [...new Set(dataSource.map(d => d[variable]))].sort();

    function handleButtonClick() {
        open = !open;
        //setPercentages(getPercentages($data, defaultFilters));
    }

    function getTippyProps(valuePair) {
        return {
            content: `${valuePair[0]}: ${Math.round(valuePair[1])}%`,
            allowHTML: true,
            arrow: true
        }
    }

    function getBgColor(variable, valuePair) {
        const valueLimit = 100; 

        if (variable == "type") {
            const colorMap = {
                "Default": "#6b6b6b",
                "Goddess": "#D7A954",
                "Heroine": "#8AB67B",
                "First Name": "#6CB4CC",
                "Famous Woman": "#C97889",
                "Other": "#9B9B9B",
            };
            return colorMap[valuePair[0]];
        } else if (variable == "feature") {
            const colors = scaleLinear()
                 .domain([0, valueLimit])
                 .range(["#ffffff", "#8ab67b"]);

            return colors(valuePair[1]);
        } else if (variable == "continent") {
            const colors = scaleLinear()
                 .domain([0, valueLimit])
                 .range(["#ffffff", "#6cb4cc"]);

            return colors(valuePair[1]);
        } else if (variable == "year") {
            const colors = scaleLinear()
                 .domain([0, valueLimit])
                 .range(["#ffffff", "#d7a954"]);

            return colors(valuePair[1]);
        } else {
            const colors = scaleLinear()
                 .domain([0, valueLimit])
                 .range(["#181818", "#ffffff"]);

            return colors(valuePair[1]);
        }
    }
</script>


<div class='filter-group'>
 
<!-- Header -->
<div class='filter-header'>
    {#if $isMobile == true}
        <button on:click={handleButtonClick} title="Click to {open == true ? 'close' : 'open'} the {variable} filter">
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
<div class='bar-container'>
    {#key $percentages}
        {#each $percentages[variable] as valuePair}
            <MiniBar 
                width={valuePair[1]} 
                variable={variable} 
                value={valuePair[0]}
                tippyProps={getTippyProps(valuePair)}
                bgColor={getBgColor(variable, valuePair)}
            />
        {/each}
    {/key}
</div>

<!-- Filter Buttons -->
{#if open}
    <div class='filter-buttons'>
        {#each allValues as value}
            {#if $filterObj[variable].includes(value)}
                <FilterButton {variable} {value} activeStatus={true} />
            {:else}
                <FilterButton {variable} {value} activeStatus={false} />
            {/if}
        {/each}
    </div>
{/if}
</div>



<style lang="scss">
    .filter-group {
        margin: 0.7rem 0rem;
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

    .active-filter-buttons {
        display: flex;
        flex-wrap: wrap;
    }
</style>