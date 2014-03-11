/*
 * jstminifiedtpl
 * https://github.com/novumcoder/jst-minified-template
 *
 * Copyright (c) 2014 Eser Esen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function( grunt) {

  // Project configuration.
  grunt.initConfig( {
    jshint: {
      all: ['Gruntfile.js', 'tasks/*.js', '<%= nodeunit.tests %>', ],
      after: [ 'tmp/*.js'],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    jstminifiedtpl: {
      default_options: {
        options: {
          prefix: 'var window=window||(window={});window.JST'
        },
        files: {
          'tmp/default_options.js': ['test/a/*.html', 'test/b/*.html', 'test/*.html'],
        },
      },
      appendjs_options: {
        options: {
          prefix: 'var window=window||(window={});function myfunction(a){}window.JST',
          appendJSCode: 'myfunction( window.JST);'
        },
        files: {
          'tmp/appendjs_options.js': ['test/a/*.html', 'test/b/*.html', 'test/*.html'],
        },
      },
      wrapandappendjs_options: {
        options: {
          prefix: 'var window=window||(window={});function myfunction2(a){}function parse(a){}window.JST',
          appendJSCode: 'myfunction2( window.JST);',
          wrapfunction: 'parse'
        },
        files: {
          'tmp/wrapandappendjs_options.js': ['test/a/*.html', 'test/b/*.html', 'test/*.html'],
        },
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks( 'tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks( 'grunt-contrib-jshint');
  grunt.loadNpmTasks( 'grunt-contrib-clean');
  grunt.loadNpmTasks( 'grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask( 'test', ['clean', 'jstminifiedtpl', 'jshint:after', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask( 'default', ['jshint:all', 'test']);

};
