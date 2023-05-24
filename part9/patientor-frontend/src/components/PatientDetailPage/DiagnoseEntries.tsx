import { Button, ButtonGroup, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Diagnosis, EntryFormValues, Patient } from '../../types'
import EntryDetails from './EntryDetails/EntryDetails';
import AddEntryForm from './EntryDetails/AddEntryForm';
import patientService from '../../services/patients'

type DiagnoseEntriesProps = {
  patient: Patient;
  diagnoses: Diagnosis[];
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
}

const DiagnoseEntries: React.FC<DiagnoseEntriesProps> = ({ patient, diagnoses, setPatient }) => {
  const [openForm, setOpenForm] = useState(false)
  const [entryType, setEntryType] = useState('')
  const { id } = useParams()

  const toggleForm = () => setOpenForm(!openForm)

  const openEntryForm = (type: string) => {
    setEntryType(type)
    toggleForm()
  }
  
  const addEntry = (entry: EntryFormValues) => {
    patientService.createEntry(id as string, entry)
      .then((res) => {
        const changedPatientData = { ...patient }
        changedPatientData.entries.push(res)
        setPatient(changedPatientData)
      })
      .catch((error) => console.error(error))
    toggleForm()
  }

  return (
    <Stack sx={{ justifyContent: 'flex-start' }} >
      <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 2 }} >
        <Typography >Add new Entry</Typography>
        <ButtonGroup variant='contained' disabled={openForm} disableElevation >
          <Button 
            sx={{ maxWidth: 'max-content' }} 
            onClick={() => openEntryForm('HealthCheck')}
          >
            Health Check
          </Button>
          <Button 
            sx={{ maxWidth: 'max-content' }} 
            onClick={() => openEntryForm('Hospital')}
          >
            Hospital Check
          </Button>
          <Button 
            sx={{ maxWidth: 'max-content' }} 
            onClick={() => openEntryForm('OccupationalHealthcare')}
          >
            Occupational Healthcare
          </Button>
        </ButtonGroup>
      </Stack>
      <AddEntryForm formVisibility={openForm} entryType={entryType} onClose={toggleForm} onSubmit={addEntry} />
      {patient?.entries?.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </Stack>
  )
}

export default DiagnoseEntries