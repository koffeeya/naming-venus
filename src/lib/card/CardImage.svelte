<script>
    export let src;
    export let alt;
    export let color;
</script>

{#if !src=="No image"}
    <div class='image-container' alt={alt} style="--theme-color:{color}">
        <img class='card-image' alt={alt} src={src} />
        <span class='image-overlay'></span>
    </div>
{/if}

<style lang="scss">
    .image-container {
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

    .image-overlay {
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
</style>