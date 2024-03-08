const yargs = require('yargs');
const notes = require('./notes.js');


yargs.version('1.1.0');

yargs.command('add', 'Add a new note', {
    title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
    },
    body: {
        describe: 'Note body',
        demandOption: true,
        type: 'string'
    }
}, argsv => notes.addNotes(argsv.title, argsv.body));

yargs.command('remove', 'Remove a note', {
    title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
    }
}, argsv => notes.removeNotes(argsv.title));

yargs.command('list', 'Lists all of the notes', {}, () => notes.listNotes());

yargs.command('read', 'Get a note and display on the console', {
    title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
    }
}, argsv => notes.readNote(argsv.title));

yargs.parse();