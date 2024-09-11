import { useState, useEffect, useMemo } from 'react'

type Address = {
  Ref: string
  MainDescription: string
  Area: string
  Warehouses: number
  SettlementTypeCode: string
}

type CityData = {
  Addresses: Address[]
}

type DefaultCity = {
  name: string
  ref: string
}

const CITY_DEFAULT: DefaultCity[] = [
  { name: 'Київ', ref: 'e718a680-4b33-11e4-ab6d-005056801329' },
  { name: 'Львів', ref: 'e71abb60-4b33-11e4-ab6d-005056801329' },
  { name: 'Одеса', ref: 'e71c2a15-4b33-11e4-ab6d-005056801329' },
  { name: 'Дніпро', ref: 'e717110a-4b33-11e4-ab6d-005056801329' },
  { name: 'Харків', ref: 'e71f8842-4b33-11e4-ab6d-005056801329' },
  { name: 'Рівне', ref: 'e71d65e1-4b33-11e4-ab6d-005056801329' }
]

const TIMER = 1000
export const apiKey = import.meta.env.API_KEY

const getCityRef = (
  value: string,
  novaPoshtaCity: CityData[]
): string | null => {
  const mainDescription = value
    .replace(/^(смт|м\.|с\.)\s*/, '')
    .replace(/\([^)]*\)$/, '')
    .trim()

  const match: RegExpMatchArray | null = value.match(/\(([^)]+)\)$/)

  if (match) {
    const extractedText = match[1]
    const area = extractedText.replace('обл.', '').trim()

    const selectedCity = novaPoshtaCity[0]?.Addresses.find(
      (address) =>
        address.MainDescription === mainDescription && address.Area === area
    )

    return selectedCity ? selectedCity.Ref : null
  } else {
    return null
  }
}

const getDefaultCityRef = (
  value: string | null,
  CITY_DEFAULT: DefaultCity[]
): string | null => {
  const defaultCity = CITY_DEFAULT.find((city) => city.name === value)
  return defaultCity ? defaultCity.ref : null
}

const fetchNovaPoshtaCity = async (cityName: string): Promise<CityData[]> => {
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

export const useNovaPoshtaCity = () => {
  const [novaPoshtaCity, setNovaPoshtaCity] = useState<CityData[]>([])
  const [valInputCity, setValInputCity] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [messageOptionCity, setMessageOptionCity] = useState<string>('')

  const handleCityFetch = async (cityName: string) => {
    try {
      setLoading(true)
      const data = await fetchNovaPoshtaCity(cityName)
      const addresses = data[0]?.Addresses || []

      if (addresses.length === 0) {
        setMessageOptionCity('Не знайдено')
      } else if (addresses.some((address) => address.Warehouses > 0)) {
        setNovaPoshtaCity(data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const cityRenderNP = useMemo(
    () =>
      novaPoshtaCity.length > 0
        ? novaPoshtaCity[0].Addresses.map(
            (address) =>
              `${address.SettlementTypeCode} ${address.MainDescription} (${address.Area} обл.)`
          )
        : [],
    [novaPoshtaCity]
  )

  const options = useMemo(() => {
    if (!valInputCity) return CITY_DEFAULT.map((city) => city.name)
    const filteredCities = CITY_DEFAULT.map((city) => city.name).filter(
      (city) => city.toLowerCase().includes(valInputCity.toLowerCase())
    )
    return filteredCities.length > 0 ? filteredCities : cityRenderNP
  }, [valInputCity, cityRenderNP])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        !valInputCity ||
        valInputCity.length <= 3 ||
        CITY_DEFAULT.some((city) => city.name === valInputCity) ||
        /[()]/.test(valInputCity)
      ) {
        setMessageOptionCity('Почніть вводити текст...')
      } else {
        setNovaPoshtaCity([])
        handleCityFetch(valInputCity)
      }
    }, TIMER)
    return () => clearTimeout(timer)
  }, [valInputCity])

  return {
    valInputCity,
    setValInputCity,
    loading,
    options,
    novaPoshtaCity,
    CITY_DEFAULT,
    getCityRef,
    getDefaultCityRef,
    messageOptionCity
  }
}
