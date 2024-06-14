import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { RootState } from '../app/store';

export default function Home() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Welcome to the Edulogr
      </Typography>
      {isAuthenticated && (
        <Button variant="contained" color="primary" component={Link} to="/report-incident">
          Report Incident
        </Button>
      )}
    </div>
  );
}
