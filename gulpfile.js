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

///////////////////////============HTML=============///////////////////////
const html = () => {
    return src("src/*.html")
        .pipe(rigger())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(dest("dist/"))
        .pipe(reload({stream: true}));
};
exports.html = html;

const htmlTemplates = () => {
    return src("src/templates/*.html")
        .pipe(rigger())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(dest("dist/templates/"))
        .pipe(reload({stream: true}));
};
exports.htmlTemplates = htmlTemplates;

///////////////////////============CSS=============///////////////////////
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

///////////////////////============JS=============///////////////////////
const scripts = () => {
    return src("src/js/**/*.js")
        .pipe(rigger())
        .pipe(dest("dist/js"))
        .pipe(reload({stream: true}));
};
exports.scripts = scripts;

///////////////////////============LIBS=============///////////////////////
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

/////////////////////============FONTS||IMG=============/////////////////////
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

/////////////////////============SERVER||CLEAN=============/////////////////////
const server = () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        notify: false
    },)

    watch("src/*.html").on('change', series(html));
    watch("src/templates/*.html").on('change', series(htmlTemplates, html));
    watch("src/scss/**/*.+(scss|sass)").on('change', series(styles));
    watch("src/js/**/*.js").on('change', series(scripts));

    watch("src/libs/css/**/*.css").on('change', series(styleLib));
    watch("src/libs/js/**/*.js").on('change', series(scriptLib));

    watch("src/fonts/**/*").on('change', series(fonts));
    watch("src/img/**/*").on('change', series(img));
};
exports.server = server;

const clean = async () => {
    return del.sync('dist');
};

/////////////////////============LAUNCH_GULP=============/////////////////////
exports.default = series(
    clean,
    parallel(html, htmlTemplates, styles, styleLib, fonts, img, scripts, scriptLib),
    server
);

exports.dev = series(
    clean,
    parallel(html, htmlTemplates, styles, styleLib, fonts, img, scripts, scriptLib),
    server
);

