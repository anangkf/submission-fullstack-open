import { Request, Response } from 'express';
import diagnoseEntries from '../../data/diagnoses';
import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnoseEntries;

export const getDiagnosesEntry = (_req: Request, res: Response) => {
  return res.json(diagnoses);
};