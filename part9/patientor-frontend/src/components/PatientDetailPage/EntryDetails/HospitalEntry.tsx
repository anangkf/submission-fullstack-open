import { Card, CardContent, Chip, List, ListItemText, Stack, Typography } from '@mui/material'
import React from 'react'
import { Diagnosis, HospitalEntry as HospitalEntryType } from '../../../types'

type HospitalEntryProps = {
  entry: HospitalEntryType;
  diagnoses: Diagnosis[];
}

const HospitalEntry: React.FC<HospitalEntryProps> = ({ entry, diagnoses }) => {
  return (
    <Card sx={{ my: 2 }} >
      <CardContent >
        <Stack 
          sx={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'baseline' 
          }} 
        >
          <Typography >{entry.date}</Typography>
          <Chip label={entry.type} color='info' />
        </Stack>
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

export default HospitalEntry