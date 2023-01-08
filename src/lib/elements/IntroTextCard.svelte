<script>
    export let cardNumber;
</script>

<div id="card-{cardNumber}" class='card-{cardNumber}'>
    <div class='outer-border'>
        <div class='inner-border'>
            <div class='content'>
                <slot></slot>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .outer-border {
        background-color: var(--card-bg-color);
        border: 1px solid #4f4f4f;
        border-radius: 16px;
        padding: 15px;
        height: 568px;
        width: 318px;
        margin: auto;
    }

    .inner-border {
        border: 1px solid #4f4f4f;
        border-radius: 8px;
        padding: 0px;
        height: 100%;
    }

    .content {
        padding: 20px;
        height: fit-content;
        font-family: var(--gentium);
    }

    .intro-paragraph {
        display: inline-block;
        margin: 0rem 0rem 1.1rem 0rem;
        font-family: var(--gentium);
        line-height: 1.3rem;
        font-size: 1.1rem;
    }
</style>