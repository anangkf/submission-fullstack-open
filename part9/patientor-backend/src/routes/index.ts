import express from 'express';
import diagnosesRoute from './diagnose.route';

const router = express.Router();

router.use('/diagnoses', diagnosesRoute );

export default router;