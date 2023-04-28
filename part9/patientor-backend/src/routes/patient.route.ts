import express from 'express';
import { getPatients } from '../services/patient.service';

const router = express.Router();

router.get('/', getPatients);

export default router;