// src/components/ShortenerForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import { isValidURL, isPositiveInteger, isValidShortcode } from './validators';
import { logEvent } from './logger';
import { saveUrlData, getAllUrls } from './storage';

const generateShortcode = () => {
  return Math.random().toString(36).substring(2, 8); // 6-char alphanumeric
};

const ShortenerForm = ({ onSuccess }) => {
  const [inputs, setInputs] = useState([{ url: '', validity: '', code: '' }]);

  const handleChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };

  const addInputField = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: '', validity: '', code: '' }]);
    }
  };

  const handleSubmit = () => {
    const results = [];

    for (let i = 0; i < inputs.length; i++) {
      const { url, validity, code } = inputs[i];

      if (!isValidURL(url)) {
        alert(`Invalid URL at entry ${i + 1}`);
        return;
      }

      if (validity && !isPositiveInteger(validity)) {
        alert(`Invalid validity at entry ${i + 1}`);
        return;
      }

      if (code && !isValidShortcode(code)) {
        alert(`Invalid shortcode at entry ${i + 1}`);
        return;
      }

      const all = getAllUrls();
      const exists = all.some(u => u.shortcode === code);
      let finalCode = code;

      if (code && exists) {
        alert(`Shortcode "${code}" already exists`);
        return;
      }

      if (!code) {
        do {
          finalCode = generateShortcode();
        } while (all.some(u => u.shortcode === finalCode));
      }

      const createdAt = new Date();
      const validityMins = validity ? parseInt(validity) : 30;
      const expiresAt = new Date(createdAt.getTime() + validityMins * 60000);

      const entry = {
        url,
        shortcode: finalCode,
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        clickData: [],
      };

      saveUrlData(entry);
      logEvent("URL_SHORTENED", entry);
      results.push(entry);
    }

    onSuccess(results);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Shorten URLs (max 5)</Typography>
      {inputs.map((input, i) => (
        <Grid container spacing={2} key={i} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={5}>
            <TextField
              label="Long URL"
              fullWidth
              value={input.url}
              onChange={(e) => handleChange(i, 'url', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Validity (mins)"
              fullWidth
              value={input.validity}
              onChange={(e) => handleChange(i, 'validity', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Custom Code (optional)"
              fullWidth
              value={input.code}
              onChange={(e) => handleChange(i, 'code', e.target.value)}
            />
          </Grid>
        </Grid>
      ))}

      <Button
        variant="contained"
        onClick={addInputField}
        disabled={inputs.length >= 5}
        sx={{ mr: 2 }}
      >
        Add More
      </Button>
      <Button variant="contained" color="success" onClick={handleSubmit}>
        Shorten URLs
      </Button>
    </Box>
  );
};

export default ShortenerForm;
