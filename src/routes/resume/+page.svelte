<script lang="ts">

</script>

<div class="page-container">
	<h2 class="panel-header">RESUME</h2>
	<div class="content-section">
		<div class="resume-content">
			<div class="section experience-section">
				<h3 class="section-header">> professional experience</h3>

				<div class="experience-item">
					<div class="experience-header">
						<h4 class="role">UE 5 programmer (intern)</h4>
						<span class="company">AniLu Studios</span>
						<span class="period">jan 2026 - june 2026</span>
					</div>
					<ul class="responsibilities">
						<li>developed UE5 custom editor tools for PBA Court Kings, an officially licensed video game of the Philippine Basketball Association</li>
						<li>implemented a runtime morph customization widget for modifying character model proportions per player across team rosters</li>
					</ul>
				</div>

				<div class="experience-item">
					<div class="experience-header">
						<h4 class="role">lead programmer</h4>
						<span class="company">Buffalo Barnyard</span>
						<span class="period">jan 2025 - present</span>
					</div>
					<ul class="responsibilities">
						<li>implemented multiplayer systems including lobby creation, RPC-based synchronization, and replicated player cosmetics using Photon PUN 2</li>
						<li>designed customer AI with NavMesh pathfinding and state machines</li>
						<li>developed modular player systems and supported production tasks</li>
						<li>architected database-backed systems for player-color cosmetics and randomized orders, fully synced between clients</li>
					</ul>
				</div>

				<div class="experience-item">
					<div class="experience-header">
						<h4 class="role">custom tooling programmer</h4>
						<span class="company">Super Cloud Sourced Team</span>
						<span class="period">jan 2025 - june 2025</span>
					</div>
					<ul class="responsibilities">
						<li>built a modular post management tool with ScriptableObjects, supporting updates via CSV and folder import</li>
						<li>wrote Unity Editor extensions for batch asset population with custom inspectors</li>
						<li>implemented a mission unlock system and prefab-driven social media post behavior with a designer-friendly workflow</li>
					</ul>
				</div>

			</div>

			<div class="section education-section">
				<h3 class="section-header">> education</h3>
				<div class="education-item">
					<div class="education-header">
						<h4 class="degree">B.S. Computer Science: Computer Game Design</h4>
						<span class="institution">University of California, Santa Cruz</span>
						<span class="year">june 2025</span>
					</div>
				</div>
			</div>

			<div class="section technical-section">
				<h3 class="section-header">> technical proficiencies</h3>
				<div class="tech-grid">
					<div class="tech-category">
						<h4 class="tech-header">programming languages</h4>
						<p class="tech-list">c++, c#, gdscript, blueprints, svelte, python, typescript</p>
					</div>
					<div class="tech-category">
						<h4 class="tech-header">game engines</h4>
						<p class="tech-list">unity, unreal engine, godot</p>
					</div>
					<div class="tech-category">
						<h4 class="tech-header">specializations</h4>
						<p class="tech-list">gameplay programming, custom tools development, multiplayer systems, game AI behaviors</p>
					</div>
					<div class="tech-category">
						<h4 class="tech-header">tools</h4>
						<p class="tech-list">Visual Studio Code, GitHub, PlasticSCM, Photon PUN 2</p>
					</div>
				</div>
			</div>
		</div>

		<div class="resume-footer">
			<p class="footer-note">
				> for more projects and detailed project breakdowns, see projects page!
			</p>
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
		padding: clamp(1rem, 2.5vw, 1.5rem);
		color: $color-mossy;
		height: var(--panel-height);
		overflow-y: auto;
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

	.section {
		margin-bottom: 2rem;

		& + .section {
			border-top: 2px dotted $color-ember;
			padding-top: 1.25rem;
		}

		&:last-of-type {
			margin-bottom: 1rem;
		}
	}

	.section-header {
		color: $color-twilight;
		font-size: clamp(1rem, 1.5vw, 1.125rem);
		margin-bottom: 1rem;
		font-weight: bold;
	}

	.experience-item, .education-item {
		margin-bottom: 1.5rem;
		padding-left: 1rem;
		border-left: 3px solid rgba($color-ember, 0.3);

		&:last-of-type {
			margin-bottom: 0;
		}
	}

	.experience-header, .education-header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.5rem;

		@media (max-width: 768px) {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.25rem;
		}
	}

	.role, .degree {
		color: $color-moonlight;
		font-weight: bold;
		font-size: clamp(0.9rem, 1.2vw, 1rem);
		text-transform: uppercase;
	}

	.company, .institution {
		color: $color-ember;
		font-size: 0.875rem;
	}

	.period, .year {
		color: $color-fog;
		font-size: 0.875rem;
		margin-left: auto;

		@media (max-width: 768px) {
			margin-left: 0;
		}
	}

	.responsibilities {
		list-style: none;
		padding: 0;
		margin: 0;

		li {
			margin-bottom: 0.25rem;
			font-size: 0.875rem;
			color: $color-mossy;

			&::before {
				content: '> ';
				color: $color-mossy;
				margin-right: 0.25rem;
			}
		}
	}

	.tech-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;

		@media (max-width: 768px) {
			grid-template-columns: 1fr;
		}
	}

	.tech-category {
		.tech-header {
			color: $color-moonlight;
			font-size: 0.875rem;
			font-weight: bold;
			margin-bottom: 0.25rem;
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}

		.tech-list {
			color: $color-mossy;
			font-size: 0.875rem;
			margin: 0;
		}
	}

	.resume-footer {
		border-top: 2px dotted $color-ember;
		padding-top: 1rem;
		margin-top: 1rem;

		.footer-note {
			color: $color-dusk;
			font-size: 0.875rem;
			font-style: italic;
			margin: 0;
		}
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
		}
	}

	@media (max-width: 768px) {
		.content-section {
			height: auto;
			min-height: 35vh;
			padding: 1rem;
		}
	}
</style>
