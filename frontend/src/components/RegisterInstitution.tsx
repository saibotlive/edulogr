import React, { useState, FormEvent } from 'react';
import { TextField, Button } from '@mui/material';
import { useRegisterInstitutionMutation } from '../features/institution/institutionApi';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterInstitution() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '' });
  const [registerInstitution, { isLoading }] = useRegisterInstitutionMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await registerInstitution(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <TextField
        label="School Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
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
      <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
        Register
      </Button>
    </form>
  );
}
