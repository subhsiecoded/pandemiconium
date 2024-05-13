import React from "react";

function Header({ darkMode }) {
  return (
    <div
      className="header"
      style={{
        color: darkMode ? "#ffffff !important" : "#000000 !important",
        textAlign: "center",
      }}
    >
      <h1 className="notes__title mb-4">Notes</h1>
    </div>
  );
}

export default Header;
