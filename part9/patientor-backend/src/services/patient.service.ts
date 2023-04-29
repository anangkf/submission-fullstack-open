import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import patientEntries from '../../data/patients';
import { NonSensitivePatient, Patient } from '../types';

const patients: NonSensitivePatient[] = patientEntries.map((patient) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn, ...nonSensitivePatientData } = patient;
  return nonSensitivePatientData;
});

export const getPatients = (_req: Request, res: Response) => {
  res.json(patients);
};

export const addPatient = (req: Request, res: Response) => {
  const id: string = uuid();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-unsafe-assignment
  const { name, ssn, dateOfBirth, occupation, gender}: Patient = req.body;
  const newPatient = { id, name, ssn, dateOfBirth, occupation, gender };

  patients.push(newPatient);
  res.status(201).json(newPatient);
};