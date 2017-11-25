var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var config = require('./config');


module.exports = function (gulp, plugins) {
    return function () {
      if (!config.isDev()) process.env.NODE_ENV = 'production';
      return browserify(config.getBuildFolder() + '/app.js')
          .bundle()
          .pipe(source('react-engine.js'))
          .pipe(gulp.dest(config.getBuildFolder()));
    };
};