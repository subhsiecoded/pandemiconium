import React from "react";
import styled from "styled-components";
import Customheaderfont from "../fonts/AGoblinAppears-o2aV.ttf";

const HomePageHeaderContainer = styled.h2`
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
`;

const HomePageHeader = ({ darkMode }) => {
  return (
    <HomePageHeaderContainer darkMode={darkMode}>
      <h2>Services Pandemiconium provides.</h2>
    </HomePageHeaderContainer>
  );
};

export default HomePageHeader;
