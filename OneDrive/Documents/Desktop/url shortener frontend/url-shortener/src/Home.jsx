// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ShortenerForm from './shortenerForm';
import ShortenerResult from './ShortenerResult';
import { findByShortcode } from './storage';
import { logEvent } from './logger';

const Home = () => {
  const [results, setResults] = useState([]);
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (shortcode) {
      const found = findByShortcode(shortcode);
      if (!found) {
        alert("Short URL not found.");
        navigate('/');
        return;
      }

      const now = new Date();
      const expiry = new Date(found.expiresAt);
      if (now > expiry) {
        alert("This link has expired.");
        navigate('/');
        return;
      }

      logEvent("REDIRECT", { shortcode, time: now.toISOString() });
      found.clickData.push({
        timestamp: now.toISOString(),
        source: document.referrer || 'direct',
        location: 'Unknown', // Placeholder for geo-location
      });

      localStorage.setItem('shortenedUrls', JSON.stringify(
        JSON.parse(localStorage.getItem('shortenedUrls')).map(u =>
          u.shortcode === shortcode ? found : u
        )
      ));

      window.location.href = found.url;
    }
  }, [shortcode, navigate]);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      <ShortenerForm onSuccess={setResults} />
      <ShortenerResult results={results} />
    </Container>
  );
};

export default Home;
