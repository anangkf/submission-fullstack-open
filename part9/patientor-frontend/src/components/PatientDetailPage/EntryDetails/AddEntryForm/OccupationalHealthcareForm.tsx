import React, { ChangeEvent, useState } from 'react'
import { Button, SelectChangeEvent, Stack, TextField } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment'
import { EntryFormValues } from '../../../../types';

const INIT_FORM_DATA = {
  description: '',
  date: '',
  specialist: '',
  diagnosisCodes: '',
  employerName: '',
  sickLeave: {
    startDate: '',
    endDate: ''
  }
}

type OccupationalHealthcareFormProps = {
  onSubmit: (entry: EntryFormValues) => void;
  onCancel: () => void;
}

const OccupationalHealthcareForm: React.FC<OccupationalHealthcareFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(INIT_FORM_DATA)
  const { description, date, specialist, diagnosisCodes, employerName, sickLeave } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const changeDate = (date: string | null) => {
    const selectedDate = moment(date).format('YYYY-MM-DD')
    setFormData({
      ...formData,
      date: selectedDate
    })
  }

  const changeSickLeaveStart = (date: string | null) => {
    const selectedDate = moment(date).format('YYYY-MM-DD')
    setFormData({
      ...formData,
      sickLeave: {
        ...sickLeave,
        startDate: selectedDate
      }
    })
  }

  const changeSickLeaveEnd = (date: string | null) => {
    const selectedDate = moment(date).format('YYYY-MM-DD')
    setFormData({
      ...formData,
      sickLeave: {
        ...sickLeave,
        endDate: selectedDate
      }
    })
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const diagnosisCodes = formData.diagnosisCodes.length > 1
      ? formData?.diagnosisCodes.split(', ') : []
    onSubmit({ 
      ...formData,
      diagnosisCodes,
      type: 'OccupationalHealthcare'
    })
  }

  return (
    <form onSubmit={handleSubmit} >
      <Stack sx={{ gap: 2 }}>
        <TextField variant='outlined' name='description' value={description} onChange={handleChange} label='Description' required />
        <DesktopDatePicker
          label='Date'
          format='YYYY-MM-DD'
          value={date}
          onChange={changeDate}
          disableFuture
        />
        <TextField variant='outlined' name='specialist' value={specialist} onChange={handleChange} label='Specialist' required />
        <TextField variant='outlined' name='employerName' value={employerName} onChange={handleChange} label='Employer Name' required />
        <DesktopDatePicker
          label='Sick Leave Start'
          format='YYYY-MM-DD'
          value={sickLeave.startDate}
          onChange={changeSickLeaveStart}
          disableFuture
        />
        <DesktopDatePicker
          label='Sick Leave End'
          format='YYYY-MM-DD'
          value={sickLeave.endDate}
          onChange={changeSickLeaveEnd}
          disableFuture
        />
        <TextField 
          variant='outlined' 
          name='diagnosisCodes' 
          value={diagnosisCodes} 
          onChange={handleChange} 
          label='Diagnosis Codes' 
          helperText='Separate each code by comma(",") followed by space. Example: M.26, L.22, K.43'
        />
        <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 1 }} >
          <Button variant='outlined' type='button' onClick={onCancel} >Cancel</Button>
          <Button variant='contained' type='submit' >Add</Button>
        </Stack>
      </Stack>
    </form>
  )
}

export default OccupationalHealthcareForm