import express from 'express';
import { addEntry, addPatient, getIndividualPatient, getPatients } from '../services/patient.service';

const router = express.Router();

router.get('/', getPatients);
router.get('/:id', getIndividualPatient);
router.post('/', addPatient);
router.post('/:id/entries', addEntry);

export default router;