<script>
    export let themeColor, name, description, bio;

    function shortenBio(bio) {
        if (bio.length > 0) {
            const split = bio.split(" ")
            const keep = split.slice(0, 8)
            keep.push("...")
            const join = keep.join(" ")
            return join;
        } else {
            return bio;
        }
    }
</script>

<div class='card-body' style="--theme-color:{themeColor}; --theme-opacity:{themeColor}26;">
    <div class='card-description'>
        <p>{description}</p>
    </div>
    <!-- {#if bio.length > 0}
        <div class='card-bio'>
            <p>Learn more...</p>
        </div>
    {/if}   --> 
</div>

<style lang="scss">
    .card-body {
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
        padding:  6px 6px 3px 6px;
        margin: 5% auto;
        border-radius: 8px;
        font-weight: 500;
    }

    .card-bio {
        margin: 5% 10%;
        line-height: 100%;
        font-size: 1rem;

        /* p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        } */
    }
</style>