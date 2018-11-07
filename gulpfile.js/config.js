const getArg = require('./lib/getArg');
const destFolder = getArg('--build') ? './build' : './public';

module.exports = {
    'root': {
        'src': './src',
        'dest': destFolder
    },

    'tasks': {
        'browserSync': {},
        'css': {},
        'images': {},
        'production': {},
        'stylelint': {},
        'emails': {},
        'acid': {},
        'upload': {},
    }
};
