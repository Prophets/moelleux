module.exports = {
    'taskName': 'emails',
    'src': './',
    'childSrc': 'templates',
    'dest': './',
    'htmlmin': {
        'collapseWhitespace': true
    },
    'extensions': ['njk', 'yml', 'yaml'],
    'excludeFolders': ['core', 'layouts', 'partials', 'shared', 'macros', 'data'],
    'inlinesource': {
        'attribute': 'cssinline',
        'compress': false
    },
    'mjml': {
        'minify': false
    }
};
