var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var aliasify = require('aliasify');
var concat = require('gulp-concat');
var vulcanize = require('gulp-vulcanize');
var crisper = require('gulp-crisper');

gulp.task('package-js', function() {
  var b = browserify({
    entries: './src/js/background.js',
    insertGlobals: true,
  }).transform(babelify, {
    presets: ['es2015'],
  }).transform(aliasify, {
    aliases: {
      electron: 'chrometron',
    },
  });

  return b.bundle()
  .pipe(source('./src/js/background.js'))
  .pipe(buffer())
  .pipe(concat('background.js'))
  .pipe(gulp.dest('./package/js'));
});

gulp.task('package-html', function() {
  return gulp.src('src/html/index.html')
    .pipe(vulcanize({
    	abspath: '',
    	excludes: [],
    	stripExcludes: false,
      inlineScripts: true,
    }))
    .pipe(crisper({
			scriptInHead: false, // true is default
			onlySplit: false
		}))
    .pipe(gulp.dest('./package'));
});

gulp.task('default', ['package-js', 'package-html']);
