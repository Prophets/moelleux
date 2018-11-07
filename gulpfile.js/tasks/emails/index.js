const config = require('../../lib/configLoader');

if (!config.tasks.emails) return;

const browserSync = require('browser-sync');
const data = require('gulp-data');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const merge = require('merge-stream');
const htmlmin = require('gulp-htmlmin');
const render = require('gulp-nunjucks-render');
const gulpSequence = require('gulp-sequence');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const handleErrors = require('../../lib/handleErrors');
const customNotifier = require('../../lib/customNotifier');
const inlinesource = require('gulp-inline-source');
const mjml = require('gulp-mjml');
const mjmlEngine = require('mjml').default;
const fileExists = require('file-exists');
const rename = require('gulp-rename');
const flatten = require('lodash/flatten');
const getFolders = require('../../lib/getFolders');

const getLanguages = (folder) => {
    let location = './' + folder;

    if (!fileExists.sync(path.join(config.root.src , folder, 'config.yaml'))) {
        location = './core';
    }

    const langPath = path.resolve(config.root.src, location);
    const data = yaml.safeLoad(fs.readFileSync(path.join(langPath, 'config.yaml'), 'utf8'));

    return data.languages;
}

const getData = (folder, lang) => {
    let allData = {};

    allData['folder'] = folder;

    const filePaths = [
        { type: 'core', file: path.resolve(config.root.src, './core/data', lang + '.yaml') },
        { type: 'content', file: path.resolve(config.root.src, folder, './data', lang + '.yaml') }
    ];

    filePaths.forEach((filePath) => {
        allData[filePath.type] = yaml.safeLoad(fs.readFileSync(filePath.file),'utf8');
    });

    return allData;
};

const emailsTask = () => {
    const exclude = path.normalize('!**/{' + config.tasks.emails.excludeFolders.join(',') + '}/**');

    const inlineOptions = {
        attribute: config.tasks.emails.inlinesource.attribute,
        compress: config.tasks.emails.inlinesource.compress,
        handlers: [
            (source, context, next) => {
                if (source.tag == 'mj') {
                    inlineAttr = '';
                    if (source.attributes.inline) {
                        inlineAttr = ' inline="inline"';
                    }

                    source.replace = '<mj-style' + inlineAttr + ">\n" + source.fileContent;
                }

                next();
            }
        ]
    }

    const imagesRoot = global.production ? config.root.cdnPath : '';

    const tasks = getFolders(config.root.src).map((folder) => {

        const imagesDestination = imagesRoot + '/' + folder + '/images';

        const subtasks = getLanguages(folder).map((lang) => {
            const paths = {
                src: [path.join(config.root.src, folder, 'templates',  '/**/*.{' + config.tasks.emails.extensions + '}'), exclude],
                dest: path.join(config.root.dest, config.tasks.emails.dest, folder, '/')
            };

            return gulp.src(paths.src)
                .pipe(data(getData(folder, lang)))
                .on('error', handleErrors)
                .pipe(render({
                    path: [path.join(config.root.src, folder, 'templates'), path.join(config.root.src, 'core/templates')],
                    envOptions: {
                        watch: false
                    },
                    manageEnv(env) {
                        env.addGlobal('imagePath', imagesDestination);
                    }
                }))
                .on('error', handleErrors)
                .pipe(inlinesource(inlineOptions))
                .on('error', handleErrors)
                .pipe(mjml(mjmlEngine, { minify: config.tasks.emails.mjml.minify }))
                .on('error', handleErrors)
                .pipe(rename({suffix: '-' + lang}))
                .on('error', handleErrors)
                .pipe(gulp.dest(paths.dest))
                .on('end', browserSync.reload)
                .pipe(customNotifier({ title: 'E-mail template(s) compiled' }));
        });

        return subtasks;
    });

    return merge(flatten(tasks));
};


gulp.task('emails', emailsTask);

module.exports = emailsTask;
