import { useEffect, useRef, useState, useMemo } from 'react'
import { fetchNovaPoshtaCity } from './operation'

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

export const useAutocompleteCityLogic = (setValue: any) => {
  const [selectedValue, setSelectedValue] = useState<string>('female')
  const [valueOption, setValueOption] = useState<string>('')
  console.log('✌️valueOption --->', valueOption)
  const [novaPoshtaCity, setNovaPoshtaCity] = useState<Address[]>([])
  const [valueInput, setValueInput] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const stateRef = useRef(null)

  const popularCitiesUkraine = useMemo(
    () => ['Київ', 'Львів', 'Одеса', 'Дніпро', 'Харків', 'Рівне'],
    []
  )

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

  const resetDefaultCity = () => {
    setValueInput(null)
  }

  const handleCityInputChange = () => {
    if (valueInput && valueInput.length > 3 && !isStaticArray) {
      const timer = setTimeout(() => {
        getNovaPoshtaCity(valueInput)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }

  const resetDefaultCitySet = () => {
    if (valueInput === '') {
      setValueInput(null)
    }
  }

  const updateDefaultCity = () => {
    if (valueInput) {
      setValue('pickupNP', valueInput)
      setNovaPoshtaCity([])
    }
  }

  const isStaticArray = useMemo(() => {
    return (
      valueInput &&
      typeof valueInput === 'string' &&
      popularCitiesUkraine.some((city) =>
        city.toLowerCase().includes(valueInput.toLowerCase())
      )
    )
  }, [valueInput, popularCitiesUkraine])

  const cityRenderArray = useMemo(() => {
    if (!valueInput || isStaticArray) {
      return popularCitiesUkraine
    }
    if (novaPoshtaCity.length > 0) {
      return novaPoshtaCity.map((address: Address) => address.Present)
    }
    return []
  }, [valueInput, novaPoshtaCity, isStaticArray, popularCitiesUkraine])

  useEffect(resetDefaultCity, [selectedValue])
  useEffect(handleCityInputChange, [valueInput])
  useEffect(resetDefaultCitySet, [valueInput])
  useEffect(updateDefaultCity, [valueInput, setValue])

  const handleChange = (value: string) => {
    setValue('pickupNP', value || '')
    setValueOption(value)
    if (
      value &&
      typeof value === 'string' &&
      popularCitiesUkraine.includes(value)
    ) {
      setLoading(false)
    }
  }

  return {
    selectedValue,
    setSelectedValue,
    novaPoshtaCity,
    valueInput,
    setValueInput,
    loading,
    cityRenderArray,
    handleChange,
    stateRef
  }
}
