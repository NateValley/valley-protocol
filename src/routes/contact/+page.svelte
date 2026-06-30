<script lang="ts">
	const emailAddress = 'valdenornathan@gmail.com';

	let copiedEmail = false;
	let copiedResetTimer: ReturnType<typeof setTimeout> | undefined;

	async function copyEmail(event: MouseEvent) {
		event.preventDefault();

		try {
			await navigator.clipboard.writeText(emailAddress);
			copiedEmail = true;

			if (copiedResetTimer) {
				clearTimeout(copiedResetTimer);
			}

			copiedResetTimer = setTimeout(() => {
				copiedEmail = false;
			}, 1800);
		} catch {
			window.location.href = `mailto:${emailAddress}`;
		}
	}
</script>

<div class="page-container">
	<h2 class="panel-header">CONTACT</h2>
	<div class="content-section">
		<div class="contact-content">
			<section class="contact-block intro-section">
				<p class="prompt-line">> want to talk about gameplay systems, tools, or technical game projects?</p>
				<p>
					i'm open to gameplay programming roles, tools development work, and game systems design discussions!
				</p>
			</section>

			<div class="terminal-rule" aria-hidden="true"></div>

			<section class="contact-block contact-methods">
				<h3 class="section-header">> preferred contact</h3>

				<div class="contact-list">
					<div class="contact-item">
						<h4 class="contact-type">email</h4>
						<div class="contact-detail-row">
							<a class="contact-detail" href={`mailto:${emailAddress}`} onclick={copyEmail}>
								[ {emailAddress} ]
							</a>
							{#if copiedEmail}
								<span class="copy-confirmation" role="status">copied!</span>
							{/if}
						</div>
						<p class="contact-note">best for: roles, collaborations, project inquiries</p>
					</div>

					<div class="contact-item">
						<h4 class="contact-type">linkedin</h4>
						<a
							class="contact-detail"
							href="https://www.linkedin.com/in/nathanielvaldenor"
							target="_blank"
							rel="noreferrer"
						>
							[ linkedin.com/in/nathanielvaldenor ]
						</a>
						<p class="contact-note">best for: networking, recruiter follow-ups, career updates</p>
					</div>

					<div class="contact-item">
						<h4 class="contact-type">resume</h4>
						<a class="contact-detail" href="/valley-protocol/resume.pdf">[ download resume.pdf ]</a>
						<p class="contact-note">best for: applications, referrals, quick review</p>
					</div>
				</div>
			</section>

			<div class="terminal-rule" aria-hidden="true"></div>

			<section class="contact-block work-samples">
				<h3 class="section-header">> looking for work samples?</h3>
				<div class="sample-links" aria-label="work sample links">
					<a href="/valley-protocol/">[ projects ]</a>
					<a href="https://github.com/NateValley" target="_blank" rel="noreferrer">[ github ]</a>
					<a href="https://natevalley.itch.io" target="_blank" rel="noreferrer">[ itch.io ]</a>
				</div>
			</section>
		</div>
	</div>
</div>

<style lang="scss">
	@import '../../styles/variables.scss';

	.page-container {
		grid-column: 1 / -1;
		width: 100%;
		max-width: 1600px;
		display: flex;
		flex-direction: column;
	}

	.content-section {
		border: $border;
		border-radius: $radius;
		animation: shimmer 3s ease-in-out infinite;
		padding: clamp(1rem, 2vw, 1.35rem);
		color: $color-mossy;
		height: var(--panel-height);
		overflow: hidden;
		scrollbar-width: thin;
		scrollbar-color: $color-ember transparent;
		--section-heading-gap: clamp(0.55rem, 1.2vh, 0.8rem);

		&::-webkit-scrollbar {
			width: 4px;
			height: 4px;
		}

		&::-webkit-scrollbar-track {
			background: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background: $color-ember;
			border-radius: 2px;
		}

		&::-webkit-scrollbar-button {
			display: none;
		}
	}

	.contact-content {
		width: 100%;
		min-height: 100%;
		display: grid;
		grid-template-rows: minmax(0, 0.65fr) auto minmax(max-content, 1.7fr) auto minmax(0, 0.65fr);
		gap: clamp(0.95rem, 2.25vh, 1.55rem);
	}

	.contact-block {
		margin: 0;

		p {
			line-height: 1.5;
			margin: 0;
		}
	}

	.intro-section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: var(--section-heading-gap);

		.prompt-line {
			color: $color-twilight;
			font-size: clamp(0.95rem, 1.35vw, 1.1rem);
			font-weight: bold;
		}
	}

	.terminal-rule {
		width: 100%;
		border-top: 2px dotted $color-ember;
		opacity: 0.9;
	}

	.section-header {
		color: $color-twilight;
		font-size: clamp(0.95rem, 1.35vw, 1.1rem);
		margin: 0 0 var(--section-heading-gap);
		font-weight: bold;
	}

	.contact-list {
		display: flex;
		flex-direction: column;
		gap: clamp(0.65rem, 1.7vh, 1.05rem);
	}

	.contact-methods {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-block: clamp(0.35rem, 1.25vh, 0.85rem);
	}

	.contact-item {
		min-width: 0;

		.contact-type {
			color: $color-moonlight;
			font-size: 0.82rem;
			font-weight: bold;
			margin: 0 0 clamp(0.15rem, 0.6vh, 0.35rem);
			text-transform: uppercase;
			letter-spacing: 0;
		}

		.contact-detail {
			display: inline-block;
			color: $color-mossy;
			font-size: clamp(0.82rem, 1vw, 0.95rem);
			line-height: 1.35;
			margin-bottom: 0.15rem;
			font-weight: bold;
			overflow-wrap: anywhere;
			word-break: break-word;
			text-decoration: none;

			&:hover,
			&:focus-visible {
				color: $color-moonlight;
				text-shadow: 0 0 5px rgba($color-moonlight, 0.5);
				outline: none;
			}
		}

		.contact-detail-row {
			display: flex;
			flex-wrap: wrap;
			align-items: baseline;
			gap: 0.45rem;
		}

		.copy-confirmation {
			color: $color-dusk;
			font-size: 0.76rem;
			font-style: italic;
			line-height: 1.35;
		}

		.contact-note {
			margin: 0;
			color: $color-fog;
			font-size: 0.76rem;
			line-height: 1.35;
		}
	}

	.sample-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 0.75rem;

		a {
			color: $color-mossy;
			font-size: clamp(0.82rem, 1vw, 0.95rem);
			font-weight: bold;
			text-decoration: none;

			&:hover,
			&:focus-visible {
				color: $color-moonlight;
				text-shadow: 0 0 5px rgba($color-moonlight, 0.5);
				outline: none;
			}
		}
	}

	.work-samples {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	@keyframes shimmer {
		0% { border-color: $color-ember; }
		50% { border-color: lighten($color-ember, 10%); }
		100% { border-color: $color-ember; }
	}

	@media (max-width: 1200px) {
		.content-section {
			height: auto;
			min-height: 40vh;
			overflow-y: visible;
		}

		.contact-content {
			min-height: 40vh;
		}
	}

	@media (max-width: 768px) {
		.content-section {
			height: auto;
			min-height: 35vh;
			padding: 0.85rem;
		}

		.contact-content {
			min-height: 35vh;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			gap: 0.8rem;
		}
	}
</style>
