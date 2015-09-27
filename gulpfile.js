var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');

var source = '2/**/*.js';

gulp.task('build', function () {
    return gulp.src(source)        
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({ 
            modules: 'common',
            stage: 0,
            optional: [
                'es7.asyncFunctions',
                'runtime'
            ],
            externalHelpers: true,
        }))        
        .pipe(sourcemaps.write('.', {sourceRoot: '../src'}))
        .pipe(gulp.dest('lib'));
});

gulp.task('watch', function() {
   gulp.watch(source, ['build']); 
});