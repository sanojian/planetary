/*
	Copyright 2013 Jonas 'sanojian' Olmstead
*/

var g_levels = {
	'1': {
		planets: {	'A': { name: 'A', x: 200, y: 200, r: 26, color: '#ff00ff' },
					'B': { name: 'B', x: 300, y: 400, r: 24, color: '#009966' }
		},
		routes: [ 'A_B' ],
		players: [
			{ team: 'team1', location: 'A' },
			{ team: 'team2', location: undefined }
		],
		ships: [
			{ team: 'team2', type: 'fighter', location: 'B' }
		],
		buildings: [],
		tutorial_image: { 	name: 'level1.png', x: 400, y: 200, w: 300, h: 225,
							text: 'LEVEL 1:\n \nOrder your fighters\nto attack the enemy\nby dragging from\none planet to\nthe other',
							tx: 200, ty: 80
		},
		song1: "//dl.dropbox.com/u/102070389/games/planetary/DST-Xend",
		winMessage: 'You can combine several paths\ntogether to make a longer path.'
	},
	'2': {
		planets: {	'A': { name: 'A', x: 200, y: 200, r: 26, color: '#ff00ff' },
					'B': { name: 'B', x: 300, y: 400, r: 24, color: '#009966' }
		},
		routes: [ 'A_B' ],
		players: [
			{ team: 'team1', location: 'A' },
		],
		ships: [
			{ team: 'team2', type: 'fighter', location: 'B' }
		],
		buildings: [
			{ team: 'team2', type: 'dummy-factory', location: 'B' }
		],
		tutorial_image: { 	name: 'level2.png', x: 400, y: 200, w: 300, h: 225,
							text: 'LEVEL 2:\n \nBuild a bomber and\nsend it to attack\nthe enemy\nfactory.',
							tx: 200, ty: 80
		},
		//song1: "//dl.dropbox.com/u/102070389/games/planetary/DST-MezzoForty",
		winMessage: 'Bombers can damage buildings\nbut are weak against ships.'
	},
	'3': {
		planets: {	'A': { name: 'A', x: 200, y: 200, r: 26, color: '#ff00ff' },
					'B': { name: 'B', x: 300, y: 400, r: 24, color: '#009966' },
					'C': { name: 'C', x: 500, y: 400, r: 28, color: '#ff9999' }
		},
		routes: [ 'A_B', 'B_C' ],
		players: [
			{ team: 'team1', location: 'A' }
		],
		ships: [],
		buildings: [
			{ team: 'team2', type: 'factory', location: 'C' }
		],
		tutorial_image: { 	name: 'level3.png', x: 400, y: 200, w: 300, h: 225,
							text: 'LEVEL 3:\n \nBuild a factory and\ntake over another\nplanet. Then\nattack!',
							tx: 200, ty: 80
		},
		//song1: "//dl.dropbox.com/u/102070389/games/planetary/DST-IceStar",
		winMessage: 'Active ships cost maintenance\nand slow down production.'
	},
	'4': {
		planets: {	'A': { name: 'A', x: 200, y: 200, r: 26, color: '#ff00ff' },
					'B': { name: 'B', x: 300, y: 400, r: 24, color: '#009966' },
					'C': { name: 'C', x: 500, y: 400, r: 28, color: '#ff9999' },
					'D': { name: 'D', x: 700, y: 400, r: 22, color: '#960596' }
		},
		routes: [ 'A_B', 'B_C', 'C_D' ],
		players: [
			{ team: 'team1', location: 'A' },
			{ team: 'team2', location: 'D' }
		],
		ships: [],
		buildings: [
		],
		tutorial_image: { 	name: 'blank.png', x: 400, y: 200, w: 300, h: 225,
							text: 'LEVEL 4:\n \nNow it is up to you.\nFind the enemy\n and defeat them!\n ',
							tx: 150, ty: 120
		},
		song1: "//dl.dropbox.com/u/102070389/games/planetary/DST-AngryRobotIII",
		winMessage: 'Nice job.\nNow for two enemies...'
	},
	'5': {
		planets: {	'A': { name: 'A', x: 100, y: 100, r: 26, color: '#ff00ff' },
					'B': { name: 'B', x: 200, y: 300, r: 24, color: '#009966' },
					'C': { name: 'C', x: 500, y: 400, r: 28, color: '#ff9999' },
					'D': { name: 'D', x: 700, y: 400, r: 22, color: '#960596' },
					'E': { name: 'E', x: 800, y: 300, r: 23, color: '#4598DD' },
		},
		routes: [ 'A_B', 'B_C', 'C_D', 'D_E' ],
		players: [
			{ team: 'team1', location: 'D' },
			{ team: 'team2', location: 'A' },
			{ team: 'team3', location: 'C' },
		],
		ships: [],
		buildings: [],
		tutorial_image: { 	name: 'blank.png', x: 400, y: 200, w: 300, h: 225,
							text: 'LEVEL 5:\n \nTry two enemies\non for size...\n ',
							tx: 150, ty: 120
		},
		song1: "//dl.dropbox.com/u/102070389/games/planetary/DST-MezzoForty",
		winMessage: 'Last level coming up...'
	},
	'6': {
		planets: {	'A': { name: 'A', x: 100, y: 100, r: 26, color: '#ff00ff' },
					'B': { name: 'B', x: 200, y: 300, r: 24, color: '#009966' },
					'C': { name: 'C', x: 500, y: 400, r: 28, color: '#ff9999' },
					'D': { name: 'D', x: 700, y: 400, r: 22, color: '#960596' },
					'E': { name: 'E', x: 800, y: 300, r: 23, color: '#4598DD' },
					'F': { name: 'F', x: 400, y: 600, r: 30, color: '#9845DD' },
					'G': { name: 'G', x: 600, y: 200, r: 24, color: '#989233' },
		},
		routes: [ 'A_B', 'B_C', 'C_D', 'D_E', 'C_F', 'C_G' ],
		players: [
			{ team: 'team1', location: 'C' },
			{ team: 'team2', location: 'A' },
			{ team: 'team3', location: 'G' },
			{ team: 'team4', location: 'E' }
		],
		ships: [],
		buildings: [],
		tutorial_image: { 	name: 'blank.png', x: 400, y: 200, w: 300, h: 225,
							text: 'LEVEL 6:\n \nThree enemies. You\ncan do it!\n ',
							tx: 150, ty: 120
		},
		song1: "//dl.dropbox.com/u/102070389/games/planetary/Clearside - Assimilator",
		winMessage: 'You saved your species!\nGive a high rating '
	}
};
		
