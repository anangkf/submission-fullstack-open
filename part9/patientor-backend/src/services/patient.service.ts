import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import patientEntries from '../../data/patients';
import { NonSensitivePatient } from '../types';
import toNewPatientEntry from '../utils';

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
  const body = toNewPatientEntry(req.body);
  const newPatient = { id, ...body };

  patients.push(newPatient);
  res.status(201).json(newPatient);
};