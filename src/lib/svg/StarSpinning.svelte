<script>
    export let fill = "white";
    export let width = "25px";
    export let height = "25px";
</script>

<svg class='star-svg-spinning' {width} {height} viewBox="0 0 422 422" {fill} xmlns="http://www.w3.org/2000/svg">
    <path d="M250.969 62.0052L216.512 205.494L360.001 171.037L218.508 212.941L320.092 319.977L213.056 218.392L171.152 359.885L205.609 216.397L62.1205 250.854L203.614 208.95L102.029 101.914L209.065 203.498L250.969 62.0052Z" {fill}/>
    <path d="M170.741 61.4203L212.645 202.913L319.681 101.329L218.096 208.365L359.589 250.269L216.101 215.812L250.557 359.3L208.654 217.807L101.617 319.392L203.202 212.356L61.7091 170.452L205.198 204.909L170.741 61.4203Z" {fill}/>
    <path d="M133.536 77.097L210.633 187.504L287.73 77.097L230.663 199.068L364.827 210.633L230.663 222.198L287.73 344.169L210.633 233.762L133.536 344.169L190.603 222.198L56.439 210.633L190.603 199.068L133.536 77.097Z" {fill}/>
    <path d="M210.194 56.1941L221.759 190.358L343.73 133.291L233.323 210.388L343.73 287.485L221.759 230.419L210.194 364.582L198.63 230.419L76.6581 287.485L187.065 210.388L76.6581 133.291L198.63 190.358L210.194 56.1941Z" {fill}/>
</svg>

<style lang="scss">
    .star-svg-spinning {
        padding: 10px;
    }

    .star-svg-spinning {
        animation: spin 4s linear infinite;
        z-index: 2;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50px;
        height: 50px;
    }

    @-moz-keyframes spin { 
        100% { -moz-transform: rotate(360deg); } 
    }
    @-webkit-keyframes spin { 
        100% { -webkit-transform: rotate(360deg); } 
    }
    @keyframes spin { 
        100% { 
            -webkit-transform: rotate(360deg); 
            transform:rotate(360deg); 
        } 
    }
</style>