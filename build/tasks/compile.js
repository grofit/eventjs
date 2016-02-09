var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var paths = require("../paths");

gulp.task('compile', ["generate-exports"], function() {
    var tsResult = gulp.src([paths.source, paths.typings])
        .pipe(ts({
            declaration: true,
            module: "commonjs",
            target: "es5"
        }));

    return merge([
        tsResult.dts.pipe(gulp.dest(paths.dist + "/typings")),
        tsResult.js.pipe(gulp.dest(paths.dist + "/commonjs"))
    ]);
});