// src/pages/Statistics.jsx
import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { getAllUrls } from './storage';
import StatisticsTable from './StatisticsTable';
import { logEvent } from './logger';

const Statistics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const urls = getAllUrls();
    logEvent("STATS_PAGE_VISIT", { count: urls.length });
    setData(urls);
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Shortened URL Statistics</Typography>
      <StatisticsTable data={data} />
    </Container>
  );
};

export default Statistics;
