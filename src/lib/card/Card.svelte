<script>
    import { getThemeColor, moveGlobeToPoint } from '../../js/utils.js';
    import { data, globe } from '../../stores/global.js'
    export let cardData;

    // Card components
    import CardHeader from './CardHeader.svelte';
    import CardBody from './CardBody.svelte'
    import CardFooter from './CardFooter.svelte'
    
    // Data
    const id =              cardData.feature_id
    const themeColor =      cardData.type == undefined ? getThemeColor("default") : getThemeColor(cardData.type);
    const themeColorLight = cardData.type == undefined ? getThemeColor("default", 15) : getThemeColor(cardData.type, 15);
    const type =            cardData.type == undefined ? "Other" : cardData.type;
    const name =            cardData.name == undefined ? "N/A" : cardData.name;
    const year =            cardData.year == undefined ? 2022 : cardData.year;
    const origin =          cardData.origin == undefined ? "N/A" : cardData.origin;
    const feature =         cardData.feature == undefined ? "N/A" : cardData.feature;
    const imgCaption =      cardData.image_caption == "" ? "No image caption" : cardData.image_caption;
    const imgUrl =          cardData.image_url;
    const description =     cardData.description == "" ? "N/A" : cardData.description;
    const bio =             cardData.bio == "" ? "" : cardData.bio;

</script>

<div class='card' style="--theme-color:{themeColor}; --theme-light:{themeColorLight}" >
    <div class='outer-border'>
        <div class='inner-border'>
            <div class='content'>
                <CardHeader {type} {name} {feature} {origin} {year} {imgCaption} {imgUrl} />
                <CardBody {themeColor} {name} {description} {bio} />
                <CardFooter {themeColor} />
            </div>
        </div>
    </div>
</div>


<style lang="scss">
    .card {
        padding: 0px;
        border: none;
        margin: 10px;
        background-color: var(--card-bg-color);
        border-radius: 16px;
        text-align: center;
        height: fit-content;
        min-width: 150px;
        max-width: 350px;
        box-shadow: 1px 5px 5px rgba(0, 0, 0, 0.75);
    }

    .outer-border {
        border: 1px solid var(--theme-color);
        border-radius: 16px;
        padding: 10px;
        margin: 0px;
        min-height: fit-content;
        height: 100%; 
    }

    .inner-border {
        border: 1px solid var(--theme-color);
        border-radius: 8px;
        padding: 0px;
        height: 100%;
    }

    .content {
        padding: 0px;
        height: fit-content; 
    }
</style>