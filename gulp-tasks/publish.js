const gulp = require('gulp');
var config = require('./config');

var files = [
    config.getBuildFolder() + '/react-engine.js'
];

module.exports = function (gulp, plugins) {
    return function () {

       return gulp.src(files,  {base: config.getBuildFolder()})
          .pipe(gulp.dest(config.getPublishFolder()))
         ;
    };
};