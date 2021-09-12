const { gulp, parallel, src, dest, watch } = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass')(require('sass')),
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
    browserify = require('browserify'),
    babelify = require('babelify'),
    PluginError = require('plugin-error'),
    through2 = require('through2'),
    source     = require('vinyl-source-stream'),
    terser = require('gulp-terser'),
    paths = {
        root:       './',
        src:        'src/',
        assets:     'assets/',
        css:        'css/',
        js:         'js/',
        img:        'img/',
    };

//Uglify JavaScript files
// gulp.task('js', () => {
    
    // return gulp
    // .src([paths.src + paths.js + '**/*.js','!' + paths.src + paths.js + paths.ignore + '**/*.js'])
    // .pipe(babel({
    //     presets: ['@babel/env'],
    // }))
    // .pipe(gulp.dest(paths.assets + paths.js))
    // .pipe(uglify())
    // .pipe(rename({ extname: ".min.js" }))
    // .pipe(gulp.dest(paths.assets + paths.js));

//     let scriptList = [
//         'main'
//     ]

//     return browserify({
//         'entries': [paths.src + paths.js + scriptList[0] + '.js'],
//         'transform': [
//             ['babelify', { 'presets': ['@babel/env']}]
//     ]}) // browserify の設定をして・・・
//     .bundle() // 一つのファイルにまとめたものを 
//     .pipe(source(scriptList[0] + '.js')) // bundle.js という名前のファイルに記録して
//     .pipe(gulp.dest(paths.assets + paths.js)) // "./" に書き出します

// });

//watching task
// gulp.task('watch', () => {
//     gulp.watch(paths.src + paths.css + '**/*.scss', gulp.task('style'));
//     gulp.watch([paths.src + paths.css + '**/*.scss','!' + paths.src + paths.css + 'style.scss'], gulp.task('scss'));
//     gulp.watch(paths.src + paths.css + '**/*.css', gulp.task('cssmin'));
//     gulp.watch([paths.src + paths.js + '**/*.js','!' + paths.src + paths.js + paths.ignore + '**/*.js'], gulp.task('js'));
// });

//styleファイルの生成
const styleCss = function() {
    return src(paths.src + paths.css + 'style.scss')
    .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass({ outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(cleanCss({debug: true}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(dest(paths.root));
}

//その他のscss用のコンパイル
const normalScss = () => {
    return src([paths.src + paths.css + '**/*.scss','!' + paths.src + paths.css + 'style.scss'])
    .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass({ outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(cleanCss({debug: true}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(dest(paths.assets + paths.css));
}

//just minify for css libraries
const cssMinify = () => {
    return src(paths.src + paths.css + '**/*.css')
    .pipe(cleanCss({debug: true}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest(paths.assets + paths.css));
}

// jpg,png,gif画像の圧縮タスク
const imgMinify = () => {
    var srcGlob = paths.src + paths.img + '**/*.+(jpg|jpeg|png|gif)';
    var dstGlob = paths.assets + paths.img;
    return src( srcGlob )
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
    .pipe(dest( dstGlob ));
}

// svg画像の圧縮タスク
const svgMinify = () => {
    var srcGlob = paths.src + paths.img + '/**/*.+(svg)';
    var dstGlob = paths.assets + paths.img;
    return src( srcGlob )
    .pipe(changed( dstGlob ))
    .pipe(svgmin())
    .pipe(dest( dstGlob ));
}

//jsファイルのトランスパイル
const jsTrans = () => {

    return src(paths.src + paths.js + '**/*.js')
    .pipe(through2.obj((file, enc, callback) => {
      browserify(file.path)
        // ↓ 追加
        .transform('babelify', { presets: ['@babel/env'] })
        .bundle((err, buf) => {
          if (err !== null) {
            return callback(new PluginError('browserify', err, {
              showProperties: true,
            }));
          }
          file.contents = buf;
          callback(err, file);
        });
    }))
    .pipe(terser())
    .pipe(dest(paths.assets + paths.js));

}

exports.build = parallel(
    styleCss,
    normalScss,
    cssMinify,
    imgMinify,
    svgMinify,
    jsTrans,
);

exports.watch = function() {
    watch(paths.src + paths.css + 'style.scss', styleCss)
    watch([paths.src + paths.css + '**/*.scss','!' + paths.src + paths.css + 'style.scss'], normalScss)
    watch(paths.src + paths.js + '**/*.js', jsTrans)
};