<script>
    import { getThemeColor } from '../../js/utils.js'
    export let data;

    // Card components
    import CardHeader from './CardHeader.svelte';
    import CardBody from './CardBody.svelte'
    import CardFooter from './CardFooter.svelte'
    
    // Data
    const themeColor =      data.type == undefined ? getThemeColor("default") : getThemeColor(data.type);
    const themeColorLight = data.type == undefined ? getThemeColor("default", 15) : getThemeColor(data.type, 15);
    const type =            data.type == undefined ? "Other" : data.type;
    const name =            data.name == undefined ? "N/A" : data.name;
    const year =            data.year == undefined ? 2022 : data.year;
    const origin =          data.origin == undefined ? "N/A" : data.origin;
    const feature =         data.feature == undefined ? "N/A" : data.feature;
    const imgCaption =      data.image_caption == "" ? "No image caption" : data.image_caption;
    const imgUrl =          data.image_url == "" ? "No image" : data.image_url;
    const description =     data.description == "" ? "N/A" : data.description;
    const bio =             data.bio == "" ? "No bio" : data.bio;
</script>

<div class='card' style="--theme-color:{themeColor}; --theme-light:{themeColorLight}">
    <div class='outer-border'>
        <div class='inner-border'>
            <div class='content'>
                <CardHeader {name} {feature} {origin} {year} {imgCaption} {imgUrl} {themeColor} />
                <CardBody {type} {description} {bio} />
                <CardFooter {type} />
            </div>
        </div>
    </div>
</div>


<style lang="scss">
    .card {
        padding: 0px;
        border: none;
        margin: 0px;
        background-color: var(--card-bg-color);
        border-radius: 16px;
        text-align: center;
        height: fit-content;
        max-width: 350px;
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