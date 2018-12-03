'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const prefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const svgSprite = require("gulp-svg-sprites");
const babel = require("gulp-babel");
const plumber = require('gulp-plumber');

const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

const rimraf = require('rimraf');

const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

const webpack = require("webpack-stream");

const path = {
    build: {
        html: 'assets/',
        htmlFrom: 'assets/**',
        htmlTo: 'html/',
        js: 'assets/js/',
        styleVendors: 'assets/css/',
        style: 'assets/css/',
        img: 'assets/img/',
        fonts: 'assets/fonts/',
        icons: 'assets/icons/',
        files: 'assets/files/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/app.js',
        styleVendors: 'src/style/vendors.sass',
        style: 'src/style/main.sass',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        icons: 'src/icons/*.svg',
        files: 'src/files/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.sass',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        icons: 'src/icons/*.svg',
        files: 'src/files/*.*'
    },
    clean: './assets'
};

gulp.task('html:build', () => {
    return gulp.src(path.src.html)
        // .pipe(plumber())
        // .pipe(pug({
        //     pretty: true
        // }))
        .pipe(gulp.dest(path.build.html))
        // .pipe(reload({stream: true}));
});

gulp.task('js:build', () => {
    let config = require('./webpack.config.js');
    return gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(webpack(config))
        .pipe(gulp.dest(path.build.js))
        // .pipe(reload({stream: true}));
});

gulp.task('styleVendors:build', () => {
    return gulp.src(path.src.styleVendors)
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.build.styleVendors))
        // .pipe(reload({stream: true}));
});

gulp.task('style:build', () => {
    return gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefixer({
            browsers: 'last 2 versions'
        }))
        .pipe(gulp.dest(path.build.style))
        // .pipe(reload({stream: true}));
});

gulp.task('image:build', () => {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        // .pipe(reload({stream: true}));
});

gulp.task('fonts:build', () => {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('sprite:build', () => {
    return gulp.src(path.src.icons)
        .pipe(svgSprite({
            mode: "symbols",
            selector: "icon-%f"
        }))
        .pipe(gulp.dest(path.build.icons))
});

gulp.task('moveHtmlFolder:build', () => {
    return gulp.src(path.build.htmlFrom)
        .pipe(gulp.dest(path.build.htmlTo))
});

gulp.task('moveFiles:build', () => {
    return gulp.src(path.src.files)
        .pipe(gulp.dest(path.build.files))
});

gulp.task('webserver', () =>{
    browserSync.init({
        server: 'assets',
        stream: true,
    });
    browserSync.watch('assets').on('change', browserSync.reload);
});

gulp.task('clean', (cb) => {
    return rimraf(path.clean, cb);
});

gulp.task(
    'build',
    gulp.series(gulp.parallel('html:build', 'js:build', 'styleVendors:build', 'style:build', 'fonts:build', 'image:build', 'sprite:build', 'moveHtmlFolder:build', 'moveFiles:build'))
);

gulp.task('watch', () => {
    gulp.watch([path.watch.html], gulp.series('html:build'));
    gulp.watch([path.watch.style], gulp.series('styleVendors:build'));
    gulp.watch([path.watch.style], gulp.series('style:build'));
    gulp.watch([path.watch.js], gulp.series('js:build'));
    gulp.watch([path.watch.img], gulp.series('image:build'));
    gulp.watch([path.watch.fonts], gulp.series('fonts:build'));
    gulp.watch([path.watch.icons], gulp.series('sprite:build'));
    gulp.watch([path.watch.files], gulp.series('moveFiles:build'));
});

gulp.task(
  'default',
  gulp.series('clean', gulp.parallel('clean', 'build', 'webserver', 'watch'))
);