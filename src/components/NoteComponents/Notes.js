//Notes.js
import React, { useState } from "react";
import "../css/Note.css";
import CreateNote from "./CreateNote";
import Note from "./Note";
import { v4 as uuid } from "uuid";

function Notes() { 
    // States
    const [notes, setNotes] = useState([]);
    const [inputText, setInputText] = useState("");

    // Handler to update inputText state
    const textHandler = (e) => {
        setInputText(e.target.value);
    };

    // Handler to add a new note to the state array
    const saveHandler = () => {
        setNotes((prevNotes) => [
            ...prevNotes,
            {
                id: uuid(),
                text: inputText,
            },
        ]);
        // Clear the textarea
        setInputText("");
    };

    // Handler to delete a note
    const deleteNote = (id) => {
        const filteredNotes = notes.filter((note) => note.id !== id);
        alert(" Are you sure you want to delete the note???")
        console.log(id);
        setNotes(filteredNotes);
    }; 
    if (!title.trim()) {
        return (
          <div className="note empty-note">
            <div className="empty-note-content">
              <div className="empty-note-title"></div>
            </div>
          </div>
        );
      }
    return (
        <div className="notes">
            {/* Mapping through notes array to render Note components */}
            {notes.map((note) => (
                <Note
                    key={note.id}
                    id={note.id}
                    text={note.text}
                    deleteNote={deleteNote}
                />
            ))}
            {/* Render CreateNote component */}
            <CreateNote
                textHandler={textHandler}
                saveHandler={saveHandler}
                inputText={inputText}
            />
        </div>
    );
}

export default Notes;
