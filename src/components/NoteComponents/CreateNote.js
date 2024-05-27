import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function CreateNote({ saveHandler, fetchNotes }) {
  const [note, setNote] = useState({ title: "", text: "" });

  const handleTitleChange = (event) => {
    setNote({ ...note, title: event.target.value });
  };

  const handleTextChange = (event) => {
    setNote({ ...note, text: event.target.value });
  };

  const handleSave = async () => {
    try {
      await saveHandler(note);
      
      setNote({ title: "", text: "" });
      
      fetchNotes();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <div className="note">
      <input
        type="text"
        placeholder="Title"
        value={note.title}
        onChange={handleTitleChange}
        required
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "10px",
          border: "none",
          backgroundColor: "transparent",
          width: "100%",
          outline: "none",
        }}
      />
      <textarea
        cols="10"
        rows="5"
        value={note.text}
        placeholder="Type...."
        onChange={handleTextChange}
        maxLength="1000"
        required
        style={{
          width: "100%",
          resize: "none",
          overflowY: "auto",
          height: "150px",
          marginBottom: "0",
        }}
      ></textarea>
      <div className="note__footer">
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateNote;
