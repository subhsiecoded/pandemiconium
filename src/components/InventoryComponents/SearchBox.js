import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 300px;
  padding: 10px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
  }
`;

function SearchBox({ value, onChange }) {
  return (
    <StyledInput
      type="text"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBox;
