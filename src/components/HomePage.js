import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles.css";
import CurrentDateTime from "./CurrentDateTime";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import logoWatermark from "./img/logo.png";
import logo from "./img/logonav.png";

const Container = styled.div`
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: ${(props) => (props.darkMode ? "#fff" : "#222")}; /* Text color */
  background-image: url(${logoWatermark});
  background-repeat: repeat; /* Repeat the watermark across the entire background */
`;

const AccordionBody = styled.div`
  color: ${(props) => (props.darkMode ? "#fff" : "#222")};
  font-family: Arial, sans-serif;
  background-color: rgba(255, 255, 255, 0.5); /* Transparent background */
  padding: 10px; /* Add padding for better visibility */
`;

const AboutSection = styled.div`
  color: ${(props) =>
    props.darkMode
      ? "#ffffff !important"
      : "#000000 !important"}; /* Text color */
`;

const DeveloperTile = styled.div`
  color: ${(props) =>
    props.darkMode
      ? "#ffffff !important"
      : "#000000 !important"}; /* Text color */
`;

const HomePage = ({ onLogout, darkMode }) => {
  const location = useLocation();
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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
  }, []);

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

  return (
    <div>
      <Container darkMode={darkMode}>
        <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
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
                {location.pathname !== "/" ||
                  (location.pathname !== "/home" && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/home">
                        Home
                      </Link>
                    </li>
                  ))}
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
        </nav>

        <h2 className="hometitle">Welcome to the Home Page!</h2>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className={`accordion-button ${
                  darkMode ? "bg-dark" : "bg-light"
                }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="true"
                aria-controls="flush-collapseOne"
              >
                What is a pandemic?
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionExample"
            >
              <AccordionBody darkMode={darkMode} className="accordion-body">
                The term "pandemic" refers to an outbreak of a disease that
                occurs over a wide geographic area and affects an exceptionally
                high proportion of the population. Pandemics can occur when a
                new infectious disease emerges and spreads easily from person to
                person, often causing illness on a global scale. Historically,
                pandemics have had significant impacts on human populations,
                economies, and societies. <br /> Some of the most well-known
                pandemics include the Black Death in the 14th century, which is
                estimated to have killed tens of millions of people in Europe,
                and the Spanish flu of 1918, which infected about one-third of
                the world's population and caused tens of millions of deaths. In
                modern times, pandemics have continued to pose significant
                challenges to public health. <br />
                <br /> For example, the H1N1 influenza pandemic of 2009, also
                known as the swine flu, spread rapidly around the world, causing
                widespread illness and thousands of deaths. More recently, the
                COVID-19 pandemic, caused by the novel coronavirus SARS-CoV-2,
                emerged in late 2019 and quickly became a global health crisis.
                <br />
                <br /> COVID-19 has led to millions of deaths worldwide and has
                had far-reaching social, economic, and political consequences.
                Efforts to mitigate the impact of pandemics typically involve
                measures such as disease surveillance, public health
                interventions (such as vaccination campaigns and quarantine
                measures), and international cooperation to coordinate response
                efforts. These measures aim to slow the spread of the disease,
                reduce illness and death, and minimize the societal disruption
                caused by the pandemic.
              </AccordionBody>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingTwo">
              <button
                className={`accordion-button collapsed ${
                  darkMode ? "bg-dark" : "bg-light"
                }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                History of Pandemics.
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              className="accordion-collapse "
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionExample"
            >
              <AccordionBody darkMode={darkMode} className="accordion-body">
                The history of pandemics is extensive and spans thousands of
                years. Here is an overview of some of the major pandemics that
                have occurred throughout history: <br /> <br />
                Plague of Athens (430-426 BCE): This epidemic struck during the
                Peloponnesian War and is believed to have been caused by either
                typhoid fever or a form of the plague. It resulted in the deaths
                of a significant portion of the population of Athens, including
                its leader, Pericles.
                <br />
                <br /> Antonine Plague (165-180 CE): This outbreak, during the
                reign of Roman Emperor Marcus Aurelius, is thought to have been
                either smallpox or measles. It spread throughout the Roman
                Empire and is estimated to have killed millions.
                <br />
                <br /> Plague of Justinian (541-542 CE): Named after the
                Byzantine Emperor Justinian I, this pandemic was caused by the
                bubonic plague. It is considered one of the deadliest pandemics
                in history, killing an estimated 25-50 million people and
                contributing to the decline of the Byzantine Empire.
                <br />
                <br /> Black Death (1347-1351): The Black Death, caused by the
                bacterium Yersinia pestis, is perhaps the most infamous pandemic
                in history. It originated in Asia and spread to Europe via trade
                routes, killing an estimated 75-200 million people, wiping out
                up to 60% of Europe's population.
                <br />
                <br />
                Third Cholera Pandemic (1852-1860): Originating in India, this
                pandemic spread to Asia, Europe, North America, and Africa. It
                was caused by the bacterium Vibrio cholerae and resulted in
                hundreds of thousands of deaths.
                <br />
                <br /> Spanish Flu (1918-1919): The Spanish flu, caused by the
                H1N1 influenza virus, infected about one-third of the world's
                population and killed an estimated 50 million people worldwide.
                It is considered one of the deadliest pandemics in history.
                <br />
                <br /> Asian Flu (1957-1958): This influenza pandemic was caused
                by the H2N2 influenza virus. It originated in East Asia and
                spread to other parts of the world, resulting in an estimated
                1-2 million deaths.
                <br />
                <br /> HIV/AIDS Pandemic (1980s-present): The HIV/AIDS pandemic,
                caused by the human immunodeficiency virus (HIV), has resulted
                in approximately 32 million deaths since it was first identified
                in the early 1980s. It continues to be a major global health
                issue.
                <br />
                <br /> COVID-19 Pandemic (2019-present): The COVID-19 pandemic,
                caused by the novel coronavirus SARS-CoV-2, emerged in Wuhan,
                China, in late 2019. It quickly spread around the world, leading
                to millions of deaths and causing widespread social, economic,
                and political disruption. These are just a few examples of
                pandemics throughout history. Each has had profound impacts on
                human populations and societies, shaping the course of history
                in significant ways.
              </AccordionBody>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingThree">
              <button
                className={`accordion-button collapsed ${
                  darkMode ? "bg-dark" : "bg-light"
                }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                Accordion Item #3
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              className="accordion-collapse"
              aria-labelledby="flush-headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Explanation: in this example, we define a class MyClass that has
                a static variable static_var initialized to 0. We also define an
                instance variable instance_var that is unique to each instance
                of the class. When we create an instance of the class (obj1), we
                increment the value of the static variable by 1 and assign it to
                the instance variable. When we create another instance of the
                class (obj2), we increment the static variable again and assign
                the new value to the instance variable for that instance.
                Finally, we print out the value of the static variable using the
                class itself, rather than an instance of the class. As you can
                see, the value of the static variable is shared among all
                instances of the class, and it is incremented each time a new
                instance is created. Static variables can be useful for
                maintaining state across all instances of a class, or for
                sharing data among all instances of a class. However, it’s
                important to use them carefully and to ensure that their values
                are synchronized with the state of the program, especially in a
                multithreaded environment. Advantages: Memory efficiency: Since
                static variables are shared among all instances of a class, they
                can save memory by avoiding the need to create multiple copies
                of the same data. Shared state: Static variables can provide a
                way to maintain shared state across all instances of a class,
                allowing all instances to access and modify the same data. Easy
                to access: Static variables can be accessed using the class name
                itself, without needing an instance of the class. This can make
                it more convenient to access and modify the data stored in a
                static variable. Initialization: Static variables can be
                initialized when the class is defined, making it easy to ensure
                that the variable has a valid starting value. Readability:
                Static variables can improve the readability of the code, as
                they clearly indicate that the data stored in the variable is
                shared among all instances of the class. Disadvantages:
                Inflexibility: Static variables can be inflexible, as their
                values are shared across all instances of the class, making it
                difficult to have different values for different instances.
                Hidden dependencies: Static variables can create hidden
                dependencies between different parts of the code, making it
                difficult to understand and modify the code. Thread safety:
                Static variables can be problematic in a multithreaded
                environment, as they can introduce race conditions and
                synchronization issues if not properly synchronized. Namespace
                pollution: Static variables can add to the namespace of the
                class, potentially causing name conflicts and making it harder
                to maintain the code. Testing: Static variables can make it more
                difficult to write effective unit tests, as the state of the
                static variable may affect the behavior of the class and its
                methods. Overall, static variables can be a useful tool in
                Python programming, but they should be used with care and
                attention to potential downsides, such as inflexibility, hidden
                dependencies, and thread safety concerns.
              </div>
            </div>
          </div>
        </div>
        {/* About Section */}
        <AboutSection
          id="aboutSection"
          className="aboutsect"
          style={{
            color: darkMode ? "#ffffff !important" : "#000000 !important",
            textAlign: "center",
          }}
          darkMode={darkMode}
        >
          <h2
            className="text-center mb-4"
            style={{
              color: darkMode ? "#ffffff !important" : "#000000 !important",
              textAlign: "center",
            }}
          >
            About Developers
          </h2>
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            style={{ maxWidth: "500px", height: "auto", margin: "0 auto" }}
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="3"
                aria-label="Slide 4"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://cdn.dribbble.com/users/1011714/screenshots/19835560/media/47c15c07f7addecdcf6dd5623d624f66.jpg?resize=1000x750&vertical=center"
                  alt="Subhasish Das"
                  className="d-block w-100 rounded-circle"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Subhasish Das</h5>
                  <p>Frontend designer.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="https://cdn.dribbble.com/users/1011714/screenshots/19835560/media/47c15c07f7addecdcf6dd5623d624f66.jpg?resize=1000x750&vertical=center"
                  alt="Ranganath V."
                  className="d-block w-100 rounded-circle"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Ranganath V.</h5>
                  <p>Backend Designer and API developer</p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="https://cdn.dribbble.com/users/1011714/screenshots/19835560/media/47c15c07f7addecdcf6dd5623d624f66.jpg?resize=1000x750&vertical=center"
                  alt="Muhsin Bashir"
                  className="d-block w-100 rounded-circle"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Muhsin Bashir</h5>
                  <p>Head of Artificial Intelligence and Machine learning</p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="https://cdn.dribbble.com/users/1011714/screenshots/19835560/media/47c15c07f7addecdcf6dd5623d624f66.jpg?resize=1000x750&vertical=center"
                  alt="Bhumika Raj"
                  className="d-block w-100 rounded-circle"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Bhumika Raj</h5>
                  <p>Head of Research and Analysis</p>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </AboutSection>
        {/* Scroll to Top Button */}
        {showScrollButton && (
          <button
            className="btn btn-primary"
            onClick={scrollToTop}
            style={{ position: "fixed", bottom: "20px", right: "20px" }}
          >
            Back to Top
          </button>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
