<script lang="ts">
	export let tag: string;
	export let isActive: boolean;
	export let toggle: (tag: string) => void;
</script>

<button
	class="tag-toggle {isActive ? 'active' : ''}"
	onclick={() => toggle(tag)}
>
	<span class="label">&gt; {tag.toLowerCase()}</span>
	<span class="state">[{isActive ? 'x' : ' '}]</span>
</button>

<style lang="scss">
	@import '../styles/variables.scss';

	.tag-toggle {
		display: flex;
		justify-content: space-between;
		text-align: left;

		width: 100%;
		min-width: 0;
		max-width: 100%;
		gap: 1.25rem;

		border: 1px solid transparent;
		border-radius: $radius;
		background: transparent;
		color: $color-mossy;
		font-family: $font-family;
		font-size: 0.85rem;
		cursor: pointer;
		transition: box-shadow 0.2s ease, background $transition, color $transition;
		
		&:hover {
			color: $color-moonlight;
			text-shadow: 0 0 5px $color-moonlight;
		}

		&.active {
			color: $color-dusk;

			&:hover {
				color: $color-twilight;
				text-shadow: 0 0 5px $color-twilight;
			}
		}
	}

	.label {
		min-width: 0;
		overflow-wrap: anywhere;
	}

	.state {
		flex: 0 0 auto;
	}
</style>
