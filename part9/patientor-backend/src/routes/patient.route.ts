import express from 'express';
import { addPatient, getIndividualPatient, getPatients } from '../services/patient.service';

const router = express.Router();

router.get('/', getPatients);
router.get('/:id', getIndividualPatient);
router.post('/', addPatient);

export default router;