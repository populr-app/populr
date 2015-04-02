var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlReplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');
var mocha = require('gulp-mocha');
var jasmine = require('gulp-jasmine');
var jest = require('gulp-jest');
var minifyCSS = require('gulp-minify-css');
var gulpSequence = require('gulp-sequence');
var shell = require('gulp-shell');

var path = {
  HTML: './client/src/index.html',
  HTML_DIST: './client/dist/public/index.html',
  SASS: './client/src/sass/main.scss',
  CSS_OUT: './client/build/css/',
  CSS_MIN_OUT: './client/dist/public/css/',
  ENTRY_POINT: './client/src/js/App.jsx',
  DEST: './client/dist/public/',
  OUT: 'bundle.js',
  MINIFIED_OUT: 'bundle.min.js',
  DEST_BUILD: './client/dist/build'
};

/* Watcher */
gulp.task('watch', function() {
  gulp.watch(path.HTML, []);
  var watcher = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));
  return watcher.on('update', function() {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_BUILD));
    console.log('updated');
  })
  .bundle()
  .pipe(source(path.OUT))
  .pipe(gulp.dest(path.DEST_BUILD));
});

/* Copy HTML to public directory */
gulp.task('copy', function() {
  gulp.src(path.HTML)
    .pipe(gulp.dest('./client/dist/public'));
});

/* Convert SCSS to CSS */
gulp.task('sass', function() {
  gulp.src(path.SASS)
    .pipe(sass())
    .pipe(gulp.dest(path.CSS_OUT));
});

/* Minify CSS */
gulp.task('minify-css', function() {
  return gulp.src(path.CSS_OUT + 'main.css')
    .pipe(minifyCSS({keepBreaks: true}))
    .pipe(gulp.dest(path.CSS_MIN_OUT));
});

/* BUILD */
gulp.task('build', function() {
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  })
  .bundle()
  .pipe(source(path.OUT))
  .pipe(streamify(uglify('bundle.min.js')))
  .pipe(gulp.dest('./client/dist/public/js'));
});

/* Creates local web server for testing */
gulp.task('webserver', function() {
  gulp.src(path.DEST)
    .pipe(server({
      livereload: true,
      directoryListing: false,
      defaultFile: '/index.html',
      open: true
    }));
});

/* Replace HTML */
gulp.task('replaceHTML', function() {
  gulp.src(path.HTML)
    .pipe(htmlReplace({
      css: './css/main.css',
      js: './js/' + path.OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

/* JSDoc */
gulp.task('jsdoc', shell.task([
  './node_modules/jsdoc/jsdoc.js ./server ./client -r'
]));

/* React Unit Testing (Jest) */
gulp.task('jest', function() {
  return gulp.src('_tests_')
    .pipe(jest({
      unmockedModulePathPatterns: [
        'node_modules/react'
      ],
      testDirectoryName: 'spec',
      testPathIgnorePatterns: [
        'node_modules',
        'spec/support'
      ],
      moduleFileExtensions: [
        'js',
        'json',
        'react'
      ]
    }));
});

/* Production */
gulp.task('production', ['sass', 'minify-css', 'build', 'replaceHTML', 'watch']);
gulp.task('heroku', gulpSequence('sass', 'minify-css', 'build', 'replaceHTML'))
gulp.task('localtest', ['production', 'webserver']);
