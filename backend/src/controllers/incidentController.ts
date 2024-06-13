// backend/src/controllers/incidentController.ts
import { Request, Response } from 'express';
import Incident from '../models/Incident';

interface ReportIncidentRequestBody {
  institution: string;
  childName: string;
  details: string;
  signature: string;
  signatureType: 'handwritten' | 'typed';
  comments?: string;
}

export const reportIncident = async (req: Request<{}, {}, ReportIncidentRequestBody>, res: Response): Promise<void> => {
  try {
    const { institution, childName, details, signature, signatureType, comments } = req.body;
    const newIncident = new Incident({
      institution,
      childName,
      details,
      signature,
      signatureType,
      status: 'reported',
      comments,
    });
    await newIncident.save();
    res.status(201).json(newIncident);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getIncidents = async (req: Request, res: Response): Promise<void> => {
  try {
    const incidents = await Incident.find();
    res.json(incidents);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};
