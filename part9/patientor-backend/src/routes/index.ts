import express from 'express';
import diagnosesRoute from './diagnose.route';
import patientsRoute from './patient.route';

const router = express.Router();

router.use('/diagnoses', diagnosesRoute );
router.use('/patients', patientsRoute );

export default router;