import React from "react";
import styled from "styled-components";
import {
  Phone,
  LocalPharmacy,
  Psychology,
  Elderly,
  EscalatorWarning,
  LocalHospital,
} from "@mui/icons-material";

const Container = styled.div`
  position: relative;
  background-color: #e97451;
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
  background-color: #e97451;
  padding: 10px;
  border-radius: 5px;
`;

const Number = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

const Ministry = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  text-align: center;
`;

const PandemicHelpline = () => {
  return (
    <Container>
      <Header>
        <Phone fontSize="large" color="black" />
        HELPLINE NUMBERS
      </Header>
      <HelplineItem>
        <LocalHospital fontSize="large" color="black" />
        <Number>1075</Number>
        <Ministry>Health Ministry</Ministry>
      </HelplineItem>
      <HelplineItem>
        <EscalatorWarning fontSize="large" color="black" />
        <Number>1098</Number>
        <Ministry>
          Ministry of Women
          <br />& Child Development
        </Ministry>
      </HelplineItem>
      <HelplineItem>
        <Psychology fontSize="large" color="black" />
        <Number>08046110007</Number>
        <Ministry>
          Mental Health
          <br />
          Helpline
        </Ministry>
      </HelplineItem>
      <HelplineItem>
        <Elderly fontSize="large" color="black" />
        <Number>14567</Number>
        <Ministry>Senior Citizens</Ministry>
      </HelplineItem>
      <HelplineItem>
        <LocalPharmacy fontSize="large" color="black" />
        <Number>14443</Number>
        <Ministry>
          Ayush Covid-19
          <br />
          Counselling
        </Ministry>
      </HelplineItem>
    </Container>
  );
};

export default PandemicHelpline;
