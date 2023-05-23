import { List, ListItemText, Stack, Typography } from '@mui/material'
import React from 'react'
import { Diagnosis, Entry } from '../../types'

type DiagnoseEntriesProps = {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const DiagnoseEntries: React.FC<DiagnoseEntriesProps> = ({ entries, diagnoses }) => {
  return (
    <Stack>
        {entries?.map((entry) => (
          <Stack key={entry.id} >
            <Typography >{entry.date} {entry.description}</Typography>
            <List>
              {entry.diagnosisCodes?.map((code, idx) => {
                const diagnose = diagnoses.find((d) => d.code === code)
                return(
                  <ListItemText key={idx} primary={`${diagnose?.code} ${diagnose?.name}`} />
                )
              })}
            </List>
          </Stack>
        ))}
      </Stack>
  )
}

export default DiagnoseEntries