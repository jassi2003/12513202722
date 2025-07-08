// src/components/ShortenerResult.jsx
import { Box, Typography, Link } from '@mui/material';

const ShortenerResult = ({ results }) => {
  if (!results.length) return null;

  return (
    <Box mt={4}>
      <Typography variant="h6">Shortened Links:</Typography>
      {results.map(({ url, shortcode, expiresAt }) => (
        <Box key={shortcode} mt={1}>
          <Typography>
            Original: {url}
            <br />
            Short URL: <Link href={`/${shortcode}`} target="_blank">{window.location.origin}/{shortcode}</Link>
            <br />
            Expires At: {new Date(expiresAt).toLocaleString()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ShortenerResult;
