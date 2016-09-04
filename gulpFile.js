var gulp    = require('gulp'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    sass    = require('gulp-sass'),
    pump    = require('pump'),
    serve   = require('gulp-serve');


var paths = {
    js: [
        'bower_components/angular/angular.js',

        'app.js',

    ],
    sass: [
        'bower_components/sass-bootstrap/lib/*.scss',
        'app.scss'
    ],
    files: [
        'index.html'
    ],
}

var srcOptions = {cwd: 'web/'};

gulp.task('js', function (cb) {
    pump([
        gulp.src(paths.js, srcOptions),
        concat('app.js'),
        gulp.dest('web/dist/js')
    ], cb);
});

gulp.task('sass', function (cb) {
    pump([
        gulp.src('app.scss', srcOptions),
        sass({includePaths: ['web', 'web/bower_components/']}),
        gulp.dest('web/dist/css')
    ], cb)
})

gulp.task('files', function (cb) {
    return gulp.src(paths.files, srcOptions)
        .pipe(gulp.dest('web/dist'))
})

gulp.task('watch', ['default'], function () {
    gulp.watch(paths.js, srcOptions, ['js'])
    gulp.watch(paths.sass, srcOptions, ['sass'])
    gulp.watch(paths.files, srcOptions, ['files'])
})

gulp.task('serve', ['watch'], serve('web/dist/'))

gulp.task('default', ['js', 'sass', 'files'])