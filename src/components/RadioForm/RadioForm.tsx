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
import { fetchNovaPoshtaCity } from './operation'

interface FormValues {
  pickupNP: string
}

interface Address {
  AddressDeliveryAllowed: boolean
  Area: string
  DeliveryCity: string
  MainDescription: string
  ParentRegionCode: string
  ParentRegionTypes: string
  Present: string
  Ref: string
  Region: string
  RegionTypes: string
  RegionTypesCode: string
  SettlementTypeCode: string
  StreetsAvailability: boolean
  Warehouses: number
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

/* eslint-disable */

export const RadioForm: FC<PropsType> = ({
  children,
  register,
  setValue,
  errors
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('female')
  const [novaPoshtaCity, setNovaPoshtaCity] = useState<Address[]>([])
  const [valueInput, setValueInput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [defaultCity, setDefaultCity] = useState<string | null>(null)
  const [defaultCitySet, setDefaultCitySet] = useState<boolean>(false)

  const stateRef = useRef(null)

  const getNovaPoshtaCity = async (cityName: string) => {
    setLoading(true)
    try {
      const city = await fetchNovaPoshtaCity(cityName)
      setNovaPoshtaCity(city)
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
    valueInput === ''
      ? popularCitiesUkraine
      : valueInput !== '' && novaPoshtaCity && !isStaticArray
        ? novaPoshtaCity.map((address: Address) => address.Present)
        : isStaticArray
          ? popularCitiesUkraine
          : []

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
    <React.Fragment>
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
          <React.Fragment>
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
            />
          </React.Fragment>
        )}

        <FormControlLabel value="male" control={<Radio />} label="Male" />
        {selectedValue === 'male' && <React.Fragment></React.Fragment>}

        <FormControlLabel value="other" control={<Radio />} label="Other" />
        {selectedValue === 'other' && (
          <Typography>Additional text for Other option</Typography>
        )}
      </RadioGroup>
      {children}
    </React.Fragment>
  )
}
/* eslint-enable */
