'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.jstminifiedtpl = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default_options.js');
    var expected = grunt.file.read('test/expected/default_options');
    test.equal(actual, expected, 'expected js content');

    test.done();
  },
  appendjs_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/appendjs_options.js');
    var expected = grunt.file.read('test/expected/appendjs_options');
    test.equal(actual, expected, 'expected js content');

    test.done();
  },
  wrapandappendjs_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/wrapandappendjs_options.js');
    var expected = grunt.file.read('test/expected/wrapandappendjs_options');
    test.equal(actual, expected, 'expected js content');

    test.done();
  }
};
