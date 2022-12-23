<script>
    export let themeFill = "white"
    export let themeBg = "#181818"
</script>

<svg class="venus-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
    <circle id="border" cx="9" cy="9" r="8" fill={themeBg} stroke={themeFill} stroke-width="1.2"/>
    <path id="big-blob" d="M3.15 9.8998L0.900004 8.0998C0.450003 8.9998 0.900005 11.2498 1.35 12.5998C1.81938 14.008 2.85 14.2498 3.6 14.8498L4.95 15.7498H6.3L7.65 15.2998L9 14.3998H9.9L10.8 14.8498L12.6 13.9498V13.0498L13.95 12.5998L14.4 11.6998V10.3498L14.85 9.4498V7.6498L13.5 6.2998L12.6 4.4998L11.25 4.0498H9.9L9.45 4.9498V6.2998L10.35 7.6498L10.8 8.5498V9.4498L9.45 9.8998H8.1L6.3 11.6998H4.5L3.15 9.8998Z" fill={themeFill}/>
    <path id="left-blob" d="M3.6 6.1201L3.96 5.4001L4.68 4.6801L5.4 3.9601L6.84 3.6001L7.47 4.6801L6.84 5.4001L6.48 6.1201H5.76V6.4801V6.8401V7.9201H4.32L3.6 7.5601V6.4801V6.1201Z" fill={themeFill}/>
    </g>
</svg>

<style lang="scss">
    .venus-icon {
        margin: auto;
        opacity: 75%;
    }

    .venus-icon:hover {
        cursor: pointer;
        opacity: 100%;
    }
</style>