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

    

    // Iterate over all specified file groups.
    this.files.forEach( function( f) {
      var result = prefix + '= {';
      var entries = {};
      // Concat specified files.
      var src = f.dest.filter( function( filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if( !grunt.file.exists( filepath)) {
          grunt.log.warn( 'Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }); 

      // Read file source.
      glob( dest, options, function( er, files) {
        grunt.log.write( JSON.stringify( files));
      });

      result += entries.join( ',');
      result += '};';
      
      grunt.log.write( 'File write to '+f.src);
    });

  });
};