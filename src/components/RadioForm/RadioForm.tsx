import React, { useEffect, useState, FC, ReactNode, useMemo } from 'react'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress
} from '@mui/material'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'
import {
  ListboxComponent,
  StyledPopper
} from '../Autocomplete/VariableSizeList'
import { ErrorMessage } from '../Error/Error'

type PropsType = {
  children: ReactNode
  register: any
  setValue: any
  errors: any
  setError: any
  clearErrors: any
}

const cityDefault = ['Київ', 'Львів', 'Одеса', 'Дніпро', 'Харків', 'Рівне']

const fetchNovaPoshtaCity = async (cityName: string) => {
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

  const response = await fetch(
    'https://api.novaposhta.ua/v2.0/json/',
    requestOptions
  )

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await response.json()
  return data.data
}

const RadioForm: FC<PropsType> = ({
  children,
  register,
  setValue,
  errors,
  setError,
  clearErrors
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('female')
  const [novaPoshtaCity, setNovaPoshtaCity] = useState<any[]>([])
  const [valueInput, setValueInput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleCityFetch = async (cityName: string) => {
    try {
      setLoading(true)
      const data = await fetchNovaPoshtaCity(cityName)
      const addresses = data[0]?.Addresses || []
      if (
        addresses.length > 0 &&
        addresses.some((address: any) => address.Warehouses > 0)
      ) {
        setNovaPoshtaCity(data)
        clearErrors('pickupNP')
      } else {
        setError('pickupNP', { type: 'manual', message: 'Немає відділень' })
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        valueInput &&
        valueInput.length > 3 &&
        !cityDefault.includes(valueInput)
      ) {
        setNovaPoshtaCity([])
        handleCityFetch(valueInput)
      } else if (cityDefault.includes(valueInput)) {
        clearErrors('pickupNP')
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [valueInput])

  const cityRenderNP = useMemo(
    () =>
      novaPoshtaCity.length > 0
        ? novaPoshtaCity[0].Addresses.map((address: any) => address.Present)
        : [],
    [novaPoshtaCity]
  )

  const options = useMemo(() => {
    const filteredCities = !valueInput
      ? cityDefault
      : cityDefault.filter((city) =>
          city.toLowerCase().includes(valueInput.toLowerCase())
        )
    return filteredCities.length > 0 ? filteredCities : cityRenderNP
  }, [valueInput, cityRenderNP])

  return (
    <React.Fragment>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        {selectedValue === 'female' && (
          <React.Fragment>
            <ErrorMessage
              error={errors.pickupNP}
              styles={{ position: 'relative' }}
            />
            <Autocomplete
              {...register('pickupNP')}
              id="virtualize-demo1"
              sx={{ width: 300, mt: 2 }}
              disableListWrap
              PopperComponent={StyledPopper}
              ListboxComponent={ListboxComponent}
              options={options}
              loading={loading}
              noOptionsText="Немає варіантів"
              onInputChange={(_, val) => setValueInput(val)}
              onChange={(_, value: string) => {
                console.log('✌️value --->', value)
                setValue('pickupNP', value)
                if (cityDefault.includes(value)) {
                  clearErrors('pickupNP')
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Оберіть населений пункт"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading && (
                          <CircularProgress
                            color="inherit"
                            size={23}
                            sx={{
                              position: 'absolute',
                              right: 35,
                              color: 'sapphire.dark'
                            }}
                          />
                        )}
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
    </React.Fragment>
  )
}

export default RadioForm
