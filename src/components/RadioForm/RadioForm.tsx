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
import { DefaultCity } from './DefaultCity'
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form'

interface FormValues {
  pickupNP: string
}

interface Address {
  Present: string
}

interface NovaPoshtaCityData {
  Addresses: Address[]
}

type PropsType = {
  children: ReactNode
  register: UseFormRegister<FormValues>
  setValue: UseFormSetValue<FormValues>
  errors: FieldErrors<FormValues>
}
const popularCitiesUkraine = [
  'Київ',
  'Харків',
  'Одеса',
  'Дніпро',
  'Запоріжжя',
  'Львів',
  'Кривий Ріг',
  'Миколаїв',
  'Вінниця',
  'Херсон',
  'Полтава',
  'Чернігів',
  'Черкаси',
  'Житомир',
  'Суми',
  'Рівне',
  'Франківськ',
  "Кам'янське"
]

export const RadioForm: FC<PropsType> = ({
  children,
  register,
  setValue,
  errors
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('female')
  const [novaPoshtaCity, setNovaPoshtaCity] = useState<NovaPoshtaCityData[]>([])
  const [valueInput, setValueInput] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [defaultCity, setDefaultCity] = useState<string | null>(null)

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
    if (
      defaultCity === null &&
      valueInput &&
      valueInput.length > 3 &&
      !isStaticArray
    ) {
      const timer = setTimeout(() => {
        getNovaPoshtaCity(valueInput)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [valueInput, defaultCity])

  const isStaticArray =
    valueInput &&
    typeof valueInput === 'string' &&
    popularCitiesUkraine.some((city) =>
      city.toLowerCase().includes(valueInput.toLowerCase())
    )

  const cityRenderArray =
    valueInput === '' || valueInput === null
      ? popularCitiesUkraine
      : valueInput !== '' &&
          novaPoshtaCity &&
          novaPoshtaCity.length > 0 &&
          !isStaticArray
        ? novaPoshtaCity[0].Addresses.map((address: Address) => address.Present)
        : isStaticArray
          ? popularCitiesUkraine
          : []

  const [defaultCitySet, setDefaultCitySet] = useState<boolean>(false)

  useEffect(() => {
    if (valueInput === '') {
      setDefaultCity(null)
      setDefaultCitySet(false)
    }
  }, [valueInput])

  useEffect(() => {
    if (defaultCity && !defaultCitySet) {
      setValue('pickupNP', defaultCity)
      setDefaultCitySet(true)
      setNovaPoshtaCity([])
    }
  }, [defaultCity, setValue, defaultCitySet])

  return (
    <>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        sx={{
          '& .MuiFormControlLabel-label': {
            cursor: 'pointer'
          },
          '& .MuiFormControlLabel-root:hover': {
            cursor: 'default'
          }
        }}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        {selectedValue === 'female' && (
          <>
            <DefaultCity setDefaultCity={setDefaultCity} />
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
              value={defaultCity !== '' ? defaultCity : null}
              loading={loading}
              noOptionsText="Немає варіантів"
              onInputChange={(_, val) => {
                setValueInput(val)
              }}
              onChange={(_, value: string | null) => {
                setValue('pickupNP', value || '')
                if (
                  value &&
                  typeof value === 'string' &&
                  popularCitiesUkraine.includes(value)
                ) {
                  setLoading(false)
                }
              }}
              renderGroup={(params: any) => params}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Оберіть місто"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
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
                      </>
                    )
                  }}
                />
              )}
              renderOption={(props, option, state) =>
                [props, option, state.index] as React.ReactNode
              }
            />
          </>
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
