import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./css/Note.css";
import "./css/CustomScrollbar.css";
import CreateNote from "./NoteComponents/CreateNote";
import Header from "./NoteComponents/Header";
import Note from "./NoteComponents/Note";
import CurrentDateTime from "./CurrentDateTime";
import { v4 as uuid } from "uuid";
import logoWatermark from "./img/notes.png";
import styled from "styled-components";
import logo from "./img/logonav.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DarkMode } from "@mui/icons-material";

const Container = styled.div`
  color: ${(props) => (props.darkMode ? "white" : "black")};
  background-image: url(${logoWatermark}); /* Static image */
  background-repeat: repeat;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 50px;
  /* Animation for the background */
  animation: animateBackground 15s linear infinite;

  @keyframes animateBackground {
    from {
      background-position: 0 0; /* Starting position */
    }
    to {
      background-position: 100% 100%; /* Ending position */
    }
  }
`;
const StyledNav = styled.nav`
  background-color: #343a40; /* Dark background color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add a subtle box shadow */
  padding: 0.5rem 1rem; /* Add some padding */

  .navbar-brand {
    color: #fff; /* Set the logo text color to white */
  }

  .nav-link {
    color: #ccc; /* Set the default link color to light gray */
    transition: color 0.3s ease, background-color 0.3s ease;
    padding: 0.5rem 1rem; /* Add some padding to the links */
    border-radius: 0.25rem; /* Add rounded corners */

    &:hover {
      background-color: #fff; /* Change the background color to white on hover */
      color: #343a40; /* Change the text color to dark on hover */
    }

    &.active {
      background-color: #007bff; /* Change the background color for the active link */
      color: #fff; /* Change the text color for the active link */
    }
  }

  .navbar-toggler {
    border-color: #ccc; /* Change the border color of the toggler */
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(255, 255, 255, 0.8)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"); /* Change the toggler icon to a custom SVG */
  }
`;
const NotesApp = ({ onLogout, darkMode, userId }) => {
  // States
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

    // Fetch notes only if userId is available
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

  // Fetch notes from the backend
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
            time_created: new Date(note.time_created).toISOString(), // Convert timestamp to ISO string
          }))
        );
        // console.log("Updated Notes State:", notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Handler to update inputText state
  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  // Handler to update inputTitle state
  const titleHandler = (e) => {
    setInputTitle(e.target.value);
  };

  // Handler to update noteColor state
  const changeColor = (newColor) => {
    setNoteColor(newColor);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const month = date.toLocaleString("default", { month: "short" }); // Get short month name
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit", // Include seconds
    }); // Get hour, minute, and seconds
    return `${date.getDate()} ${month} ${date.getFullYear()} ${time}`;
  };

  const changeTransparency = (newTransparency) => {
    setNoteTransparency(newTransparency);
  };

  // Handler to save a new note to the backend
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
        // Fetch the updated notes from the backend
        fetchNotes(userId);
      } else {
        displayPopupMessage("Failed to save the note!");
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  // Handler to delete a note
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
            // Fetch the updated notes from the backend
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
        id: token, // Use the note's time_created as the id
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
        // Fetch the updated notes from the backend
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
