import React, { useState, FormEvent } from 'react';
import { TextField, Button } from '@mui/material';
import { useAddIncidentMutation } from '../features/incidents/incidentApi';

interface FormData {
  childName: string;
  details: string;
  signature: string; // This could be a URL or typed name based on signatureType
  signatureType: 'handwritten' | 'typed';
}

export default function IncidentForm() {
  const [formData, setFormData] = useState<FormData>({
    childName: '',
    details: '',
    signature: '',
    signatureType: 'typed',
  });
  const [addIncident, { isLoading }] = useAddIncidentMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addIncident({ ...formData, date: new Date(), status: 'reported' });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <TextField
        label="Child Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.childName}
        onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
      />
      <TextField
        label="Details"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.details}
        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
      />
      <TextField
        label="Signature"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.signature}
        onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
      />
      <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
        Report Incident
      </Button>
    </form>
  );
}
