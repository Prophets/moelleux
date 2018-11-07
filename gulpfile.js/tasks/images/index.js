const config = require('../../lib/configLoader');

if (!config.tasks.images) return;

const browserSync = require('browser-sync');
const changed = require('gulp-changed');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const path = require('path');
const customNotifier = require('../../lib/customNotifier');
const merge = require('merge-stream');
const getFolders = require('../../lib/getFolders');

const imagesTask = () => {
    const tasks = getFolders(config.root.src).map((folder) => {
        const paths = {
            src: [
                path.join(config.root.src, folder, config.tasks.images.src, '/**/*.{' + config.tasks.images.extensions + '}'),
                path.join(config.root.src, 'core', config.tasks.images.src, '/**/*.{' + config.tasks.images.extensions + '}')
            ],
            dest: path.join(config.root.dest, folder, config.tasks.images.dest)
        };

        return gulp.src(paths.src.concat(['*!README.md']))
            .pipe(changed(paths.dest)) // Ignore unchanged files
            .pipe(imagemin()) // Optimize
            .pipe(gulp.dest(paths.dest))
            .pipe(customNotifier({ title: 'Images minified' }))
            .pipe(browserSync.stream());

    });

    return merge(tasks);
};

gulp.task('images', imagesTask);

module.exports = imagesTask;
