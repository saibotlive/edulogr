import React, { useState, FormEvent } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSignIncidentMutation, useGetIncidentByIdQuery } from '../features/incidents/incidentApi';

interface FormData {
  parentSignature: string;
  parentSignatureType: 'handwritten' | 'typed';
}

export default function SignIncident() {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<FormData>({ parentSignature: '', parentSignatureType: 'typed' });
  const [signIncident, { isLoading }] = useSignIncidentMutation();
  const { data: incident, error, isLoading: isIncidentLoading } = useGetIncidentByIdQuery(id!);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signIncident({ id, ...formData });
  };

  if (isIncidentLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading incident details</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      {incident && (
        <>
          <Typography variant="h6">Incident Details</Typography>
          <Typography variant="body1">
            <strong>Child Name:</strong> {incident.childName}
          </Typography>
          <Typography variant="body1">
            <strong>Details:</strong> {incident.details}
          </Typography>
          <Typography variant="body1">
            <strong>Signature:</strong> {incident.signature}
          </Typography>
        </>
      )}
      <TextField
        label="Parent Signature"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.parentSignature}
        onChange={(e) => setFormData({ ...formData, parentSignature: e.target.value })}
      />
      <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
        Sign Incident
      </Button>
    </form>
  );
}
