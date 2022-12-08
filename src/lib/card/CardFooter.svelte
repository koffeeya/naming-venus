<script>
    import Star from "./Star.svelte";
    export let themeColor;
</script>

<div class='footer' style="--theme-color:{themeColor}">
    <div class='circle'>
        <div class='star'>
            <Star fill={themeColor} />
        </div>
    </div>
</div>

<style lang="scss">
    .footer {
        height: fit-content;
        margin: 12px 0px 0px 0px;
    }

    .circle {
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