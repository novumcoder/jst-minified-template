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
var path = require( 'path');

module.exports = function( grunt) {
  grunt.registerMultiTask( 'jstminifiedtpl', 'produce JST file with minified html for ee.Template', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options( {
      prefix: 'window.JST=',
      wrapfunction: '',
      wrapfunctionresult: '',
      removeComments: true,
      removekeyprefix: '',
      collapseWhitespace: true,
      removeEmptyAttributes: true,
      customAttrSurround: [
        [/\{\{#[^}]+\}\}/, /\{\{\/[^}]+\}\}/],
        [/\{\{\^[^}]+\}\}/, /\{\{\/[^}]+\}\}/]
      ],
      appendJSCode: ''
    });

    // Iterate over all specified file groups.
    this.files.forEach( function( f) {
      var result = options.prefix ? options.prefix : '';
      var entries = [];

      // Read file source.
      f.src.forEach( function(htmlfile) {
        var name = htmlfile.substr(0, htmlfile.lastIndexOf('.'));
        if( options.removekeyprefix) {
          var regexp = new RegExp( options.removekeyprefix, 'g');
          name = name.replace( regexp, '');
        }
        var max = grunt.file.read(htmlfile);
        var min = minify( max, options);
        if( options.wrapfunction) {
          entries.push( '"'+name+'":'+options.wrapfunction+'('+JSON.stringify( min)+')');
        } else {
          entries.push( '"'+name+'":'+JSON.stringify( min));
        }
        
        grunt.log.writeln( 'Handling file '+chalk.red(htmlfile)+', original size: '+chalk.cyan(prettyBytes(max.length))+', minified: '+chalk.cyan(prettyBytes(min.length)));
      });

      if( options.wrapfunctionresult) {
        result += options.wrapfunctionresult+'({'+entries.join(',')+'});';
      } else {
        result += '{'+entries.join(',')+'};';
      }
      if( options.appendJSCode) {
        result += options.appendJSCode;
      }
      grunt.file.write( f.dest, result);
      grunt.log.ok( 'Creating file '+f.dest+' (size: '+chalk.cyan(prettyBytes(result.length))+')');
    });

  });
};