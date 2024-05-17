import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import SectionImage1 from "./img/pandemic1.png";
import SectionImage2 from "./img//pandemic2.png";
import SectionImage3 from "./img/pandemic3.png";
import logoWatermark from "./img/logoalpha.png";
import CurrentDateTime from "./CurrentDateTime";
import logo from "./img/logonav.png";
import Customheaderfont from "./fonts/AGoblinAppears-o2aV.ttf";
import Custombodyfont from "./fonts/Kreasi-YqEjO.otf";
import PandemicHelpline from "./headers/PandemicHelpline";

const Container = styled.div`
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-size: fit;
  background-image: url(${(props) => props.backgroundImage});
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  ${({ darkMode }) =>
    darkMode &&
    css`
      background-color: #000;
    `}
`;

const StyledNav = styled.nav`
  background-color: #343a40;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 0.5rem 1rem;

  .navbar-brand {
    color: #fff;
  }

  .nav-link {
    color: #ccc;
    transition: color 0.3s ease, background-color 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;

    &:hover {
      background-color: #fff;
      color: #343a40;
    }

    &.active {
      background-color: #007bff;
      color: #fff;
    }
  }

  .navbar-toggler {
    border-color: #ccc;
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(255, 255, 255, 0.8)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }
`;

const Section = styled.section`
  margin: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionHeading = styled.h2`
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
  font-size: 38px;
`;

const SectionContent = styled(motion.div)`
  @font-face {
    font-family: "CustomContentFont";
    src: url(${Custombodyfont}) format("woff2");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  margin-top: 20px;
  line-height: 1.6;
  font-family: "Comic-Sans MS", cursive;
  font-size: 24px;
  text-align: center;
`;

const SectionImage = styled(motion.img)`
  width: 550px;
  height: 350px;
  border-radius: 10%;
  object-fit: cover;
`;

const Pandemicinfo = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState([0, 1, 2]); // Initial state to expand all sections

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const sections = [
    {
      heading: "How to Prepare Yourself for a Pandemic",
      content: [
        [
          "Learn how diseases spread to help protect yourself and others. Viruses can be spread from person to person, from a non-living object to a person and by people who are infected but don’t have any symptoms.",
        ],
        [
          "Prepare for the possibility of schools, workplaces, and community centers being closed. Investigate and prepare for virtual coordination for school, work (telework), and social activities.",
        ],
        [
          "Gather supplies in case you need to stay home for several days or weeks. Supplies may include cleaning supplies, non-perishable foods, prescriptions, and bottled water. Buy supplies slowly to ensure that everyone has the opportunity to buy what they need.",
        ],
        [
          "Create an emergency plan so that you and your family know what to do and what you will need in case an outbreak happens. Consider how a pandemic may affect your plans for other emergencies.",
        ],
        [
          "Review your health insurance policies to understand what they cover, including telemedicine options.",
        ],
        [
          "Create password-protected digital copies of important documents and store them in a safe place. Watch out for scams and fraud.",
        ],
      ],
      image: SectionImage1,
    },
    {
      heading: "Stay Safe During a Pandemic",
      content: [
        [
          "Get vaccinated. Vaccines stimulate your immune system to produce antibodies, so vaccines actually prevent diseases.",
        ],
        [
          "Take actions to prevent the spread of disease. Cover coughs and sneezes. Wear a mask in public. Stay home when sick (except to get medical care). Disinfect surfaces. Wash hands with soap and water for at least 20 seconds. If soap and water are not available, use a hand sanitizer that contains at least 60 percent alcohol. Stay six feet away from people who are not part of your household.",
        ],
        [
          "If you believe you’ve been exposed to the disease, contact your doctor, follow the quarantine instructions from medical providers, and monitor your symptoms. If you’re experiencing a medical emergency, call 9-1-1 and shelter in place with a mask, if possible, until help arrives.",
        ],
        [
          "Share accurate information about the disease with friends, family, and people on social media. Sharing bad information about the disease or treatments for the disease may have serious health outcomes. Remember that stigma hurts everyone and can cause discrimination against people, places, or nations.",
        ],
        [
          "Know that it’s normal to feel anxious or stressed. Engage virtually with your community through video and phone calls. Take care of your body and talk to someone if you are feeling upset.",
        ],
      ],
      image: SectionImage2,
    },
    {
      heading: "Stay Safe After a Pandemic",
      content: [
        "Continue taking protective actions, like:",
        ["Staying home when you are sick (except to get medical care)."],
        ["Following the guidance of your health care provider."],
        ["Covering coughs and sneezes with a tissue."],
        ["Washing your hands with soap and water for at least 20 seconds."],
      ],
      image: SectionImage3,
    },
  ];

  const handleToggleSection = (index) => {
    setExpandedIndex((prevIndex) =>
      prevIndex.includes(index)
        ? prevIndex.filter((i) => i !== index)
        : [...prevIndex, index]
    );
  };

  const IndiaSituationReport = () => (
    <Section>
      <SectionHeading>India Situation Report</SectionHeading>
      <SectionContent>
        <p>
          Stay updated with the latest situation report for India regarding the
          pandemic.
        </p>
        <p>
          You can view and download the report{" "}
          <a
            href="https://cdn.who.int/media/docs/default-source/wrindia/situation-report/india-situation-report-116.pdf?sfvrsn=1a5f2a59_2"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </p>
      </SectionContent>
    </Section>
  );

  const VaccineDetails = () => (
    <Section>
      <SectionHeading>Know about the vaccine</SectionHeading>
      <SectionContent>
        <p>
          Know about the recent Covid-19 pandemic and the vaccine YOU MUST TAKE.
        </p>
        <p>
          You can view and download the report{" "}
          <a
            href="https://www.mohfw.gov.in/pdf/FAQsCOVID19vaccinesvaccinationprogramWebsiteupload27Sep.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </p>
      </SectionContent>
    </Section>
  );

  return (
    <Container darkMode={darkMode} backgroundImage>
      <StyledNav className="navbar navbar-expand-lg" data-bs-theme="dark">
        <div className="container-fluid d-flex justify-content-center">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <img
            src={logo}
            alt="Logo"
            className="navbar-brand mx-auto"
            style={{ width: "200px", height: "auto" }}
          />
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/news">
                  News
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/notes">
                  Notes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/inv">
                  Inventory
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/remind">
                  Reminder
                </Link>
              </li>
            </ul>
          </div>
          <CurrentDateTime />
        </div>
      </StyledNav>
      {sections.map((section, index) => (
        <Section key={index}>
          <SectionHeading onClick={() => handleToggleSection(index)}>
            {section.heading}
          </SectionHeading>
          {expandedIndex.includes(index) && (
            <>
              <div style={{ display: "flex" }}>
                <SectionImage
                  src={section.image}
                  alt={`Section ${index + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <SectionContent
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {section.content.map((item, i) =>
                    Array.isArray(item) ? (
                      <ul key={i}>
                        {item.map((subItem, j) => (
                          <li key={j}>{subItem}</li>
                        ))}
                      </ul>
                    ) : (
                      <p key={i}>{item}</p>
                    )
                  )}
                </SectionContent>
              </div>
            </>
          )}
        </Section>
      ))}

      <IndiaSituationReport />
      <VaccineDetails />
      <PandemicHelpline darkMode={darkMode} />
    </Container>
  );
};

export default Pandemicinfo;
