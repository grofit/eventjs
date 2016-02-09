var paths = require('../paths');
var gulp = require("gulp");
var webpack = require("webpack-stream");

gulp.task('package', ["compile"], function () {
    return gulp.src([paths.dist + "/commonjs/event-handler.js"])
        .pipe(webpack({
            output: {
                entry: "event-handler.js",
                filename: "event.js",
                library: "EventJs",
                libraryTarget: "umd"
            }
        }))
        .pipe(gulp.dest(paths.dist + "/browser"));
});

