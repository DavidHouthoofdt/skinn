var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var gulpSequence = require('gulp-sequence');

gulp.task('clean', require('./gulp-tasks/clean')(gulp, plugins));
gulp.task('babel', require('./gulp-tasks/babel')(gulp, plugins));
gulp.task('browserify', require('./gulp-tasks/browserify')(gulp, plugins));
gulp.task('uglify', require('./gulp-tasks/uglify')(gulp, plugins));
gulp.task('publish', require('./gulp-tasks/publish')(gulp, plugins));
gulp.task('eslint', require('./gulp-tasks/eslint')(gulp, plugins));

gulp.task('scripts', gulpSequence('babel', 'browserify', 'uglify'));

gulp.task('build', gulpSequence('clean', 'eslint', 'scripts', 'publish'));
gulp.task('default', ['build']);
