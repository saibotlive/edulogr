import { useGetIncidentStatisticsQuery } from '../features/statistics/statisticsApi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Box, CircularProgress } from '@mui/material';

const Statistics = () => {
  const { data: statistics, error, isLoading } = useGetIncidentStatisticsQuery();

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error loading statistics</div>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Incident Statistics
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={statistics}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Statistics;
