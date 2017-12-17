import storage from './storage.js';

const fetchNotes = async () => {
    let response = null;

    try {
        response = await storage.get('notes');
        response = response.notes;
    } catch (exception) {
        response = Promise.reject(exception);
    }

    return response;
};

const saveNotes = async (newNotes) => {
    let response = null;

    try {
        response = await storage.set('notes', newNotes);
    } catch (exception) {
        response = Promise.reject(exception);
    }

    return response;
};

/**
 * Event Listeners
 */

const browserWindow = window;
const browserDoc = document;
const log = console.log;

const notesTextArea = browserDoc.getElementById('notes-textarea');
const getNotes = () => notesTextArea.value;
const updateNotes = (newNotes) => {
    notesTextArea.value = newNotes;
};

browserDoc.getElementById('notes-save')
    .onclick = async (e) => {
        let newNotes = getNotes();

        if (newNotes) {
            try {
                updateNotes(
                    await saveNotes(newNotes)
                );
            } catch (exception) {
                log(exception);
            }
        }

        newNotes = null;
    };

/**
 * Main
 */

fetchNotes()
    .then(
        storedNotes => {
            storedNotes &&
            updateNotes(storedNotes);
        }
    );
