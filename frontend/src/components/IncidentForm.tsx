import React, { useState, FormEvent, useRef } from 'react';
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';
import { useAddIncidentMutation } from '../features/incidents/incidentApi';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../features/snackbar/snackbarSlice';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface FormData {
  childName: string;
  details: string;
  signature: string;
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
  const [parentLink, setParentLink] = useState<string | null>(null);
  const sigCanvas = useRef<SignatureCanvas>(null);
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let signature = formData.signature;
    if (formData.signatureType === 'handwritten' && sigCanvas.current) {
      signature = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    }
    const response = await addIncident({ ...formData, signature, date: new Date(), status: 'reported' });
    if ('data' in response) {
      dispatch(showSnackbar({ message: 'Incident reported successfully!', severity: 'success' }));
      // Generate parent link
      const incidentId = response.data._id;
      const parentLinkUrl = `${window.location.origin}/sign-incident/${incidentId}`;
      setParentLink(parentLinkUrl);
    } else if ('error' in response) {
      dispatch(showSnackbar({ message: 'Failed to report incident.', severity: 'error' }));
    }
  };

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
  };

  const handleCopyLink = () => {
    if (parentLink) {
      navigator.clipboard.writeText(parentLink);
      dispatch(showSnackbar({ message: 'Link copied to clipboard!', severity: 'info' }));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4">
        <Typography variant="h6">Report Incident</Typography>
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
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Signature Type</FormLabel>
          <RadioGroup
            row
            value={formData.signatureType}
            onChange={(e) => setFormData({ ...formData, signatureType: e.target.value as 'handwritten' | 'typed' })}
          >
            <FormControlLabel value="typed" control={<Radio />} label="Typed" />
            <FormControlLabel value="handwritten" control={<Radio />} label="Handwritten" />
          </RadioGroup>
        </FormControl>
        {formData.signatureType === 'typed' ? (
          <TextField
            label="Signature"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.signature}
            onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
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
          Report Incident
        </Button>
      </form>
      {parentLink && (
        <Box mt={2} display="flex" alignItems="center">
          <TextField
            label="Parent Link"
            variant="outlined"
            fullWidth
            margin="normal"
            value={parentLink}
            InputProps={{
              readOnly: true,
            }}
          />
          <IconButton onClick={handleCopyLink} color="primary">
            <ContentCopyIcon />
          </IconButton>
        </Box>
      )}
    </div>
  );
}
