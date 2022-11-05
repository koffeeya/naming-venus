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
</script>

<div class='card' style="--theme-color:{themeColor(data.type, false)}; --theme-opacity:{themeColor(data.type, true)}">
    <div class='card-outer-border'>
        <div class='card-inner-border'>
            <div class='card-content'>
                <div class='card-header'>
                    <div class='card-name'>
                        <h3>{data.name}</h3>
                    </div>
                    <div class='card-category-group'>
                        <p class='card-category card-feature'>{data.feature.toString().toUpperCase()}</p>
                        <p class='card-category card-origin'>{data.origin.toString().toUpperCase()}</p>
                        <p class='card-category card-year'>{data.year.toString().toUpperCase()}</p>
                    </div>
                </div>

                <div class='card-body'>
                    <div class='card-description'>
                        <p>{data.description}</p>
                    </div>

                    <div class='card-detail'>
                        <p>{data.source}</p>
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
        background-color: #181818;
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

    .card-content {
        padding: 0px;
        height: fit-content;
    }

    .card-header {
        border-bottom: 1px solid var(--theme-color);
        
    }

    .card-name {
        font-family: 'Boecklins Universe', sans-serif;
        padding: 5% 2% 2% 2%;
    }

    .card-category-group {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 0% 0% 5% 0%;
        width: 100%;
    }

    .card-category {
        font-size: 0.8rem;
        font-weight: 500;
        color: #9B9B9B;
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

    .card-detail {
        font-family: "TragicGrotesk", sans-serif;
        margin: 5% 10%;
        line-height: 80%;
        font-size: 1.5rem;
    }

    .card-footer {
        height: fit-content;
        margin: 12px 0px 0px 0px;
    }

    .card-circle {
        width: 100px;
        height: 50px;
        border: 1px solid var(--theme-color);
        border-bottom: 1px solid #181818;
        border-radius: 100px 100px 0 0;
        background-color: #181818;
        transform: translateY(13px);
        margin: auto;
    }

</style>