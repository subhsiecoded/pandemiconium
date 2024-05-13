// ColorPicker.js
import React from "react";

const ColorPicker = ({ handleColorChange, initialColor }) => {
  
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Color
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <button
          className="dropdown-item d-flex align-items-center"
          type="button"
          onClick={() => handleColorChange("rgba(255, 0, 0, 0.1)")}
        >
          <span
            className="color-circle"
            style={{
              backgroundColor: "red",
              marginRight: "5px",
              borderRadius: "50%",
              display: "inline-block",
              width: "20px",
              height: "20px",
            }}
          ></span>
          Red
        </button>
        <button
          className="dropdown-item d-flex align-items-center"
          type="button"
          onClick={() => handleColorChange("rgba(0, 128, 0, 0.1)")}
        >
          <span
            className="color-circle"
            style={{
              backgroundColor: "green",
              marginRight: "5px",
              borderRadius: "50%",
              display: "inline-block",
              width: "20px",
              height: "20px",
            }}
          ></span>
          Green
        </button>
        <button
          className="dropdown-item d-flex align-items-center"
          type="button"
          onClick={() => handleColorChange("rgba(0, 0, 255, 0.1)")}
        >
          <span
            className="color-circle"
            style={{
              backgroundColor: "blue",
              marginRight: "5px",
              borderRadius: "50%",
              display: "inline-block",
              width: "20px",
              height: "20px",
            }}
          ></span>
          Blue
        </button>
        <button
          className="dropdown-item d-flex align-items-center"
          type="button"
          onClick={() => handleColorChange("rgba(255, 255, 0, 0.1)")}
        >
          <span
            className="color-circle"
            style={{
              backgroundColor: "yellow",
              marginRight: "5px",
              borderRadius: "50%",
              display: "inline-block",
              width: "20px",
              height: "20px",
            }}
          ></span>
          Yellow
        </button>
        <button
          className="dropdown-item d-flex align-items-center"
          type="button"
          onClick={() => handleColorChange("rgba(128, 0, 128, 0.1)")}
        >
          <span
            className="color-circle"
            style={{
              backgroundColor: "purple",
              marginRight: "5px",
              borderRadius: "50%",
              display: "inline-block",
              width: "20px",
              height: "20px",
            }}
          ></span>
          Purple
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;