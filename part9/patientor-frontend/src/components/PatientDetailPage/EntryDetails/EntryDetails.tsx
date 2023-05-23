import React from 'react'
import { Diagnosis, Entry } from '../../../types'
import HospitalEntry from './HospitalEntry';
import HealthCheckEntry from './HealthCheckEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

export type EntryDetailsProps = {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry, diagnoses }) => {
  switch(entry.type) {
    case 'HealthCheck':
      return (
        <HealthCheckEntry entry={entry} diagnoses={diagnoses} />
      )
    case 'Hospital':
      return (
        <HospitalEntry entry={entry} diagnoses={diagnoses} />
      )
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses}  />
      )
    default:
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(entry)}`
      );
  }
}

export default EntryDetails