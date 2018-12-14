var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');



gulp.task('sass', function(){
    return gulp.src('public/styles/*.scss')
      .pipe(sass()) // Using gulp-sass
      .pipe(gulp.dest('public/dist/styles'))
  });

  gulp.task('js', function(){
    return gulp.src('public/js/*.js')
      .pipe(babel({presets: ['@babel/preset-env']}))
      .pipe(webpackStream(webpackConfig), webpack)
      .pipe(gulp.dest('public/dist/js'))
  });

  gulp.task('watch', function () {
    // Endless stream mode
    gulp.watch('public/styles/*.scss', gulp.series('sass'));
    gulp.watch('public/js/*.js', gulp.series('js'));

});

//gulp.task('default', ['sass', 'js', 'watch']);

gulp.task('default', gulp.series(gulp.parallel('sass','js'), 'watch'))




