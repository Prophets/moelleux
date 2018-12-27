const config = require('../../lib/configLoader');

if (!config.tasks.overview) return;

const gulp = require('gulp');
const render = require('gulp-nunjucks-render');
const data = require('gulp-data');
const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');
const handleErrors = require('../../lib/handleErrors');
const customNotifier = require('../../lib/customNotifier');
const getFolders = require('../../lib/getFolders');

const getData = () => {
    const dirs = getFolders(config.root.dest);

    let allData = {};
    allData.data = [];

    dirs.forEach((dir) => {
        const files = fs.readdirSync(path.join(config.root.dest, dir)).filter((file) => {
            return fs.statSync(path.join(config.root.dest, dir, file)).isFile();
        });

        allData.data.push({'dir': dir, 'files': files});
    });

    return allData;
};

const overviewTask = () => {
    const paths = {
        src: path.join(config.root.src, config.tasks.overview.src, config.tasks.overview.mainFile),
        dest: path.join(config.root.dest, config.tasks.overview.dest)
    }

    return gulp.src(paths.src)
        .pipe(data(getData()))
        .on('error', handleErrors)
        .pipe(render({
            path: path.src,
            envOptions: {
                watch: false
            }
        }))
        .on('error', handleErrors)
        .pipe(gulp.dest(config.root.dest))
        .pipe(customNotifier({ title: 'Overview created.' }));
}

gulp.task('overview', overviewTask);

module.exports = overviewTask;
