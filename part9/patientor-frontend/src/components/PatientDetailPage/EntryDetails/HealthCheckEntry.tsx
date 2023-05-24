import React from 'react'
import { Card, CardContent, Chip, List, ListItemText, Rating, Stack, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Diagnosis, HealthCheckEntry as HealthCheckEntryType } from '../../../types';

type HealthCheckEntryProps = {
  entry: HealthCheckEntryType;
  diagnoses: Diagnosis[];
}

const HealthCheckEntry: React.FC<HealthCheckEntryProps> = ({ entry, diagnoses }) => {
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
          <Typography >{entry.date}</Typography>
          <Chip label={entry.type} color='success' />
        </Stack>
        <Rating 
          max={4}
          value={4 - entry.healthCheckRating} 
          sx={{ color: 'red' }} 
          icon={<FavoriteIcon />} 
          emptyIcon={<FavoriteBorderIcon />} 
          readOnly 
        />
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

export default HealthCheckEntry