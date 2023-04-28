import { Request, Response } from 'express';
import patientEntries from '../../data/patients';
import { NonSensitivePatient } from '../types';

const patients: NonSensitivePatient[] = patientEntries.map((patient) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn, ...nonSensitivePatientData } = patient;
  return nonSensitivePatientData;
});

export const getPatients = (_req: Request, res: Response) => {
  res.json(patients);
};