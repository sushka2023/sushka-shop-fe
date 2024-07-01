import React, { FC, useCallback, useEffect, useState } from 'react'
import { ErrorMessage } from '../Error/Error'
import { AutocompleteCustom } from '../Autocomplete/AutocompleteCustom'
import { useNovaPoshtaCity } from '../../hooks/useNovaPoshtaCity'
import { Box, OutlinedInput } from '@mui/material'

const fetchNovaPoshtaaddress = async (
  refCity: string | null,
  valAddress: string
) => {
  const apiKey = 'f07607422838cfac21a0d1b8603086ca'
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      apiKey,
      modelName: 'AddressGeneral',
      calledMethod: 'searchSettlementStreets',
      methodProperties: {
        StreetName: valAddress,
        SettlementRef: refCity,
        Limit: 50
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

type PropsType = {
  selectedValue: any
  errors: any
  setError: (name: string, error: { type: string; message: string }) => void
  register: (name: string) => any
  setValue: (name: string, value: any) => void
  clearErrors: (name: string) => void
}

export const AddressNP: FC<PropsType> = ({
  selectedValue,
  errors,
  register,
  setValue,
  clearErrors
}) => {
  const [settleRef, setSettleRef] = useState<string | null>(null)
  const [novaPoshtaAddress, setNovaPoshtaAddress] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [messageOptionAddress, setMessageOptionAddress] = useState<string>('')
  const [valInputAddress, setValInputAddress] = useState<string>('')

  const {
    setValInputCity,
    loading: cityLoading,
    options,
    novaPoshtaCity,
    cityDefault,
    getDefaultCityRef,
    getCityRef,
    messageOptionCity
  } = useNovaPoshtaCity({
    setValue,
    clearErrors,
    setSettleRef
  })

  const onChangeCity = useCallback(
    (_event: any, value: string) => {
      setValue('city', value)
      setValInputCity(value)
      clearErrors('city')
      if (cityDefault.some((city) => city.name === value)) {
        setSettleRef(getDefaultCityRef(value, cityDefault))
        clearErrors('city')
      } else if (value && novaPoshtaCity.length > 0) {
        setSettleRef(getCityRef(value, novaPoshtaCity))
      } else {
        setSettleRef(null)
      }
    },
    [novaPoshtaCity, cityDefault]
  )

  const onChangeAddress = useCallback(
    (_event: any, value: string) => {
      setValue('address', value)
      setValInputAddress(value)
      clearErrors('address')
    },
    [novaPoshtaAddress, cityDefault]
  )

  const handleCityFetch = async (
    refCity: string | null,
    valAddress: string
  ) => {
    try {
      setLoading(true)
      const data = await fetchNovaPoshtaaddress(refCity, valAddress)
      console.log('✌️data --->', data)
      const addresses = data[0]?.Addresses || []

      setNovaPoshtaAddress(addresses)
      if (addresses.length === 0) {
        setMessageOptionAddress('Не знайдено')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {}, [selectedValue])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!valInputAddress || valInputAddress.length <= 2) {
        setNovaPoshtaAddress([])
        setMessageOptionAddress('Почніть водити текст...')
      } else {
        handleCityFetch(settleRef, valInputAddress)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [valInputAddress])

  return (
    selectedValue === 'novaPoshtaAddress' && (
      <React.Fragment>
        <ErrorMessage
          error={errors.address_np_city}
          styles={{ position: 'relative' }}
        />
        <AutocompleteCustom
          name="city"
          placeholder="Оберіть населений пункт"
          register={register}
          options={options}
          errors={errors}
          onChange={onChangeCity}
          loading={cityLoading}
          setValueInput={setValInputCity}
          optionsText={messageOptionCity}
        />

        <AutocompleteCustom
          name="address"
          placeholder="Вулиця"
          register={register}
          options={novaPoshtaAddress.map((addr) => addr.Present)}
          errors={errors}
          onChange={onChangeAddress}
          loading={loading}
          setValueInput={setValInputAddress}
          optionsText={messageOptionAddress}
        />
        <Box sx={{ display: 'flex', gap: 2, width: 400, m: '15px 0' }}>
          <OutlinedInput
            id="1"
            {...register('house')}
            type="text"
            placeholder="Будинок"
            // error={!!error}
            // disabled={disabled}
          />
          <OutlinedInput
            id="2"
            {...register('floor')}
            type="text"
            placeholder="Поверх"
            // error={!!error}
            // disabled={disabled}
          />
          <OutlinedInput
            id="3"
            {...register('apartament')}
            type="text"
            placeholder="Квартира"
            // error={!!error}
            // disabled={disabled}
          />
        </Box>
      </React.Fragment>
    )
  )
}
