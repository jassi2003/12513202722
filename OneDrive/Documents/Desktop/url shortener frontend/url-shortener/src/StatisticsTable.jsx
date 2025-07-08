// src/components/StatisticsTable.jsx
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StatisticsTable = ({ data }) => {
  if (!data.length) return <Typography>No data found.</Typography>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        URL Statistics
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Expires</TableCell>
            <TableCell>Click Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.shortcode}>
              <TableCell>
                <Link href={`/${item.shortcode}`} target="_blank">
                  {window.location.origin}/{item.shortcode}
                </Link>
              </TableCell>
              <TableCell>{item.url}</TableCell>
              <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(item.expiresAt).toLocaleString()}</TableCell>
              <TableCell>
                {item.clickData.length}
                <Accordion sx={{ mt: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="body2">Click Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {item.clickData.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        No clicks yet.
                      </Typography>
                    ) : (
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>Source</TableCell>
                            <TableCell>Location</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {item.clickData.map((click, i) => (
                            <TableRow key={i}>
                              <TableCell>{new Date(click.timestamp).toLocaleString()}</TableCell>
                              <TableCell>{click.source}</TableCell>
                              <TableCell>{click.location}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </AccordionDetails>
                </Accordion>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default StatisticsTable;
