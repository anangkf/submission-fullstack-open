import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { Diagnosis, Patient } from '../../types'
import { Stack, Typography } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import DiagnoseEntries from './DiagnoseEntries';

const INIT_PATIENT_DATA: Patient = {
  id: "",
  name: "",
  dateOfBirth: "",
  ssn: "",
  gender: "",
  occupation: "",
  entries: []
}

const PatientDetailPage: React.FC = () => {
  const { id } = useParams()
  const [patient, setPatient] = useState(INIT_PATIENT_DATA);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    diagnosesService.getAll()
      .then((res) => setDiagnoses(res))
  }, [])

  useEffect(() => {
    if(id) {
      patientService.getOne(id)
        .then((res) => setPatient(res))
    }
  }, [id])

  return (
    <Stack
      sx={{
        py: 3,
        gap: 2
      }}
    >
      <Typography variant='h4' sx={{ display: 'flex', gap: 2, alignItems: 'center' }}  >
        {patient.name}
        {patient.gender === 'male'
          ? <MaleIcon fontSize='large' />
          : <FemaleIcon fontSize='large' />
        }
      </Typography>
      <Stack>
        <Typography>ssn: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>
      </Stack>

      <Typography variant='h6' >Entries</Typography>
      <DiagnoseEntries patient={patient} diagnoses={diagnoses} setPatient={setPatient} />
    </Stack>
  )
}

export default PatientDetailPage;