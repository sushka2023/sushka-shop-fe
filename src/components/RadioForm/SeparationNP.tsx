/* eslint-disable */
import { FC, useEffect, useState, useCallback, useMemo } from 'react'
import { ErrorMessage } from '../Error/Error'
import { AutocompleteCustom } from '../AutocompleteCustom/AutocompleteCustom'
import { useNovaPoshtaCity } from '../../hooks/useNovaPoshtaCity'
import axiosInstance from '../../axios/settings'

type PropsType = {
  selectedValue: any
  errors: any
  setError: (name: string, error: { type: string; message: string }) => void
  register: (name: string) => any
  setValue: (name: string, value: any) => void
  clearErrors: (name: string) => void
}

export const SeparationNP: FC<PropsType> = ({
  selectedValue,
  errors,
  register,
  setValue,
  clearErrors,
  setError
}) => {
  const {
    setValInputCity,
    loading: cityLoading,
    options,
    novaPoshtaCity,
    cityDefault
  } = useNovaPoshtaCity(clearErrors)
  const [settleRef, setSettleRef] = useState<string | null>(null)
  const [warehouses, setWarehouses] = useState<any[]>([])
  const [valInputWarehouse, setValInputWarehouse] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!valInputWarehouse) {
      setWarehouses([])
    }
  }, [valInputWarehouse])

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
      setValue('pickupNP', value)
      setValInputCity(value)

      if (value && novaPoshtaCity && novaPoshtaCity[0]?.Addresses) {
        const [descriptionPart, areaPart] = value.split(' (')
        const mainDescription = descriptionPart.replace(/^(м\.|с\.)\s/, '')
        const area = areaPart.replace(' обл.', '').replace(')', '')

        const selectedCity = novaPoshtaCity[0]?.Addresses.find(
          (address: any) =>
            address.MainDescription === mainDescription && address.Area === area
        )

        if (selectedCity) {
          setSettleRef(selectedCity.Ref)
        } else {
          setSettleRef(null)
        }
      }

      if (cityDefault.includes(value)) {
        clearErrors('pickupNP')
      }
    },
    [setValue, setValInputCity, novaPoshtaCity, cityDefault, clearErrors]
  )

  const onChangeWarehouse = useCallback(
    (_event: any, value: string) => {
      setValue('warehouse', value)
      setValInputWarehouse(value)
    },
    [setValue, setValInputWarehouse]
  )

  return (
    selectedValue === 'female' && (
      <>
        <ErrorMessage
          error={errors.pickupNP}
          styles={{ position: 'relative' }}
        />
        <AutocompleteCustom
          name="pickupNP"
          register={register}
          options={options}
          onChange={onChangeCity}
          loading={cityLoading}
          setValueInput={setValInputCity}
        />

        <AutocompleteCustom
          name="warehouse"
          register={register}
          options={optionsDataCity}
          onChange={onChangeWarehouse}
          loading={loading}
          setValueInput={setValInputWarehouse}
        />
      </>
    )
  )
}
/* eslint-enable */
