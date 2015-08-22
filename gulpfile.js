var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');

var source = 'src/**/*.js';

gulp.task('build', function () {
    return gulp.src(source)        
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({ 
            modules: 'common'
        }))        
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
   gulp.watch(source, ['build']); 
});