<script>
    export let themeColor, name, description, bio;
</script>

<div class='card-body' style="--theme-color:{themeColor}; --theme-opacity:{themeColor}26;">
    <div class='card-name'>
        <h3>{name}</h3>
    </div>
    <div class='card-description'>
        <p>{description}</p>
    </div>
    <div class='card-bio'>
        <p>{bio}</p>
    </div>
</div>

<style lang="scss">
    .card-body {
        padding: 0px;
        height: fit-content;
    }

    .card-name {
        font-family: var(--boecklins);
        padding: 16% 2% 2% 2%;
        color: var(--theme-color);
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
        font-size: 1rem;
        /* display: block; */
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;

        p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
</style>