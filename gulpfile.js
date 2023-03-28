/*
Copyright 2017 Ziadin Givan

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

https://github.com/givanz/VvvebJs
*/
//npm run gulp watch

const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
//const sass = require('gulp-sass')(require('sass'));
const sass = require('gulp-sass')(require('node-sass'));
const formatHtml = require('gulp-format-html');
const through2 = require( 'through2' );    

const touch = () => through2.obj( function( file, enc, cb ) {
    if ( file.stat ) {
        file.stat.atime = file.stat.mtime = file.stat.ctime = new Date();
    }
    cb( null, file );
});

gulp.task('fileinclude', function() {
	//gulp.src(['./html/**/*.html', '!**/_*/**'])
  return gulp.src(['./html/*.html', './html/**/*.html', '!**/_*/**'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(formatHtml())
    //.pipe( touch() )
    .pipe(gulp.dest('./'));
});

gulp.task('sass', function() {
	//gulp.src(['./html/**/*.html', '!**/_*/**'])
  return gulp.src(['./scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./css'));
});


gulp.task('watch', function () {
    gulp.watch(['./html/*.html', './html/**/*.html'], gulp.series('fileinclude'));
    gulp.watch(['./scss/*.scss'], gulp.series('sass'));
});

// Default Task
gulp.task('default', gulp.series('fileinclude', 'sass'));
