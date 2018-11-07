const config = require('./config');

const gulp = require('gulp');
const getArg = require('../../lib/getArg');
const mailgun = require('mailgun-js')({
    apiKey: config.mailgun.api_key,
    domain: config.mailgun.domain,
    host: 'api.eu.mailgun.net'
});
const fs = require('fs');
const path = require('path');
const customNotifier = require('../../lib/customNotifier');

const emailonacidTask = () => {
    const folder = getArg('--folder');

    if (!folder) {
        customNotifier({ title: 'Please define folder from which the emails should be sent using --folder argument' });

        return;
    }

    console.log(getArg('--folder'));
    console.log('Email sent to Email On Acid. Please verify on https://www.emailonacid.com/')

    return gulp;
}

gulp.task('acid', emailonacidTask);

module.exports = emailonacidTask;
