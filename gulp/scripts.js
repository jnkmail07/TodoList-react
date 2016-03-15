'use strict';

var path        = require('path');
var gulp        = require('gulp');
var gutil       = require('gulp-util');
var browserify  = require('browserify');
var watchify    = require('watchify');
var conf        = require('./conf');
var browserSync = require('browser-sync');
var source      = require('vinyl-source-stream');
var eslint      = require('gulp-eslint');

var $ = require('gulp-load-plugins')();


function map_error(err) {
  if (err.fileName) {
    // regular error
    gutil.log("%s: %s: Line %d & Column %d: %s",
      err.name,
      err.fileName.replace(__dirname + '/src/js/', ''),
      err.lineNumber,
      err.columnNumber || err.column,
      err.description);
  } else {
    // browserify error..
    gutil.log("%s: %s", err.name, err.message);
  }

  this.emit('end');
}

gulp.task('scripts', ['lint'], function() {
    var bundler = browserify({
        entries: ['./src/app/index.jsx'],
        transform: ['babelify', ['envify',{NODE_ENV: (!conf.production ? 'development' : '')}]],
        extensions: ['.jsx'],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    return bundler
        .on('prebundle', function(bundler) {
            bundler.require('react');
        })
        .bundle()
        .on('error', map_error)
        .pipe(source('index.js'))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')))
        .pipe(browserSync.reload({ stream: true }))
        .pipe($.size());
});

gulp.task('lint', function() {
  return gulp.src([path.join(conf.paths.src, '/app/**/*.jsx'), path.join('!' + conf.paths.src, '/**/__tests__/**')])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Watchify is not used at this point, this would require scripts task to know if we are watching or not
// Copying code here for future usage
gulp.task('watchScripts', function() {
    var bundler = browserify({
        entries: [path.join(conf.paths.src, '/app/app.js')],
        transform: ['babelify'],
        extensions: ['.jsx'],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    var watcher = watchify(bundler);
    return watcher
        .on('prebundle', function(bundler) {
            bundler.require('react');
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist/scripts/'))
        .pipe(browserSync.reload({ stream: true }))
        .pipe($.size());
});
