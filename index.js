const yargs = require('yargs');
const path = require('path');

const readFile = require('./lib/readFile');
const writeFile = require('./lib/writeFile');
const minify = require('./lib/minify');
const format = require('./lib/format');
const parse = require('./lib/parse');

yargs
    .command({
        command: 'minify <file>', 
        aliases: ['m'],
        desc: 'Minify a file', 
        builder: (yargs) => {
            yargs.positional('file', {
                describe: 'A xml or json file',
                type: 'string'
            });
            yargs.option('encoding', {
                alias: 'enc',
                default: 'utf8',
                describe: 'Pass the encoding of the source file',
                type: 'string'
            });
        },
        handler: (argv) => {
            const file = argv.file;
            const encoding = argv.encoding;
            readFile(file, encoding)
            .then((data) => {
                return minify(file, data);
            })
            .then((writeData) => {
                return writeFile(file, writeData);
            })
            .then(() => {
                console.log('The file has been minified!');
            })
            .catch((error) => {
                console.error(error.message);
            });
        }
    })
    .command({
        command: 'format <file>', 
        aliases: ['f'],
        desc: 'Format a file', 
        builder: (yargs) => {
            yargs.positional('file', {
                describe: 'A xml or json file',
                type: 'string'
            });
            yargs.option('encoding', {
                alias: 'enc',
                default: 'utf8',
                describe: 'Pass the encoding of the source file',
                type: 'string'
            });
        },
        handler: (argv) => {
            const file = argv.file;
            const encoding = argv.encoding;
            readFile(file, encoding)
            .then((data) => {
                return format(file, data);
            })
            .then((writeData) => {
                return writeFile(file, writeData);
            })
            .then(() => {
                console.log('The file has been formatted!');
            })
            .catch((error) => {
                console.error(error.message);
            });
        }
    })
    .command({
        command: 'parse <file>', 
        aliases: ['p'],
        desc: 'Parse a file', 
        builder: (yargs) => {
            yargs.positional('file', {
                describe: 'A xml or json file',
                type: 'string'
            });
            yargs.option('encoding', {
                alias: 'enc',
                default: 'utf8',
                describe: 'Pass the encoding of the source file',
                type: 'string'
            });
        },
        handler: (argv) => {
            const file = argv.file;
            const encoding = argv.encoding;
            const extension = path.extname(file);
            const newFile = (extension === '.xml') ? file.replace(extension, '.json') : file.replace(extension, '.xml');
            readFile(file, encoding)
            .then((data) => {
                return parse(file, data);
            })
            .then((writeData) => {
                return writeFile(newFile, writeData);
            })
            .then(() => {
                console.log('The file has been formatted to ' + path.basename(newFile) + '!');
            })
            .catch((error) => {
                console.error(error.message);
            })
        }
    })
    .demandCommand(1, 'You need at least one command before moving on')
    .help()
    .argv
