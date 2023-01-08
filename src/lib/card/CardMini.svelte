<script>
    import { getThemeColor } from '../../js/utils';
    export let type;

    // Card components
    import Star from '../svg/Star.svelte';
    
    // Data
    const themeColor =      type == undefined ? getThemeColor("default") : getThemeColor(type);
    const themeColorLight = type == undefined ? getThemeColor("default", 15) : getThemeColor(type, 15);
</script>

<div class='card-mini' style="--theme-color:{themeColor}; --theme-light:{themeColorLight}" >
    <div class='outer-border'>
        <div class='inner-border'>
            <div class='content'>
                <Star fill={themeColor} />
            </div>
        </div>
    </div>
</div>


<style lang="scss">
    .card-mini {
        padding: 0px;
        border: none;
        margin: 5px;
        background-color: var(--card-bg-color);
        opacity: 90%;
        border-radius: 16px;
        height: fit-content;
        text-align: center;
        transform: scale(0.98);
        transition: 0.1s ease-in-out all;
    }

    .card-mini:hover {
        cursor: pointer;
        opacity: 100%;
        transform: scale(1);
        transition: 0.1s ease-in-out all;
    }

    .outer-border {
        border: 1px solid var(--theme-color);
        border-radius: 16px;
        padding: 10px;
        margin: 0px;
        min-height: fit-content;
        height: 100%; 
    }

    .inner-border {
        border: 1px solid var(--theme-color);
        border-radius: 8px;
        padding: 0px;
        height: 100%;
    }

    .content {
        padding: 0px;
        height: fit-content; 
    }
</style>