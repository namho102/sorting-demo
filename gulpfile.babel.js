'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';

gulp.task('default', ['watch']);

gulp.task('build-css', () => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task("build-js", () => {
  return gulp.src("src/javascript/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("public/scripts"));
});

gulp.task('watch', () => {
  gulp.watch('src/javascript/**/*.js', ['build-js']);
  gulp.watch('src/scss/**/*.scss', ['build-css']);
});