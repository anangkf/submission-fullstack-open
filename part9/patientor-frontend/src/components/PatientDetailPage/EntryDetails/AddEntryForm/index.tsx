import { Alert, Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';
import React from 'react'
import HealthCheckForm from './HealthCheckForm';
import { EntryFormValues } from '../../../../types';
import HospitalForm from './HospitalForm';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';

interface Props {
  formVisibility: boolean;
  entryType: string;
  onClose: () => void;
  onSubmit: (entry: EntryFormValues) => void;
  error?: string;
}

const AddEntryForm: React.FC<Props> = ({ formVisibility, entryType, onClose, onSubmit, error }) => {
  return (
    <Dialog fullWidth={true} open={formVisibility} onClose={() => onClose()}>
      <DialogTitle>New {entryType} Entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        {
          entryType === 'HealthCheck' ? <HealthCheckForm onSubmit={onSubmit} onCancel={onClose}/>
          : entryType === 'Hospital' ? <HospitalForm onSubmit={onSubmit} onCancel={onClose}/>
          : <OccupationalHealthcareForm onSubmit={onSubmit} onCancel={onClose}/>
        }
      </DialogContent>
    </Dialog>
  )
}

export default AddEntryForm