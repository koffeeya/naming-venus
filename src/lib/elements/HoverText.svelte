<script>
    export let text;
    export let tooltip = null;
    export let color = "white";
    export let align = "center";
    export let link = null;
    import tippy from "sveltejs-tippy";

    const props = {
        content: tooltip,
        allowHTML: true,
        arrow: true
    }
</script>

{#if tooltip == null}
    <span class='hover-text' style="--theme-color:{color}; display: flex; justify-content: {align};">
        <p class='hover-button'>{text}</p>
    </span>
{:else}
    <span class='hover-text' style="--theme-color:{color}; display: flex; justify-content: {align};">
        <p class='hover-button' use:tippy={props} title={text}>{text}</p>
    </span>
{/if}


<style lang="scss">
    .hover-button {
        text-transform: uppercase;
        font-family: "TragicGrotesk", sans-serif;
        background-color: transparent;
        border: none;
        color: var(--theme-color);
        text-decoration: underline dashed var(--theme-color) 1px;
        text-underline-position: under;
        width: fit-content;
        margin: 0px;
        border-radius: 2px;
    }

    .hover-button:hover {
        cursor: pointer;
        color: white;
        text-decoration: underline dashed white 1px;
    }

    :global(.tooltip) {
        background-color: var(--theme-color);
    }
</style>