const gulp = require('gulp');
const eslint = require('gulp-eslint');
var config = require('./config');


module.exports = function (gulp, plugins) {
    return function () {
       return gulp.src([config.getAppFolder() + '/**/*.jsx'])
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
    };
};