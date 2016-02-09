var gulp = require('gulp');
var exporter = require("gulp-es6-exporter");

gulp.task('generate-exports', function() {
    return gulp.src(["./src/**/*.ts", "!./src/index.ts"])
        .pipe(exporter("index.ts", { root: "src" }))
        .pipe(gulp.dest("./src/"));
});