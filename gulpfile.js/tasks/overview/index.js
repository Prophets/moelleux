const config = require('../../lib/configLoader');

if (!config.tasks.overview) return;

const gulp = require('gulp');
const render = require('gulp-nunjucks-render');
const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');
const getFolders = require('../../lib/getFolders');

const overviewTask = () => {
    const paths = {
        src: path.join(config.root.src, config.tasks.overview.src, config.tasks.overview.mainFile),
        dest: path.join(config.root.dest, config.tasks.overview.dest)
    }

    return gulp.src(paths.src)
        .pipe(render({
            path: path.src,
            envOptions: {
                watch: false
            },
            manageEnv(env) {
                env.addExtension('overview', new Overview());
            }
        }))
        .pipe(gulp.dest(config.root.dest))
}

gulp.task('overview', overviewTask);

module.exports = overviewTask;

function Overview() {
    this.tags = ['overview'];

    this.parse = function(parser, nodes, lexer) {
        const tok = parser.nextToken();

        const args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);

        const body = parser.parseUntilBlocks('error', 'endoverview');
        let errorBody = null;

        if (parser.skipSymbol('error')) {
            parser.skip(lexer.TOKEN_BLOCK_END);
            errorBody = parser.parseUntilBlocks('endoverview');
        }

        parser.advanceAfterBlockEnd();

        return new nodes.CallExtension(this, 'run', args, [body, errorBody]);
    }

    this.run = function(context, url, body, errorBody) {
        let output = '<ul>';
        const dirs = getFolders(config.root.dest);

        dirs.forEach((dir) => {
            output += '<li>' + dir + '</li>';
            output += '<ul>';

            const files = fs.readdirSync(path.join(config.root.dest, dir)).filter((file) => {
                return fs.statSync(path.join(config.root.dest, dir, file)).isFile();
            });
            files.forEach((file) => {
                output += '<li><a href="' + dir + '/' + file + '">' + file + '</a></li>';
            });

            output += '</ul>';
        });

        output += '</ul>';

        return new nunjucks.runtime.SafeString('<div>' + output + '</div>');
    }
}
