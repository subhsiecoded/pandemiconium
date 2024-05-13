import React from 'react';
import styled from 'styled-components';

const NoInventoryListsContainer = styled.div`
  width: 100%;
  text-align: center;
  color: ${(props) => (props.darkMode ? '#ffffff' : '#000000')};
`;

const NoInventoryLists = ({ darkMode }) => {
  return (
    <NoInventoryListsContainer darkMode={darkMode}>
      <h2>No inventory lists found.</h2>
    </NoInventoryListsContainer>
  );
};

export default NoInventoryLists;