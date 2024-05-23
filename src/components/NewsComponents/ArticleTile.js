import React from "react";

const ArticleTile = ({ imageUrl, description, articleUrl, onUnstar }) => {
  const handleUnstarClick = () => {
    onUnstar();
  };

  return (
    <div className="article-tile">
      <img src={imageUrl} alt={description} style={{ maxHeight: "150px", width: "auto" }}/>
      <div className="article-info">
        <p className="article-description">{description}</p>
        <a href={articleUrl} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
        <button onClick={handleUnstarClick}>Unstar</button>
      </div>
    </div>
  );
};

export default ArticleTile;
