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

// Paths
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

// Watcher
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

// Copy image folder to public directory
gulp.task('copyIMG', function() {
  gulp.src(path.IMG)
    .pipe(gulp.dest(path.IMG_DIST))
    .pipe(notify('images copied'));
});

// Compiles SCSS to CSS and minifies CSS
// autoprefixer adds browser prefixes
gulp.task('styles', function() {
  return gulp.src(path.SASS)
    .pipe(sass({style: 'expanded'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest(path.CSS_MIN_OUT))
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.CSS_MIN_OUT))
    .pipe(notify('Styles compiled and minified!'));
});

// Build
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


// Creates local web server for testing (port 8000)
gulp.task('webserver', function() {
  gulp.src(path.DEST)
    .pipe(server({
      livereload: true,
      directoryListing: false,
      defaultFile: '/index.html',
      open: true
    }));
});

// Injects css and js files into index.html
gulp.task('replaceHTML', function() {
  gulp.src(path.HTML)
    .pipe(htmlReplace({
      css: './css/main.css',
      js: './js/' + path.OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

// JSDoc
gulp.task('jsdoc', shell.task([
  './node_modules/jsdoc/jsdoc.js -c conf.json ./server -r README_DOCS.md'
]));

/* Worker Tasks */

// Runs all 6 of our main scraping tasks, heroku scheduler runs this every 10 minutes
gulp.task('scrapeAll', gulpSequence('scrapeTwitter', 'scrapeSites', 'updateScores', 'updateTop', 'updateRedis'));

// Scrapes and stores Twitter API data
gulp.task('scrapeTwitter', function() {
  return require('./server/workers/twitterScraper')();
});

// Scrapes and stores Facebook API data
gulp.task('scrapeFacebook', function() {
  return require('./server/workers/facebookScraper')();
});

// Scrapes and stores news sites data
gulp.task('scrapeSites', function() {
  return require('./server/workers/sitesScraper')();
});

// Collectively generates a score for each user based on their corrosponding data in each table
gulp.task('updateScores', function() {
  return require('./server/workers/peopleScoreUpdater')();
});

// Using the score grabs the top 200, sorts accordingly and stores in the top table
gulp.task('updateTop', function() {
  return require('./server/workers/topUpdater')();
});

// Sends the top table and the top 200 people's details to our redis server
gulp.task('updateRedis', function() {
  return require('./server/workers/redisUpdater')();
});

/* Helper Tasks */

// Loads the users in clientData.json to our database
gulp.task('loadData', function() {
  var data = {body: require('./data/clientData')};
  return require('./server/database/people/controller').post(data, {send: function() {}});
});

// Drops all of our database's tables
gulp.task('dropTables', function(){
  require('./server/helpers/droptables')();
});

// Serverside testing
gulp.task('mochatest', function() {
  return gulp.src('./server/serverSpec.js', {read: false})
    .pipe(mocha());
});

// React Unit Testing (Jest)
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

//Sequence tasks
gulp.task('production', ['styles', 'copyIMG', 'build', 'replaceHTML', 'watch']);
gulp.task('heroku', gulpSequence('styles', 'copyIMG', 'build', 'replaceHTML'));
gulp.task('localtest', ['styles', 'copyIMG', 'build', 'replaceHTML', 'webserver']);
