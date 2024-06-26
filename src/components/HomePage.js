import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import dev1 from "./img/subhasish.jpg";
import dev2 from "./img/ranganath.jpg";
import dev3 from "./img/muhsin.jpg";
import dev4 from "./img/bhumika.jpg";
import pandemicImage from "./img/pandemic.png";
import historyImage from "./img/ack.png";
import notesImage from "./img/noteshome.png";
import newsImage from "./img/news.png";
import inventoryImage from "./img/inventory.png";
import mapPortalGif from "./img/mapportal.gif";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logoWatermark from "./img/logoalpha.png";
import logo from "./img/logonav.png";
import CurrentDateTime from "./CurrentDateTime";
import Customheaderfont from "./fonts/AGoblinAppears-o2aV.ttf";
import Custombodyfont from "./fonts/Kreasi-YqEjO.otf";
import HomePageHeader from "./headers/HomePageHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackToTop from "@mui/icons-material/ArrowUpward";

const Section = styled.section`
  margin: 40px;
  display: flex;
  align-items: center;
`;
const Container = styled.div`
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-size: fit;
  background-image: url(${logoWatermark});
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  ${({ darkMode }) =>
    darkMode &&
    css`
      background-color: #000;
    `}
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

const SectionContent = styled.div`
  @font-face {
    font-family: "CustomContentFont";
    src: url(${Custombodyfont}) format("woff2");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  margin-top: 20px;
  line-height: 1.6;
  flex: 1;
  font-family: "Comic-Sans MS", cursive;
  font-size: 24px; 
`;

const SectionImage = styled.img`
  width: 550px;
  height: 350px;
  border-radius: 10%; 
  object-fit: cover;
`;

const AboutSection = styled.div`
  margin-top: 40px;
`;

const DeveloperTile = styled.div`
  text-align: center;
  margin: 20px;
  cursor: pointer;
  width: calc(25% - 40px);
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  padding: 20px;
  box-sizing: border-box;

  &:hover {
    background-color: rgba(154, 215, 241, 0.3);
    animation: shadowAnimation 0.3s infinite alternate ease;
  }

  @keyframes shadowAnimation {
    0% {
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
    }
    100% {
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    }
  }
`;

const DeveloperTileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const DeveloperContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 -20px; 
`;

const DeveloperContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
`;

const DeveloperName = styled.h3`
  @font-face {
    font-family: "CustomBodyFont";
    src: url(${Custombodyfont}) format("woff2");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  margin-top: 14px;
  font-size: 28px;
  font-weight: bold;
  font-family: "CustomBodyFont", cursive;
`;

const DeveloperRole = styled.p`
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 22px;
  font-family: "Comic Sans MS", cursive;
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

const HomePage = () => {
  const [isCollapsed, setIsCollapsed] = useState({
    pandemic: false,
    history: false,
    notes: false,
    news: false,
    inventory: false,
  });
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const aboutRef = useRef(null);
  const [notificationsShown, setNotificationsShown] = useState(false);
  const [animatedSections, setAnimatedSections] = useState([]);

  const sectionAnimationControls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "pandemic",
        "history",
        "notes",
        "news",
        "inventory",
        "pandemicInfo",
      ];
      sections.forEach((section, index) => {
        const sectionRef = document.getElementById(section);
        if (
          sectionRef &&
          sectionRef.getBoundingClientRect().bottom <= window.innerHeight &&
          !animatedSections.includes(section)
        ) {
          toggleCollapse(section);
          setAnimatedSections((prevState) => [...prevState, section]);

          const direction = index % 2 === 0 ? "-100vw" : "100vw";
          sectionAnimationControls.start({
            x: 0,
            transition: { duration: 0.5 },
            from: { x: direction },
          });
        }
      });

      if (window.scrollY > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [animatedSections, sectionAnimationControls]);

  const navigate = useNavigate();

  useEffect(() => {
    const toastMessages = [
      {
        message: "Check the latest news about the pandemic here",
        path: "/news",
      },
      {
        message: "View and manage your inventory here",
        path: "/inv",
      },
      {
        message: "How to stay safe during and after a pandemic",
        path: "/pandemic",
      },
    ];

    if (!notificationsShown) {
      const interval = setInterval(() => {
        const message = toastMessages.shift();
        if (message) {
          const toastId = toast(
            <div
              style={{
                fontFamily: "Comic Sans MS",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              {message.message}
            </div>,
            {
              position: "bottom-right",
              autoClose: 20000, 
              onClick: () => navigateToPage(message.path),
            }
          );
        } else {
          clearInterval(interval);
          setNotificationsShown(true);
        }
      }, 5000); 

      return () => clearInterval(interval);
    }
  }, [notificationsShown, navigate]);

  const navigateToPage = (path) => {
    navigate(path);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("aboutSection");
    aboutSection.scrollIntoView({ behavior: "smooth" });
  };

  const toggleCollapse = (section) => {
    setIsCollapsed((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div>
        <Container darkMode={darkMode}>
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
                    <Link className="nav-link" to="/pandemic">
                      Pandemic info
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/map">
                      Map Portal
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
                  <li className="nav-item">
                    <Link className="nav-link" onClick={scrollToAbout}>
                      About
                    </Link>
                  </li>
                </ul>
              </div>
              <CurrentDateTime />
            </div>
          </StyledNav>
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Section>
              <SectionImage src={pandemicImage} alt="Pandemic" />
              <SectionContent>
                <SectionHeading onClick={() => toggleCollapse("pandemic")}>
                  What is a Pandemic?
                </SectionHeading>
                {!isCollapsed.pandemic && (
                  <motion.div
                    initial={{ x: "100vw" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p>
                      The term "pandemic" refers to an outbreak of a disease
                      that occurs over a wide geographic area and affects an
                      exceptionally high proportion of the population. Pandemics
                      can occur when a new infectious disease emerges and
                      spreads easily from person to person, often causing
                      illness on a global scale. Historically, pandemics have
                      had significant impacts on human populations, economies,
                      and societies. <br /> Some of the most well-known
                      pandemics include the Black Death in the 14th century,
                      which is estimated to have killed tens of millions of
                      people in Europe, and the Spanish flu of 1918, which
                      infected about one-third of the world's population and
                      caused tens of millions of deaths. In modern times,
                      pandemics have continued to pose significant challenges to
                      public health. <br /> <br /> For example, the H1N1
                      influenza pandemic of 2009, also known as the swine flu,
                      spread rapidly around the world, causing widespread
                      illness and thousands of deaths. More recently, the
                      COVID-19 pandemic, caused by the novel coronavirus
                      SARS-CoV-2, emerged in late 2019 and quickly became a
                      global health crisis. <br /> <br /> COVID-19 has led to
                      millions of deaths worldwide and has had far-reaching
                      social, economic, and political consequences. Efforts to
                      mitigate the impact of pandemics typically involve
                      measures such as disease surveillance, public health
                      interventions (such as vaccination campaigns and
                      quarantine measures), and international cooperation to
                      coordinate response efforts. These measures aim to slow
                      the spread of the disease, reduce illness and death, and
                      minimize the societal disruption caused by the pandemic.
                    </p>
                  </motion.div>
                )}
              </SectionContent>
            </Section>

            <Section>
              <SectionContent>
                <SectionHeading onClick={() => toggleCollapse("history")}>
                  History of Pandemics
                </SectionHeading>
                {!isCollapsed.history && (
                  <motion.div
                    initial={{ x: "-100vw" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p>
                      The history of pandemics is extensive and spans thousands
                      of years. Here is an overview of some of the major
                      pandemics that have occurred throughout history: <br />{" "}
                      <br /> <strong>Plague of Athens (430-426 BCE):</strong>{" "}
                      This epidemic struck during the Peloponnesian War and is
                      believed to have been caused by either typhoid fever or a
                      form of the plague. It resulted in the deaths of a
                      significant portion of the population of Athens, including
                      its leader, Pericles. <br /> <br />{" "}
                      <strong>Antonine Plague (165-180 CE):</strong> This
                      outbreak, during the reign of Roman Emperor Marcus
                      Aurelius, is thought to have been either smallpox or
                      measles. It spread throughout the Roman Empire and is
                      estimated to have killed millions. <br /> <br />{" "}
                      <strong>Plague of Justinian (541-542 CE):</strong> Named
                      after the Byzantine Emperor Justinian I, this pandemic was
                      caused by the bubonic plague. It is considered one of the
                      deadliest pandemics in history, killing an estimated 25-50
                      million people and contributing to the decline of the
                      Byzantine Empire. <br /> <br />{" "}
                      <strong>Black Death (1347-1351):</strong> The Black Death,
                      caused by the bacterium Yersinia pestis, is perhaps the
                      most infamous pandemic in history. It originated in Asia
                      and spread to Europe via trade routes, killing an
                      estimated 75-200 million people, wiping out up to 60% of
                      Europe's population. <br /> <br />{" "}
                      <strong>Third Cholera Pandemic (1852-1860):</strong>{" "}
                      Originating in India, this pandemic spread to Asia,
                      Europe, North America, and Africa. It was caused by the
                      bacterium Vibrio cholerae and resulted in hundreds of
                      thousands of deaths. <br /> <br />{" "}
                      <strong>Spanish Flu (1918-1919):</strong> The Spanish flu,
                      caused by the H1N1 influenza virus, infected about
                      one-third of the world's population and killed an
                      estimated 50 million people worldwide. It is considered
                      one of the deadliest pandemics in history. <br /> <br />{" "}
                      <strong>Asian Flu (1957-1958)</strong>: This influenza
                      pandemic was caused by the H2N2 influenza virus. It
                      originated in East Asia and spread to other parts of the
                      world, resulting in an estimated 1-2 million deaths.{" "}
                      <br /> <br />{" "}
                      <strong>HIV/AIDS Pandemic (1980s-present):</strong> The
                      HIV/AIDS pandemic, caused by the human immunodeficiency
                      virus (HIV), has resulted in approximately 32 million
                      deaths since it was first identified in the early 1980s.
                      It continues to be a major global health issue. <br />{" "}
                      <br /> <strong>COVID-19 Pandemic (2019-present):</strong>{" "}
                      The COVID-19 pandemic, caused by the novel coronavirus
                      SARS-CoV-2, emerged in Wuhan, China, in late 2019. It
                      quickly spread around the world, leading to millions of
                      deaths and causing widespread social, economic, and
                      political disruption. These are just a few examples of
                      pandemics throughout history. Each has had profound
                      impacts on human populations and societies, shaping the
                      course of history in significant ways.
                    </p>
                  </motion.div>
                )}
              </SectionContent>
              <SectionImage src={historyImage} alt="History" />
            </Section>
            <HomePageHeader darkMode={darkMode} />
            <Section>
              <SectionImage src={notesImage} alt="Notes" />
              <SectionContent style={{ textAlign: "left" }}>
                <SectionHeading onClick={() => toggleCollapse("notes")}>
                  Notes
                </SectionHeading>
                {!isCollapsed.notes && (
                  <motion.div
                    initial={{ x: "100vw" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p>
                      <strong>Title:</strong>
                      <br />
                      User can give a title to each note for better
                      organization.
                      <br />
                      <br />
                      <strong>Body Content:</strong>
                      <br />
                      Allows users to write detailed notes, with a maximum limit
                      of 1000 characters. Supports basic text formatting like
                      bold, italic, and bullet points.
                      <br />
                      <br />
                      <strong>Saving Notes:</strong>
                      <br />
                      Users can save their notes for future reference. Option to
                      edit or delete existing notes.
                      <br />
                      <br />
                      <strong>Categorization:</strong>
                      <br />
                      Ability to categorize notes into different topics or
                      themes.
                      <br />
                      <br />
                      <strong>Tags and Keywords:</strong>
                      <br />
                      Users can add tags or keywords to notes for easier
                      searchability.
                    </p>
                  </motion.div>
                )}
              </SectionContent>
            </Section>
            <Section>
              <SectionContent>
                <SectionHeading onClick={() => toggleCollapse("mapPortal")}>
                  Map Portal
                </SectionHeading>
                {!isCollapsed.mapPortal && (
                  <motion.div
                    initial={{ x: "-100vw" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p>
                      This component shows users the nearest hospitals and
                      healthcare facilities around them. Users can star and
                      unstar any healthcare facilities for easier access.
                      Clicking a starred location in the sidebar will redirect
                      users to its location.
                      <br />
                      <strong>Benefits of this feature:</strong>
                      <ul>
                        <li>
                          Quick access to nearby healthcare facilities in case
                          of emergencies.
                        </li>
                        <li>
                          Ability to bookmark and prioritize favorite or most
                          frequently visited locations.
                        </li>
                        <li>
                          Effortless navigation to healthcare facilities with a
                          single click.
                        </li>
                        <li>
                          Enhanced safety by knowing the closest healthcare
                          options.
                        </li>
                      </ul>
                    </p>
                  </motion.div>
                )}
              </SectionContent>
              <SectionImage src={mapPortalGif} alt="Map Portal" />
            </Section>

            <Section>
              <SectionContent>
                <SectionHeading onClick={() => toggleCollapse("news")}>
                  News
                </SectionHeading>
                {!isCollapsed.news && (
                  <motion.div
                    initial={{ x: "-100vw" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p>
                      See news in different categories like COVID, vaccine, and
                      general news. Users can also star any article and see them
                      in the starred articles sidebar. Stay updated with the
                      latest news about the pandemic.
                      <br />
                      <strong>COVID News:</strong>
                      <ul>
                        <li>Updates on COVID-19 cases worldwide.</li>
                        <li>Vaccine distribution progress and updates.</li>
                        <li>Impact of COVID-19 on various industries.</li>
                      </ul>
                      <br />
                      <strong>Vaccine News:</strong>
                      <ul>
                        <li>Latest vaccine research and development.</li>
                        <li>Vaccine efficacy and side effects.</li>
                        <li>Vaccination drives and campaigns.</li>
                      </ul>
                      <br />
                      <strong>General Healthcare News:</strong>
                      <ul>
                        <li>Healthcare infrastructure developments.</li>
                        <li>Healthcare policies and regulations.</li>
                        <li>
                          Breakthroughs in medical treatments and technologies.
                        </li>
                      </ul>
                    </p>
                  </motion.div>
                )}
              </SectionContent>
              <SectionImage src={newsImage} alt="News" />
            </Section>

            <Section>
              <SectionImage src={inventoryImage} alt="Inventory" />
              <SectionContent style={{ textAlign: "left" }}>
                <SectionHeading onClick={() => toggleCollapse("inventory")}>
                  Inventory
                </SectionHeading>
                {!isCollapsed.inventory && (
                  <motion.div
                    initial={{ x: "100vw" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p>
                      Pandemiconium allows the user to maintain inventory lists
                      where they can track their inventory items.
                    </p>
                    <p>
                      <strong>Lists:</strong>
                      <br />
                      Users can create multiple lists to organize their
                      inventory items. Each list can have a unique name and
                      purpose (e.g., Groceries, Office Supplies).
                      <br />
                      <br />
                      <strong>Adding Items:</strong>
                      <br />
                      Allows users to add up to 10 items to each list. Input
                      fields for item name, quantity, and threshold level.
                      <br />
                      <br />
                      <strong>Managing Items:</strong>
                      <br />
                      Users can edit item details like quantity and threshold.
                      Option to remove items from the list.
                    </p>
                  </motion.div>
                )}
              </SectionContent>
            </Section>
            <Section>
              <SectionContent style={{ textAlign: "center" }}>
                <SectionHeading onClick={() => toggleCollapse("pandemicInfo")}>
                  Pandemic Information
                </SectionHeading>
                {!isCollapsed.pandemicInfo && (
                  <motion.div
                    initial={{ x: "-100vw" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p>
                      Provides users with information on how to prepare for a
                      pandemic and stay safe during and after the event.
                    </p>
                  </motion.div>
                )}
              </SectionContent>
              <SectionImage src={pandemicImage} alt="Pandemic Information" />
            </Section>

            <AboutSection id="aboutSection">
              <SectionHeading>About the devs!</SectionHeading>
              <DeveloperContainer>
                <DeveloperTile>
                  <DeveloperTileImage src={dev1} alt="Developer 1" />
                  <DeveloperName>Subhasish Das</DeveloperName>
                  <DeveloperRole>Front-end Developer.</DeveloperRole>
                  <p
                    style={{
                      marginTop: "10px",
                      marginBottom: "20px",
                      fontSize: "18px",
                      fontFamily: "Comic Sans MS, cursive",
                      textAlign: "center",
                    }}
                  >
                    As the frontend developer, I leveraged the power of ReactJS
                    to create a dynamic and interactive user interface for
                    Pandemiconium. By utilizing React components and state
                    management, I ensured seamless rendering and efficient
                    updates. With the help of styled-components and CSS, I
                    crafted an engaging visual design that adheres to modern web
                    standards. Additionally, I integrated various React modules,
                    such as react-router-dom for navigation and framer-motion
                    for animations, to enhance the overall user experience and
                    create a truly immersive web application.
                  </p>
                </DeveloperTile>
                <DeveloperTile>
                  <DeveloperTileImage src={dev2} alt="Developer 2" />
                  <DeveloperName>Ranganath V.</DeveloperName>
                  <DeveloperRole>
                    Backend Designer and API developer.
                  </DeveloperRole>
                  <p
                    style={{
                      marginTop: "10px",
                      marginBottom: "20px",
                      fontSize: "18px",
                      fontFamily: "Comic Sans MS, cursive",
                      textAlign: "center",
                    }}
                  >
                    As the Backend Designer and API developer, I leveraged the
                    power of Minimal API to establish a seamless connection
                    between the frontend and backend. I implemented robust user
                    authentication mechanisms, ensuring secure access to the
                    application. Additionally, I integrated email services to
                    facilitate seamless communication with users upon successful
                    sign-up. To store user details securely, I utilized highly
                    secure MySQL databases, adhering to industry-standard
                    security practices. Furthermore, I incorporated JWT tokens
                    for enhanced user session management and authentication,
                    providing an extra layer of security for our application.
                  </p>
                </DeveloperTile>
                <DeveloperTile>
                  <DeveloperTileImage src={dev3} alt="Developer 3" />
                  <DeveloperName>Muhsin Bashir</DeveloperName>
                  <DeveloperRole>Head of Research and Analysis.</DeveloperRole>
                  <p
                    style={{
                      marginTop: "10px",
                      marginBottom: "20px",
                      fontSize: "18px",
                      fontFamily: "Comic Sans MS, cursive",
                      textAlign: "center",
                    }}
                  >
                    As the Head of Research and Analysis, I lead efforts to
                    investigate pandemic-related topics, providing valuable
                    insights that guide our strategies. My role focuses on
                    conducting thorough research to support our decision-making
                    processes and ensuring that our initiatives are based on the
                    latest findings and trends in the field.
                  </p>
                </DeveloperTile>
                <DeveloperTile>
                  <DeveloperTileImage src={dev4} alt="Developer 4" />
                  <DeveloperName>Bhumika Raj</DeveloperName>
                  <DeveloperRole>Head of Publications.</DeveloperRole>
                  <p
                    style={{
                      marginTop: "10px",
                      marginBottom: "20px",
                      fontSize: "18px",
                      fontFamily: "Comic Sans MS, cursive",
                      textAlign: "center",
                    }}
                  >
                    As the Head of Publications, I manage the dissemination of
                    our research through reports, presentations, and academic
                    papers. My role ensures that our findings are effectively
                    communicated to the broader community, aiding in the
                    dissemination of knowledge and the impact of our work.
                  </p>
                </DeveloperTile>
              </DeveloperContainer>
            </AboutSection>
          </motion.div>
          {showScrollButton && (
            <button
              className="btn btn-primary"
              onClick={scrollToTop}
              style={{ position: "fixed", bottom: "20px", right: "20px" }}
            >
              <BackToTop />
            </button>
          )}
        </Container>
      </div>
      <ToastContainer />
    </>
  );
};

export default HomePage;
