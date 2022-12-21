<script>
    export let text;
    export let tooltip;
    export let color;
    export let align;
    import tippy from "sveltejs-tippy";

    const props = {
        content: tooltip,
        allowHTML: true,
        arrow: true
    }
</script>

<div class='hover-text' style="--theme-color:{color};">
    <button class='hover-button' style="text-align: {align};" use:tippy={props} title={text}>{text}</button>
</div>

<style lang="scss">
    button {
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

        &:hover {
            cursor: pointer;
            color: white;
            text-decoration: underline dashed white 1px;
        }
    }

    :global(.tooltip) {
        background-color: var(--theme-color);
    }
</style>