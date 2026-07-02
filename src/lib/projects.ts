export interface Project {
	title: string;
	summary: string;
	logs: Log[];
	tags: string[],
	previewMedia: MediaItem[],
	links: ProjectLink[],
	role: string;
	builtWith: string;
	team: string;
	media: MediaItem[]
}

interface Log {
	tag: string;
	subheader: string;
	description: string;
}

interface MediaItem {
	url: string;
	header: string;
}

interface ProjectLink {
	label: string;
	url: string;
}

export const projects: Project[] = [
	{
		title: 'PBA Court Kings',
		summary: 'an officially licensed game where i developed runtime character customization tools and editor workflows.',
		logs: [
			// #region Tools Programming
			{
				tag: 'tools',
				subheader: 'runtime morph customization widget',
				description: 'implemented a runtime widget for modifying character model proportions per player across team rosters'
			},
			{
				tag: 'tools',
				subheader: 'editor utility data workflow',
				description: 'developed an editor-facing workflow that reads saved morph values and applies them to the corresponding player data table row'
			},
			{
				tag: 'tools',
				subheader: 'data table persistence pipeline',
				description: 'connected in-game character tuning with production roster data, allowing tested morph values to persist beyond runtime'
			},
			{
				tag: 'tools',
				subheader: 'designer-facing tuning workflow',
				description: 'created a workflow for previewing character proportion changes in-game before saving them back into editable roster data'
			},
			// #endregion

			// #region Systems Design
			{
				tag: 'systems design',
				subheader: 'character customization architecture',
				description: 'structured the morph customization flow across runtime preview, saved transfer data, and editor-side roster updates'
			},
			{
				tag: 'systems design',
				subheader: 'per-player morph value mapping',
				description: 'designed how morph values are associated with individual players, supporting roster-specific customization across teams'
			},
			{
				tag: 'systems design',
				subheader: 'runtime-to-editor data handoff',
				description: 'defined the handoff between runtime testing and editor persistence so character data could move cleanly between gameplay preview and production assets'
			},
			// #endregion

			// #region Gameplay
			{
				tag: 'gameplay',
				subheader: 'in-game character preview support',
				description: 'supported runtime character customization by allowing player model proportions to be adjusted and reviewed directly in-game'
			},
			{
				tag: 'gameplay',
				subheader: 'roster character tuning',
				description: 'enabled character appearance tuning across individual players in team rosters, helping align in-game models with desired player data'
			},
			// #endregion

			// #region Misc.
			{
				tag: 'misc.',
				subheader: 'licensed sports game development',
				description: 'contributed programming work to PBA Court Kings, the officially licensed video game of the Philippine Basketball Association'
			},
			{
				tag: 'misc.',
				subheader: 'technical documentation support',
				description: 'documented tool usage and workflow expectations to support future use by team members'
			}
			// #endregion
		],
		tags: ['systems design', 'gameplay', 'tools'],
		previewMedia: [
			{ header: 'PBA Court Kings trailer', url: 'https://www.youtube.com/watch?v=2iqJAw5diuo' }
		],
		links: [
			{ label: 'google play page', url: 'https://play.google.com/store/apps/details?id=com.AniluStudios.PBACourtKings&hl=en_US' }
		],
		role: 'UE5 programmer intern',
		builtWith: 'unreal engine 5, blueprints, editor utility widgets, data tables',
		team: 'AniLu Studios',
		media: [
			{ header: 'body morph customization runtime widget', url: '/media/pba/adjust.gif'}
		]
	},
	{
		title: 'AstraNautical',
		summary: 'a game jam dungeon-crawling spellcasting game where i built modular rune-based spellcasting and walker-based procedural level generation.',
		logs: [
			// #region Systems Design
			{
				tag: 'systems design',
				subheader: 'modular spellcasting architecture',
				description: 'designed and implemented a spellcasting system where drag-and-drop firefly runes form spell combinations based on slot patterns'
			},
			{
				tag: 'systems design',
				subheader: 'rune combo pattern logic',
				description: 'created logic for detecting rune arrangements and resolving them into spell outcomes, allowing spells to be built from modular input patterns'
			},
			{
				tag: 'systems design',
				subheader: 'sequential depth structure',
				description: 'structured procedural levels as sequential depths, supporting a dungeon-like progression flow across generated areas'
			},
			// #endregion

			// #region Gameplay Programming
			{
				tag: 'gameplay',
				subheader: 'drag-and-drop rune interface',
				description: 'built the player-facing drag-and-drop interaction flow for placing firefly runes into spell slots'
			},
			{
				tag: 'gameplay',
				subheader: 'spell input and casting flow',
				description: 'connected rune placement, combo detection, and spell activation into a complete gameplay loop for creating and casting spells'
			},
			{
				tag: 'gameplay',
				subheader: 'procedural level generation',
				description: 'implemented a walker-based dungeon generation system to create playable level layouts during the game jam'
			},
			// #endregion

			// #region Tools Programming
			{
				tag: 'tools',
				subheader: 'configurable generation parameters',
				description: 'created adjustable parameters for procedural generation, allowing level depth layouts to be tuned and tested quickly during development'
			},
			{
				tag: 'tools',
				subheader: 'rapid testing and debugging workflow',
				description: 'handled frequent debugging and playtesting as the main programmer, iterating on spell behavior, rune interactions, and generated level layouts'
			}
			// #endregion
		],
		tags: ['systems design', 'gameplay', 'tools'],
		previewMedia: [],
		links: [
			{ label: 'itch.io page', url: 'https://natevalley.itch.io/astranautical' }
		],
		role: 'main programmer, QA tester',
		builtWith: 'unity',
		team: 'Uni Jam 2025 Team',
		media: [
			{ header: 'AstraNautical gameplay', url: '/media/astranautical/ANgameplay.gif' },
		]
	},
	{
		title: 'Pawfee Bean',
		summary: 'a multiplayer cafe management game where i led programming work across customer systems, networking, and gameplay.',
		logs: [
			// #region Systems Design
			{
				tag: 'systems design',
				subheader: 'order + serving phase architecture',
				description: 'designed the customer order interaction flow, syncing table seating, orders, and serving logic across clients in a multiplayer setting'
			},
			{
				tag: 'systems design',
				subheader: 'customer behavior state machine',
				description: 'built a full customer logic system, managing states like waiting, ordering, eating, and leaving'
			},
			{
				tag: 'systems design',
				subheader: 'seat & table system logic',
				description: 'implemented dynamic seating and table systems, tracking customer assignments and order delivery across gameplay sessions'
			},
			{
				tag: 'systems design',
				subheader: 'randomized customer flow',
				description: 'created logic for randomizing customer seating and order types to increase replayability and variety'
			},
			{
				tag: 'systems design',
				subheader: 'cosmetic propagation system',
				description: 'defined and implemented how cosmetic data syncs across clients and resets between multiplayer sessions'
			},
			// #endregion
			// #region Game Programming
			{
				tag: 'gameplay',
				subheader: 'modular player manager',
				description: 'implemented a centralized PlayerManager to handle player input, movement, and object interactions'
			},
			{
				tag: 'gameplay',
				subheader: 'rebindable control scheme',
				description: 'developed a fully rebindable input system for customizable controls'
			},
			{
				tag: 'gameplay',
				subheader: 'unified interaction interface',
				description: 'created a base interaction system used by furniture, customers, and held items for consistent player interaction behavior'
			},
			{
				tag: 'gameplay',
				subheader: 'object pickup & handheld logic',
				description: 'built a system for interacting with and transporting handheld objects like customer orders'
			},
			{
				tag: 'gameplay',
				subheader: 'customer AI & navigation',
				description: 'integrated Unity NavMesh navigation and state transitions for responsive customer movement and behavior'
			},
			{
				tag: 'gameplay',
				subheader: 'furniture spawning & placement',
				description: 'developed furniture spawning logic using a GridManager and custom furniture placement tools'
			},
			{
				tag: 'gameplay',
				subheader: 'in-game HUD & interaction feedback',
				description: 'assisted in creating the in-game HUD and supporting UI for customer conversations and interactions'
			},
			// #endregion
			// #region Tools Programming
			{
				tag: 'tools',
				subheader: 'data-driven orders & cosmetics',
				description: 'created centralized databases for storing and managing orders and cosmetic item data'
			},
			{
				tag: 'tools',
				subheader: 'grid-based furniture placement tools',
				description: 'developed editor-facing systems to handle furniture placement using café-bound grids'
			},
			{
				tag: 'tools',
				subheader: 'spawn managers for dynamic furniture',
				description: 'built modular managers for spawning and tracking furniture like tables and seats at runtime'
			},
			// #endregion
			// #region Multiplayer Programming
			{
				tag: 'multiplayer',
				subheader: 'lobby creation & matchmaking',
				description: 'implemented a join/create lobby system using Photon PUN 2'
			},
			{
				tag: 'multiplayer',
				subheader: 'full network state sync',
				description: 'synchronized player movement, customer data, furniture, orders, and cosmetics across networked players'
			},
			{
				tag: 'multiplayer',
				subheader: 'RPC-heavy network communication',
				description: 'authored numerous RPCs (Remote Procedure Calls) to coordinate real-time multiplayer events and actions'
			},
			{
				tag: 'multiplayer',
				subheader: 'customer data sync architecture',
				description: 'used decoupled CustomerData components to sync customer behavior without tight coupling between systems'
			},
			{
				tag: 'multiplayer',
				subheader: 'networked furniture interaction',
				description: 'enabled full multiplayer furniture placement and interaction through Photon-compatible spawning logic'
			},
			// #endregion
			// #region Misc.
			{
				tag: 'misc.',
				subheader: 'lead programmer role',
				description: 'oversaw systems architecture, implementation planning, and team programming coordination'
			},
			{
				tag: 'misc.',
				subheader: 'steam store content writing',
				description: 'authored the official Pawfee Bean Steam page, showcasing gameplay features, multiplayer systems, and cozy café vibes'
			},
			{
				tag: 'misc.',
				subheader: 'ui development support',
				description: 'helped implement the in-game HUD and customer conversation interface elements'
			},
			// #endregion
		],
		tags: ['systems design', 'gameplay', 'tools', 'multiplayer', 'misc.'],
		previewMedia: [
			{ header: 'Pawfee Bean gameplay trailer', url: 'https://youtu.be/_qDSNHz4Dz4?si=6WfMVM6dHvydpoxm' }
		],
		links: [
			{ label: 'steam page', url: 'https://store.steampowered.com/app/3683680/Pawfee_Bean/' }
		],
		role: 'lead programmer, steam page copy',
		builtWith: 'unity, photon PUN 2',
		team: 'Buffalo Barnyard',
		media: [
			{ header: 'steam page capsule art', url: '/media/pawfee/steam_header.jpg' },
			{ header: `multiplayer customer behavior sync\n(early feb 2025)`, url: '/media/pawfee/early_feb.gif' },
			{ header: `spawning/serving Pawfee Bean\n(late feb 2025)`, url: '/media/pawfee/late_feb.gif' },
			{ header: `multiplayer items and customer orders sync\n(early march 2025)`, url: '/media/pawfee/early_march.gif' },
			{ header: `pitch deck\n(late may 2025)`, url: 'https://docs.google.com/presentation/d/e/2PACX-1vQGpvSmz4mEUefpp3i3yYGAcmWjcZ52gnuGwOfeDx20nT2sonDYVV1rkoUV_eJzqkvQkcNAg-TRjUsh/pubembed?start=false&loop=false&delayms=3000' }
		]
	},
	{
		title: 'Super Cloud Sourced',
		summary: 'a narrative systems project focused on in-game websites and social media post-driven mission progression.',
		logs: [
			// #region Systems Design
			{
				tag: 'systems design',
				subheader: 'post unlock system',
				description: 'designed a post system that acted as mission triggers, unlocking script files and gameplay progression through user interaction'
			},
			{
				tag: 'systems design',
				subheader: 'site-based content switching',
				description: 'implemented a tag- and ID-based architecture to filter posts per in-game websites'
			},
			// #endregion
			// #region Game Programming
			{
				tag: 'gameplay',
				subheader: 'post interaction + mission logic',
				description: 'created and wired mission unlock events to in-game post buttons, tying data to player actions'
			},
			// #endregion
			// #region Tools Programming
			{
				tag: 'tools',
				subheader: 'post authoring workflow',
				description: 'developed a pipeline to populate game content through a spreadsheet-backed post database, streamlining iteration for narrative and design teams'
			},
			{
				tag: 'tools',
				subheader: 'post prefab + data hook-up',
				description: 'connected UI prefab components to a centralized scriptable object database and made them runtime-readable via C#'
			},
			// #endregion
		],
		tags: ['systems design', 'gameplay', 'tools'],
		previewMedia: [
			{ header: 'Super Cloud Sourced gameplay preview', url: 'https://vimeo.com/1091993690?fl=pl&fe=sh' }
		],
		links: [
			{ label: 'itch.io page', url: 'https://mfinkel.itch.io/super-cloud-sourced'}
		],
		role: 'programmer',
		builtWith: 'unity',
		team: 'Super Cloud Sourced Team',
		media: []
	},
	{
		title: 'Nuts 4 Eggs',
		summary: 'a physics-focused gameplay project where i worked on egg interaction, launch behavior, enemy state logic, and menu ui structure.',
		logs: [
			// #region Systems Design
			{
				tag: 'systems design',
				subheader: 'egg launch & interaction flow',
				description: 'refactored the player controller to support normalized physics-based movement and modular egg interaction logic, including grab, release, and reset behavior'
			},
			{
				tag: 'systems design',
				subheader: 'egg launch trajectory system',
				description: 'improved egg launch mechanics by implementing velocity-based interpolation, ensuring consistent trajectory and reliable collision resets'
			},
			{
				tag: 'systems design',
				subheader: 'egg/enemy AI state logic',
				description: 'contributed to enemy behavior by integrating egg/enemy interaction states into a reactive NavMesh driven loop, supporting movement and interaction patterns'
			},
			// #endregion
			// #region Game Programming
			{
				tag: 'gameplay',
				subheader: 'UI state machine',
				description: 'built a state machine-based UI system to handle navigation across main menu, options, and credits with clean separation of states'
			},
			{
				tag: 'gameplay',
				subheader: 'egg holding mechanics',
				description: 'implemented smooth egg grabbing and releasing functionality with support for hold positioning and dynamic velocity transfer'
			}
			// #endregion
		],
		tags: ['systems design', 'gameplay'],
		previewMedia: [
			{ header: 'Nuts 4 Eggs gameplay trailer', url: 'https://www.youtube.com/watch?v=C-RzWiI8_Ug' }
		],
		links: [
			{ label: 'itch.io page', url: 'https://ashleyjknapp.itch.io/nuts-4-eggs'}
		],
		role: 'programmer',
		builtWith: 'unity',
		team: 'Buffalo Barnyard',
		media: []
	},
]
