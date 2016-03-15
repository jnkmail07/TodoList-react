'use strict';

var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var conf = require('./conf');

var jest = require('jest-cli');
var through = require('through2');

var jestGulp = function(options) {
  options = options || {};

  return through.obj(function(file, enc, cb) {
    options.rootDir = options.rootDir || file.path;

    jest.runCLI({
      config: options
    }, options.rootDir, function(success) {
      if (!success) {
        cb(new gutil.PluginError('gulp-jest', {message: "Tests Failed"}));
      } else {
        cb();
      }
    }.bind(this));
  });
};

function runTests() {
  return gulp.src(path.join(conf.paths.src, '/app/**/__tests__/*.jsx')).pipe(jestGulp({
    rootDir: __dirname + '/..',
    scriptPreprocessor: __dirname + '/jest-preprocessor',
    preprocessCachingDisabled: true,
    moduleFileExtensions: ['js','jsx'],
    testFileExtensions: ['jsx'],
    unmockedModulePathPatterns: [
      "<rootDir>/node_modules/react",
      "<rootDir>/node_modules/react-dom",
      "<rootDir>/node_modules/react-addons-test-utils",
      "<rootDir>/node_modules/fbjs"
    ]
  }));
}

gulp.task('test', ['scripts'], runTests);

gulp.task('test:auto', ['watch'], runTests);
