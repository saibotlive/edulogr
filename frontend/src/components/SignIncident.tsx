import React, { useState, useRef, FormEvent } from 'react';
import {
  TextField,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';
import { useParams } from 'react-router-dom';
import { useSignIncidentMutation, useGetIncidentByIdQuery } from '../features/incidents/incidentApi';
import html2canvas from 'html2canvas';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../features/snackbar/snackbarSlice';

interface FormData {
  parentSignature: string;
  parentSignatureType: 'handwritten' | 'typed';
}

export default function SignIncident() {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<FormData>({ parentSignature: '', parentSignatureType: 'typed' });
  const [signIncident, { isLoading }] = useSignIncidentMutation();
  const { data: incident, error, isLoading: isIncidentLoading } = useGetIncidentByIdQuery(id!);
  const sigCanvas = useRef<SignatureCanvas>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let signature = formData.parentSignature;
    if (formData.parentSignatureType === 'handwritten' && sigCanvas.current) {
      signature = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    }

    if (formRef.current) {
      const canvas = await html2canvas(formRef.current);
      const imgData = canvas.toDataURL('image/png');

      const response = await signIncident({
        id: id!,
        parentSignature: signature,
        parentSignatureType: formData.parentSignatureType,
        screenshot: imgData,
      });

      if ('data' in response) {
        dispatch(showSnackbar({ message: 'Incident signed successfully!', severity: 'success' }));
      } else if ('error' in response) {
        dispatch(showSnackbar({ message: 'Failed to sign incident.', severity: 'error' }));
      }
    }
  };

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
  };

  if (isIncidentLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading incident details</div>;
  }

  if (incident?.signedByParent) {
    return <div>This incident has already been signed by a parent.</div>;
  }

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit} className="p-4">
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
              <strong>Teacher's Signature:</strong>
            </Typography>
            {incident.signatureType === 'handwritten' ? (
              <img
                src={incident.signature}
                alt="Teacher's signature"
                className="mb-4 border-2 border-gray-500 rounded w-40 h-20"
              />
            ) : (
              <Typography variant="body1">{incident.signature}</Typography>
            )}
          </>
        )}
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Signature Type</FormLabel>
          <RadioGroup
            row
            value={formData.parentSignatureType}
            onChange={(e) =>
              setFormData({ ...formData, parentSignatureType: e.target.value as 'handwritten' | 'typed' })
            }
          >
            <FormControlLabel value="typed" control={<Radio />} label="Typed" />
            <FormControlLabel value="handwritten" control={<Radio />} label="Handwritten" />
          </RadioGroup>
        </FormControl>
        {formData.parentSignatureType === 'typed' ? (
          <TextField
            label="Parent Signature"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.parentSignature}
            onChange={(e) => setFormData({ ...formData, parentSignature: e.target.value })}
          />
        ) : (
          <div className="mb-4">
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{ className: 'border-2 border-gray-500 rounded w-full h-48' }}
            />
            <Button onClick={clearSignature} variant="outlined" color="secondary">
              Clear
            </Button>
          </div>
        )}
        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
          Sign Incident
        </Button>
      </form>
    </div>
  );
}
