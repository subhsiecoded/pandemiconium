import React, { useState, useRef, useEffect } from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

function Note({
  id,
  title,
  text,
  note,
  color,
  deleteNote,
  saveNote,
  timestamp,
}) {
  const [editedNote, setEditedNote] = useState({ title, text, timestamp });
  const [isEdited, setIsEdited] = useState(false);
  const textareaRef = useRef(null);

  const handleTitleChange = (event) => {
    setEditedNote({ ...editedNote, title: event.target.value });
  };

  const handleDelete = () => {
    deleteNote(note);
  };

  const handleTextChange = (event) => {
    setEditedNote({ ...editedNote, text: event.target.value });
  };

  const handleSave = () => {
    const newTimestamp = new Date().toISOString();
    saveNote(editedNote.title, editedNote.text, newTimestamp);
    setIsEdited(false);
  };

  const handleEditClick = () => {
    setIsEdited(true);
    setEditedNote({ title, text, color });
  };

  useEffect(() => {
    if (isEdited) {
      textareaRef.current.focus();
    }
  }, [isEdited]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const month = date.toLocaleString("default", { month: "short" });
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return `${date.getDate()} ${month} ${date.getFullYear()} ${time}`;
  };

  return (
    <div
      className="note"
      style={{ backgroundColor: isEdited ? editedNote.color : color }}
      onClick={isEdited ? null : handleEditClick}
    >
      {isEdited ? (
        <div className="d-flex flex-column">
          <input
            type="text"
            value={editedNote.title}
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
            ref={textareaRef}
            value={editedNote.text}
            onChange={handleTextChange}
            maxLength="1000"
            required
            style={{
              width: "100%",
              resize: "none",
              overflowY: "auto",
              height: "150px",
              marginBottom: "0",
              fontFamily: "inherit",
              fontSize: "18px",
            }}
          />
          <div className="d-flex align-items-center">
            <button className="btn btn-primary ml-2" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="note__header">
            <h3 style={{ fontWeight: "bold" }}>{title}</h3>
          </div>
          {text && (
            <textarea
              value={text}
              readOnly
              style={{
                width: "100%",
                resize: "none",
                overflowY: "auto",
                height: "150px",
                marginBottom: "0",
                fontFamily: "inherit",
                fontSize: "18px",
                border: "none",
                backgroundColor: "transparent",
                outline: "none",
              }}
            >
              {text}
            </textarea>
          )}
          <div
            className="note__footer"
            style={{ justifyContent: "space-between", alignItems: "flex-end" }}
          >
            {text && <div className="text-counter">{text.length}/1000</div>}
            <div className="note-timestamp">{formatTimestamp(timestamp)}</div>
            <DeleteForeverOutlinedIcon
              className="note__delete"
              onClick={handleDelete}
              aria-hidden="true"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Note;
