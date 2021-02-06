var gulp = require("gulp"),
	sass = require("gulp-sass");


gulp.task('sass', function() {
  return gulp.src(['./scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
    gulp.watch(['./scss/*.scss'], gulp.series('sass'));
});


// Default Task
gulp.task('default', gulp.series('sass'));
