import {
  FC,
  Fragment,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState
} from 'react'
import { AutocompleteCustom } from '../Autocomplete/AutocompleteCustom'
import { useNovaPoshtaCity } from '../../hooks/useNovaPoshtaCity'
import { Box, OutlinedInput } from '@mui/material'
import { FormProps } from './RadioForm'
import { ErrorMessage } from '../Error/Error'

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
type AddressNP = {
  Present: string
}

export const AddressNP: FC<FormProps> = ({
  selectedValue,
  errors,
  register,
  setValue,
  clearErrors
}) => {
  const [settleRef, setSettleRef] = useState<string | null>(null)
  const [novaPoshtaAddress, setNovaPoshtaAddress] = useState<AddressNP[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [messageOptionAddress, setMessageOptionAddress] = useState<string>('')
  const [valInputAddress, setValInputAddress] = useState<string>('')

  const [selectedWarehouseValue, setSelectedWarehouseValue] = useState<
    string | null
  >(null)

  const {
    setValInputCity,
    loading: cityLoading,
    options,
    novaPoshtaCity,
    CITY_DEFAULT,
    valInputCity,
    getDefaultCityRef,
    getCityRef,
    messageOptionCity
  } = useNovaPoshtaCity()

  const [isDisabled, setIsDisabled] = useState(!valInputCity)

  useEffect(() => {
    setIsDisabled(!valInputCity)
    setSelectedWarehouseValue(null)
    clearErrors()
  }, [!valInputCity])

  useEffect(() => {
    setSelectedWarehouseValue(null)
    setValue('house', null)
    setValue('apartament', null)
    setValue('floor', null)
  }, [!valInputAddress])

  useEffect(() => {
    if (isDisabled) {
      setValue('cityAddress', null)
      setValue('address', null)
      setValInputAddress('')
      setSelectedWarehouseValue(null)
      clearErrors('address')
    }
  }, [isDisabled])

  const onChangeCity = useCallback(
    (_event: SyntheticEvent<Element, Event>, value: string | null) => {
      if (value === null) {
        return
      }

      setValue('cityAddress', value)
      setValInputCity(value)
      clearErrors('cityAddress')

      if (CITY_DEFAULT.some((city) => city.name === value)) {
        setSettleRef(getDefaultCityRef(value, CITY_DEFAULT))
      } else if (novaPoshtaCity.length > 0) {
        setSettleRef(getCityRef(value, novaPoshtaCity))
      } else {
        setSettleRef(null)
      }
    },
    [
      setValue,
      setValInputCity,
      clearErrors,
      CITY_DEFAULT,
      novaPoshtaCity,
      setSettleRef
    ]
  )

  const onChangeAddress = (
    _event: SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (value !== null) {
      setSelectedWarehouseValue(value)
      setValue('address', value)
      setValInputAddress(value)
      clearErrors('address')
    }
  }

  const handleCityFetch = async (
    refCity: string | null,
    valAddress: string
  ) => {
    try {
      setLoading(true)
      const data = await fetchNovaPoshtaaddress(refCity, valAddress)
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
      <Fragment>
        <ErrorMessage
          error={errors.cityAddress || errors.address || errors.house}
          styles={{ position: 'relative' }}
        />
        <AutocompleteCustom
          name="cityAddress"
          placeholder="Оберіть населений пункт"
          register={register}
          options={options}
          onChange={onChangeCity}
          loading={cityLoading}
          setValueInput={setValInputCity}
          noOptionsText={messageOptionCity}
        />

        <AutocompleteCustom
          name="address"
          placeholder="Вулиця"
          register={register}
          options={novaPoshtaAddress.map((addr) => addr.Present)}
          onChange={onChangeAddress}
          loading={loading}
          value={isDisabled ? '' : selectedWarehouseValue}
          setValueInput={setValInputAddress}
          noOptionsText={messageOptionAddress}
          disabled={!valInputCity}
        />
        <Box sx={{ display: 'flex', gap: 2, width: 400, m: '15px 0' }}>
          <OutlinedInput
            id="1"
            {...register('house')}
            type="text"
            placeholder="Будинок"
            disabled={!valInputAddress}
          />
          <OutlinedInput
            id="2"
            {...register('floor')}
            type="text"
            placeholder="Поверх"
            disabled={!valInputAddress}
          />
          <OutlinedInput
            id="3"
            {...register('apartament')}
            type="text"
            placeholder="Квартира"
            disabled={!valInputAddress}
          />
        </Box>
      </Fragment>
    )
  )
}
