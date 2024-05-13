//ArticleGrid.js
import React, { useState, useEffect } from 'react';
import Article from './Article';
import { CSSTransition } from 'react-transition-group';

const ArticleGrid = ({ news, onStar, darkMode }) => {
  const [visibleArticles, setVisibleArticles] = useState(6);
  const [animate, setAnimate] = useState(false); // New state for animation

  useEffect(() => {
    setAnimate(true); // Trigger animation when component mounts
  }, []);

  const loadMoreArticles = () => {
    setVisibleArticles(prevVisibleArticles => prevVisibleArticles + 3);
  };

  // Add a check to ensure news is defined before slicing
  if (!news) {
    return null; // Or any fallback UI you prefer
  }

  return (
    <CSSTransition
      in={animate}
      timeout={500}
      classNames="fade"
      unmountOnExit
    >
      <div className="article-grid">
        {news.slice(0, visibleArticles).map(article => (
          <Article
            key={article.title}
            article={article}
            onStar={onStar}
          />
        ))}
        {visibleArticles < news.length && (
          <button className='loadButton'style={{
            color: darkMode ? "white" : "black", 
            textAlign: "center",
          }} onClick={loadMoreArticles}>Load More</button>
        )}
      </div>
    </CSSTransition>
  );
};

export default ArticleGrid;
