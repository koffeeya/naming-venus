<script>
    export let text;
    export let tooltip;
    export let color;
    import tippy from "sveltejs-tippy";

    const props = {
        content: tooltip,
        allowHTML: true,
        arrow: true
    }
</script>

<div class='hover-text' style="--theme-color:{color}">
    <button class='hover-button' use:tippy={props} title={text}>{text}</button>
</div>

<style lang="scss">
    button {
        background-color: transparent;
        border: none;
        color: var(--theme-color);
        text-decoration: underline dashed var(--theme-color) 1px;
        text-underline-position: under;
        text-align: left;
        width: fit-content;
        padding: 0px 2px;
        border-radius: 2px;

        &:hover {
            cursor: pointer;
            background-color: var(--theme-color);
            color: white;
            text-decoration: none;
        }
    }

    :global(.tooltip) {
        background-color: var(--theme-color);
    }
</style>