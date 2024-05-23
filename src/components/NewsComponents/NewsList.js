// NewsList.js
import React from 'react';
import Article from './Article';

const NewsList = ({ news, onStar }) => {
  return (
    <div className="news-list">
      <h2>News List</h2>
      {news.map((article, index) => (
        <Article key={index} article={article} onStar={onStar} />
      ))}
    </div>
  );
};

export default NewsList;
