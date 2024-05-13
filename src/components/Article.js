// Article.js

import React, { useState, useEffect }from "react";
const Article = ({ article, isStarred, onStar, onUnstar }) => {
  const { title, description, url, urlToImage } = article;
  const handleStarClick = () => {
    onStar(article);
  };

  const handleUnstarClick = () => {
    onUnstar(article);
  };

  return (
    <div className="article">
      <img src={urlToImage} alt={title} />
      <div className="article-info">
        <h2 className="article-title">{title}</h2>
        <p className="article-description">{description}</p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
        {isStarred ? (
          <button onClick={handleUnstarClick}>Unstar</button>
        ) : (
          <button onClick={handleStarClick}>Star</button>
        )}
      </div>
    </div>
  );
};

export default Article;