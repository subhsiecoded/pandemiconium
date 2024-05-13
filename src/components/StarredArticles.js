import React from "react";
import ArticleTile from "./ArticleTile";

const StarredArticles = ({
  articles, // Use the articles prop
  onUnstar,
  onExpand,
  onCollapse,
  expanded,
}) => {
  const toggleExpand = () => {
    if (!expanded) {
      onExpand();
    } else {
      onCollapse();
    }
  };

  return (
    <>
      <div className={`starred-articles ${expanded ? "expanded" : "collapsed"}`}>
        <h2 style={{ color: "#000" }}>Starred Articles ({articles.length})</h2>
        <div className="grid">
          {articles.map((article, index) => (
            <ArticleTile
              key={index}
              imageUrl={article.imageUrl}
              description={article.description}
              articleUrl={article.articleUrl}
              onUnstar={() => onUnstar(article)}
            />
          ))}
        </div>
      </div>
      <div className="sidebar-toggle" onClick={toggleExpand}>
        {expanded ? <span>&#9668;</span> : <span>&#9658;</span>}
      </div>
    </>
  );
};

export default StarredArticles;