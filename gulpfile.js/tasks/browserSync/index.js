if (global.production) return;

const browserSync = require('browser-sync');
const gulp = require('gulp');
const config = require('../../lib/configLoader');
const pathToUrl = require('../../lib/pathToUrl');

const browserSyncTask = () => {
    const proxyConfig = config.tasks.browserSync.proxy || null;

    if (typeof(proxyConfig) === 'string') {
        config.tasks.browserSync.proxy = {
            target: proxyConfig
        };
    }

    const server = config.tasks.browserSync.proxy || config.tasks.browserSync.server;

    browserSync.init(config.tasks.browserSync);
};

gulp.task('browserSync', browserSyncTask);

module.exports = browserSyncTask;
