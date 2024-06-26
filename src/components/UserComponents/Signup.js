// Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import logoWatermark from "../img/logo.png";
import logonav from "../img/logonav.png";

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
const VirusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-virus"
    viewBox="0 0 16 16"
  >
    <path d="M8 0a1 1 0 0 1 1 1v1.402c0 .511.677.693.933.25l.7-1.214a1 1 0 0 1 1.733 1l-.701 1.214c-.256.443.24.939.683.683l1.214-.701a1 1 0 0 1 1 1.732l-1.214.701c-.443.256-.262.933.25.933H15a1 1 0 1 1 0 2h-1.402c-.512 0-.693.677-.25.933l1.214.701a1 1 0 1 1-1 1.732l-1.214-.7c-.443-.257-.939.24-.683.682l.701 1.214a1 1 0 1 1-1.732 1l-.701-1.214c-.256-.443-.933-.262-.933.25V15a1 1 0 1 1-2 0v-1.402c0-.512-.677-.693-.933-.25l-.701 1.214a1 1 0 0 1-1.732-1l.7-1.214c.257-.443-.24-.939-.682-.683l-1.214.701a1 1 0 1 1-1-1.732l1.214-.701c.443-.256.261-.933-.25-.933H1a1 1 0 1 1 0-2h1.402c.511 0 .693-.677.25-.933l-1.214-.701a1 1 0 1 1 1-1.732l1.214.701c.443.256.939-.24.683-.683l-.701-1.214a1 1 0 0 1 1.732-1l.701 1.214c.256.443.933.261.933-.25V1a1 1 0 0 1 1-1m2 5a1 1 0 1 0-2 0 1 1 0 0 0 2 0M6 7a1 1 0 1 0-2 0 1 1 0 0 0 2 0m1 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m5-3a1 1 0 1 0-2 0 1 1 0 0 0 2 0" />
  </svg>
);

const Signup = ({ onSignup, darkMode }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null); 
  const navigate=useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://pandemiconiummanager.azurewebsites.net/SignUp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: username, password: password }),
        }
      );

      alert("login!");
      if (!response.ok) {
        console.log("Server response:", response);
        const errorData = await response.text(); 
        console.error("Signup failed. Server response:", errorData);
        setError("Signup failed. Please try again.");
        return;
      }

      
      const responseData = await response.text();
      if (!responseData) {
        console.error("Signup failed. Empty response.");
        setError("Signup failed. Please try again.");
        return;
      }

      let data;
      try {
        data = JSON.parse(responseData);
      } catch (error) {
        console.error("Error parsing server response:", error);
        setError("An error occurred while parsing the server response.");
        return;
      }

      if (data.token) {
        const userId = data.userId;
        // console.log("Signup successful! UserID:", userId);
        // console.log("JWT Token:", data.token); 
        setUserId(userId);
        localStorage.setItem("userId", userId);
      } else {
        console.error("Signup failed. No token received.");
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An error occurred during signup");
    }
  };

  return (
    <Container darkMode={darkMode}>
      <FormContainer darkMode={darkMode}>
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            <VirusIcon style={{ marginRight: "5px" }} />
            Signup
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </FormContainer>
    </Container>
  );
};

export default Signup;
