require('dotenv').config();

module.exports = {
    'notWatchable': true,
    'excludeExtensions': ['html', 'css'],
    'cdn': {
        'host': process.env.CDN_HOST,
        'user': process.env.CDN_USER,
        'password': process.env.CDN_PASSWORD,
        'port': 21,
        'destination': process.env.CDN_DESTINATION
    }
}
