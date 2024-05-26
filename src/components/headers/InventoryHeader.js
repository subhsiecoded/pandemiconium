import React from "react";
import styled from "styled-components";
import Customheaderfont from "../fonts/AGoblinAppears-o2aV.ttf";

const ReminderHeaderContainer = styled.h2`
  @font-face {
    font-family: "CustomHeaderFont";
    src: url(${Customheaderfont}) format("woff2");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  color: ${(props) => (props.darkMode ? "#ffffff" : "#000000")};
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  font-family: "CustomHeaderFont", cursive;
  font-size: 38px; /* Adjust font size */
`;
function InventoryHeader({ darkMode }) {
  return (
    <div
      className="header"
      style={{
        color: darkMode ? "white" : "black",
        textAlign: "center",
      }}
    >
      <ReminderHeaderContainer darkMode={darkMode}>
        <h1 className="inventory_header mb-4">Inventory</h1>
      </ReminderHeaderContainer>
    </div>
  );
}

export default InventoryHeader;