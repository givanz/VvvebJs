var gulp = require("gulp"),
	sass = require("gulp-sass");


function compile() {
	return (
		gulp
			.src("scss/**/*.scss")
			.pipe(sass())
			.on("error", sass.logError)
			.pipe(gulp.dest("css"))
	);
}

function watch() {
	gulp.watch("scss/**/*.scss", compile);
}

exports.watch = watch;
exports.compile = compile;