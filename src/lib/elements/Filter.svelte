<script>
    import { data, filterObj } from "../../stores/global";
    import dataSource from "../../data/data.json";
    import { filterData } from "../../js/utils";

    export let variable;
    const allValues = [...new Set(dataSource.map(d => d[variable]))].sort();

</script>

<div class='filter-group'>
    <div class='filter-header'>
        <p>Filter <b>{variable}</b></p>
    </div>
    <div class='filter-buttons'>
        {#each allValues as value}
            {#if $filterObj[variable].includes(value)}
                <button 
                    title={`Click to filter out "${value.toLowerCase()}"`} 
                    id='filter-{variable}-{value.toLowerCase().replace(" ","")}-active'
                    class={`active-filter filter-item`}
                    on:click={filterData($filterObj, [value], variable, $data, false)}>
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

<style lang="scss">
    .filter-group {
        margin: 3% 0%;
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