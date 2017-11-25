const gulp = require('gulp');
const babel = require('gulp-babel');
var config = require('./config');

module.exports = function (gulp, plugins) {
    return function () {
        return gulp.src([config.getAppFolder() + '/**/*.js',  config.getAppFolder() + '/**/*.jsx'])
          .pipe(babel({
              plugins: ['syntax-class-properties','transform-class-properties','transform-react-jsx', 'transform-object-assign'],
              presets: ['react', 'es2015']
        }))
        .pipe(gulp.dest(config.getBuildFolder()));
    };
};