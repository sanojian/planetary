var path = require('path');

module.exports = function(grunt) {

	// Load Grunt tasks declared in the package.json file
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({

		watch: {
			less: {
				files: [
					'less/*.less'
				],
				tasks: ['less']
			},
			scripts: {
				files: [
					'js/*.js',
					'dialog/*.js'
				],
				tasks: ['concat']
			}
		},
		concat: {
			basic_and_extras: {
				files: {
					'public/js/game.js': ['js/*.js']
				}
			}
		},
		less: {
			development: {
				options: {
					paths: ["./less"]
					//yuicompress: true
				},
				files: {
					"./public/css/style.css": "./less/style.less"
				}
			}
		},

	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('server', [
		'watch'
	]);
	grunt.registerTask('build', ['less','concat']);
	grunt.registerTask('default', ['build','server']);

};