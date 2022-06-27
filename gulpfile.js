"use strict";

const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const concat = require('gulp-concat');
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
var sass = require('gulp-sass')(require('sass'));

// CSS task
gulp.task("css", () => {
    return gulp
      .src("scss/**/*.scss")
      .pipe(plumber())
      .pipe(sass({ outputStyle: "expanded" }))
      .pipe(rename({ suffix: ".min" }))
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(gulp.dest("dist/css"))
  });
  
  // Transpile, concatenate and minify scripts
  gulp.task("js", () => {
    return (
      gulp
        .src([
        'js/**/*.js'
      ])
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest("dist/js"))
    );
  });
  
  gulp.task("default", gulp.series( "css", "js", () => {
    gulp.watch(["scss/**/*"], gulp.series("css"));
    gulp.watch(["js/**/*"], gulp.series("js"));
  }));