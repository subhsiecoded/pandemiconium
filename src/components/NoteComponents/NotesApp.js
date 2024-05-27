import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Note.css";
import "../css/CustomScrollbar.css";
import CreateNote from "./CreateNote";
import Header from "./Header";
import Note from "./Note";
import CurrentDateTime from "../CurrentDateTime";
import { v4 as uuid } from "uuid";
import logoWatermark from "../img/notes.png";
import styled from "styled-components";
import logo from "../img/logonav.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DarkMode } from "@mui/icons-material";

const Container = styled.div`
  color: ${(props) => (props.darkMode ? "white" : "black")};
  background-image: url(${logoWatermark});
  background-repeat: repeat;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 50px;
  background-position: center;
  background-attachment: fixed;
  animation: animateBackground 15s linear infinite;

  @keyframes animateBackground {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 100% 100%;
    }
  }
`;
const StyledNav = styled.nav`
  background-color: #343a40;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 0.5rem 1rem;

  .navbar-brand {
    color: #fff;
  }

  .nav-link {
    color: #ccc;
    transition: color 0.3s ease, background-color 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;

    &:hover {
      background-color: #fff;
      color: #343a40;
    }

    &.active {
      background-color: #007bff;
      color: #fff;
    }
  }

  .navbar-toggler {
    border-color: #ccc;
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(255, 255, 255, 0.8)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"); /* Change the toggler icon to a custom SVG */
  }
`;
const NotesApp = ({ onLogout, darkMode, userId }) => {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [noteColor, setNoteColor] = useState("rgba(44, 36, 36, 0.25)");
  const [noteTransparency, setNoteTransparency] = useState(0.85);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { token } = JSON.parse(userId);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    const storedUserId = JSON.parse(localStorage.getItem("userId"));
    if (storedUserId) {
      fetchNotes(storedUserId);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fetchNotes = async (userId) => {
    try {
      const response = await fetch(
        `https://pandemiconiummanager.azurewebsites.net/GetNotes/${userId["token"]}`
      );
      const data = await response.json();
      //console.log("Fetched Data:", data);
      if (Array.isArray(data) && data.length > 0) {
        setNotes(
          data.map((note) => ({
            ...note,
            time_created: new Date(note.time_created).toISOString(),
          }))
        );
        // console.log("Updated Notes State:", notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  const titleHandler = (e) => {
    setInputTitle(e.target.value);
  };

  const changeColor = (newColor) => {
    setNoteColor(newColor);
  };

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

  const changeTransparency = (newTransparency) => {
    setNoteTransparency(newTransparency);
  };

  const saveHandler = async (note) => {
    try {
      const response = await fetch(
        `https://pandemiconiummanager.azurewebsites.net/SaveNote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: String(token),
            title: note.title,
            note: note.text,
            time_created: new Date().toISOString(),
          }),
        }
      );
      if (response.ok) {
        console.log("Note saved successfully!");
        window.location.reload();
        fetchNotes(userId);
      } else {
        displayPopupMessage("Failed to save the note!");
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const deleteNote = async (note) => {
    try {
      const userId = JSON.parse(localStorage.getItem("userId"));
      if (userId && userId.token && note && note.time_created) {
        const date = new Date(note.time_created);
        if (!isNaN(date.getTime())) {
          const timestamp = date.toISOString();
          const requestBody = {
            id: userId.token,
            time_created: timestamp,
          };

          const response = await fetch(
            `https://pandemiconiummanager.azurewebsites.net/NoteDelete`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestBody),
            }
          );

          if (response.ok) {
            console.log("Note deleted successfully!");
            window.location.reload();
            fetchNotes(userId);
          } else {
            displayPopupMessage("Failed to delete the note!");
          }
        } else {
          console.error("Invalid timestamp format:", note.time_created);
        }
      } else {
        console.error("Invalid userId or note object:", userId, note);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const saveNote = async (newTitle, newText, newTimestamp) => {
    try {
      const requestBody = {
        id: token,
        title: newTitle,
        note: newText,
        time_created: newTimestamp,
      };

      const response = await fetch(
        "https://pandemiconiummanager.azurewebsites.net/UpdateNote",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        console.log("Note updated successfully");
        fetchNotes(userId);
      } else {
        console.error("Failed to update the note");
      }
    } catch (error) {
      console.error("Error updating the note:", error);
    }
  };

  const displayPopupMessage = (message) => {
    toast.info(message, {
      autoClose: 2000,
      hideProgressBar: false,
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  };

  return (
    <>
      <StyledNav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <img
            src={logo}
            alt="Logo"
            className="navbar-brand mx-auto"
            style={{ width: "200px", height: "auto" }}
          />
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pandemic">
                  Pandemic info
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/map">
                  Map Portal
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/news">
                  News
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/inv">
                  Inventory
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/remind">
                  Reminder
                </Link>
              </li>
            </ul>
          </div>
          <CurrentDateTime />
        </div>
      </StyledNav>
      <Container darkMode={darkMode}>
        <Header darkMode={DarkMode} />
        <div className="notes mb-4">
          {notes.length > 0 &&
            notes.map((note) => (
              <Note
                key={`${note.title}-${note.time_created}`}
                id={`${note.title}-${note.time_created}`}
                note={note}
                title={note.title}
                text={note.note}
                color={note.color || "rgba(44, 36, 36, 0.25)"} // Provide a default color if it's not available
                timestamp={formatTimestamp(note.time_created)}
                deleteNote={deleteNote}
                saveNote={saveNote}
                noteColor={noteColor}
                changeColor={changeColor}
              />
            ))}
          <CreateNote
            titleHandler={titleHandler}
            textHandler={textHandler}
            saveHandler={saveHandler}
            inputTitle={inputTitle}
            inputText={inputText}
            noteColor={noteColor}
            changeColor={changeColor}
            changeTransparency={changeTransparency}
          />
        </div>
        {showScrollButton && (
          <button
            className="btn btn-primary"
            onClick={scrollToTop}
            style={{ position: "fixed", bottom: "20px", right: "20px" }}
          >
            Back to Top
          </button>
        )}
      </Container>
    </>
  );
};

export default NotesApp;
