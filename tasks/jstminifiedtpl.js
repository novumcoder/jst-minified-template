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
var glob = require( 'glob');
var path = require( 'path');

module.exports = function( grunt) {
  grunt.registerMultiTask( 'jstminifiedtpl', 'produce JST file with minified html for ee.Template', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options( {
      prefix: 'window.JST',
      wrapfunction: '',
      removeComments: true,
      collapseWhitespace: true,
      removeEmptyAttributes: true,
      appendJSCode: ''
    });

    // Iterate over all specified file groups.
    this.files.forEach( function( f) {
      var result = options.prefix + '=';
      var entries = [];

      // Read file source.
      f.src.forEach( function(htmlfile) {
        var name = htmlfile.substr(0, htmlfile.lastIndexOf('.'));
        if( options.wrapfunction) {
          entries.push( '"'+name+'":'+options.wrapfunction+'('+JSON.stringify( minify( grunt.file.read(htmlfile), options))+')');
        } else {
          entries.push( '"'+name+'":'+JSON.stringify( minify( grunt.file.read(htmlfile), options)));
        }
      });

      result += '{'+entries.join(',')+'};';
      if( options.appendJSCode) {
        result += options.appendJSCode;
      }
      grunt.file.write( f.dest, result);
      grunt.log.write( 'File write to '+f.dest);
    });

  });
};