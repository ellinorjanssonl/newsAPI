const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Hämta kategorin från query parametrar
  const category = req.query.category || 'general'; 

  const API_KEY = process.env.API_KEY; 
  const URL = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=eeb0aac586ae480a823a06d1a916b787`;

  try {
    const newsResponse = await fetch(URL);
    if (!newsResponse.ok) {
      // Hantera felrespons från NewsAPI
      return res.status(newsResponse.status).json({ message: 'Failed to fetch news from NewsAPI' });
    }
    const newsData = await newsResponse.json();
    res.status(200).json(newsData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

