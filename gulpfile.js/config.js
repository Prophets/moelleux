require('dotenv').config();

const getArg = require('./lib/getArg');
const destFolder = getArg('--build') ? './build' : './public';

module.exports = {
    'root': {
        'src': './src',
        'dest': destFolder,
        'cdnPath': process.env.CDN_BASE_URL + '/' + process.env.CDN_DESTINATION
    },

    'tasks': {
        'browserSync': {},
        'css': {},
        'images': {},
        'production': {},
        'stylelint': {},
        'emails': {},
        'upload': {},
        'overview': {}
    }
};
