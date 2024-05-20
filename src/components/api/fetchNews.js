// api/fetchNews.js

export default async function handler(req, res) {
    const allowedOrigins = ['http://localhost:3000','https://pandemiconium.vercel.app/']; // Add more allowed origins if needed
    const origin = req.headers.origin;
  
    if (!allowedOrigins.includes(origin)) {
      return res.status(403).json({ message: "Forbidden" });
    }
  
    const { category } = req.query;
    const apiKey = "7e37076f4c10468b8ba932870b434b0b";
    let apiUrl;
  
    switch (category) {
      case 'covid':
        apiUrl = `https://newsapi.org/v2/everything?q=covid&apiKey=${apiKey}&language=en`;
        break;
      case 'vaccine':
        apiUrl = `https://newsapi.org/v2/everything?q=vaccine&apiKey=${apiKey}&language=en`;
        break;
      case 'general':
        apiUrl = `https://newsapi.org/v2/everything?q=healthcare+India&apiKey=${apiKey}&language=en`;
        break;
      default:
        return res.status(400).json({ message: "Invalid category" });
    }
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error fetching news", error });
    }
  }
  