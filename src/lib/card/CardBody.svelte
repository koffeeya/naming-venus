<script>
    export let modalStyle, themeColor, name, description, bio, imgCaption, imgUrl;

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

{#if modalStyle}
<div class='card-body' style="--theme-color:{themeColor}; --theme-opacity:{themeColor}26;">
    {#if imgUrl!=""}
        <div class='card-image-wrapper'>
            <img class='card-image' alt={imgCaption} src={imgUrl} />
            <p class='card-image-caption'>{imgCaption}</p>
        </div>
    {/if}
    <div class='card-description'>
        <p>{description}</p>
    </div>
   <div class='card-bio'>
        <p>{bio}</p>
   </div>
</div>
{:else}
    <div class='card-body' style="--theme-color:{themeColor}; --theme-opacity:{themeColor}26;">
        <div class='card-description'>
            <p>{description}</p>
        </div>
    </div>
{/if}

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
        margin: 1.3rem;
        line-height: 1.25rem;
        font-size: 1rem;
        max-height: 200px;
        overflow: auto;
        font-family: var(--gentium);
    }

    /* IMAGE */
    .card-image {
        max-height: 75px;
        border-radius: 50%;
        margin: 0.5rem 0rem 0rem 0rem;
    }
    
    .card-image-caption {
        font-size: 0.7rem;
        color: gray;
        margin: auto;
        line-height: 0.8rem;
        max-width: 75%;
    }
</style>