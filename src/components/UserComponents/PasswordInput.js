import React, { useState } from 'react';
import styled from 'styled-components';
import showPasswordIcon from '../img/show-password.png';
import hidePasswordIcon from '../img/hide-password.png';

const PasswordInputContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const PasswordInputField = styled.input`
  padding-right: 30px; 
`;

const PasswordToggleIcon = styled.img`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  width: 20px; 
  height: 20px; 
`;

const PasswordInput = ({ placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <PasswordInputContainer>
      <PasswordInputField
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <PasswordToggleIcon
        src={showPassword ? showPasswordIcon : hidePasswordIcon}
        alt={showPassword ? 'Show Password' : 'Hide Password'}
        onClick={toggleShowPassword}
      />
    </PasswordInputContainer>
  );
};

export default PasswordInput;