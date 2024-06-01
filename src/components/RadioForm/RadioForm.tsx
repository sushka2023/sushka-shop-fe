/* eslint-disable */

import React, { useEffect, useState, useRef, FC, ReactNode } from 'react'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
  FormHelperText
} from '@mui/material'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'
import {
  ListboxComponent,
  StyledPopper
} from '../Autocomplete/VariableSizeList'

type PropsType = {
  children: ReactNode
  register: any
  setValue: any
  errors: any
}

export const RadioForm: FC<PropsType> = ({
  children,
  register,
  setValue,
  errors
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('female')
  const [novaPoshtaCity, setNovaPoshtaCity] = useState<any[]>([])
  const [valueInput, setValueInput] = useState<any>(null)
  const [loading, setLoading] = useState<any>(false)

  const stateRef = useRef(null)

  const getNovaPoshtaCity = async (cityName: string) => {
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
          CityName: cityName,
          Limit: 20,
          Page: 1
        }
      })
    }

    try {
      setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (valueInput && valueInput.length > 3) {
        getNovaPoshtaCity(valueInput)
        console.log('✌️valueInput --->', valueInput)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [valueInput])

  const cityRenderArray =
    novaPoshtaCity && novaPoshtaCity.length > 0
      ? novaPoshtaCity[0].Addresses.map((address: any) => address.Present)
      : []

  return (
    <>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        {selectedValue === 'female' && (
          <React.Fragment>
            {errors.pickupNP && (
              <FormHelperText
                sx={{
                  color: 'error.darker',
                  fontWeight: 500
                }}
              >
                {errors.pickupNP?.message}
              </FormHelperText>
            )}
            <Autocomplete
              {...register('pickupNP')}
              ref={stateRef}
              id="virtualize-demo1"
              sx={{ width: 300, mt: 2 }}
              disableListWrap
              PopperComponent={StyledPopper}
              ListboxComponent={ListboxComponent}
              options={cityRenderArray}
              loading={loading}
              noOptionsText="Немає варіантів"
              onInputChange={(_, val) => {
                setValueInput(val)
                console.log('✌️val --->', val)
              }}
              onChange={(_, value) => {
                setValue('pickupNP', value)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Оберіть місто"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress
                            color="inherit"
                            size={23}
                            sx={{
                              position: 'absolute',
                              right: 35,
                              color: 'sapphire.dark'
                            }}
                          />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    )
                  }}
                />
              )}
              renderOption={(props, option, state) =>
                [props, option, state.index] as React.ReactNode
              }
              renderGroup={(params) => params as any}
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
      {children}
    </>
  )
}

/* eslint-enable */
