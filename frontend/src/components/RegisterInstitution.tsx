import React, { useState, FormEvent } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useRegisterInstitutionMutation } from '../features/institution/institutionApi';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../features/snackbar/snackbarSlice';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterInstitution() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '' });
  const [registerInstitution, { isLoading }] = useRegisterInstitutionMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await registerInstitution(formData);
    if ('data' in response) {
      dispatch(showSnackbar({ message: 'Institution registered successfully!', severity: 'success' }));
    } else if ('error' in response) {
      dispatch(showSnackbar({ message: 'Failed to register institution.', severity: 'error' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <Typography variant="h6">Register Institution</Typography>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
        Register
      </Button>
    </form>
  );
}
