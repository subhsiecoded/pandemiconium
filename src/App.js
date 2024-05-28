import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/HomePage";
import Signup from "./components/UserComponents/Signup";
import Pandemicinfo from "./components/PandemicInfo";
import Login from "./components/UserComponents/Login";
import ForgotPassword from "./components/UserComponents/ForgotPassword";
import NewsApp from "./components/NewsComponents/NewsApp";
import ReminderApp from "./components/ReminderApp";
import NotesApp from "./components/NoteComponents/NotesApp";
import Inventory from "./components/InventoryComponents/Inventory";
import { UserIdProvider } from "./components/UserComponents/UserIdContext";
import logoWatermark from "./components/img/logo.png";
import moonIcon from "./components/img/moon.png";
import sunIcon from "./components/img/sun.png";
import CustomCursor from "./components/CustomCursor";
import Map from "./components/MapComponents/Map";

import "./styles.css";
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.darkMode ? "#222" : "#fff")};
    color: ${(props) => (props.darkMode ? "#fff" : "#222")};
  }
`;
const Wrapper = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Message = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  font-color: ${(props) => (props.darkMode ? "#fff" : "#222")};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled(Link)`
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${({ color }) => color};
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${(props) => (props.darkMode ? "#fff" : "#222")};
  background-image: url(${logoWatermark});
  background-repeat: repeat;
`;

const LogoNoUser = styled.div`
  color: ${(props) => (props.darkMode ? "#fff" : "#222")};
  background-image: url(${logoWatermark});
  background-repeat: repeat;
  height: 100vh;
`;

const FormContainer = styled.div`
  width: 50%;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: ${(props) => (props.darkMode ? "#333" : "#ffffff")};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  color: ${(props) => (props.darkMode ? "#fff" : "#222")};
  /* Text color */
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LandingPage = ({ darkMode }) => {
  return (
    <Container>
      <FormContainer darkMode={darkMode}>
        <div>
          <h2 style={{ textAlign: "center" }}>
            Welcome to Pandemiconium. <br />
            Your one-stop site to get information about pandemics <br />
            and a lot more!
          </h2>
          <p style={{ textAlign: "center" }}>
            Please{" "}
            <Link to="/login" className="btn btn-primary">
              Log In
            </Link>{" "}
            or{" "}
            <Link to="/signup" className="btn btn-success">
              Sign Up
            </Link>{" "}
            to continue.
          </p>
        </div>
      </FormContainer>
    </Container>
  );
};

const HomePageWrapper = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return (
      <LogoNoUser>
        <Wrapper>
          <FormContainer>
            <Message>Please log in to access this page.</Message>
            <ButtonContainer>
              <Button to="/login" color="#007bff" hoverColor="#0056b3">
                Login
              </Button>
              <Button to="/signup" color="#28a745" hoverColor="#218838">
                Sign Up
              </Button>
            </ButtonContainer>
          </FormContainer>
        </Wrapper>
      </LogoNoUser>
    );
  }
  return children;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("darkMode", darkMode.toString());
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    alert("You have been logged out");
    window.location.reload();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <UserIdProvider>
      <GlobalStyle darkMode={darkMode} />
      <CustomCursor />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/home" replace /> : <LandingPage />
          }
        />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} darkMode={darkMode} />}
        />
        <Route
          path="/signup"
          element={<Signup onSignup={handleLogin} darkMode={darkMode} />}
        />
        <Route
          path="/home"
          element={
            <HomePageWrapper isLoggedIn={isLoggedIn}>
              <HomePage onLogout={handleLogout} />
            </HomePageWrapper>
          }
        />
        <Route
          path="/pandemic"
          element={
            <HomePageWrapper isLoggedIn={isLoggedIn}>
              <Pandemicinfo
                onLogout={handleLogout}
                setDarkMode={setDarkMode}
                darkMode={darkMode}
              />{" "}
            </HomePageWrapper>
          }
        />
        <Route
          path="/news"
          element={
            <HomePageWrapper isLoggedIn={isLoggedIn}>
              <NewsApp
                onLogout={handleLogout}
                setDarkMode={setDarkMode}
                userId={JSON.parse(localStorage.getItem("token"))}
                darkMode={darkMode}
              />
            </HomePageWrapper>
          }
        />
        <Route
          path="/notes"
          element={
            <HomePageWrapper isLoggedIn={isLoggedIn}>
              <NotesApp
                onLogout={handleLogout}
                setDarkMode={setDarkMode}
                userId={localStorage.getItem("userId")}
                darkMode={darkMode}
              />{" "}
            </HomePageWrapper>
          }
        />
        <Route
          path="/inv"
          element={
            <HomePageWrapper isLoggedIn={isLoggedIn}>
              <Inventory
                onLogout={handleLogout}
                setDarkMode={setDarkMode}
                darkMode={darkMode}
              />{" "}
            </HomePageWrapper>
          }
        />
        <Route
          path="/remind"
          element={
            <HomePageWrapper isLoggedIn={isLoggedIn}>
              <ReminderApp
                onLogout={handleLogout}
                darkMode={darkMode}
                userId={localStorage.getItem("userId")}
              />
            </HomePageWrapper>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/map"
          element={
            <HomePageWrapper isLoggedIn={isLoggedIn}>
              <Map
                darkMode={darkMode}
                userId={JSON.parse(localStorage.getItem("token"))}
              />
            </HomePageWrapper>
          }
        />
      </Routes>
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="btn btn-danger"
          style={{
            position: "fixed",
            top: "90px",
            right: "20px",
          }}
        >
          Logout
        </button>
      )}
      <button
        onClick={toggleDarkMode}
        className="btn btn-info darkmodebutton"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 9999,
        }}
      >
        <img
          src={darkMode ? sunIcon : moonIcon}
          alt={darkMode ? "Sun" : "Moon"}
          style={{ width: "24px", height: "24px", marginRight: "5px" }}
        />
      </button>
    </UserIdProvider>
  );
};

export default App;
