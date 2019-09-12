const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

sass.compiler = require('node-sass');

function js() {
  return gulp
    .src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
}

function css() {
  const plugins = [
    cssnano,
    autoprefixer({ browsers: ['> 1%'], cascade: false })
  ];

  return gulp
    .src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./public/css'));
}

function watchcss() {
  gulp.watch('./src/sass/**/*.scss', css);
}

function watchjs() {
  gulp.watch('./src/js/**/*.js', js);
}

exports.css = css;
exports.js = js;
exports.dev = gulp.parallel(watchcss, watchjs);
exports.default = gulp.parallel(css, js);
