<script>
    import { parseValue } from "../../js/utils";
    import tippy from "sveltejs-tippy";

    export let width;
    export let variable;
    export let value;
    export let tippyProps;
    export let bgColor;
</script>

<div
    class='value-bar' 
    id='bar-{variable}-{parseValue(value)}'
    style='width: {width}%;
    background-color: {bgColor}'
    use:tippy={tippyProps}
    >
</div>

<style lang="scss">
     .value-bar {
        transition: 0.2s ease-in-out all;
        height: 0.7rem;
        margin: 0px;
        opacity: 80%;
        -webkit-box-shadow:inset 0px 0px 0px 0.5px #000;
        -moz-box-shadow:inset 0px 0px 0px 0.5px #000;
        box-shadow:inset 0px 0px 0px 0.5px #000;
        font-size: 0.5rem;

    }
</style>
