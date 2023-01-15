<script>
    import { filterObj, data } from "../../stores/global";
    import { filterData, parseValue } from "../../js/utils";
    import featureData from "../../data/features.json";
    import tippy from "sveltejs-tippy";

    export let variable;
    export let value;
    export let activeStatus;

    function getFeatureDefinition(value) {
        const found = featureData.find(v => v.feature == String(value).toLowerCase())
        if (found == undefined) {
            return null
        } else {
            return found["definition"];
        }
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

    function highlightBar(value) {
        const bar = document.querySelector(`#bar-${variable}-${parseValue(value)}`)
        bar.style.opacity = "100%";
    }

    function removeHighlightBar(value) {
        const bar = document.querySelector(`#bar-${variable}-${parseValue(value)}`)
        bar.style.opacity = "80%";
    }

    const buttonTippyProps = {
        content: getFeatureDefinition(value),
        allowHTML: true,
        arrow: true
    }
</script>

{#if activeStatus == true}
    {#if buttonTippyProps.content == null}
        <button
            title={`Click to filter out "${value}".`} 
            id='filter-{variable}-{parseValue(value)}-active'
            class={`active-filter filter-item`}
            on:click={filterData($filterObj, [value], variable, $data, false)}
            on:mouseover={() => highlightBar(value)}
            on:focus={() => highlightBar(value)}
            on:mouseleave={() => removeHighlightBar(value)}
            style='background-color: {getBgColor(variable, value)}'
            >
        {value}
        </button>
    {:else}
        <button
            title={`Click to filter out "${value}".`} 
            id='filter-{variable}-{parseValue(value)}-active'
            class={`active-filter filter-item`}
            on:click={filterData($filterObj, [value], variable, $data, false)}
            on:mouseover={() => highlightBar(value)}
            on:focus={() => highlightBar(value)}
            on:mouseleave={() => removeHighlightBar(value)}
            style='background-color: {getBgColor(variable, value)}'
            use:tippy={buttonTippyProps}
            >
        {value}
        </button>
    {/if}
{:else}
    {#if buttonTippyProps.content == null}
        <button
            title={`Click to show "${value}"`}
            id='filter-{variable}-{parseValue(value)}-inactive' 
            class="inactive-filter filter-item"
            on:click={filterData($filterObj, [value], variable, $data, true)}
            style='background-color: {getBgColor(variable, value)}'
            >
        {value}
        </button>
    {:else}
        <button
            title={`Click to show "${value}"`}
            id='filter-{variable}-{parseValue(value)}-inactive' 
            class="inactive-filter filter-item"
            on:click={filterData($filterObj, [value], variable, $data, true)}
            style='background-color: {getBgColor(variable, value)}'
            use:tippy={buttonTippyProps}
            >
        {value}
        </button>
    {/if}
{/if}


<style lang="scss">
    .active-filter-buttons {
        display: flex;
        flex-wrap: wrap;
    }

    .active-filter {
        color: black;
        opacity: 90%;
        transition: 0.2s ease-in-out all;
    }

    .active-filter:hover {
        opacity: 100%;
    }

    .inactive-filter {
        color: black;
        opacity: 40%;
        transition: 0.2s ease-in-out all;
    }

    .inactive-filter:hover {
        opacity: 50%;
    }

    .filter-item {
        width: fit-content;
        padding: 2px 4px;
        border-radius: 3px;
        margin: 2.5px 5px 2.5px 0px;
        transition: 0.2s ease-in-out all;
    }
</style>