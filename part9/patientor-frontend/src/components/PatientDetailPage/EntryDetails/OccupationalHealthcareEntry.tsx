import React from 'react'
import { Diagnosis, OccupationalHealthcareEntry as OccupationalHealthcareEntryType } from '../../../types'
import { Card, CardContent, Chip, List, ListItemText, Stack, Typography } from '@mui/material';

type OccupationalHealthcareEntryProps = {
  entry: OccupationalHealthcareEntryType;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntry: React.FC<OccupationalHealthcareEntryProps> = ({ entry, diagnoses }) => {
  return (
    <Card key={entry.id} sx={{ my: 2 }} >
      <CardContent>
        <Stack
          sx={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'baseline' 
          }} 
        >
          <Typography >{entry.date} | {entry.employerName}</Typography>
          <Chip label={entry.type} color='warning' />
        </Stack>
        <Typography >{entry.description}</Typography>
        <Typography >Diagnose by <b>{entry.specialist}</b></Typography>
        <List>
          {entry.diagnosisCodes?.map((code, idx) => {
            const diagnose = diagnoses.find((d) => d.code === code)
            return(
              <ListItemText key={idx} primary={`${diagnose?.code} ${diagnose?.name}`} />
            )
          })}
        </List>
      </CardContent>
    </Card>
  )
}

export default OccupationalHealthcareEntry