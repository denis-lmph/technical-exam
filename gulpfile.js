const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minifyCSS = require('gulp-csso');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

function compileSass() {
    return src('src/scss/style.scss')
        .pipe(sass())
        .pipe(dest('dist/css'))
        .pipe(minifyCSS())
        .pipe(rename('style.min.css'))
        .pipe(dest('dist/css'));
}

function minifyJS() {
    return src('src/js/script.js')
        .pipe(uglify())
        .pipe(rename('script.min.js'))
        .pipe(dest('dist/js'));
}

function copyHTML() {
    return src('src/**/*.html')
        .pipe(dest('dist'));
}

function copyImages() {
    return src('src/images/**/*')
        .pipe(dest('dist/images'));
}

function watchFiles() {
    watch('src/scss/**/*.scss', compileSass);
    watch('src/js/**/*.js', minifyJS);
    watch('src/**/*.html', copyHTML);
    watch('src/images/**/*', copyImages);
}

exports.default = series(compileSass, minifyJS, copyHTML, copyImages, watchFiles);
