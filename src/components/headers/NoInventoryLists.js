import React from 'react';
import styled from 'styled-components';
import Customheaderfont from "../fonts/AGoblinAppears-o2aV.ttf";

const NoInventoryListsContainer = styled.h2`
  @font-face {
    font-family: "CustomHeaderFont";
    src: url(${Customheaderfont}) format("woff2");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  color: ${(props) => (props.darkMode ? '#ffffff' : '#000000')};
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  font-family: "CustomHeaderFont", cursive;
  font-size: 38px; /* Adjust font size */
`;

const NoInventoryLists = ({ darkMode }) => {
  return (
    <NoInventoryListsContainer darkMode={darkMode}>
      <h2>No inventory lists found.</h2>
    </NoInventoryListsContainer>
  );
};

export default NoInventoryLists;