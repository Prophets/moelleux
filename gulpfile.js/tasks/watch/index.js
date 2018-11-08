const config = require('../../lib/configLoader');

const gulp = require('gulp');
const path = require('path');
const watch = require('gulp-watch');
const gulpSequence = require('gulp-sequence');
const getEnabledTasks = require('../../lib/getEnabledTasks');

const watchTask = () => {
    const tasks = getEnabledTasks();
    const watchableTasks = [
        ...tasks.assetTasks,
        ...tasks.codeTasks,
        ...tasks.lintTasks
    ];

    watchableTasks.forEach((taskName) => {
        const task = config.tasks[taskName];
        if (task && task.notWatchable !== true) {
            const glob = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}');

            watch(glob, () => {
                const task = require('../' + taskName);

                if (taskName === 'css') {
                    const cssWatchTask = () => {
                        gulpSequence('css', 'emails')();
                    };

                    cssWatchTask();
                } else {
                    task();
                }
            });
        }
    });
};

gulp.task('watch', ['browserSync'], watchTask);

module.exports = watchTask;
