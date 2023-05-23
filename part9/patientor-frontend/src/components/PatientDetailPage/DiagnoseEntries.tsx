import { Button, Stack } from '@mui/material'
import React from 'react'
import { Diagnosis, Entry } from '../../types'
import EntryDetails from './EntryDetails/EntryDetails';

type DiagnoseEntriesProps = {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const DiagnoseEntries: React.FC<DiagnoseEntriesProps> = ({ entries, diagnoses }) => {
  return (
    <Stack sx={{ justifyContent: 'flex-start' }} >
      {entries?.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
      <Button variant='contained' sx={{ maxWidth: 'max-content' }} >Add new Entry</Button>
    </Stack>
  )
}

export default DiagnoseEntries