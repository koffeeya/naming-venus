<script>
    import { getThemeColor, moveGlobeToPoint } from '../../js/utils.js';
    import { pageTheme, data, globe } from '../../stores/global.js'

    // props
    export let cardData;
    export let cardIndex;

    // components
    import CardHeader from './CardHeader.svelte';
    import CardBody from './CardBody.svelte'
    import CardFooter from './CardFooter.svelte'
    import CardModal from './CardModal.svelte';
    
    // data
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

    // state
    /* If the card has image data, then show the modal */
    const showModal = cardData.bio == "" ? false : true;
    let openModal = false;

    // card hover
    function handleCardHover(e) {
        pageTheme.set(type)
        moveGlobeToPoint(id, $data, $globe);
        //showGlobePoints([id], $globe);
    }

    function handleCardClick(e) {
        const allModals = document.querySelectorAll('.modal');
        allModals.innerHTML = "";
        openModal = true;
    }
</script>

<div class='card' on:mouseover='{handleCardHover}' on:focus={handleCardHover} style="--theme-color:{themeColor}; --theme-light:{themeColorLight}" on:click={handleCardClick} tabindex="{cardIndex}">
    <div class='outer-border'>
        <div class='inner-border'>
            <div class='content'>
                <CardHeader {id} {type} {name} {feature} {origin} {year} />
                <CardBody modalStyle={false} {themeColor} {name} {description} {bio} {imgCaption} {imgUrl} />
                <CardFooter {themeColor} />
            </div>
        </div>
    </div>
</div>

{#if openModal==true && showModal==true}
    <CardModal on:close="{() => openModal = false}">
        <!-- Non-interactive card version -->
        <div slot='card' class='modal-card' style="--theme-color:{themeColor}; --theme-light:{themeColorLight}">
            <div class='outer-border'>
                <div class='inner-border'>
                    <div class='content'>
                        <CardHeader {id} {type} {name} {feature} {origin} {year} />
                        <CardBody modalStyle={true} {themeColor} {name} {description} {bio} {imgCaption} {imgUrl} />
                        <CardFooter {themeColor} />
                    </div>
                </div>
            </div>
        </div>
    </CardModal>
{/if}



<style lang="scss">
    /* Regular card */
    .card {
        padding: 0px;
        border: none;
        margin: 5px;
        background-color: var(--card-bg-color);
        opacity: 90%;
        border-radius: 16px;
        height: fit-content;
        text-align: center;
        transform: scale(0.98);
        transition: 0.1s ease-in-out all;
        /* width: clamp(200px, 300px, 300px); */
    }

    .card:hover {
        cursor: pointer;
        opacity: 100%;
        transform: scale(1);
        transition: 0.1s ease-in-out all;
    }


    /* Modal version */
    .modal-card {
        padding: 0px;
        border: none;
        margin: 5px;
        background-color: var(--card-bg-color);
        border-radius: 16px;
        height: fit-content;
        text-align: center;
        transform: scale(0.98);
        transition: 0.1s ease-in-out all;
        /* width: clamp(200px, 300px, 300px); */
    }


    /* Border and content */
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


    /* Modal */
    .card-image {
        max-width: 200px;
    }

    .card-image-caption {
        font-size: 0.8rem;
        color: gray;
    }
</style>