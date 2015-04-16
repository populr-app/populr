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
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var mocha = require('gulp-mocha');

var path = {
  HTML: './client/src/index.html',
  HTML_DIST: './client/dist/public',
  IMG: './client/src/img/*',
  IMG_DIST: './client/dist/public/img',
  SASS: './client/src/sass/**/*.scss',
  CSS_OUT: './client/build/css/',
  CSS_MIN_OUT: './client/dist/public/css/',
  ENTRY_POINT: './client/src/js/App.jsx',
  ENTRY_POINT_JS: './client/src/js/main.js',
  DEST: './client/dist/public/',
  OUT: 'bundle.js',
  MINIFIED_OUT: 'bundle.min.js',
  DEST_BUILD: './client/dist/build'
};

/* Watcher */
gulp.task('watch', function() {
  gulp.watch(path.HTML, []);
  gulp.watch(path.SASS, ['styles']);
  gulp.watch(path.IMG, ['copyIMG']);
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

/* Copy image folder to public directory */
gulp.task('copyIMG', function() {
  gulp.src(path.IMG)
    .pipe(gulp.dest(path.IMG_DIST))
    .pipe(notify('images copied'));
});

/* Compiles SCSS to CSS and minifies CSS */
/* autoprefixer adds browser prefixes */
gulp.task('styles', function() {
  return gulp.src(path.SASS)
    .pipe(sass({style: 'expanded'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest(path.CSS_MIN_OUT))
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.CSS_MIN_OUT))
    .pipe(notify('Styles compiled and minified!'));
});

/* BUILD */
gulp.task('build', function() {
  browserify({
    entries: [path.ENTRY_POINT, path.ENTRY_POINT_JS],
    transform: [reactify]
  })
  .bundle()
  .pipe(source(path.OUT))
  .pipe(streamify(uglify('bundle.min.js')))
  .pipe(gulp.dest('./client/dist/public/js'))
  .pipe(notify('Build complete!'));
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
  './node_modules/jsdoc/jsdoc.js ./server -r'
]));

/* Workers */
gulp.task('scrapeAll', gulpSequence('scrapeTwitter', 'scrapeSites', 'updateScores', 'updateTop', 'updateRedis'));

gulp.task('scrapeTwitter', function() {
  return require('./server/workers/twitterScraper')();
});

gulp.task('scrapeSites', function() {
  return require('./server/workers/sitesScraper')();
});

gulp.task('updateScores', function() {
  return require('./server/workers/peopleScoreUpdater')();
});

gulp.task('updateTop', function() {
  return require('./server/workers/topUpdater')();
});

gulp.task('updateRedis', function() {
  return require('./server/workers/redisUpdater')();
});

gulp.task('loadData', function() {
  var data = {body: require('./data/clientData2')};
  return require('./server/database/people/controller').post(data, {send: function() {}});
});

gulp.task('dropTables', function(){
  require('./server/helpers/droptables')();
});

/* Serverside testing */
gulp.task('mochatest', function() {
  return gulp.src('./server/serverSpec.js', {read: false})
    .pipe(mocha());
});

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
gulp.task('production', ['styles', 'copyIMG', 'build', 'replaceHTML', 'watch']);
gulp.task('heroku', gulpSequence('styles', 'copyIMG', 'build', 'replaceHTML'));
gulp.task('localtest', ['production', 'webserver']);
