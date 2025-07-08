
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJqYXNwcmVldGphc3Npc2luZ2gyMDAzQGdtYWlsLmNvbSIsImV4cCI6MTc1MTk1MzYwOCwiaWF0IjoxNzUxOTUyNzA4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYTU2MjBhM2MtN2U0ZS00YTI1LWE3NjktZDZmMDY2YjAxZGFjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiamFzcHJlZXQgc2luZ2giLCJzdWIiOiJlZDEwNWIzZC00NDM2LTRiOTktYThlZi02YTM3MmUyZTc3YzYifSwiZW1haWwiOiJqYXNwcmVldGphc3Npc2luZ2gyMDAzQGdtYWlsLmNvbSIsIm5hbWUiOiJqYXNwcmVldCBzaW5naCIsInJvbGxObyI6IjEyNTEzMjAyNzIyIiwiYWNjZXNzQ29kZSI6IlZQcHNtVCIsImNsaWVudElEIjoiZWQxMDViM2QtNDQzNi00Yjk5LWE4ZWYtNmEzNzJlMmU3N2M2IiwiY2xpZW50U2VjcmV0Ijoia3lxa1FLSkptbWFWeWJteiJ9.DaOD6lxwCUL8xZEvZTvKZVdTiUu3GDhX5rZ_PT1hcCg";

//  MIDDLEWARE 
app.use(async (req, res, next) => {
  try {
    await axios.post("http://20.244.56.144/evaluation-service/logs", {
      method: req.method,
      url: req.url,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      }
    });

    console.log(`[LOGGED] ${req.method} ${req.url}`);
  } catch (err) {
    console.error(" Log failed:", err.message);
  }

  next();
});


const urlMap = {};


function generateSlug() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let slug;
  do {
    slug = Array.from({ length: 6 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  } while (urlMap[slug]);
  return slug;
}

//  POST /shorten → Create a new short URL
app.post('/shorten', (req, res) => {
  const { url } = req.body;

  if (!url || !/^https?:\/\/.+$/.test(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const slug = generateSlug();
  urlMap[slug] = url;

  const shortUrl = `http://localhost:${PORT}/${slug}`;
  res.json({ original: url, short: shortUrl });
});

// Get → Redirect to original URL
app.get('/:slug', (req, res) => {
  const longUrl = urlMap[req.params.slug];
  if (longUrl) {
    return res.redirect(longUrl);
  } else {
    return res.status(404).send("Short link not found");
  }
});

//  Sample home route
app.get('/', (req, res) => {
  res.send(' Middleware Logging + URL Shortener Active!');
});

//  Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});