import React, { FC, useEffect, useCallback, useMemo, useState } from 'react'
import { ErrorMessage } from '../Error/Error'
import { AutocompleteCustom } from '../Autocomplete/AutocompleteCustom'
import { useNovaPoshtaCity } from '../../hooks/useNovaPoshtaCity'
import { useNovaPoshtaLocations } from '../../hooks/useNovaPoshtaLocations'

type PropsType = {
  selectedValue: any
  errors: any
  register: (name: string) => any
  setValue: (name: string, value: any) => void
  clearErrors: (name: string) => void
  getValues: (name: string) => any
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
    valInputWarehouse,
    setValInputWarehouse,
    warehouses,
    setWarehouses,
    setSettleRef,
    setNewRequest,
    loading: locationLoading
  } = useNovaPoshtaLocations()

  const {
    valInputCity,
    setValInputCity,
    loading: cityLoading,
    options,
    novaPoshtaCity,
    cityDefault,
    getDefaultCityRef,
    getCityRef
  } = useNovaPoshtaCity({ setValue, clearErrors, setSettleRef })

  const [isDisabled, setIsDisabled] = useState(!valInputCity)
  console.log('✌️isDisabled --->', isDisabled)

  useEffect(() => {
    setIsDisabled(!valInputCity)
  }, [valInputCity])

  useEffect(() => {
    if (!valInputWarehouse) {
      setWarehouses([])
      setNewRequest(true)
    }
  }, [valInputWarehouse])

  useEffect(() => {
    if (isDisabled) {
      setValue('warehouse', null)
      setValInputWarehouse(null)
      setNewRequest(true)
    }
  }, [isDisabled])

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
      setNewRequest(false)
      // setWarehouses([])
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
          disabled={isDisabled}
          val={isDisabled ? '' : getValues('warehouse')}
          onChange={onChangeWarehouse}
          loading={locationLoading}
          setValueInput={setValInputWarehouse}
        />
      </React.Fragment>
    )
  )
}
