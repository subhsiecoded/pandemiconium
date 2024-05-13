import React from 'react';
import styled from 'styled-components';

const AboutDevHeaderContainer = styled.div`
  width: 100%;
  text-align: center;
  color: ${(props) => (props.darkMode ? '#ffffff !important' : '#000000!important')};
`;

const AboutDevHeader = ({ darkMode }) => {
  return (
    <AboutDevHeaderContainer darkMode={darkMode}>
      <h2>About Developers</h2>
    </AboutDevHeaderContainer>
  );
};

export default AboutDevHeader;