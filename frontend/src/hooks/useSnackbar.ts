import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SnackbarOptions {
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

export function useSnackbar() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarOptions, setSnackbarOptions] = useState<SnackbarOptions>({ message: '', severity: 'success' });

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setSnackbarOptions({ message, severity });
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const SnackbarComponent = () => (
    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
      <Alert onClose={handleSnackbarClose} severity={snackbarOptions.severity} sx={{ width: '100%' }}>
        {snackbarOptions.message}
      </Alert>
    </Snackbar>
  );

  return { showSnackbar, SnackbarComponent };
}
