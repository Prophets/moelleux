const fs = require('fs');
const path = require('path');

module.exports = (dir) => {
    return fs.readdirSync(dir)
        .filter((file) => {
            return fs.statSync(path.join(dir, file)).isDirectory() && file !== 'core';
        });
};
