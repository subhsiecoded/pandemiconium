import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logoWatermark from "../img/logo.png";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: ${(props) => (props.darkMode ? "#fff" : "#222")}; /* Text color */
  background-image: url(${logoWatermark});
  background-repeat: repeat; /* Repeat the watermark across the entire background */
`;

const FormContainer = styled.div`
  width: 90%;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: ${(props) => (props.darkMode ? "#333" : "#ffffff")};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  color: ${(props) => (props.darkMode ? "#fff" : "#222")}; /* Text color */
`;

const ForgotPassword = ({ darkMode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      alert(
        "Not accessible when the user is logged in. Please logout and try."
      );
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetPassword, setResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resetPassword) {
      try {
        const response = await fetch(
          `https://pandemiconiummanager.azurewebsites.net/EmailExists?email=${encodeURIComponent(
            email
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.text();
          setMessage(data.message);
          setResetPassword(true);
        } else {
          const errorMessage = await response.text(); // Get the error message as text
          setMessage(errorMessage || "An error occurred during password reset");
        }
      } catch (error) {
        console.error("Error during password reset:", error);
        setMessage("An error occurred during password reset");
      }
    } else {
      // Handle reset password submission
      if (newPassword === confirmNewPassword) {
        try {
          const response = await fetch(
            "https://pandemiconiummanager.azurewebsites.net/ChangePassword",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, newPassword }),
            }
          );
          const data = await response.json();
          if (response.ok) {
            setMessage(data.message);
            navigate("/login"); // Redirect to the login page after successful reset
          } else {
            setMessage(
              data.message || "An error occurred during password reset"
            );
          }
        } catch (error) {
          console.error("Error during password reset:", error);
          setMessage("An error occurred during password reset");
        }
      } else {
        setMessage("New passwords do not match");
      }
    }
  };

  return (
    <Container>
      <FormContainer darkMode={darkMode}>
        <h2>Forgot Password</h2>
        {!resetPassword ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Request Password Reset
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="newPasswordInput" className="form-label">
                New Password
              </label>
              <PasswordInput
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmNewPasswordInput" className="form-label">
                Confirm New Password
              </label>
              <PasswordInput
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </form>
        )}
        {message && <p>{message}</p>}
      </FormContainer>
    </Container>
  );
};

export default ForgotPassword;
