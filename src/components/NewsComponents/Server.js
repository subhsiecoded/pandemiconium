// server.js

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001; 

const NEWS_API_KEY = '7e37076f4c10468b8ba932870b434b0b';

app.use(cors());

// Proxy endpoint for news API requests
app.get('/news', async (req, res) => {
  const { category } = req.query;
  let apiUrl;
  
  switch (category) {
    case 'covid':
      apiUrl = `https://newsapi.org/v2/everything?q=covid&apiKey=${NEWS_API_KEY}&language=en`;
      break;
    case 'vaccine':
      apiUrl = `https://newsapi.org/v2/everything?q=vaccine&apiKey=${NEWS_API_KEY}&language=en`;
      break;
    case 'general':
      apiUrl = `https://newsapi.org/v2/everything?q=healthcare+India&apiKey=${NEWS_API_KEY}&language=en`;
      break;
    default:
      return res.status(400).json({ error: 'Invalid category' });
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
