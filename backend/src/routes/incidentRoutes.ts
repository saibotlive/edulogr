import express from 'express';
import { reportIncident, getIncidents } from '../controllers/incidentController';

const router = express.Router();

router.post('/', reportIncident);
router.get('/', getIncidents);

export default router;
