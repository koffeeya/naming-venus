<script>
    import { getThemeColor } from '../../js/utils.js'
    import featureData from '../../data/features.json'
    import HoverText from "../elements/HoverText.svelte";
    import CardImage from "./CardImage.svelte";

    export let name;
    export let feature;
    export let origin;
    export let year;
    export let imgCaption;
    export let imgUrl;
    export let type;
    export let featDefinition = getDefinition(feature);

    function getDefinition(feature) {
        const found = featureData.find(element => element.feature == feature.toLowerCase());
        if (feature == undefined || found == undefined) {
            return null;
        } else {
            return found.definition;
        }
    }
</script>

<div class='card-header' style="--theme-color:{getThemeColor(type)}; --light-theme:{getThemeColor(type, 100, true)}">
    <h3 class='name'>{name}</h3>
    <div class='category-grid'>
        <div class='category feature'>
            <HoverText text={feature} tooltip={featDefinition} color={getThemeColor(type)} align="left" />
        </div>
        <p class='category year'>
            <HoverText text={year} tooltip="Year discovered" color={getThemeColor(type)} align="center" />
        </p>
        <p class='category origin'>
            <HoverText text={origin} tooltip="Culture or country of origin" color={getThemeColor(type)} align="right" />
        </p>
    </div>
</div>

<style lang="scss">
    .card-header {
        border-bottom: 1px solid var(--theme-color);
    }

    .name {
        font-family: var(--boecklins);
        margin: 5% 0% 2%;
        padding: 0% 1%;
        color: var(--light-theme);
        font-size: 32px;
    }

    .category {
        text-transform: uppercase;
        margin-top: auto;
        margin-bottom: auto;
        font-size: 14px;
        line-height: 14px;
    }

    .category-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 3% 3% 3% 2%;
        margin: 0% 2%;
    }

</style>