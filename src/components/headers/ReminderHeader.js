import React from "react";

function ReminderHeader({ darkMode }) {
  return (
    <div
      className="header"
      style={{
        color: darkMode ? "white" : "black", 
        textAlign: "center",
      }}
    >
      <h1 className="notes__title mb-4">Reminders notifications</h1>
    </div>
  );
}

export default ReminderHeader;
