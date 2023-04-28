import express from 'express';
import { getDiagnosesEntry } from '../services/diagnose.service';

const router = express.Router();

router.get('/', getDiagnosesEntry);

export default router;