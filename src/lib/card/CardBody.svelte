<script>
    export let modalStyle, themeColor, name, description, bio, searchTerm;
    import tippy from "sveltejs-tippy";

    const descriptionTippyProps = {
        content: "This is the official description from the International Astronomical Union. It may be out of date.",
        allowHTML: true,
        arrow: true
    }
</script>

{#if modalStyle}
<div class='card-body' style="--theme-color:{themeColor}; --theme-opacity:{themeColor}26;">
    <div class='card-description' use:tippy={descriptionTippyProps}>
        <p>{description}</p>
    </div>
   <div class='card-bio'>
        <p class='bio-subtitle'>FROM WIKIPEDIA:</p>
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
        <div class='card-description' use:tippy={descriptionTippyProps}>
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
        line-height: 1.3rem;
        font-size: 1rem;
        max-height: 250px;
        overflow: auto;
        font-family: var(--gentium);
    }

    .bio-subtitle {
        font-size: 0.7rem;
        color: gray;
        letter-spacing: 0.2rem;
        font-family: var(--tragic-grotesk);
        font-weight: 600;
        margin: 0px 0px 2px 0px;
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