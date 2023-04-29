import express from 'express';
import { addPatient, getPatients } from '../services/patient.service';

const router = express.Router();

router.get('/', getPatients);
router.post('/', addPatient);

export default router;