import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import patientEntries from '../../data/patients';
import { Entry, NonSensitivePatient, Patient } from '../types';
import toNewPatientEntry, { parseDiagnosisCodes } from '../utils';

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

export const addEntry = (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { body } = req;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { description, date, specialist } = body;
  const patientId = req.params.id;

  const diagnosisCodes = parseDiagnosisCodes(body);

  if(!description || !date || !specialist) {
    return res.status(400).json("Bad Request");
  }

  patientEntries.map((patient) => {
    if (patient.id === patientId ) {
      patient.entries?.push({ id: uuid(), ...body, diagnosisCodes } as Entry);
      return patient;
    }
    return patient;
  });
  return res.status(201).json(body);
};