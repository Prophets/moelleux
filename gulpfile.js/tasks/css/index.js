const config = require('../../lib/configLoader');

if (!config.tasks.css) return;

const gulp = require('gulp');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const path = require('path');
const handleErrors = require('../../lib/handleErrors');
const customNotifier = require('../../lib/customNotifier');
const getFolders = require('../../lib/getFolders');
const merge = require('merge-stream');

const cssTask = () => {
    const tasks = getFolders(config.root.src).map((folder) => {
        const paths = {
            src: path.join(config.root.src, folder, config.tasks.css.childSrc, '/**/*.{' + config.tasks.css.extensions + '}'),
            dest: path.join(config.root.dest, folder, config.tasks.css.dest)
        };

        return gulp.src(paths.src)
             .pipe(sass(config.tasks.css.sass))
            .on('error', handleErrors)
            .pipe(autoprefixer())
            .pipe(gulpif(global.production, cssnano({
                autoprefixer: false
            })))
            .pipe(gulp.dest(paths.dest))
            .pipe(customNotifier({ title: 'CSS compiled' }))
            .pipe(browserSync.stream());
    });

    return merge(tasks);
};

gulp.task('css', cssTask);

module.exports = cssTask;
