/*
 * jst-minified-template
 * https://github.com/novumcoder/jst-minified-template
 *
 * Copyright (c) 2014 Eser Esen
 * Licensed under the MIT license.
 */

'use strict';
var chalk = require( 'chalk');
var prettyBytes = require( 'pretty-bytes');
var minify = require( 'html-minifier').minify;

module.exports = function( grunt) {
  grunt.registerMultiTask( 'jstminifiedtpl', 'produce JST file with minified html for ee.Template', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options( {
      prefix: 'window.JST',
      wrapfunction: '',
      removeComments: true,
      collapseWhitespace: true,
      removeEmptyAttributes: true
    });

    var result = prefix + '= {';
    var entries = [];

    // Iterate over all specified file groups.
    this.files.forEach( function( f) {
      // Concat specified files.
      var src = f.src.filter( function( filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if( !grunt.file.exists( filepath)) {
          grunt.log.warn( 'Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map( function( filepath) {
        // Read file source.
        glob( "**/*.js", options, function( er, files) {
          grunt.log.write( JSON.stringify( files));
        });
      }).join( grunt.util.normalizelf( options.separator));
    });

    result += entries.join( ',');
    result += '};';
  });
};