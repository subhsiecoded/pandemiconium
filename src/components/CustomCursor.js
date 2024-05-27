// CustomCursor.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Cursor from "./img/cursor.png";

const CursorWrapper = styled.div`
  position: fixed;
  width: 32px;
  height: 32px;
  pointer-events: none;
  z-index: 9999;
  img {
    width: 100%;
    height: 100%;
  }
`;

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <CursorWrapper style={{ left: position.x, top: position.y }}>
      <img src={Cursor} alt="Custom cursor" />
    </CursorWrapper>
  );
};

export default CustomCursor;