<!-- https://svelte.dev/examples/modal -->
<script>
	import { createEventDispatcher, onDestroy} from 'svelte';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');
    let modal;

	const handle_keydown = e => {
		if (e.key === 'Escape') {
			close();
			return;
		}

		if (e.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*');
			const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0);

			let index = tabbable.indexOf(document.activeElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			tabbable[index].focus();
			e.preventDefault();
		}
	};

	const previously_focused = typeof document !== 'undefined' && document.activeElement;

	if (previously_focused) {
		onDestroy(() => {
			previously_focused.focus();
		});
	}

    onDestroy(() => {
		const allModals = document.querySelectorAll('.modal');
        allModals.innerHTML = "";
        close();
	});
</script>

<svelte:window on:keydown={handle_keydown}/>

<div class="modal-background" on:click={close}></div>

<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
    <!-- svelte-ignore a11y-autofocus -->
    <div class='modal-button-wrapper'>
        <button class='modal-close-button' autofocus on:click={close}>close</button>
    </div>
    <slot name="card" class="card-slot"></slot>
</div>

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.3);
	}

	.modal {
		position: absolute;
		left: 50%;
		top: 50%;
		width: calc(100vw - 4em);
		max-width: 22em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		transform: translate(-50%,-50%);
		padding: 1em;
		border-radius: 0.2em;
		background: #000000cc;
        z-index: 300;
        border: 1px solid #000000;
	}

    .modal-button-wrapper {
        display: flex;
        justify-content: right;
    }

	.modal-close-button {
        border: none;
        text-decoration: none;
        font-family: var(--tragic-grotesk);
        cursor: pointer;
        text-align: center;
		display: block;
        background-color: transparent;
        color: white;
        opacity: 75%;
	}

    .modal-close-button:hover {
        opacity: 100%;
	}
</style>