<script>
    export let modalStyle, themeColor, name, description, bio, searchTerm;
</script>

{#if modalStyle}
<div class='card-body' style="--theme-color:{themeColor}; --theme-opacity:{themeColor}26;">
   <!--  {#if imgUrl!=""}
        <div class='card-image-wrapper'>
            <img class='card-image' alt={imgCaption} src={imgUrl} />
            <p class='card-image-caption'>{imgCaption}</p>
        </div>
    {/if} -->
    <div class='card-description'>
        <p>{description}</p>
    </div>
   <div class='card-bio'>
        <p>{bio}</p>
   </div>
   {#if searchTerm != ""}
        <div class='learn-more'>
                <a href='https://en.wikipedia.org/wiki/{searchTerm}' target="_blank">LEARN MORE</a>
        </div>
   {/if}
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

    .learn-more {
        font-size: 0.75rem;
        letter-spacing: 0.12rem;
        font-weight: 600;
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