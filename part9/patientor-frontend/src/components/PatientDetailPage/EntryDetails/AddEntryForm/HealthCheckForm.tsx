import React, { ChangeEvent, useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment'
import { EntryFormValues } from '../../../../types';

const INIT_FORM_DATA = {
  description: '',
  date: '',
  specialist: '',
  diagnosisCodes: '',
  healthCheckRating: ''
}

type HealthCheckFormProps = {
  onSubmit: (entry: EntryFormValues) => void;
  onCancel: () => void;
}

const HealthCheckForm: React.FC<HealthCheckFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(INIT_FORM_DATA)
  const { description, date, specialist, diagnosisCodes, healthCheckRating } = formData;

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

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const diagnosisCodes = formData.diagnosisCodes.length > 1
      ? formData?.diagnosisCodes.split(', ') : []
    onSubmit({ 
      ...formData, 
      diagnosisCodes, 
      healthCheckRating: Number(healthCheckRating), 
      type: 'HealthCheck' 
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Health Check Rating</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name='healthCheckRating'
            value={healthCheckRating}
            label="Health Check Rating"
            onChange={handleChange}
            required
          >
            <MenuItem value={'0'}>Healthy</MenuItem>
            <MenuItem value={'1'}>Low Risk</MenuItem>
            <MenuItem value={'2'}>High Risk</MenuItem>
            <MenuItem value={'3'}>Critical Risk</MenuItem>
          </Select>
        </FormControl>
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

export default HealthCheckForm