var g_defs = {
				teams: {
					team1: { color: '#228DFF' },
					team2: { color: '#FF0092' },
					team3: { color: '#FFCA1B' },
					team4: { color: '#BA01FF' },
					team5: { color: '#B6FF00' }
				},
				shipStats: {
					fighter: {
						damage: 0.5,
						hits: 2,
						speed: 3,
						size: 5
					},
					bomber: {
						damage: 0.2,
						hits: 2,
						speed: 2,
						size: 5
					},
					factory: {
						damage: 0,
						hits: 2,
						speed: 1.5,
						size: 5
					},
					'dummy-factory': {
						damage: 0,
						hits: 2,
						speed: 1.5,
						size: 5
					},
					gun: {
						damage: 1.5,
						hits: 2,
						speed: 2,
						size: 8
					},
					laboratory: {
						damage: 0,
						hits: 2,
						speed: 1.5,
						size: 5
					},
					satellite: {
						damage: 1,
						hits: 1.5,
						speed: 1,
						size: 6
					}
				
				},
				fontAttribs: { 'font-family': '"Orbitron", sans-serif', stroke: '#aa0', fill: '#ff0' },
				fontAttribs2: { 'font-family': '"Nova Square", cursive', stroke: '#ffff00', fill: '#ffff00' }
};
		