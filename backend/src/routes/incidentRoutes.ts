import express from 'express';
import {
  reportIncident,
  getIncidents,
  signIncident,
  getIncidentById,
  getIncidentStatistics,
} from '../controllers/incidentController';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/', auth, reportIncident);
router.get('/', auth, getIncidents);
router.get('/:id', auth, getIncidentById);
router.post('/sign/:id', signIncident);
router.get('/statistics', auth, getIncidentStatistics);

export default router;
