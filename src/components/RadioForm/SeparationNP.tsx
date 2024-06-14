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
    setValueInput,
    loading: cityLoading,
    options,
    novaPoshtaCity,
    cityDefault
  } = useNovaPoshtaCity(clearErrors)
  const [settleRef, setSettleRef] = useState<string | null>(null)
  const [warehouses, setWarehouses] = useState<any[]>([])
  const [valueInput1, setValueInput1] = useState<string>('')

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        if (settleRef) {
          const response = await axiosInstance.get(
            `/api/nova_poshta/warehouses/${settleRef}`
          )
          console.log('✌️response --->', response)
          setWarehouses(response.data)
        }
      } catch (error) {
        console.log('✌️error --->', error)
      }
    }

    fetchWarehouses()
  }, [settleRef])

  const optionsData = useMemo(() => {
    return warehouses.map((warehouse) => warehouse.address_warehouse)
  }, [warehouses])

  const onChangeCity = useCallback(
    (_event: any, value: string) => {
      setValue('pickupNP', value)
      setValueInput(value)

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
    [setValue, setValueInput, novaPoshtaCity, cityDefault, clearErrors]
  )

  const onChangeWarehouse = useCallback(
    (_event: any, value: string) => {
      setValue('warehouse', value)
      setValueInput1(value)
    },
    [setValue, setValueInput1]
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
          setValueInput={setValueInput}
        />

        <AutocompleteCustom
          name="warehouse"
          register={register}
          options={optionsData}
          onChange={onChangeWarehouse}
          loading={false}
          setValueInput={setValueInput1}
        />
      </>
    )
  )
}
/* eslint-enable */
