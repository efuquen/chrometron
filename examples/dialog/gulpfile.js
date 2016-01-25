var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var aliasify = require('aliasify');
var concat = require('gulp-concat');

gulp.task('default', function() {
  var b = browserify({
    entries: './src/background.js',
    insertGlobals: true,
  }).transform(babelify, {
    presets: ['es2015'],
  }).transform(aliasify, {
    aliases: {
      electron: 'chrometron',
    },
  });

  return b.bundle()
  .pipe(source('./src/background.js'))
  .pipe(buffer())
  .pipe(concat('background.js'))
  .pipe(gulp.dest('./dist'));
});
