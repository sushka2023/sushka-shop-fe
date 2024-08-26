import { FC, useEffect, useMemo, useState, Fragment, useCallback } from 'react'

import { ErrorMessage } from '../Error/Error'
import { AutocompleteCustom } from '../Autocomplete/AutocompleteCustom'
import { useNovaPoshtaLocations } from '../../hooks/useNovaPoshtaLocations'
import { useNovaPoshtaCity } from '../../hooks/useNovaPoshtaCity'
import { FormProps } from './RadioForm'
import { generateOptionsData } from '../../utils/nova-poshta/postomats'

const url = '/api/nova_poshta/warehouses/postomats/'
const numSearch = 3

export const NovaPoshtaPostomats: FC<FormProps> = ({
  selectedValue,
  errors,
  register,
  setValue,
  clearErrors
}) => {
  const [valInputWarehouse, setValInputWarehouse] = useState<string>('')
  const [selectedWarehouseValue, setSelectedWarehouseValue] = useState<
    string | null
  >(null)

  const {
    warehouses,
    setSettleRef,
    setNewRequest,
    messageOptionLoc,
    loading: locationLoading
  } = useNovaPoshtaLocations({
    url,
    numSearch,
    valInputWarehouse,
    setValInputWarehouse
  })

  const {
    valInputCity,
    setValInputCity,
    loading: cityLoading,
    options,
    novaPoshtaCity,
    CITY_DEFAULT,
    getDefaultCityRef,
    getCityRef,
    messageOptionCity
  } = useNovaPoshtaCity()

  const [isDisabled, setIsDisabled] = useState(!valInputCity)

  useEffect(() => {
    setIsDisabled(!valInputCity)
    setSelectedWarehouseValue(null)
  }, [valInputCity])

  useEffect(() => {
    setValInputCity('')
  }, [selectedValue])

  useEffect(() => {
    setSelectedWarehouseValue(null)
    setValue('postomats', null)
  }, [!valInputWarehouse])

  useEffect(() => {
    if (isDisabled) {
      setValue('cityPostomats', null)
      setValue('postomats', null)
      setValInputWarehouse('')
      setSelectedWarehouseValue(null)
      setNewRequest(true)
      clearErrors('postomats')
    }
  }, [isDisabled])

  const optionsData = useMemo(() => {
    return generateOptionsData(warehouses)
  }, [warehouses])

  const onChangeCity = useCallback((value: string | null) => {
    setValue('cityPostomats', value)
    setValInputCity(value ?? '')
    clearErrors('cityPostomats')
    if (CITY_DEFAULT.some((city) => city.name === value)) {
      setSettleRef(getDefaultCityRef(value, CITY_DEFAULT))
      clearErrors('cityPostomats')
    } else if (value && novaPoshtaCity.length > 0) {
      setSettleRef(getCityRef(value, novaPoshtaCity))
    } else {
      setSettleRef(null)
    }
  }, [])

  const onChangeWarehouse = (value: string | null) => {
    const selectedWarehouse = optionsData.find(
      (option) => option.label === value
    )
    if (selectedWarehouse) {
      setValue('postomats', selectedWarehouse.id)
      setValInputWarehouse(value ?? '')
      setSelectedWarehouseValue(value)
      setNewRequest(false)
    }
    clearErrors('postomats')
  }
  return (
    <Fragment>
      <ErrorMessage
        error={errors.cityPostomats || errors.postomats}
        styles={{ position: 'relative' }}
      />

      <AutocompleteCustom
        name="cityPostomats"
        placeholder="Оберіть населений пункт"
        register={register}
        options={options}
        onChange={onChangeCity}
        loading={cityLoading}
        setValueInput={setValInputCity}
        noOptionsText={messageOptionCity}
      />

      <AutocompleteCustom
        name="postomats"
        placeholder="Оберіть поштомат"
        register={register}
        options={optionsData.map((option) => option.label)}
        disabled={isDisabled}
        value={isDisabled ? '' : selectedWarehouseValue}
        onChange={onChangeWarehouse}
        loading={locationLoading}
        setValueInput={setValInputWarehouse}
        noOptionsText={messageOptionLoc}
      />
    </Fragment>
  )
}
