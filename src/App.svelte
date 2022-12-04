<script>
	import Globe from "./lib/globe/Globe.svelte";
	export let name;
</script>

<main>
	<Globe />
</main>

<style lang="scss">
	\:global {
		@import "scss/style.scss";
	}

	/* @media (min-width: 640px) {
		main {
			max-width: none;
		}
	} */
</style>