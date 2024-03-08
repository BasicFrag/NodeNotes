const fs = require('fs');
const chalk = require('chalk');

const addNotes = (title, body) => {
    const notes = [...loadNotes()];
    const duplicatesNotes = notes.filter(note => note.title === title)

    if (duplicatesNotes.length === 0) {
        notes.push({
            title,
            body
        })
        saveNotes(notes);
        console.log(chalk.green.bold.inverse('New note added!'));
    } else {
        console.log(chalk.red.bold.inverse("Note title taken!"));
    }

}

const readNote = (title) => {
    const notes = [...loadNotes()];
    const noteToRead = notes.find(note => note.title === title);

    if (noteToRead) {
        console.log(chalk.blue.italic.bold(noteToRead.title));
        console.log(noteToRead.body);
    } else {
        console.log(chalk.red.bold.inverse('No note found!'));
    }
}

const saveNotes = (notes) => {
    const newDataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', newDataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        return JSON.parse(dataBuffer);
    } catch (e) {
        return [];
    }
}

const removeNotes = (title) => {
    const notes = [...loadNotes()];
    const filteredNotes = notes.filter(note => note.title !== title);
    if (filteredNotes.length === notes.length) {
        console.log(chalk.bold.bgRed("No such note!"));
    } else {
        saveNotes(filteredNotes);
        console.log(chalk.bold.bgGreen("Note removed!"));
    }

    // if(noteIndex !== -1) {
    //     console.log(`Removing note titled '${(notes[noteIndex]).title}' ...`);
    //     notes.splice(noteIndex,1);
    //     saveNotes(notes);
    // } else {
    //     console.log("No such note!");
    // }

}

const listNotes = () => {
    const notes = [...loadNotes()];
    if (notes.length === 0) return console.log(chalk.red.bold.inverse("No notes found!"));
    else {
        console.log(chalk.blue.underline.italic.bold("Your notes..."));
        for(const note of notes) {
            console.log(note.title);
        }
        
    }
}

module.exports = { addNotes, saveNotes, loadNotes, removeNotes, listNotes, readNote };