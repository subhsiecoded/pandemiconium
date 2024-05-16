import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReminderHeader from "./headers/ReminderHeader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logoWatermark from "./img/reminder.png";
import logo from "./img/logonav.png";
import { Link } from "react-router-dom";
import moonIcon from "./img/moon.png";
import sunIcon from "./img/sun.png";
import CurrentDateTime from "./CurrentDateTime";

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
  animation: animateBackground 10s linear infinite; /* Change the time as needed */

  @keyframes animateBackground {
    from {
      background-position: 0 0; /* Starting position */
    }
    to {
      background-position: 100% 100%; /* Ending position */
    }
  }
`;

const FormContainer = styled.div`
  width: 500px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: ${(props) => (props.darkMode ? "#333" : "#ffffff")};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  color: ${(props) => (props.darkMode ? "#fff" : "#222")};
  /* Text color */
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
const RemindersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
`;

const ReminderCard = styled.div`
  width: calc(33.33% - 20px); /* Adjust width to fit 3 cards in one row */
  flex-grow: 1;
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: ${(props) => (props.darkMode ? "#444" : "#ffffff")};
  color: ${(props) => (props.darkMode ? "#fff" : "#222")};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const InputContainer = styled.div`
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  margin-bottom: 5px;
  padding: 5px;
`;

function ReminderApp({ onLogout, darkMode }) {
  const [reminders, setReminders] = useState([]);
  const [reminderName, setReminderName] = useState("");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const [date, setDate] = useState("");

  const handleReminderSubmit = () => {
    if (!reminderName) {
      toast.error("Name of the reminder is NECESSARY");
      return;
    }

    const startTimeHours = parseInt(startTime.split(":")[0], 10);
    const endTimeHours = parseInt(endTime.split(":")[0], 10);

    if (startTimeHours >= endTimeHours) {
      toast.error("Start time must be less than end time");
      return;
    }

    // Check if date is empty
    if (!date) {
      toast.error("Please select a date");
      return;
    }

    // Save the reminder
    const newReminder = {
      name: reminderName,
      startTime,
      endTime,
      date,
    };
    setReminders([...reminders, newReminder]);
    toast.success("Reminder saved!");

    // Clear the form fields
    setReminderName("");
    setStartTime("08:00");
    setEndTime("09:00");
    setDate("");
  };

  const handleDeleteReminder = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders.splice(index, 1);
    setReminders(updatedReminders);
    toast.info("Reminder deleted!");
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
                <Link className="nav-link" to="/news">
                  News
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/notes">
                  Notes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/inv">
                  Inventory
                </Link>
              </li>
            </ul>
          </div>
          <CurrentDateTime />
        </div>
      </StyledNav>
      <Container darkMode={darkMode}>
        <FormContainer darkMode={darkMode}>
          <h2>Create Reminder</h2>
          <InputContainer>
            <label htmlFor="reminderName">Name of Reminder *</label>
            <StyledInput
              type="text"
              id="reminderName"
              value={reminderName}
              onChange={(e) => setReminderName(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="startTime">Start Time</label>
            <StyledInput
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              defaultValue="08:00"
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="endTime">End Time</label>
            <StyledInput
              type="time"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              defaultValue="09:00"
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="date">Date</label>
            <StyledInput
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </InputContainer>
          <button onClick={handleReminderSubmit} className="btn btn-primary">
            Set Reminder
          </button>
        </FormContainer>
        <ReminderHeader darkMode={darkMode} />
        <RemindersContainer>
          {reminders.map((reminder, index) => (
            <ReminderCard key={index} darkMode={darkMode}>
              <DeleteButton
                className="btn btn-danger"
                onClick={() => handleDeleteReminder(index)}
              >
                Delete
              </DeleteButton>
              <p>Name: {reminder.name}</p>
              <p>Start Time: {reminder.startTime}</p>
              <p>End Time: {reminder.endTime}</p>
              <p>Date: {reminder.date}</p>
            </ReminderCard>
          ))}
        </RemindersContainer>
      </Container>
      <button
        onClick={onLogout}
        className="btn btn-danger"
        style={{
          position: "fixed",
          top: "90px", // Adjust this value as needed
          right: "20px",
        }}
      >
        Logout
      </button>
      <button
        onClick={() => {
          // Handle dark mode toggle
          console.log("Dark mode toggle clicked"); // Add this line for debugging
        }}
        className="btn btn-info darkmodebutton"
        style={{ position: "fixed", top: "20px", right: "20px" }}
      >
        <img
          src={darkMode ? sunIcon : moonIcon}
          alt={darkMode ? "Sun" : "Moon"}
          style={{ width: "24px", height: "24px", marginRight: "5px" }}
        />
      </button>
      <ToastContainer />
    </>
  );
}

export default ReminderApp;
