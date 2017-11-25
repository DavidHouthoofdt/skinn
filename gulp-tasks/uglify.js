var gulp = require('gulp');
var uglify = require('gulp-uglify');
var config = require('./config');


module.exports = function (gulp, plugins) {
    return function () {
      return config.isDev() ? null : gulp.src(config.getBuildFolder() +  '/react-engine.js')
              .pipe(uglify(config.getUglifySettings()))
              .pipe(gulp.dest(config.getBuildFolder()));
    };
};