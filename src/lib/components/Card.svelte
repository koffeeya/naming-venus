<script>
    export let data;
    import Star from "./Star.svelte";

    function themeColor(type, transparent){
        const typeMap = {
            "Goddess": "#D7A954",
            "Heroine": "#8AB67B",
            "First Name": "#6CB4CC",
            "Famous Woman": "#C97889",
            "Other": "#9B9B9B"
        }

        if (transparent == true) {
            return `${typeMap[type]}26`;
        } else if (transparent == false) {
            return typeMap[type]
        }
    }

    const type = data.type.toLowerCase().replace(" ", "-");
    const year = `year-${data.year}`;
    const origin = data.origin.toLowerCase().replace(" ", "-")
    const feature = data.feature.replace(" ", "-")
    const short_bio = data.bio.split(" ").slice(0, 35).join(" ")
</script>

<div class='card {type} {year} {origin} {feature}' style="--theme-color:{themeColor(data.type, false)}; --theme-opacity:{themeColor(data.type, true)}">
    <div class='card-outer-border'>
        <div class='card-inner-border'>
            <div class='card-content'>
                <div class='card-header'>
                    {#if !data.image_url}
                        <div class='card-name'>
                            <h3>{data.name}</h3>
                        </div>
                        <div class='card-category-group'>
                            <p class='card-category card-feature'>{data.feature.toString().toUpperCase()}</p>
                            <p class='card-category card-origin'>{data.origin.toString().toUpperCase()}</p>
                            <p class='card-category card-year'>{data.year.toString().toUpperCase()}</p>
                        </div>
                    {:else}
                        <div class='card-category-group-image'>
                            <p class='card-category card-feature'>{data.feature.toString().toUpperCase()}</p>
                            <div></div>
                            <p class='card-category card-year'>{data.origin.toString().toUpperCase()}<br>{data.year.toString().toUpperCase()}</p>
                            <div class='card-image-container' alt={data.image_caption}>
                                <img class='card-image' alt={data.image_caption} src={data.image_url} />
                                <span class='card-image-overlay'></span>
                            </div>
                        </div>
                    {/if}
                </div>

                <div class='card-body'>
                    {#if data.image_url}
                        <div class='card-name-image'>
                            <h3>{data.name}</h3>
                        </div>
                    {/if}
                    <div class='card-description'>
                        <p>{data.description}</p>
                    </div>

                    <div class='card-bio'>
                        <p>{data.bio}</p>
                    </div>
                </div>
                
            </div>
            <div class='card-footer'>
                <div class='card-circle'>
                    <div class='card-star'>
                        <Star fill={themeColor(data.type, false)} />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<style>

    
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

    .card-outer-border {
        border: 1px solid var(--theme-color);
        border-radius: 16px;
        padding: 10px;
        margin: 0px;
        min-height: fit-content;
        height: 100%;
    }

    .card-inner-border {
        border: 1px solid var(--theme-color);
        border-radius: 8px;
        padding: 0px;
        height: 100%;
    }

    .card-header {
        border-bottom: 1px solid var(--theme-color);
    }

    .card-name {
        font-family: var(--boecklins);
        padding: 5% 2% 2% 2%;
        color: var(--theme-color);
    }

    .card-name-image {
        font-family: var(--boecklins);
        padding: 16% 2% 2% 2%;
        color: var(--theme-color);
    }

    .card-category-group {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 0% 0% 5% 0%;
        width: 100%;
    }

    .card-category-group-image {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 8% 0%;
        width: 100%;
    }

    .card-category {
        font-size: 0.8rem;
        font-weight: 500;
        color: var(--font-gray);
        letter-spacing: 0.04rem;
        margin: auto 5%;
        padding: 2% 3%;
        line-height: 0.8rem;
    }

    .card-feature {
        text-decoration: underline dashed var(--theme-color) 1px;
        text-underline-position: under;
        text-align: left;
        width: fit-content;
        border-radius: 2px;
    }

    .card-feature:hover {
        text-decoration: none;
        background-color: var(--theme-color);
        color: white;

    }

    .card-year {
        text-align: right;
    }

    /* CARD IMAGE */
    .card-image-container {
        display: flex;
        justify-content: center;
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 125px;
        margin: 0 5.7%;
        overflow: hidden;
        border: 1px solid var(--theme-color);
        background-color: white;
    }

    .card-image {
        filter: grayscale(1) contrast(1.15);
        height: 100%;
        margin: auto;
    }

    .card-image-overlay {
        background: var(--theme-color);
        bottom: 0;
        display: block;
        left: 0;
        opacity: 5%;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
    }


    /* CARD TEXT */
    .card-content {
        padding: 0px;
        height: fit-content;
    }

    .card-description {
        background-color: var(--theme-opacity);
        color: var(--theme-color);
        font-size: 1rem;
        line-height: 125%;
        width: fit-content;
        max-width: 70%;
        padding: 0.3em 0.6em 0.1em 0.6em;
        margin: 5% auto;
        border-radius: 8px;
        font-weight: 500;
    }

    .card-bio {
        font-family: var(--tragic-grotesk);
        margin: 5% 10%;
        line-height: 80%;
        font-size: 1.5rem;
        /* display: block; */
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
    }

    .card-bio>p{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .card-footer {
        height: fit-content;
        margin: 12px 0px 0px 0px;
    }

    .card-circle {
        width: 100px;
        height: 50px;
        border: 1px solid var(--theme-color);
        border-bottom: 1px solid var(--card-bg-color);
        border-radius: 100px 100px 0 0;
        background-color: var(--card-bg-color);
        transform: translateY(12.5px);
        margin: auto;
    }

</style>