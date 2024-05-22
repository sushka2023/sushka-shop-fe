import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Typography,
  Autocomplete,
  TextField
} from '@mui/material'

export const RadioForm = () => {
  const [selectedValue, setSelectedValue] = useState<string>('female')
  const [novaPoshtaOffices, setNovaPoshtaOffices] = useState<any[]>([])
  const { handleSubmit, register, setValue } = useForm<any>()
  setNovaPoshtaOffices()
  const onSubmit: SubmitHandler<any> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        {selectedValue === 'female' && (
          <React.Fragment>
            <Autocomplete
              {...register('firstName')}
              onChange={(_, newValue: string | null) => {
                setValue('firstName', newValue)
              }}
              id="controllable-states-demo-1"
              options={novaPoshtaOffices.map(
                (office: any) => office.Description
              )}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Controllable" />
              )}
            />
          </React.Fragment>
        )}

        <FormControlLabel value="male" control={<Radio />} label="Male" />
        {selectedValue === 'male' && (
          <Typography>Additional text for Male option</Typography>
        )}

        <FormControlLabel value="other" control={<Radio />} label="Other" />
        {selectedValue === 'other' && (
          <Typography>Additional text for Other option</Typography>
        )}
      </RadioGroup>

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  )
}
