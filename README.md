# JST minifed template

> produce JST file with minified html

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install jstminifiedtpl --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jstminifiedtpl');
```

## The "JST minifed template" task

### Overview
In your project's Gruntfile, add a section named `jstminifiedtpl` to the data object passed into `grunt.initConfig()`.

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
Default value: `window.JST=`

The global scope var to be used to set the minified templates in the jst file

#### options.wrapfunction
Type: `String`
Default value: ``

Wrap the minified template into a function, not wrapped by default

#### options.wrapfunctionresult
Type: `String`
Default value: ``

Wrap the entire minified template json object into a function, not wrapped by default

#### options.removekeyprefix
Type: `String`
Default value: ``

Basically the relative path of each file minified into JST will be used as key in the resulting object,
here you can define what part of the key to remove.
If your files are located at templates/foo/bar/main.html then your key in the resulting object will
be templates/foo/bar/main. But lets say you want to get rid of the templates/foo/ so your key results
in bar/main, then set the option to templates/foo/

#### options.appendJSCode
Type: `String`
Default value: ``

You can append some js code after the resulting object. If you have window.JST={"foo":"<div>....</div>", ...}; as your resulting object, you can add 
some js code after the semicolon, for example a function call like 'doSomething(window.JST);'. In this case add options.appendJSCode='doSomething(window.JST);'

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever.
Resulting file will have window.JST having both HTML file minified.
So test.js can be used to load HTML with only one js file (JST).

```js
grunt.initConfig({
  jstminifiedtpl: {
    options: {},
    files: {
      'dest/test.js': ['src/a.html', 'src/b.html'],
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

Here we use wrapfunction and appendJSCode:
Each minified template/HTML will be wrapped within function myfunction, so we can do something before they are assigned to window.JST.
Then we append some additional code after the window.JST object, for example to do something with the resulting window.JST.
Additionally we remove src/ from the keys so our resulting object will only contain html filenames as keys.

```js
grunt.initConfig({
  jstminifiedtpl: {
    options: {
      prefix: 'window.JST',
      wrapfunction: 'myfunction',
      appendJSCode: 'doSomething(window.JST);',
      removekeyprefix: 'src/'
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

Here we use wrapfunctionresult and appendJSCode:
Each minified template/HTML will be wrapped within function myfunction, so we can do something before they are assigned to window.JST.
Then we append some additional code after the window.JST object, for example to do something with the resulting window.JST.
Additionally we remove src/ from the keys so our resulting object will only contain html filenames as keys.

```js
grunt.initConfig({
  jstminifiedtpl: {
    options: {
      prefix: '',
      wrapfunctionresult: 'myfunction',
      appendJSCode: 'doSomething();',
      removekeyprefix: 'src/'
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
