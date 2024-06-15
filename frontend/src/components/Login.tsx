import React, { useState, FormEvent } from 'react';
import { TextField, Button } from '@mui/material';
import { useLoginInstitutionMutation } from '../features/institution/institutionApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showSnackbar } from '../features/snackbar/snackbarSlice';
import { loginSuccess } from '../features/auth/authSlice';

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [loginInstitution] = useLoginInstitutionMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await loginInstitution(formData);
    if ('data' in response) {
      const { token } = response.data;
      localStorage.setItem('token', token);
      dispatch(loginSuccess(token));
      dispatch(showSnackbar({ message: 'Logged in successfully!', severity: 'success' }));
      navigate('/');
    } else if ('error' in response) {
      dispatch(showSnackbar({ message: 'Login failed.', severity: 'error' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </form>
  );
}
