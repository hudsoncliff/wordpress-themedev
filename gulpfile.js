var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    changed  = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    imageminJpg = require('imagemin-jpeg-recompress'),
    imageminPng = require('imagemin-pngquant'),
    imageminGif = require('imagemin-gifsicle'),
    svgmin = require('gulp-svgmin'),
    autoprefixer = require('gulp-autoprefixer'),
    paths = {
        themeRoot:        './',
        src:        'src/',
        assets:     'assets/',
        css:        'css/',
        js:         'js/',
        img:        'img/',
    };

//style.scss compiler
gulp.task('style', function(){
    return gulp
        .src(paths.src + paths.css + 'style.scss')
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sass({ outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(cleanCss({debug: true}, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(gulp.dest(paths.themeRoot));
});

//just minify for css libraries
gulp.task('cssmin', function(){
    return gulp.src(paths.src + paths.css + '**/*.css')
    .pipe(cleanCss({debug: true}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest(paths.dist + paths.css));
});

//Uglify JavaScript files
gulp.task('js', function () {
    return gulp
        .src([paths.src + paths.js + '**/*.js','!' + paths.src + paths.js + paths.ignore + '**/*.js'])
        .pipe(babel({
            presets: ['@babel/env'],
        }))
        .pipe(gulp.dest(paths.distJs))
        .pipe(uglify())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(gulp.dest(paths.dist + paths.js));
});

// jpg,png,gif画像の圧縮タスク
gulp.task('imagemin', function(callback){
    var srcGlob = paths.src + paths.img + '**/*.+(jpg|jpeg|png|gif)';
    var dstGlob = paths.assets + paths.img;
    gulp.src( srcGlob )
    .pipe(plumber())
    .pipe(changed( dstGlob ))
    .pipe(imagemin([
        imageminPng(),
        imageminJpg(),
        imageminGif({
            interlaced: false,
            optimizationLevel: 3,
            colors:180
        })
    ]))
    .pipe(gulp.dest( dstGlob ));
    callback();
});
// svg画像の圧縮タスク
gulp.task('svgmin', function(){
    var srcGlob = paths.srcImg + '/**/*.+(svg)';
    var dstGlob = paths.dstImg;
    gulp.src( srcGlob )
    .pipe(changed( dstGlob ))
    .pipe(svgmin())
    .pipe(gulp.dest( dstGlob ));
});

//watching task
gulp.task('watch', function(){
    gulp.watch(paths.src + paths.css + '**/*.scss', gulp.task('style'));
    gulp.watch([paths.src + paths.css + '**/*.scss','!' + paths.src + paths.css + 'style.scss'], gulp.task('scss'));
    gulp.watch(paths.src + paths.css + '**/*.css', gulp.task('cssmin'));
    gulp.watch([paths.src + paths.js + '**/*.js','!' + paths.src + paths.js + paths.ignore + '**/*.js'], gulp.task('js'));
});