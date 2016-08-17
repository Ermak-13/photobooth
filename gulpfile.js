var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename');

gulp.task('default', ['dev']);
gulp.task('dev', ['watch', 'js']);

gulp.task('js', function () {
  gulp.src('./javascripts/index.js')
    .pipe(browserify({
      transform: ['reactify'],
      extensions: ['.js']
    }))
    .on('error', console.log)
    .pipe(rename('app.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
  gulp.watch('./javascripts/**/*.js', ['js']);
});

