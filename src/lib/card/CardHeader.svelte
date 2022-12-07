<script>
    import featureData from '../../data/features.json'
    import HoverText from "../layout/HoverText.svelte";
    import CardImage from "./CardImage.svelte";

    export let name;
    export let feature;
    export let origin;
    export let year;
    export let imgCaption;
    export let imgUrl;
    export let themeColor;
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

<div class='card-header' style="--theme-color:{themeColor}">
    {#if !imgUrl}
        <div class='name'>
            <h3>{name}</h3>
        </div>
        <div class='category-grid'>
            <HoverText text={feature} tooltip={featDefinition} color={themeColor} />
            <p class='origin'>{origin}</p>
            <p class='year'>{year}</p>
        </div>
    {:else}
        <div class='image-grid'>
            <HoverText text={feature} tooltip={featDefinition} color={themeColor} />
            <p class='origin year'>{origin}<br>{year}</p>
            <CardImage src={imgUrl} alt={imgCaption} color={themeColor}/>
        </div>
    {/if}
</div>

<style lang="scss">
    .card-header {
        border-bottom: 1px solid var(--theme-color);
    }

    .name {
        font-family: var(--boecklins);
        padding: 5% 2% 2% 2%;
        color: var(--theme-color);
    }

    .feature, .origin {
        text-transform: uppercase;
    }

</style>