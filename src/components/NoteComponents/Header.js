import React from "react";
import styled from "styled-components";
import Customheaderfont from "../fonts/AGoblinAppears-o2aV.ttf";

const NotesHeaderContainer = styled.h2`
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
  font-size: 38px; 
`;

function Header({ darkMode }) {
  return (
    <NotesHeaderContainer darkMode={darkMode}>
      <h1 className="notes__title mb-4">Notes</h1>
    </NotesHeaderContainer>
  );
}

export default Header;
