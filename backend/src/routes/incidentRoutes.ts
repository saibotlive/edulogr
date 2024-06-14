import express from 'express';
import { reportIncident, getIncidents, signIncident, getIncidentById } from '../controllers/incidentController';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/', auth, reportIncident);
router.get('/', getIncidents);
router.get('/:id', getIncidentById); // Add this line
router.post('/sign/:id', signIncident);

export default router;
