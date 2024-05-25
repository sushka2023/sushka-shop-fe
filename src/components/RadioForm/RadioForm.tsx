/* eslint-disable */

import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Radio, RadioGroup, FormControlLabel, Button } from '@mui/material'
import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'
import {
  ListboxComponent,
  StyledPopper
} from '../Autocomplete/VariableSizeList'

export const RadioForm = () => {
  const [selectedValue, setSelectedValue] = useState<string>('female')
  const [novaPoshtaOffices, setNovaPoshtaOffices] = useState<any[]>([])
  const [novaPoshtaCity, setNovaPoshtaCity] = useState<any[]>([])
  const [submittedData, setSubmittedData] = useState<any>(null)
  const { handleSubmit, register, setValue } = useForm<any>()

  const getNovaPoshtaCity = async () => {
    const apiKey = 'f07607422838cfac21a0d1b8603086ca'
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        apiKey,
        modelName: 'AddressGeneral',
        calledMethod: 'searchSettlements',
        methodProperties: {
          CityName: 'к',
          Limit: 50,
          Page: 2
        }
      })
    }

    try {
      const response = await fetch(
        'https://api.novaposhta.ua/v2.0/json/',
        requestOptions
      )
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      console.log('✌️data --->', data)
      if (data && data.data && data.data.length > 0) {
        setNovaPoshtaCity(data.data)
      } else {
        console.error('No data available')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const getNovaPoshtaOffices = async () => {
    const apiKey = 'f07607422838cfac21a0d1b8603086ca'
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        apiKey,
        modelName: 'AddressGeneral',
        calledMethod: 'getWarehouses',
        methodProperties: {
          CityName: 'київ'
        }
      })
    }

    try {
      const response = await fetch(
        'https://api.novaposhta.ua/v2.0/json/',
        requestOptions
      )
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      console.log('✌️data --->', data)
      if (data && data.data && data.data.length > 0) {
        setNovaPoshtaOffices(data.data)
      } else {
        console.error('No data available')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data)
    setSubmittedData(data)
  }
  useEffect(() => {
    if (submittedData) {
      setValue('first', submittedData.first)
      setValue('second', submittedData.second)
    }
  }, [submittedData, setValue])

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
              {...register('second')}
              id="virtualize-demo1"
              sx={{ width: 300 }}
              disableListWrap
              PopperComponent={StyledPopper}
              ListboxComponent={ListboxComponent}
              options={
                novaPoshtaCity && novaPoshtaCity.length > 0
                  ? novaPoshtaCity[0].Addresses.map(
                      (address: any) => address.Present
                    )
                  : []
              }
              renderInput={(params) => (
                <TextField {...params} placeholder="Оберіть місто" />
              )}
              renderOption={(props, option, state) =>
                [props, option, state.index] as React.ReactNode
              }
              renderGroup={(params) => params as any}
              onOpen={getNovaPoshtaCity}
              onChange={(_, value) => {
                setValue('second', value)
              }}
            />
            <Autocomplete
              {...register('first')}
              id="virtualize-demo"
              sx={{ width: 300 }}
              disableListWrap
              PopperComponent={StyledPopper}
              ListboxComponent={ListboxComponent}
              options={novaPoshtaOffices.map(
                (office: any) => office.Description
              )}
              renderInput={(params) => (
                <TextField {...params} placeholder="Оберіть віділення" />
              )}
              renderOption={(props, option, state) =>
                [props, option, state.index] as React.ReactNode
              }
              renderGroup={(params) => params as any}
              onOpen={getNovaPoshtaOffices}
              onChange={(_, value) => {
                setValue('first', value)
              }}
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

/* eslint-enable */
