<script>
    import { getThemeColor, moveGlobeToPoint } from '../../js/utils.js'
    import featureData from '../../data/features.json'
    import HoverText from "../elements/HoverText.svelte";
    import VenusIcon from '../svg/VenusIcon.svelte';
    import { data, globe } from '../../stores/global.js';

    export let id;
    export let name;
    export let feature;
    export let origin;
    export let year;
    export let type;
    export let featDefinition = getDefinition(feature);
    export let modalStyle;

    function getDefinition(feature) {
        const found = featureData.find(element => element.feature == feature.toLowerCase());
        if (feature == undefined || found == undefined) {
            return null;
        } else {
            return found.definition;
        }
    }

    $: hovering = false;
</script>


<div class='card-header' style="--theme-color:{getThemeColor(type)}; --light-theme:{getThemeColor(type, 100, true)}">
    <div class='name-header'>
        {#if modalStyle}
            <button class='card-icon' aria-expanded="false" title={"Click to view more information"}>
                <VenusIcon themeFill={hovering == false ? getThemeColor(type) : getThemeColor(type, 100, true)} />
            </button>
        {/if}
        <h3 class='name'>{name}</h3>
    </div>
    <div class='category-grid'>
        <div class='category-wrapper'>
            <div class='category feature' style='float: left'>
                <HoverText text={feature} tooltip={featDefinition} color={getThemeColor(type)} align="left" />
            </div>
        </div>
        <div class='category-wrapper'>
            <div class='category year'>
                <HoverText text={year} tooltip="Year discovered" color={getThemeColor(type)} align="center" />
            </div>
        </div>
        <div class='category-wrapper'>
            <div class='category origin' style='float: right'>
                <HoverText text={origin} tooltip="Culture or country of origin" color={getThemeColor(type)} align="right" />
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .card-header {
        border-bottom: 1px solid var(--theme-color);
    }

    .card-icon {
        float: left;
        padding: 8px 4px 0px 10px;
        background-color: transparent;
    }

    .name {
        font-family: var(--boecklins);
        margin: 5% auto 2% auto;
        padding: 0% 1%;
        color: var(--light-theme);
        font-size: 32px;
        max-width: 80%;
    }

    .category {
        text-transform: uppercase;
        margin: auto;
        font-size: 14px;
        line-height: 14px;
        width: fit-content;
        padding: 0px 0px 4px;
        font-size: 0.8rem;
    }

    .category-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 3%;
        margin: auto;
    }

</style>