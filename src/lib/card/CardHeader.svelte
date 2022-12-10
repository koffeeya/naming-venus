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
    <h3 class='name'>{name}</h3>
    <div class='category-grid'>
        <div class='feature'>
            <HoverText text={feature} tooltip={featDefinition} color={themeColor} />
        </div>
        <p class='year'>{year}</p>
        <p class='origin'>{origin}</p>
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
        color: var(--theme-color);
        font-size: 32px;
    }

    .feature {
        text-transform: uppercase;
        text-align: left;
        margin-top: auto;
        margin-bottom: auto;
    }

    .origin {
        text-transform: uppercase;
        text-align: right;
        font-size: 14px;
        line-height: 14px;
        margin-top: auto;
        margin-bottom: auto;
    }

    .year {
        text-transform: uppercase;
        text-align: center;
        font-size: 14px;
        line-height: 14px;
        margin-top: auto;
        margin-bottom: auto;
    }

    .category-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 3% 3% 3% 2%;
        margin: 0% 2%;
    }

</style>