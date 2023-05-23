import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import patientEntries from '../../data/patients';
import { NonSensitivePatient, Patient } from '../types';
import toNewPatientEntry from '../utils';

const patients: NonSensitivePatient[] = patientEntries.map((patient) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn, entries, ...nonSensitivePatientData } = patient;
  return nonSensitivePatientData;
});

export const getPatients = (_req: Request, res: Response) => {
  res.json(patients);
};

export const getIndividualPatient = (req: Request, res: Response) => {
  const { id } = req.params;
  const patient: Patient | undefined = patientEntries.find((patient) => patient.id === id);

  if (!patient) return res.status(404).json('Not Found');
  return res.json(patient);
};

export const addPatient = (req: Request, res: Response) => {
  const id: string = uuid();
  const body = toNewPatientEntry(req.body);
  const newPatient = { id, ...body };

  patients.push(newPatient);
  res.status(201).json(newPatient);
};