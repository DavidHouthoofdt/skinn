var gulp = require('gulp');
var clean = require('gulp-clean');
var config = require('./config');

module.exports = function (gulp, plugins) {
    return function () {
        return gulp.src(config.getBuildFolder(), {read: true}).pipe(clean());
    };
};