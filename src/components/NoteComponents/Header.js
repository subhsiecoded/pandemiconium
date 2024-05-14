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
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  font-family: "CustomHeaderFont", cursive;
  font-size: 38px; /* Adjust font size */
`;

function Header({ darkMode }) {
  return (
    <ReminderHeaderContainer darkMode={darkMode}>
      <h1 className="notes__title mb-4">Notes</h1>
    </ReminderHeaderContainer>
  );
}

export default Header;
