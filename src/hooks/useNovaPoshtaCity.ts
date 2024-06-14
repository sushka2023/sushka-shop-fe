/* eslint-disable */
import { useState, useEffect, useMemo } from 'react'

const cityDefault = ['Львів', 'Одеса', 'Дніпро', 'Харків', 'Рівне']

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

export const useNovaPoshtaCity = (clearErrors: (name: string) => void) => {
  const [novaPoshtaCity, setNovaPoshtaCity] = useState<any[]>([])
  const [valueInput, setValueInput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleCityFetch = async (cityName: string) => {
    try {
      setLoading(true)
      const data = await fetchNovaPoshtaCity(cityName)
      const addresses = data[0]?.Addresses || []
      console.log('✌️addresses --->', addresses)
      if (
        addresses.length > 0 &&
        addresses.some((address: any) => address.Warehouses > 0)
      ) {
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
            (address: any) =>
              `${address.SettlementTypeCode} ${address.MainDescription} (${address.Area} обл.)`
          )
        : [],
    [novaPoshtaCity]
  )
  const options = useMemo(() => {
    if (!valueInput) return cityDefault
    const filteredCities = cityDefault.filter((city) =>
      city.toLowerCase().includes(valueInput.toLowerCase())
    )
    return filteredCities.length > 0 ? filteredCities : cityRenderNP
  }, [valueInput, cityRenderNP])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        valueInput &&
        valueInput.length > 3 &&
        !cityDefault.includes(valueInput) &&
        !/[()]/.test(valueInput)
      ) {
        setNovaPoshtaCity([])
        handleCityFetch(valueInput)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [valueInput])

  return {
    valueInput,
    setValueInput,
    loading,
    options,
    novaPoshtaCity,
    cityDefault
  }
}
/* eslint-enable */
