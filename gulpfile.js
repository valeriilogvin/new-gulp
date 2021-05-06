const {src, dest, parallel, series, watch} = require('gulp');

const browserSync = require('browser-sync'),
    reload = browserSync.reload,
    rigger = require('gulp-rigger'),  //= папка с шаблонами/название файла.html
    scss = require('gulp-sass'),
    preFixer = require('gulp-autoprefixer'),
    combineMedia = require('gulp-combine-media'),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    htmlmin = require('gulp-htmlmin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    rename = require('gulp-rename');


/*
* HTML
* */
const html = () => {
    return src("src/*.html")
        .pipe(rigger())
        .pipe(htmlmin({collapseWhitespace: false}))
        .pipe(dest("dist/"))
        .pipe(reload({stream: true}));
};
exports.html = html;

/*
* CSS
* */
const styles = () => {
    return src("src/scss/main.scss")
        .pipe(scss().on('error', scss.logError))
        .pipe(preFixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(combineMedia())
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest("dist/css"))
        .pipe(reload({stream: true}));
};
exports.styles = styles;

/*
* JS
* */
const scripts = () => {
    return src("src/js/**/*.js")
        .pipe(rigger())
        .pipe(dest("dist/js"))
        .pipe(reload({stream: true}));
};
exports.scripts = scripts;

/*
* libs
* */
const styleLib = () => {
    return src("src/libs/css/**/*.css")
        .pipe(cssnano())
        .pipe(concat('libs.min.css'))
        .pipe(dest("dist/css"))
        .pipe(reload({stream: true}));
};
exports.styleLib = styleLib;

const scriptLib = () => {
    return src("src/libs/js/**/*.js")
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(dest("dist/js"))
        .pipe(reload({stream: true}));
};
exports.scriptLib = scriptLib;

/*
* fonts & img
* */
const fonts = () => {
    return src("src/fonts/**/*")
        .pipe(dest("dist/fonts"))
        .pipe(reload({stream: true}));
};
exports.fonts = fonts;

const img = () => {
    return src("src/img/**/*")
        .pipe(dest("dist/img"))
        .pipe(reload({stream: true}));
};
exports.img = img;

/*
* clean
* */
const clean = async () => {
    return del.sync('dist');
};

/*
* server
* */
const server = () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        notify: false
    },)
};
exports.server = server;

/*
* watcher
* */
const watcher = async () => {
    watch(["src/*.html"], {usePolling: true}, html);
    watch(["src/templates/**/*.html"], {usePolling: true}, html);
    watch(["src/scss/**/*.+(scss|sass)"], {usePolling: true}, styles);
    watch(["src/js/**/*.js"], {usePolling: true}, scripts);

    watch(["src/libs/css/**/*.css"], {usePolling: true}, styleLib);
    watch(["src/libs/js/**/*.js"], {usePolling: true}, scriptLib);

    watch(["src/fonts/**/*"], {usePolling: true}, fonts);
    watch(["src/img/**/*"], {usePolling: true}, img);
};
exports.watcher = watcher;

/*
* run
* */
exports.prod = series(
    clean,
    parallel(html, styles, styleLib, fonts, img, scripts, scriptLib),
)

exports.dev = series(
    clean,
    parallel(html, styles, styleLib, fonts, img, scripts, scriptLib),
    watcher,
    server
);


exports.wp = series(
    parallel(styles, styleLib, scriptLib),
    watcher
);

