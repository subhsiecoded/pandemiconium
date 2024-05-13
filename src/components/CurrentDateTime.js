import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DateTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 300;
  padding: 10px;
  border-radius: 8px;
  margin-right: 80px;
`;

const TimeDisplay = styled.div`
  font-size: 12px;
`;

const DateDisplay = styled.div`
  font-size: 12px;
`;

const CurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    const options = { hour: 'numeric', minute: 'numeric' };
    return date.toLocaleString(undefined, options);
  };

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleString(undefined, options);
  };

  return (
    <DateTimeContainer>
      <TimeDisplay>{formatTime(currentDateTime)}</TimeDisplay>
      <DateDisplay>{formatDate(currentDateTime)}</DateDisplay>
    </DateTimeContainer>
  );
};

export default CurrentDateTime;