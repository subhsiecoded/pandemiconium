import React, { useState, useEffect } from "react";
import ArticleGrid from "./ArticleGrid";
import StarredArticles from "./StarredArticles";
import CurrentDateTime from "../CurrentDateTime";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles.css";
import logoWatermark from "../img/newsbackground.png";
import logo from "../img/logonav.png";
import styled from "styled-components";
import Customheaderfont from "../fonts/AGoblinAppears-o2aV.ttf";

const NewsHeaderContainer = styled.h2`
  @font-face {
    font-family: "CustomHeaderFont";
    src: url(${Customheaderfont}) format("woff2");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  color: ${(props) => (props.darkMode ? "#ffffff" : "#000000")};
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  font-family: "CustomHeaderFont", cursive;
  font-size: 38px; 
`;

const Container = styled.div`
  background-image: url(${logoWatermark}); 
  background-repeat: repeat;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 50px;
  background-position: center;
  background-attachment: fixed;
  animation: animateBackground 10s linear infinite; 

  @keyframes animateBackground {
    from {
      background-position: 0 0; 
    }
    to {
      background-position: 100% 100%; 
    }
  }
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
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(255, 255, 255, 0.8)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"); /* Change the toggler icon to a custom SVG */
  }
`;

const NewsApp = ({ onLogout, darkMode }) => {
  const [covidNews, setCovidNews] = useState([]);
  const [vaccineNews, setVaccineNews] = useState([]);
  const [generalNews, setGeneralNews] = useState([]);
  const [starredArticles, setStarredArticles] = useState([]);
  const [userId, setUserId] = useState(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showStarredArticles, setShowStarredArticles] = useState(false);
  const [covidCollapsed, setCovidCollapsed] = useState(false);
  const [vaccineCollapsed, setVaccineCollapsed] = useState(false);
  const [generalCollapsed, setGeneralCollapsed] = useState(false);
  const proxyUrl = "http://localhost:3001/news"; 

  useEffect(() => {
    fetchNews("covid");
    fetchNews("vaccine");
    fetchNews("general"); 
    const storedUserId = JSON.parse(localStorage.getItem("userId"));
    setUserId(storedUserId);

    if (storedUserId) {
      fetchStarredArticles(storedUserId.token);
    }
    toggleStarredArticles();
  }, []);

  const toggleStarredArticles = () => {
    setShowStarredArticles(!showStarredArticles);
    if (!showStarredArticles && userId) {
      fetchStarredArticles(userId.token);
    }
  };

  const fetchNews = async (category) => {
    try {
      const response = await fetch(`${proxyUrl}?category=${category}`);
      const data = await response.json();
      if (category === "covid") {
        setCovidNews(data.articles);
      } else if (category === "vaccine") {
        setVaccineNews(data.articles);
      } else if (category === "general") {
        setGeneralNews(data.articles); 
      }
    } catch (error) {
      console.error(`Error fetching ${category} news:`, error);
    }
  };

  const fetchStarredArticles = async (token) => {
    try {
      const response = await fetch(
        `https://pandemiconiummanager.azurewebsites.net/GetStarredArticles/${token}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (Array.isArray(data) && data.length >= 2) {
        setStarredArticles(data[1]);
      }
    } catch (error) {
      console.error("Error fetching starred articles:", error);
    }
  };

  const saveStarredArticle = async (article, userId) => {
    try {
      const response = await fetch(
        `https://pandemiconiummanager.azurewebsites.net/SaveArticle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userId["token"],
            articleUrl: article.url,
            imageUrl: article.urlToImage,
            description: article.description,
          }),
        }
      );
      if (response.ok) {
        console.log("Article saved successfully!");
        window.location.reload();
      } else {
        displayPopupMessage("Article is already stored!");
        setTimeout(function () {
          window.location.reload();
        }, 1200);
      }
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const deleteStarredArticle = async (article) => {
    try {
      const deleteUrl = `https://pandemiconiummanager.azurewebsites.net/DeleteStarredArticle`;
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId.token,
          articleUrl: article.articleUrl,
        }),
      });
      if (response.ok) {
        console.log("Article deleted successfully!");
      } else {
        console.error("Failed to delete article:", response.status);
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleStarArticle = (article) => {
    if (
      starredArticles.some(
        (starredArticle) => starredArticle.url === article.url
      )
    ) {
      displayPopupMessage("Article is already starred!");
    } else {
      setStarredArticles((prevStarredArticles) => [
        ...prevStarredArticles,
        article,
      ]);
      saveStarredArticle(article, userId);
    }
  };

  const handleUnstarArticle = async (article) => {
    try {
      setStarredArticles((prevStarredArticles) =>
        prevStarredArticles.filter(
          (starredArticle) => starredArticle.articleUrl !== article.articleUrl
        )
      );
      await deleteStarredArticle(article);
    } catch (error) {
      console.error("Error un-starring article:", error);
    }
  };

  const displayPopupMessage = (message) => {
    toast.info(message, {
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  };

  return (
    <div className={`news-app ${sidebarExpanded ? "sidebar-expanded" : ""}`}>
      <StyledNav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
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
      <Container>
        <NewsHeaderContainer darkMode={darkMode}>
          <h1>Pandemiconium News Portal</h1>
        </NewsHeaderContainer>
        <div className="main-content">
          <ToastContainer />
          <section>
            <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
              <span
                onClick={() => setCovidCollapsed(!covidCollapsed)}
                style={{ cursor: "pointer" }}
              >
                Covid News {covidCollapsed ? "(Expand)" : "(Collapse)"}
              </span>
            </h2>
            {!covidCollapsed && (
              <ArticleGrid news={covidNews} onStar={handleStarArticle} />
            )}
          </section>
          <section>
            <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
              <span
                onClick={() => setVaccineCollapsed(!vaccineCollapsed)}
                style={{ cursor: "pointer" }}
              >
                Vaccine News {vaccineCollapsed ? "(Expand)" : "(Collapse)"}
              </span>
            </h2>
            {!vaccineCollapsed && (
              <ArticleGrid news={vaccineNews} onStar={handleStarArticle} />
            )}
          </section>
          <section>
            <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
              <span
                onClick={() => setGeneralCollapsed(!generalCollapsed)}
                style={{ cursor: "pointer" }}
              >
                General News {generalCollapsed ? "(Expand)" : "(Collapse)"}
              </span>
            </h2>
            {!generalCollapsed && (
              <ArticleGrid news={generalNews} onStar={handleStarArticle} />
            )}
          </section>
          <button className="sidebar-button" onClick={toggleStarredArticles} />
          {showStarredArticles && (
            <StarredArticles
              articles={starredArticles}
              onUnstar={handleUnstarArticle}
              onExpand={() => setSidebarExpanded(true)}
              onCollapse={() => setSidebarExpanded(false)}
              expanded={sidebarExpanded}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default NewsApp;
