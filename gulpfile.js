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

var path = {
  HTML: './client/src/*.html',
  SASS: './client/src/sass/*.scss',
  CSS_OUT: './client/build/css',
  CSS_MIN_OUT: 'styles.min.css',
  ENTRY_POINT: './client/src/js/App.jsx',
  DEST: './client/dist/public/',
  OUT: 'bundle.js',
  MINIFIED_OUT: 'bundle.min.js',
  DEST_BUILD: './client/dist/build'
};


/* Convert SCSS to CSS */
gulp.task('sass', function({
  gulp.src(path.SASS)
    .pipe(sass())
    .pipe(gulp.dest(path.CSS_OUT));
});

