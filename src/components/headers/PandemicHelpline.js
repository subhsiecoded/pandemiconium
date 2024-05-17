import React from "react";
import styled from "styled-components";
import {
  Phone,
  People,
  EmojiFoodBeverage,
  Group,
  Person,
  Message,
} from "@mui/icons-material";

const Container = styled.div`
position: relative;
  background-color: #E97451;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  touch-action: manipulation;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  color: #000;
`;

const HelplineItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #E97451;
  padding: 10px;
  border-radius: 5px;
`;

const Number = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

const Ministry = styled.span`
  font-size: 14px;
  color: #000;
`;

const PandemicHelpline = () => {
  return (
    <Container>
      <Header>
        <Phone color="black" />
        HELPLINE NUMBERS
      </Header>
      <HelplineItem>
        <Number>1075</Number>
        <Ministry>Health Ministry</Ministry>
      </HelplineItem>
      <HelplineItem>
        <People color="black" />
        <Number>1098</Number>
        <Ministry>Child</Ministry>
      </HelplineItem>
      <HelplineItem>
        <EmojiFoodBeverage color="black" />
        <Number>08046110007</Number>
        <Ministry>Mental Health</Ministry>
      </HelplineItem>
      <HelplineItem>
        <Group color="black" />
        <Number>14567</Number>
        <Ministry>Senior Citizens</Ministry>
      </HelplineItem>
      <HelplineItem>
        <Person color="black" />
        <Number>14443</Number>
        <Ministry>Ayush Covid-19 Counselling</Ministry>
      </HelplineItem>
    </Container>
  );
};

export default PandemicHelpline;
