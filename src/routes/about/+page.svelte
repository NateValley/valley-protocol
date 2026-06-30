<script lang="ts">

</script>

<div class="page-container">
	<h2 class="panel-header">ABOUT ME!</h2>
	<div class="content-section">
		<div class="about-content">
			<div class="intro-section">
				<p class="intro-text">
					> gameplay systems & custom tools programmer
				</p>
				<p>
					i'm <span class="name-highlight">nathaniel berl valdenor</span>, a systems-focused developer committed to creating modular and
					scalable game infrastructures and custom editor tools. i'm extremely passionate about games with a lot of charm that evoke genuine emotions from people.
				</p>
			</div>

			<div class="skills-section">
				<h3 class="section-header">> engine experience</h3>
				<div class="skills-grid">
					<div class="skill-category">
						<h4 class="skill-header">unity (C#)</h4>
						<ul>
							<li>real-time multiplayer networking</li>
							<li>data-driven gameplay logic</li>
							<li>procedural level generation</li>
							<li>entity component system integration</li>
							<li>character state machines</li>
							<li>runtime debug interfaces</li>
						</ul>
					</div>
					<div class="skill-category">
						<h4 class="skill-header">unreal engine 5 (Blueprints)</h4>
						<ul>
							<li>data table automation</li>
							<li>runtime character customization UI</li>
							<li>editor utility widgets</li>
							<li>save/load tooling</li>
						</ul>
					</div>
					<div class="skill-category">
						<h4 class="skill-header">godot (gdscript)</h4>
						<ul>
							<li>signal-based architecture</li>
							<li>procedural spawning systems</li>
							<li>save/load tooling</li>
							<li>runtime debug interfaces</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="philosophy-section">
				<h3 class="section-header">> why game development?</h3>
				<p>
					one of my favorite things in life is experiencing real and meaningful feelings from art.
					because of this, i pursued a career in game development, as i believe the immersion we find in video games has the infinite potential to pull any feelings from the entire human range of emotions.
					now, i aspire to work on and create games as outlets for people to experience those emotions, but my ultimate goal is to give back to the gaming industry in my own way: with stories, memories, and experiences that inspire me.
					my ideal position is one where i can accomplish that mission whilst bringing people together through my work.
				</p>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import '../../styles/variables.scss';

	.page-container {
		grid-column: 1 / -1; // Span across all grid columns in route-content
		width: 100%;
		max-width: 1600px; // Match route-content max-width
		display: flex;
		flex-direction: column;
	}

	.content-section {
		border: $border;
		border-radius: $radius;
		animation: shimmer 3s ease-in-out infinite;
		padding: clamp(0.85rem, 2vw, 1.15rem);
		color: $color-mossy;
		height: var(--panel-height);
		overflow-y: hidden;
		scrollbar-width: thin;
		scrollbar-color: $color-ember transparent;
		
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

	.about-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: clamp(0.9rem, 2vh, 1.4rem);
		min-height: 100%;
	}

	.intro-section,
	.skills-section,
	.philosophy-section {
		flex: 0 0 auto;
	}

	.intro-section {
		margin-bottom: 0;

		.intro-text {
			color: $color-twilight;
			font-weight: bold;
			margin-bottom: 0.65rem;
			font-size: clamp(1rem, 1.5vw, 1.125rem);
		}

		p {
			font-size: 0.98rem;
			line-height: 1.55;
			margin-bottom: 0;
		}
	}

	.name-highlight {
		color: $color-moonlight;
		font-weight: bold;
	}

	.section-header {
		color: $color-twilight;
		font-size: clamp(1rem, 1.5vw, 1.125rem);
		margin: 0 0 0.75rem;
		font-weight: bold;
	}

	.skills-section {
		border-top: 2px dotted $color-ember;
		padding-top: 0.95rem;
		margin-bottom: 0;

		.skills-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
			gap: 1rem;
			margin-top: 0.75rem;

			@media (max-width: 768px) {
				grid-template-columns: 1fr;
				gap: 1rem;
			}
		}

		.skill-category {
			.skill-header {
				color: $color-moonlight;
				font-size: 0.85rem;
				font-weight: bold;
				margin: 0 0 0.35rem;
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}

			ul {
				list-style: none;
				padding: 0;
				margin: 0;

				li {
					margin-bottom: 0.15rem;
					font-size: 0.86rem;
					line-height: 1.42;
					color: $color-mossy;

					&::before {
						content: '> ';
						color: $color-ember;
						margin-right: 0.25rem;
					}
				}
			}
		}
	}

	.philosophy-section {
		border-top: 2px dotted $color-ember;
		padding-top: 0.95rem;

		p {
			font-size: 0.98rem;
			line-height: 1.55;
			margin-bottom: 0;
		}
	}

	@keyframes shimmer {
		0% { border-color: $color-ember; }
		50% { border-color: lighten($color-ember, 10%); }
		100% { border-color: $color-ember; }
	}

	@media (max-width: 1200px) {
		.about-content {
			justify-content: flex-start;
		}

		.intro-section,
		.skills-section,
		.philosophy-section {
			flex: initial;
		}

		.content-section {
			height: auto;
			min-height: 40vh;
			overflow-y: auto;
		}
	}

	@media (max-width: 768px) {
		.content-section {
			height: auto;
			min-height: 35vh;
			padding: 1rem;
		}

		.skills-grid {
			gap: 1rem;
		}
	}
</style>
