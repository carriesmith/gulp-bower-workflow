// load plugins
var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// define a task compiling LESS css and minify
gulp.task('css', function(){

  // grab the less file, process the LESS, save to style.css
  return gulp.src('public/assets/css/style.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(rename({suffix : '.min' }))
    .pipe(gulp.dest('public/assets/css'));

});

// define a task for linting js files
gulp.task('js', function(){

  return gulp.src(['server.js', 'public/app/*.js', 'public/app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));

});

// task to lint, minify and concat frontend files
gulp.task('scripts', function(){
  
  return gulp.src(['public/app/*.js', 'public/app/**/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/dist'));

});

gulp.task('watch', function(){

  // watch the less file and run the CSS task
  gulp.watch('public/assets/css/style.less', ['css']);

});