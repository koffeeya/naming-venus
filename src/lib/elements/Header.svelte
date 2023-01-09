<script>
    import { activePage, globe, pageTheme } from "../../stores/global";
    import { handlePageChange, getThemeColor } from "../../js/utils";

</script>


<div class='header'>
    <!-- Logo button -->
    <div style="--theme-color:{getThemeColor(pageTheme)};">
        <h1 class='sr-only'>Naming Venus: a data visualization project by Kavya Beheraj</h1>
        <button aria-expanded="false" id='title-button' on:click={e => handlePageChange($activePage, $globe)} on:keypress={e => handlePageChange($activePage, $globe)} >Naming Venus</button>
    </div>
</div>

<style lang="scss">
    #title-button {
        font-family: var(--boecklins);
        font-size: 2rem;
        background-color: black;
        color: white;
        padding: 0.2rem;
        opacity: 80%
    }

    #title-button:hover {
        opacity: 100%;
    }
</style>