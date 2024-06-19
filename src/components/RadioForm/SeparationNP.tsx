import React, { FC, useEffect, useState, useCallback, useMemo } from 'react'
import { ErrorMessage } from '../Error/Error'
import { AutocompleteCustom } from '../Autocomplete/AutocompleteCustom'
import { useNovaPoshtaCity } from '../../hooks/useNovaPoshtaCity'
import axiosInstance from '../../axios/settings'

type PropsType = {
  selectedValue: any
  errors: any
  register: (name: string) => any
  setValue: (name: string, value: any) => void
  clearErrors: (name: string) => void
  getValues: (name: string) => any
}

const getCityRef = (value: string, novaPoshtaCity: any[]) => {
  const [descriptionPart, areaPart] = value.split(' (')
  const mainDescription = descriptionPart.replace(/^(м\.|с\.)\s/, '')
  const area = areaPart.replace(' обл.', '').replace(')', '')

  const selectedCity = novaPoshtaCity[0]?.Addresses.find(
    (address: any) =>
      address.MainDescription === mainDescription && address.Area === area
  )

  return selectedCity ? selectedCity.Ref : null
}

const getDefaultCityRef = (value: string, cityDefault: any[]) => {
  const defaultCity = cityDefault.find((city) => city.name === value)
  return defaultCity ? defaultCity.ref : null
}

export const SeparationNP: FC<PropsType> = ({
  selectedValue,
  errors,
  register,
  setValue,
  clearErrors,
  getValues
}) => {
  const {
    valInputCity,
    setValInputCity,
    loading: cityLoading,
    options,
    novaPoshtaCity,
    cityDefault
  } = useNovaPoshtaCity()
  const [settleRef, setSettleRef] = useState<string | null>(null)
  const [warehouses, setWarehouses] = useState<any[]>([])
  const [valInputWarehouse, setValInputWarehouse] = useState<string | null>('')
  const [loading, setLoading] = useState<boolean>(false)

  const disabledBtn = () => !valInputCity

  useEffect(() => {
    if (!valInputWarehouse) {
      setWarehouses([])
    }
  }, [valInputWarehouse])

  useEffect(() => {
    if (disabledBtn()) {
      setValue('warehouse', null)
      setValInputWarehouse(null)
    }
  }, [disabledBtn, setValue])

  const fetchWarehouses = async (val: string) => {
    setLoading(true)
    try {
      if (settleRef) {
        const response = await axiosInstance.get(
          '/api/nova_poshta/warehouses/branches/',
          {
            params: {
              settle_ref: settleRef,
              search_term: val
            }
          }
        )
        console.log('✌️response --->', response)
        setWarehouses(response.data)
      }
    } catch (error) {
      console.log('✌️error --->', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (valInputWarehouse) {
      const timer = setTimeout(() => {
        console.log('✌️valInputWarehouse --->', valInputWarehouse)
        fetchWarehouses(valInputWarehouse)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [valInputWarehouse])

  const MAX_LENGTH = 50

  const optionsDataCity = useMemo(() => {
    return warehouses.map(
      (warehouse) =>
        warehouse.address_warehouse
          .replace(/\(до 30 кг на одне місце\)/g, '')
          .replace(/\(до 30 кг\)/g, '')
          .replace(/\(до 10 кг\)/g, '')
          .replace(/\(до 5 кг\)/g, '')
          .replace(/\(до 200 кг\)/g, '')
          .replace(/\(до 1100 кг \)/g, '')
          .replace(/\n/g, '')
          .replace(/№(\d+)\s*:/g, '№$1:')
          .trim()
          .slice(0, MAX_LENGTH) +
        (warehouse.address_warehouse.length > MAX_LENGTH ? '...' : '')
    )
  }, [warehouses])

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
    [setValue, setValInputCity, novaPoshtaCity, cityDefault, clearErrors]
  )

  const onChangeWarehouse = useCallback(
    (_event: any, value: string) => {
      setValue('warehouse', value)
      setValInputWarehouse(value)
      clearErrors('warehouse')
    },
    [setValue, setValInputWarehouse]
  )

  return (
    selectedValue === 'female' && (
      <React.Fragment>
        <ErrorMessage
          error={errors.city || errors.warehouse}
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
        />
        <AutocompleteCustom
          name="warehouse"
          placeholder="Оберіть відділення"
          register={register}
          options={optionsDataCity}
          errors={errors}
          disabled={disabledBtn()}
          val={disabledBtn() ? '' : getValues('warehouse')}
          onChange={onChangeWarehouse}
          loading={loading}
          setValueInput={setValInputWarehouse}
        />
      </React.Fragment>
    )
  )
}
