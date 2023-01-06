<script>
    import { activePage, globe } from "../../stores/global";
    import { handlePageChange } from "../../js/utils";

</script>


<div class='header'>
    <!-- Logo button -->
    <div>
        <h1 class='sr-only'>Naming Venus: a data visualization project by Kavya Beheraj</h1>
        <button aria-expanded="false" id='title-button' on:click={e => handlePageChange($activePage, $globe)} on:keypress={e => handlePageChange($activePage, $globe)} >Naming Venus</button>
    </div>
</div>


<style lang="scss">
    .header {
		position: sticky;
		top: 0;
		background-color: black;
		z-index: 200;
		display: grid;
		grid-template-columns: 1fr 3fr;
	}

</style>