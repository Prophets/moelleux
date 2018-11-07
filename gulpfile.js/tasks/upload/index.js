const config = require('../../lib/configLoader');

const gulp = require('gulp');
const ftp = require('vinyl-ftp');
const path = require('path');
const customNotifier = require('../../lib/customNotifier');


const uploadTask = () => {
    if (!global.production) {
      return;
    }

    const connection = ftp.create({
        host: config.tasks.upload.cdn.host,
        user: config.tasks.upload.cdn.user,
        password: config.tasks.upload.cdn.password,
        port: config.tasks.upload.cdn.port,
        log: customNotifier
    });

    const excludeExtensions = path.normalize('!**/*.{' + config.tasks.upload.excludeExtensions.join(',') + '}');
    const excludeFolder = path.normalize('!**/css');

    const paths = {
        src: [path.join(config.root.dest, '/**/*'), excludeFolder, excludeExtensions]
    };

    return gulp.src(paths.src, { buffer: false })
        .pipe(connection.newer(config.tasks.upload.cdn.destination))
        .pipe(connection.dest(config.tasks.upload.cdn.destination))
        .pipe(customNotifier({ title: 'Assest uploaded to CDN' }));

}

gulp.task('upload', uploadTask);

module.exports = uploadTask;
