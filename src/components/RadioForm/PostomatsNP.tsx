import { FC, useEffect, useCallback, useMemo, useState, Fragment } from 'react'
import { ErrorMessage } from '../Error/Error'
import { AutocompleteCustom } from '../Autocomplete/AutocompleteCustom'
import { useNovaPoshtaLocations } from '../../hooks/useNovaPoshtaLocations'
import { useNovaPoshtaCity } from '../../hooks/useNovaPoshtaCity'

type PropsType = {
  selectedValue: any
  errors: any
  register: (name: string) => any
  setValue: (name: string, value: any) => void
  clearErrors: (name: string) => void
  getValues: (name: string) => any
}

const MAX_LENGTH = 50
const url = '/api/nova_poshta/warehouses/postomats/'
const numSearch = 4

export const NovaPoshtaPostomats: FC<PropsType> = ({
  selectedValue,
  errors,
  register,
  setValue,
  clearErrors
}) => {
  const [valInputWarehouse, setValInputWarehouse] = useState<string>('')

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
    cityDefault,
    getDefaultCityRef,
    getCityRef,
    messageOptionCity
  } = useNovaPoshtaCity({
    setValue,
    clearErrors,
    setSettleRef
  })

  const [isDisabled, setIsDisabled] = useState(!valInputCity)

  useEffect(() => {
    setIsDisabled(!valInputCity)
  }, [valInputCity])

  useEffect(() => {
    if (isDisabled) {
      setValue('postomats', '')
      setValInputWarehouse('')
      setSelectedWarehouseValue(null)
      setNewRequest(true)
    }
  }, [isDisabled, setValue, setValInputWarehouse, setNewRequest])
  const [selectedWarehouseValue, setSelectedWarehouseValue] = useState<
    string | null
  >(null)

  useEffect(() => {
    setSelectedWarehouseValue(null)
  }, [!valInputWarehouse])

  const optionsData = useMemo(() => {
    return warehouses.map(
      (warehouse) =>
        warehouse.address_warehouse
          .replace(/"Нова Пошта"/g, '')
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
    [
      setValue,
      setValInputCity,
      novaPoshtaCity,
      cityDefault,
      clearErrors,
      getDefaultCityRef,
      getCityRef,
      setSettleRef
    ]
  )

  const onChangeWarehouse = useCallback(
    (_event: any, value: string) => {
      const selectedWarehouse = optionsData.find((option) => option === value)
      if (selectedWarehouse) {
        setValue('postomats', selectedWarehouse)
        setValInputWarehouse(value)
        setSelectedWarehouseValue(value)
        setNewRequest(false)
      }
      clearErrors('postomats')
    },
    [setValue, setValInputWarehouse, clearErrors, setNewRequest, optionsData]
  )

  return (
    selectedValue === 'novaPoshtaPostomats' && (
      <Fragment>
        <ErrorMessage
          error={errors.city || errors.postomats}
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
          name="postomats"
          placeholder="Оберіть відділення"
          register={register}
          options={optionsData.map((option) => option)}
          errors={errors}
          disabled={isDisabled}
          val={isDisabled ? '' : selectedWarehouseValue}
          onChange={onChangeWarehouse}
          loading={locationLoading}
          setValueInput={setValInputWarehouse}
          optionsText={messageOptionLoc}
        />
      </Fragment>
    )
  )
}
