# JST minifed template

> produce JST file with minified html for ee.Template

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install jstminifiedtpl --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('jstminifiedtpl');
```

## The "JST minifed template" task

### Overview
In your project's Gruntfile, add a section named `eeTemplate` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jstminifiedtpl: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.removeComments
Type: `Boolean`
Default value: `true`

Remove comments in HTML

#### options.collapseWhitespace
Type: `Boolean`
Default value: `true`

Remove white space in HTML

#### options.removeEmptyAttributes
Type: `Boolean`
Default value: `true`

Remove empty attributes from HTML tags

#### options.prefix
Type: `String`
Default value: `window.JST`

The global scope var to be used to set the minified templates in the jst file

#### options.wrapfunction
Type: `String`
Default value: ``

Wrap the minified template into a function, not wrapped by default

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever.

```js
grunt.initConfig({
  jstminifiedtpl: {
    options: {},
    files: {
      'dest/default_options': ['src/a.html', 'src/b.html'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to do something else.
We prefix the result with window.JST as usual, comments are removed, white space and empty attr too.
HTML files in src/ and src/a will be minified and put into result object (window.JST)

```js
grunt.initConfig({
  jstminifiedtpl: {
    options: {
      prefix: 'window.JST',
      wrapfunction: '',
      removeComments: true,
      collapseWhitespace: true,
      removeEmptyAttributes: true
    },
    files: {
      'dest/tpl.js': ['src/*.html', 'src/a/*.html'],
    },
  },
});
```

Here we use wrapfunction and appendJSCode:
Each minified template/HTML will be wrapped within function myfunction, so we can do something before they are assigned to window.JST.
Then we append some additional code after the window.JST object, for example to do something with the resulting window.JST.

```js
grunt.initConfig({
  jstminifiedtpl: {
    options: {
      prefix: 'window.JST',
      wrapfunction: 'myfunction',
      appendJSCode: 'doSomething(window.JST);',
      removeComments: true,
      collapseWhitespace: true,
      removeEmptyAttributes: true
    },
    files: {
      'dest/tpl.js': ['src/*.html', 'src/a/*.html'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
